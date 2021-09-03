import React, { useState } from "react";
import "./basicDetails.css";
import { Link } from "react-router-dom";

function BasicCourseInfo() {
  const [courseTitle, setCourseTitle] = useState("");
  const [courseDes, setCourseDes] = useState("");
  const [courseDuration, setCourseDuration] = useState("");
  const [language, setLanguage] = useState("");
  const [level, setLevel] = useState("");
  const [mode, setMode] = useState("");

  const display = () =>{
      console.log(courseTitle);
      console.log(courseDes);
      console.log(courseDuration);
      console.log(language);
      console.log(level);
      console.log(mode);
  }
  return (
    <>
      <div className="course-basic-info">
        <h1 className="course-basic-info-title">BASIC COURSE DETAILS</h1>
        <hr></hr>
        <div className="course-basic-info-form">
          <div className="course-basic-info-block">
            <div className="course-field-block">
              <h4 className="course-info-title">Name</h4>
              <input className="input" placeholder="--Course Title--" onChange={(e)=>setCourseTitle(e.target.value)}></input>
            </div>
            <div className="course-field-block">
              <h4 className="course-info-title">Description</h4>
              <input
                className="input"
                placeholder="--Course Description--"
                onChange={(e)=>setCourseDes(e.target.value)}
              ></input>
            </div>
            <div className="course-field-block">
              <h4 className="course-info-title">Duration</h4>
              <input
                className="input"
                placeholder="--Approximate Duration--"
                onChange={(e)=>setCourseDuration(e.target.value)}
              ></input>
            </div>
            <div className="course-field-block">
              <h4 className="course-info-title">Language</h4>
              <select name="select" id="course-language" onChange={(e)=>setLanguage(e.target.value)}>
                <option value="type">--Select Language--</option>
                <option value="English">English</option>
                <option value="Sinhala">Sinhala</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="course-field-block">
              <h4 className="course-info-title">Level</h4>
              <select name="select" id="course-level" onChange={(e)=>setLevel(e.target.value)}>
                <option value="type">--Select Level--</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>
            <div className="course-field-block">
              <h4 className="course-info-title">Mode</h4>
              <select name="select" id="course-mode" onChange={(e)=>setMode(e.target.value)}>
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
              ></input>
            </div>
          </div>
          <div className="course-btn-block">
            <input
                            type="submit"
                            className="course-btn-submit"
                            value="Submit"
                            onClick={display}
                        />
            {/*<Link to={"/addcourseContent/"} className="course-btn-submit" onClick={display}>
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

export default BasicCourseInfo;
