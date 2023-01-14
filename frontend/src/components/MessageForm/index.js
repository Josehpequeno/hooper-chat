import React from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import "./MessageForm.css"

function MessageForm() {
  function handleSumbmit(e) {
    e.preventDefault();
  }
  return (
    <>
      <div className="messages-output"></div>
      <Form onSubmit={handleSumbmit}>
        <Row>
          <Col md={11}>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Your Message"
              ></Form.Control>
            </Form.Group>
          </Col>
          <Col md={1}>
            <Button
              variant="primary"
              type="submit"
              style={{ width: "100%", background: "#A8977D" }}
            >
              <i className="fas fa-paper-plane"></i>
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  );
}

export default MessageForm;
