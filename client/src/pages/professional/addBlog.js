import React, { useState, useEffect, useContext } from "react";
// import React from "react";
import "./style/addBlog.css";
import { AuthContext } from "../../helpers/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useHistory } from "react-router-dom";

function AddBlog() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [image, setBlogImage] = useState(null);
  const { authState, setAuthState } = useContext(AuthContext);

  var today = new Date(),
    Currentdate =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
  let history = useHistory();
  
  const addBlog = () => {
    const formData = new FormData();
    formData.append("image", image);
    formData.append("title", title);
    formData.append("desc", desc);
    formData.append("memberId", authState.id);
    formData.append("date", Currentdate);
alert(image)
    fetch("http://localhost:3001/blog/addBlog", {
      method: "POST",
      body: formData,
      headers: {
        Accept: "multipart/form-data",
      },
      credentials: "include",
    })
      .then((res) => res.json())
      .then((res) => {
        toast.success("Blog Has Successfully Added!", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
        });
        history.push("/dashboardP");
      })
      .catch((error) => {
        toast.error("Unable to Uploaded  Blog,Try Again!", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
        });
        history.push("/addBlogs");

        console.log(error);
      });
  }

  return (
    <div className="write">
       {image && (
          <img className="writeImg" src={URL.createObjectURL(image)} alt="" />
        )} 

    
      <form className="writeForm">
        <div className="writeFormGroup">
          <label htmlFor="fileInput">
            <i className="writeIcon fas fa-plus"></i>
          </label>
          <input
            type="file"
            id="fileInput"
            style={{ display: "none" }}
            onChange={(e) => setBlogImage(e.target.files[0])}
          />
          <input
            type="text"
            placeholder="Add Title"
            className="writeInput"
            autoFocus={true}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="writeFormGroup">
          <textarea
            placeholder="Tell your story..."
            type="text"
            className="writeInput writeText"
            onChange={(e) => setDesc(e.target.value)}
          ></textarea>
        </div>
        <button className="writeSubmit" type="submit" onClick={addBlog}>
          Publish
        </button>
      </form>
    </div>
  );
}

export default AddBlog;
