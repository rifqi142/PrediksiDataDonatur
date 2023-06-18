import React, { useState, useRef, useEffect } from "react";
// import API from "../../api/Api";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button, Form, Container, Row, Col, Card } from "react-bootstrap";

import "./register.css";
import logo from "../../Assets/logo-dd.png";
import logo2 from "../../Assets/logo-bl.png";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const EMAIL_REGEX = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

export default function Register() {
  const navigate = useNavigate();
  const userRef = useRef();
  const errRef = useRef();

  const [username, setUsername] = useState("");
  const [validName, setValidName] = useState(false);

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);

  const [password, setPassword] = useState("");
  const [validPwd, setValidPwd] = useState(false);

  const [errMsg, setErrMsg] = useState("");

  const [success, setSuccess] = useState(false);

  useEffect(() => {
    setValidName(USER_REGEX.test(username));
  }, [username]);

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email]);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(password));
  }, [password]);

  useEffect(() => {
    setErrMsg("");
  }, [username, email, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const v1 = USER_REGEX.test(username);
    // const v2 = EMAIL_REGEX.test(email);
    // const v3 = PWD_REGEX.test(password);
    // if (!v1 || !v2 || !v3) {
    //   setErrMsg("Please check your data again!");
    //   return;
    // }
    try {
      let res = await axios.post(
        "/register",
        {
          username: username,
          email: email,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      setSuccess(true);
      setUsername("");
      setEmail("");
      setPassword("");
      if (res.status === 200) {
        console.log("Registration Successful!");
        navigate("/");
      }
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response!");
      } else if (err.response.status === 409) {
        setErrMsg("Username or Email already exists!");
      } else {
        setErrMsg("Registration Failed!");
      }
    }
  };
  return (
    <>
      <div className="content">
        {success ? (
          <section>
            <h1>Success</h1>
            <p>
              <a href="/">Login</a>
            </p>
          </section>
        ) : (
          <section id="register-pages">
            <Container fluid>
              <Row>
                <Col></Col>
                <Col>
                  <Card style={{ boxShadow: "10px 10px" }}>
                    <Card.Body>
                      <div className="logo">
                        <img src={logo} alt="logo" className="img-fluid" />
                        <br />
                        <img src={logo2} alt="logo" className="img-fluid" />
                      </div>
                      <br />
                      <p
                        ref={errRef}
                        className={errMsg ? "errmsg text-danger" : "offscreen"}
                        aria-live="assertive"
                      >
                        {errMsg}
                      </p>
                      <Card.Title>Register Account</Card.Title>
                      <Card.Subtitle>
                        Let's get you all set up so you can verify your personal
                        account and begin setting up your profile.
                      </Card.Subtitle>
                      <hr />
                      <br />
                      <Form onSubmit={handleSubmit}>
                        <Form.Group
                          className="mb-3"
                          controlId="formBasicUsername"
                        >
                          <Form.Label>Username</Form.Label>
                          <input
                            type="text"
                            className="form-control"
                            id="username"
                            name="username"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setUsername(e.target.value)}
                            value={username}
                            required
                            aria-invalid={validName ? "false" : "true"}
                          />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                          <Form.Label>Email address</Form.Label>
                          <input
                            type="text"
                            className="form-control"
                            id="email"
                            name="email"
                            autoComplete="off"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            required
                            aria-invalid={validEmail ? "false" : "true"}
                          />
                        </Form.Group>
                        <Form.Group
                          className="mb-3"
                          controlId="formBasicPassword"
                        >
                          <Form.Label>Password</Form.Label>
                          <input
                            type="password"
                            className="form-control"
                            id="password"
                            name="password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            required
                            aria-invalid={validPwd ? "false" : "true"}
                          />
                        </Form.Group>
                        <Button
                          variant="primary"
                          type="submit"
                          className="btn-login"
                        >
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
                <Col></Col>
              </Row>
            </Container>
          </section>
        )}
      </div>
    </>
  );
}
