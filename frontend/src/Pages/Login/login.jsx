import React, { useRef, useState, useEffect, useContext } from "react";
// import API from "../../api/Api";

import { useNavigate } from "react-router-dom";
import axios from "axios";
// import AuthContext from "../../store/Auth-Context";
import { Button, Form, Container, Row, Col, Card } from "react-bootstrap";

import "./login.css";
import logo from "../../Assets/logo-dd.png";
import logo2 from "../../Assets/logo-bl.png";
// import backgorund from "../../Assets/bg-dd.jpeg";

export default function Login() {
  // const { setAuth } = useContext(AuthContext);
  const errRef = useRef();

  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  useEffect(() => {
    emailInputRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [email, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    try {
      let res = await axios.post(
        "",
        {
          email: enteredEmail,
          password: enteredPassword,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      // setAuth({ email, pwd });
      setEmail("");
      setPwd("");
      setSuccess(true);
      if (res.status === 200) {
        console.log("Login Success");
        navigate("/home");
      }
    } catch (err) {
      if (!err?.response) {
        setErrMsg("Server is not responding");
      } else if (err.response?.status === 400) {
        setErrMsg(
          "Email / Password Salah, Silahkan Periksa Data Anda Kembali!"
        );
      } else if (err.response?.status === 500) {
        setErrMsg("Server is not responding");
      } else {
        setErrMsg("Login Failed");
      }
      console.log(err);
    }
  };

  return (
    <>
      <div className="content">
        {success ? (
          <section>
            <h1>You'are logged in</h1>
            <br />
            <p>
              <a href="/home">Go to Home</a>
            </p>
          </section>
        ) : (
          <section id="login-pages">
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
                      <Card.Title>Welcome back</Card.Title>
                      <Card.Subtitle>
                        Login to your account to use all feature
                      </Card.Subtitle>
                      <hr />
                      <br />
                      <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                          <Form.Label>Email address</Form.Label>
                          <input
                            type="text"
                            className="form-control"
                            id="email"
                            name="email"
                            ref={emailInputRef}
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            required
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
                            ref={passwordInputRef}
                            onChange={(e) => setPwd(e.target.value)}
                            value={pwd}
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
                <Col></Col>
              </Row>
            </Container>
          </section>
        )}
      </div>
    </>
  );
}
