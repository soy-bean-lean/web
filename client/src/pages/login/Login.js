import React, { useState, useContext } from "react";
import {AuthContext} from '../../helpers/AuthContext';
import axios from "axios";
import { useHistory } from "react-router-dom";
import "./Login.css";
import { Link } from "react-router-dom";
import image from "./login.jpeg";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorUser, setErrorUser] = useState("");
  const [errorPass, setErrorPass] = useState("");
  const {setAuthState} = useContext(AuthContext);

  const handlerUser = (event) =>{
    setErrorUser("");
  }
  const handlerPass = (event) =>{
    setErrorPass("");
  }

  let history = useHistory();  
  axios.defaults.withCredentials = true;
 
  const login = () => {
    if(username=="" && password==""){
      setErrorUser("* Username is required");
      setErrorPass("* Password is required");
    }
    else if(username==""){
      setErrorUser("* Username is required");
    }
    else if(password==""){
      setErrorPass("* Password is required");
    }
    else{
      const data = { username: username, password: password };
      
      axios.post("http://localhost:3001/auth/login", data).then((response) => {
        if (response.data.errorUser) {
          setErrorUser(response.data.error);  
        } 
        else if(response.data.errorPass){
          setErrorPass(response.data.errorPass);
        } 
        else if(response.data.error){//Access token error
          console.log(response.data.error);
        }
        else {
          localStorage.setItem("accessToken", response.data.token);
          console.log(response.data);
          setAuthState({
            fname: response.data.firstName,
            lname: response.data.lastName,
            role: response.data.role,
            id: response.data.id,
            status: true,
          });
          if(response.data.role == "student"){
            history.push("/dashboardStu");
          }
          else if(response.data.role == "associate"){
            history.push("/dashboardA");
          }
          else if(response.data.role == "professional"){
            history.push("/dashboardP");
          }
          else if(response.data.role == "chartered"){
            history.push("/dashboardC");
          }
          else if(response.data.role == "secretariat"){
            history.push("/dashboardSec");
          }
          else if(response.data.role == "council"){
            history.push("/dashboardCou");
          }
        }
        
      });
    }
  };

  return (
    <div className="back">
      <div className="left">
        <img src={image}></img>
      </div>
      <div className="right">
        <h1 style={{ fontSize: "30px", paddingRight: "20px" }}>Login</h1>
        <label>Username:</label>
        <input
          type="text"
          onChange={(event) => {
            setUsername(event.target.value);            
          }}
          onKeyPress={(e) => handlerUser(e)}
          className="user"
          required
        />

        <label className="error">{errorUser}</label>
        <br/>
        <label>Password:</label>
        <input
          type="password"
          onChange={(event) => {
            setPassword(event.target.value);
            
          }}
          onKeyPress={(e) => handlerPass(e)}
          className="pass"
          required
        />
        <label className="error">{errorPass}</label>
        <br/>
        <div className="btn-login">
          <button className="loginBtn" onClick={login}>
            {" "}
            Login{" "}
          </button>
          {/* <h1>{ loginStatus }</h1> */}
          <Link to="../registration" className="register">
            {" "}
            Register here!
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
