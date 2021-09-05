import React, { useState } from "react";
import "./basicDetails.css";
import { useParams } from "react-router";

function AddCourseContent(props) {
  const [contentTitle, setContentTitle] = useState("");
  const [contentDes, setContentDes] = useState("");
  const [contentType, setContentType] = useState("");
  const [contentFile, setContentFile] = useState();
  const [videoLink, setVideoLink] = useState("");
  //const {id} = useParams();
  //setCourseTitle(props.location.state);
  
  const display = () => {
    console.log(props.title);
    setContentTitle("");
    setContentDes("");
    setContentType("");
    setContentFile();
    setVideoLink("");
  };
  return (
    <div className="course-basic-info-main">
      <div className="course-basic-info">
        <h2 className="course-basic-info-title">COURSE CONTENT DETAILS</h2>
        <hr></hr>
        <div className="course-basic-info-form">
          <h3 className="course-basic-info-title">{props.title}</h3>
          <div className="course-basic-info-block">
            <div className="course-field-block">
              <h4 className="course-info-title">Title</h4>
              <input
                className="input"
                value={contentTitle}
                placeholder="--Content Title--"
                onChange={(e) => setContentTitle(e.target.value)}
              ></input>
            </div>
            <div className="course-field-block">
              <h4 className="course-info-title">Description</h4>
              <textarea
                value = {contentDes}
                onChange={(e) => setContentDes(e.target.value)}
              ></textarea>
            </div>
            <div className="course-field-block">
              <h4 className="course-info-title">Content Type</h4>
              <select
                name="select"
                value={contentType}
                id="course-language"
                onChange={(e) => setContentType(e.target.value)}
              >
                <option value="">--Select Content Type--</option>
                <option value="File">File</option>
                <option value="Video">Video</option>
              </select>
            </div>
            {renderContentAdd(contentType)}
            
          </div>
          <div className="course-btn-block">
            <input
              type="submit"
              className="course-btn-submit"
              value="Submit"
              onClick={display}
            />
          </div>
        </div>
      </div>
    </div>
  );

  function renderContentAdd(type){
      if(type == "File"){
        return(
            <div className="course-field-block">
              <h4 className="course-info-title">Content File</h4>
              <input
                type="file"
                className="input"
                id="course-img"
                name="course-img"
                accept =".xlsx,.xls,.doc, .docx,.ppt, .pptx,.txt,.pdf, image/*"
                onChange={(e) => setContentFile(e.target.files[0])}
              ></input>
            </div>
        );
      }
      else if(type == "Video"){
        return(
            <div className="course-field-block">
              <h4 className="course-info-title">Video Link</h4><h7>(Upload Video to Youtube and Place Youtube Video Link here.)</h7>
              <input
                className="input"
                value={videoLink}
                placeholder="--Youtube Video Link--"
                onChange={(e) => setVideoLink(e.target.value)}
              ></input>
            </div>
        );
      }
      else{
        return(
            <div></div>
        );
      }
  }
}

export default AddCourseContent;
