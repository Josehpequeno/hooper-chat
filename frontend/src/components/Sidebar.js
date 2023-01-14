import React from "react";
import { ListGroup } from "react-bootstrap";

function Sidebar() {
  const rooms = ["first", "second", "third"];
  return (
    <>
      <h2>Avaliable rooms</h2>
      <ListGroup>
        {rooms.map((room, idx) => (
          <ListGroup.Item key={idx}>{room}</ListGroup.Item>
        ))}
      </ListGroup>
      <h2>Members</h2>
    </>
  );
}

export default Sidebar;
