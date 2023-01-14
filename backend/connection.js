const mongoose = require("mongoose");
const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config();

// Mongoose.connect(
//   `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PW}@cluster1.61bdq1g.mongodb.net/hooperChat?retryWrites=true&w=majority`,
//   {
//     useNewUrlParser: true
//   },
//   function (error) {
//     if (!error) {
//       return;
//     }
//     console.log("Falha na conexão", error);
//   }
// );

mongoose
  .connect(
    `mongodb://${process.env.DB_USER}:${process.env.DB_PW}@localhost:27017/hooperChat`,
    {
      useNewUrlParser: true
    }
  )
  .then(() => console.log("Connected to mongodb!"));

// mongoose.connect(
//   `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PW}@cluster1.61bdq1g.mongodb.net/hooperChat?retryWrites=true&w=majority`,
//   () => {
//     console.log("connected to mongodb");
//   }
// );
