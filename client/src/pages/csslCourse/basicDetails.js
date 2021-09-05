import React, { useState } from "react";
import "./basicDetails.css";
import { Link, useHistory } from "react-router-dom";
import CourseContent from "./courseContentInfo";

function BasicCourseInfo() {
  console.log("Rendering Course Content");
  const [courseTitle, setCourseTitle] = useState("");
  const [courseDes, setCourseDes] = useState("");
  const [courseDuration, setCourseDuration] = useState("");
  const [language, setLanguage] = useState("");
  const [level, setLevel] = useState("");
  const [mode, setMode] = useState("");
  const [imgFile, setImgFile] = useState();

  const [uploadStatus, setUploadStatus] = useState("");
  const [page, setPage] = useState("Course");

  let history = useHistory();

  const InsertCourseInfo = () => {
    //const file = event.target.files[0];
    /*const mId = "cssl001";
    const formData = new FormData();
    formData.append("image", imgFile);
    formData.append("title", courseTitle);
    formData.append("description", courseDes);
    formData.append("duration", courseDuration);
    formData.append("language", language);
    formData.append("level", level);
    formData.append("mode", mode);
    formData.append("lecturer", mId);

    fetch("http://localhost:3001/csslcourse/basicInfo", {
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
        alert("Successful");
        /*let path = '/addcourseContent';
        history.push(path);
        const next = "Content";
        setPage(next);
      })
      .catch((error) => {
        console.log(error);
      });*/

      let path = "/addcourseContent/" + courseTitle;
      history.push(path);
    
  };
  if (page == "Course") {
    return (
      <>
        <div className="course-basic-info">
          <h1 className="course-basic-info-title">BASIC COURSE DETAILS</h1>
          <hr></hr>
          <div className="course-basic-info-form">
            <div className="course-basic-info-block">
              <div className="course-field-block">
                <h4 className="course-info-title">Name</h4>
                <input
                  className="input"
                  placeholder="--Course Title--"
                  onChange={(e) => setCourseTitle(e.target.value)}
                ></input>
              </div>
              <div className="course-field-block">
                <h4 className="course-info-title">Description</h4>
                <input
                  className="input"
                  placeholder="--Course Description--"
                  onChange={(e) => setCourseDes(e.target.value)}
                ></input>
              </div>
              <div className="course-field-block">
                <h4 className="course-info-title">Duration</h4>
                <input
                  className="input"
                  placeholder="--Approximate Duration--"
                  onChange={(e) => setCourseDuration(e.target.value)}
                ></input>
              </div>
              <div className="course-field-block">
                <h4 className="course-info-title">Language</h4>
                <select
                  name="select"
                  id="course-language"
                  onChange={(e) => setLanguage(e.target.value)}
                >
                  <option value="type">--Select Language--</option>
                  <option value="English">English</option>
                  <option value="Sinhala">Sinhala</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="course-field-block">
                <h4 className="course-info-title">Level</h4>
                <select
                  name="select"
                  id="course-level"
                  onChange={(e) => setLevel(e.target.value)}
                >
                  <option value="type">--Select Level--</option>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>
              <div className="course-field-block">
                <h4 className="course-info-title">Mode</h4>
                <select
                  name="select"
                  id="course-mode"
                  onChange={(e) => setMode(e.target.value)}
                >
                  <option value="type">--Select Mode--</option>
                  <option value="Online">Online</option>
                  <option value="Offline">Offline</option>
                </select>
              </div>
              <div className="course-field-block">
                <h4 className="course-info-title">Course Image</h4>
                <input
                  type="file"
                  className="input"
                  id="course-img"
                  name="course-img"
                  accept="image/*"
                  onChange={(e) => setImgFile(e.target.files[0])}
                ></input>
              </div>
            </div>
            <div className="course-btn-block">
              <input
                type="submit"
                className="course-btn-submit"
                value="Submit"
                onClick={InsertCourseInfo}
              />
              {/*<Link
                to={"/addcourseContent/"}
                className="course-btn-submit"
                onClick={InsertCourseInfo}
              >
                <a href="#" className="course-btn-submit">
                  Submit
                </a>
              </Link>*/}
            </div>
          </div>
        </div>
      </>
    );
  }
  else if(page=="Content"){
    return(
      <h1 style={{padding:"100px"}}>Course Name:{courseTitle}</h1>
  );
  }
}
export default BasicCourseInfo;
