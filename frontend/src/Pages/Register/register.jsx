import React, { useState } from "react";
// import API from "../../api/Api";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button, Form, Container, Row, Col, Card } from "react-bootstrap";

import "./register.css";
import logo from "../../Assets/logo-dd.png";
import logo2 from "../../Assets/logo-bl.png";

export default function Register() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await axios.post(
        "http://127.0.0.1:5000/register",
        {
          username: username,
          email: email,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (res.status === 200) {
        console.log("Register Success");
        navigate("/login");
      }
    } catch (err) {
      alert(
        "Username / Email Sudah terdaftar, Silahkan Periksa Data Anda Kembali!"
      );
    }
  };
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
                  <Form.Group className="mb-3" controlId="formBasicUsername">
                    <Form.Label>Username</Form.Label>
                    <input
                      type="text"
                      className="form-control"
                      id="username"
                      name="username"
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <input
                      type="text"
                      className="form-control"
                      id="email"
                      name="email"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      name="password"
                      onChange={(e) => setPassword(e.target.value)}
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
