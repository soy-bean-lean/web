import React from "react";
import "./login.css";
import { Link } from "react-router-dom";

import image from "./logo.jpeg";

function login() {
  return (
    <div className="back">
      <div className="left">
        <img src={image}></img>
      </div>

      <div className="right">
        <h1> Login</h1>
        <input className="user" placeholder="User Name"></input>
        <input className="pass" placeholder="Password"></input>
        <div className="btn-login">
          <button className="loginBtn" type="submit" value="SignIn">
            Sign In
          </button>
          <a href="url" className="register">Register here!</a>
        </div>
      </div>
    </div>
  );
}

export default login;
