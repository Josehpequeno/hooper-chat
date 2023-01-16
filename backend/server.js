const express = require("express");
const app = express();
const userRoutes = require("./routes/user");

require("./connection");

const rooms = [
  "General",
  "Atlanta Hawks",
  "Boston Celtics",
  "Brooklyn Nets",
  // "Charlotte Hornets",
  // "Chicago Bulls",
  // "Cleveland Cavaliers",
  // "Dallas Mavericks",
  // "Denver Nuggets",
  // "Detroit Pistons",
  // "Golden State Warriors",
  // "Houston Rockets",
  // "Indiana Pacers",
  // "Los Angeles Clippers",
  // "Los Angeles Lakers",
  // "Memphis Grizzlies",
  // "Miami Heat",
  // "Milwaukee Bucks",
  // "Minnesota Timberwolves",
  // "New Orleans Pelicans",
  // "New York Knicks",
  // "Oklahoma City Thunder",
  // "Orlando Magic",
  // "Philadelphia 76ers",
  // "Phoenix Suns",
  // "Portland Trail Blazers",
  // "Sacramento Kings",
  // "San Antonio Spurs",
  // "Toronto Raptors",
  // "Utah Jazz",
  // "Washington Wizards"
];
const cors = require("cors");
const Message = require("./models/Message");
const User = require("./models/User");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use("/users", userRoutes);

const server = require("http").createServer(app);
const PORT = 5000;
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

app.get("/rooms", (req, res) => {
  res.json(rooms);
});

async function getLastMessagesFromRoom(room) {
  let roomMessages = await Message.aggregate([
    { $match: { to: room } },
    { $group: { _id: "$date", messagesByDate: { $push: "$$ROOT" } } }
  ]);
  return roomMessages;
}

function sortRoomMessagesByDate(messages) {
  return messages.sort(function (a, b) {
    let date1 = a._id.split("/");
    let date2 = b._id.split("/");

    date1 = date1[2] + date1[0] + date1[1];
    date2 = date2[2] + date2[0] + date2[1];

    return date1 < date2 ? -1 : 1;
  });
}

//socket connecction

io.on("connection", (socket) => {
  socket.on("new-user", async () => {
    const members = await User.find();
    io.emit("new-user", members);
  });

  socket.on("join-room", async (newRoom, previousRoom) => {
    socket.join(newRoom);
    socket.leave(previousRoom);
    let roomMessages = await getLastMessagesFromRoom(newRoom);
    roomMessages = sortRoomMessagesByDate(roomMessages);
    socket.emit("room-messages", roomMessages);
  });

  socket.on("message-room", async (room, content, sender, time, date) => {
    const newMessage = await Message.create({
      content,
      from: sender,
      time,
      date,
      to: room
    });
    let roomMessages = await getLastMessagesFromRoom(room);
    roomMessages = sortRoomMessagesByDate(roomMessages);
    // sending message to room
    io.to(room).emit("room-messages", roomMessages);

    socket.broadcast.emit("notifications", room);
  });

  app.delete("/logout", async (req, res) => {
    try {
      const { _id, newMessages } = req.body;
      const user = await User.findById(_id);
      user.status = "offline";
      user.newMessages = newMessages;
      await user.save();
      const members = await User.find();
      socket.broadcast.emit("new-user", members);
      res.status(200).send();
    } catch (e) {
      res.status(400).send();
    }
  });
});

server.listen(PORT, () => {
  console.log("listening on port", PORT);
});
