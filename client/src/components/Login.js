import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AppContext } from "../App";

const Login = (props) => {
  const { token, setToken, username, setUsername, password, setPassword } =
    useContext(AppContext);
  const navigate = useNavigate();

  const loginUrl = "/users/login";
  const registerUrl = "/users/register";

  const login = async () => {
    if (props.title === "Login") {
      try {
        const res = await axios.post(loginUrl, {
          username,
          password,
        });

        if (res.status === 200) {
          setToken(res.data.accessToken);
          localStorage.setItem("token", res.data.accessToken);
          localStorage.setItem("username", username);
          navigate("/lobby");
        }
      } catch (err) {
        console.log(err.message);
      }
    } else if (props.title === "Register") {
      try {
        const res = await axios.post(registerUrl, {
          username,
          password,
        });
        if (res.status === 200) {
          navigate("/");
        }
      } catch (err) {
        console.log(err.message);
      }
    }
  };

  const registerLink = () => {
    return (
      <Link className="link" to="/register">
        Register
      </Link>
    );
  };

  const loginLink = () => {
    return (
      <Link className="link" to="/">
        Login
      </Link>
    );
  };

  return (
    <>
      <h1>{props.title}</h1>
      <Form className="login">
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            placeholder="Username..."
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control
            type="password"
            placeholder="Password..."
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button
          variant="primary"
          type="button"
          className="button"
          onClick={login}
        >
          {props.title}
        </Button>
      </Form>
      {props.title === "Register" && loginLink()}
      {props.title === "Login" && registerLink()}
    </>
  );
};

export default Login;
