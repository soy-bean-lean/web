import React from 'react';
import { useHistory } from "react-router-dom";

function Redirect() {
     let history = useHistory();

  function handleClick() {
    history.push("/home");
  }

  return (
    <button type="button" onClick={handleClick}>
      Go home
    </button>
  );
}

export default Redirect
