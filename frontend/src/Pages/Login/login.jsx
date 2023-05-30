import React, { useRef } from "react";
import API from "../../api/Api";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";

import "./login.css";
import logillus from "../../Assets/login.png";

const handleSubmit = (e) => {};

export default function login() {
  return (
    <section id="login-pages">
      <Container>
        <Row>
          <Col md={6}>
            <Card>
              <Card.Body>
                <Card.Title>Welcome back</Card.Title>
                <br />
                <Card.Subtitle>
                  Login to your account to use all feature
                </Card.Subtitle>
                <hr />
                <br />
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter your email ..."
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter your password ..."
                    />
                  </Form.Group>
                  <Button variant="primary" type="submit" className="btn-login">
                    Login
                  </Button>
                  <div className="make-account mt-4">
                    <span>Doesn't have an account ? </span>
                    <a href="/register" className="text-decoration-none">
                      SignUp Here
                    </a>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6}>
            <div className="illustration-login">
              <img src={logillus} alt="logo" className="img-fluid" />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
