import React from "react";
import "./login.css";

import image from "./logo.jpeg";

function login() {
  return (
    <div className="back">
      <div className="left">
        <img src={image}></img>
      </div>

      <div className="right">
        <h1>Member Login</h1>
        <div className="input-un"><input className="user" placeholder="UserName" type="text" /></div>
        <div className="input-pw"><input className="pass" placeholder="Password" type="password" /></div>
        <div className="btn-login"><input className="loginBtn" type="submit" value="SignIn" /></div>
      </div>
    </div>
  );
}

export default login;
