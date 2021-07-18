import React, { useState } from "react";
import "./button.css";


export const Button = ({
  children,
  type,
  onclick,
  buttonStyle,
  buttonSize
}
)=> {
    return(
        <button className="btnSignOut" onClick={onclick} type={type}>
            {children}
        </button>
);
}