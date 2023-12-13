import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../App";

const Auth = (props) => {
  const [redirect, setRedirect] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    verify();
  }, []);

  const verifyUrl = "/users/verify";

  const verify = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(verifyUrl, {
        headers: {
          "x-access-token": token,
        },
      });
      if (response.status === 201) setRedirect(true);
    } catch (err) {
      console.log(err);
      setRedirect(false);
      navigate("/");
    }
  };

  return redirect ? props.children : <h2>unauhurized user</h2>;
};

export default Auth;
