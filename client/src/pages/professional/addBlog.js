
import React, { useState, useContext, useEffect } from "react";

import "./style/addBlog.css";

import axios from "axios";
function AddBlog() {
   const [title, setTitle] = useState("");
   const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const newPost = {
  //     username: user.username,
  //     title,
  //     desc,
  //   };
  //   if (file) {
  //     const data =new FormData();
  //     const filename = Date.now() + file.name;
  //     data.append("name", filename);
  //     data.append("image", image);
  //     newPost.photo = filename;
  //     try {
  //       await axios.post("/upload", data);
  //     } catch (err) {}
  //   }
  //   try {
  //     const res = await axios.post("/posts", newPost);
  //     window.location.replace("/post/" + res.data._id);
  //   } catch (err) {}
  // };

  return (
    <div className="write">
     {file && (
          <img className="writeImg" src={URL.createObjectURL(file)} alt="" />
        )} 
      <img className="writeImg" alt="" />
      {/* <form className="writeForm" onSubmit={handleSubmit}> */}
      <form className="writeForm" >
        <div className="writeFormGroup">
          <label htmlFor="fileInput">
            <i className="writeIcon fas fa-plus"></i>
          </label>
          <input
            type="file"
            id="fileInput"
           
               onChange={(e) => setFile(e.target.files[0])}
          />
          <input
            type="text"
            placeholder="Add Title"
            className="writeInput"
            autoFocus={true}
            //   onChange={e=>setTitle(e.target.value)}
          />
        </div>
        <div className="writeFormGroup">
          <textarea
            placeholder="Tell your story..."
            type="text"
            className="writeInput writeText"
            //   onChange={e=>setDesc(e.target.value)}
          ></textarea>
        </div>
        <button className="writeSubmit" type="submit">
          Publish
        </button>
      </form>
    </div>
  );
}

export default AddBlog;
