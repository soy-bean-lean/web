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
        <h1>Member Login...</h1>
        <input className="user" placeholder="UserName" type="text"></input>
        <input className="pass" placeholder="Password" type="password"></input>
        <button className="loginBtn">SignIn</button>
      </div>
    </div>
  );
}

export default login;
