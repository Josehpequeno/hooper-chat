import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import chat from "../../assets/chat.png";
import "./Home.css";
function Home() {
  return (
    <Row style={{ marginLeft: 10 }}>
      <Col
        md={6}
        className="d-flex flex-direction-column align-items-center justify-content-center"
      >
        <div>
          <h1>Share the world of basketball with your friends hoopers</h1>
          <p>Hooper Chat let you connect with the world of basketball</p>
          <LinkContainer to="/chat" className="bg-color-primary">
            <Button>
              Get Started
              <img
                src={chat}
                alt="chat"
                style={{ marginLeft: 5, width: 25, height: 25 }}
              ></img>
            </Button>
          </LinkContainer>
        </div>
      </Col>
      <Col md={6} className="home_bg"></Col>
    </Row>
  );
}

export default Home;
