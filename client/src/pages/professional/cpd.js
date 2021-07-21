import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

function Cpd() {
    const [loginStatus, setLoginStatus] = useState("");
    let history = useHistory();

    axios.defaults.withCredentials = true;

    useEffect(() => {
        axios.get("http://localhost:3001/auth/login").then((response) => {
          if (response.data.loggedIn == true) {
            setLoginStatus(true);
          }else{
            alert(response.data.error);
            history.push(`/post/`);
          }      
        });
      }, []);
    console.log(loginStatus);
    if(loginStatus==true){
        return (
            <div>            
                {/* <h1>{ loginStatus }</h1> */}
                CPD
            </div>
        )
    }else{
        return (
            <div>            
                {/* <h1>{ loginStatus }</h1> */}
                {  }
            </div>
        )
    }
}

export default Cpd
