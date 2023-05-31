import React, { useRef } from "react";
import API from "../../api/Api";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";

import "./register.css";
import logo from "../../Assets/logo-dd.png";
import logo2 from "../../Assets/logo-bl.png";

const handleSubmit = (e) => {};

export default function register() {
  return (
    <section id="register-pages">
      <Container>
        <Row>
          <Col>
            <Card style={{ boxShadow: "10px 10px" }}>
              <Card.Body>
                <div className="logo">
                  <img src={logo} alt="logo" className="img-fluid" />
                  <br />
                  <img src={logo2} alt="logo" className="img-fluid" />
                </div>
                <br />
                <Card.Title>Register Account</Card.Title>
                <Card.Subtitle>
                  Let's get you all set up so you can verify your personal
                  account and begin setting up your profile.
                </Card.Subtitle>
                <hr />
                <br />
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      type="email"
                      id="email"
                      placeholder="Enter your email ..."
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                      type="text"
                      id="username"
                      placeholder="Enter your username ..."
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      id="password"
                      placeholder="Enter your password ..."
                    />
                  </Form.Group>
                  <Button variant="primary" type="submit" className="btn-login">
                    Register
                  </Button>
                  <div className="make-account mt-4">
                    <span>Already have an account ? </span>
                    <a href="/" className="text-decoration-none">
                      Login Here
                    </a>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
