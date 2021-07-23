import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import "./Login.css";
import { Link } from "react-router-dom";
import image from "./login.jpeg";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  //const [loginStatus, setLoginStatus] = useState("");
  
  let history = useHistory();

  const [loginStatus, setLoginStatus] = useState(false);
  const [role, setRole] = useState("");
  
  axios.defaults.withCredentials = true;
  //console.log("role");
  useEffect(() => {
    axios.get("http://localhost:3001/auth/login").then((response) => {
    if (response.data.loggedIn == true) { 
      setLoginStatus(true);
      setRole(response.data.user[0].username);
    }
    });
  }, []);

  const login = () => {
    const data = { username: username, password: password };
    axios.post("http://localhost:3001/auth/login", data).then((response) => {
      if (response.data.error) {
        alert(response.data.error);
        setLoginStatus(response.data.error);
      } else {
          history.push("/home");        
      }
    });
  };


  return (
    <div className="back">
      <div className="left">
        <img src={image}></img>
      </div>
      <div className="right">
        <h1 style={{fontSize: "30px", paddingRight: "20px"}}>Login</h1>
        <label>Username:</label>
        <input
          type="text"
          onChange={(event) => {
            setUsername(event.target.value);
          }}
          className="user"
        />
        <label>Password:</label>
        <input
          type="password"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
          className="pass"
        />
        <div className="btn-login">
          <button className="loginBtn" onClick={login}> Login </button>
        {/* <h1>{ loginStatus }</h1> */}
          <Link to="../registration" className="register"> Register here!</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;