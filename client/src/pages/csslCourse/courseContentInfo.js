import React, { useState } from "react";
import "./courseContentInfo.css";
import { useParams } from "react-router";
import { useHistory } from "react-router-dom";

function AddCourseContent(props) {

  const [contentTitle, setContentTitle] = useState("");
  const [contentDes, setContentDes] = useState("");
  const [contentType, setContentType] = useState("");
  const [contentFile, setContentFile] = useState();
  const [videoLink, setVideoLink] = useState("");
  const [contentNo, setContentNo] = useState(2);

  const [uploadStatus, setUploadStatus] = useState("");
  
  const cId = 1;
  //const {id} = useParams();
  //setCourseTitle(props.location.state);

  let history = useHistory();

  const InsertCourseContent = () => {
    const mId = "cssl001";
    const formData = new FormData();

    //getContentNo
    const contentId = "cssl00" + cId + "-0" + contentNo; 

    formData.append("courseId", cId);
    formData.append("contentNo", contentNo);
    formData.append("contentId", contentId);
    formData.append("title", contentTitle);
    formData.append("description", contentDes);
    formData.append("type", contentType);
    if(contentType == "File"){
        formData.append("cfile", contentFile);
    }
    else{
        formData.append("vlink", videoLink);
    }

    fetch("http://localhost:3001/csslcourse/courseContent", {
      method: "POST",
      body: formData,
      headers: {
        Accept: "multipart/form-data",
      },
      credentials: "include",
    })
      .then((res) => res.json())
      .then((res) => {
        setUploadStatus(res.msg);
        alert("Successfully Saved Details");
        resetComponents();
      })
      .catch((error) => {
        console.log(error);
      });
    
  };

  const redirectCourseList = () => {
    let path = "/";
    history.push(path);
  }

  const resetComponents = () => {
    console.log(props.title);
    setContentTitle("");
    setContentDes("");
    setContentType("");
    setContentFile();
    setVideoLink("");
  };
  return (
    <div className="content-basic-info-main">
      <div className="content-basic-info">
        <h2 className="content-basic-info-title">COURSE CONTENT DETAILS</h2>
        <hr></hr>
        <div className="content-basic-info-form">
          <h3 className="content-basic-info-title">{props.title}</h3>
          <input
              type="submit"
              className="content-btn-redirect"
              value="Go to Course List"
              onClick={redirectCourseList}
            />
          <div className="content-basic-info-block">
            <div className="content-field-block">
              <h4 className="content-info-title">Title</h4>
              <input
                className="input"
                value={contentTitle}
                placeholder="--Content Title--"
                onChange={(e) => setContentTitle(e.target.value)}
              ></input>
            </div>
            <div className="content-field-block">
              <h4 className="content-info-title">Description</h4>
              <textarea
                value = {contentDes}
                onChange={(e) => setContentDes(e.target.value)}
              ></textarea>
            </div>
            <div className="content-field-block">
              <h4 className="content-info-title">Content Type</h4>
              <select
                name="select"
                value={contentType}
                id="content-type"
                onChange={(e) => setContentType(e.target.value)}
              >
                <option value="">--Select Content Type--</option>
                <option value="File">File</option>
                <option value="Video">Video</option>
              </select>
            </div>
            {renderContentAdd(contentType)}
            
          </div>
          <div className="content-btn-block">
            <input
              type="submit"
              className="content-btn-submit"
              value="Save & Finish"
              onClick={InsertCourseContent}
            />
            <input
              type="submit"
              className="content-btn-submit"
              value="Save & Next Content"
              onClick={InsertCourseContent}
            />
          </div>

        </div>
      </div>
    </div>
  );

  function renderContentAdd(type){
      if(type == "File"){
        return(
            <div className="content-field-block">
              <h4 className="content-info-title">Content File</h4>
              <input
                type="file"
                className="input"
                id="content-file"
                name="content-file"
                accept =".xlsx, .xls, .doc, .docx, .ppt, .pptx, .txt, .pdf, image/*"
                onChange={(e) => setContentFile(e.target.files[0])}
              ></input>
            </div>
        );
      }
      else if(type == "Video"){
        return(
            <div className="content-field-block">
              <h4 className="content-info-title">Video Link</h4><h7>(Upload Video to Youtube and Place Youtube Video Link here.)</h7>
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
