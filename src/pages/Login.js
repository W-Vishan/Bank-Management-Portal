import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { auth } from "../firebase";

const Login = () => {
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const clear = () => {
    setEmail("");
    setPassword("");
  };

  const handleLogin = async () => {
    // try {
    //   const userCredential = await signInWithEmailAndPassword(
    //     auth,
    //     email,
    //     password
    //   );
    //   const user = userCredential.user;
    history.push("/admin");
    //   clear();
    // } catch (error) {
    //   console.log(error);
    // }
  };

  return (
    <div
      style={{ height: "calc(100vh - 111px)" }}
      className="d-flex justify-content-center align-items-center"
    >
      <Card style={{ width: "40%" }} border="success">
        <Card.Header
          className="text-center"
          as="h3"
          style={{ color: "darkolivegreen" }}
        >
          Login
        </Card.Header>
        <Card.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Button
              className="w-100 my-3"
              variant="success"
              onClick={handleLogin}
            >
              Login
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Login;
