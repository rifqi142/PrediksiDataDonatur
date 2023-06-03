import React, { useRef } from "react";
import API from "../../api/Api";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";

import "./login.css";
import logo from "../../Assets/logo-dd.png";
import logo2 from "../../Assets/logo-bl.png";
import backgorund from "../../Assets/bg-dd.jpeg";

const handleSubmit = (e) => {};

export default function login() {
  return (
    <>
      {/* <img src={backgorund} alt="bg" className="bg" /> */}
      <section id="login-pages">
        {/* <div className="content"> */}
        <Container fluid>
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
                  <Card.Title>Welcome back</Card.Title>
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
                        required
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="Enter your password ..."
                        required
                      />
                    </Form.Group>
                    <Button
                      variant="primary"
                      type="submit"
                      className="btn-login"
                    >
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
          </Row>
        </Container>
        {/* </div> */}
      </section>
    </>
  );
}
