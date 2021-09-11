import React, { useState, useEffect } from "react";
import axios from "axios";
import "./basicDetails.css";
import { useParams } from "react-router";
import { Link, useHistory } from "react-router-dom";

function EditCourseInfo() {
  const [courseTitle, setCourseTitle] = useState("");
  const [courseDes, setCourseDes] = useState("");
  const [courseDuration, setCourseDuration] = useState("");
  const [language, setLanguage] = useState("");
  const [level, setLevel] = useState("");
  const [mode, setMode] = useState("");
  const [imgFile, setImgFile] = useState();

  const [uploadStatus, setUploadStatus] = useState("");
  const [page, setPage] = useState("Content");

  const { id } = useParams();
  const { title } = useParams();

  let history = useHistory();

  useEffect(() => {
    const sendData = {
      //id: props.cid,
      cid: id,
    };
    axios
      .post("http://localhost:3001/csslcourse/getCourseInfo", sendData)
      .then((response) => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          setComponents(response.data[0]);
        }
      })
      .catch((error) => {
        alert(error);
      });
  }, []);

  const UpdateCourseInfo = () => {
    const mId = "cssl001";
    const formData = new FormData();
    formData.append("id", id);
    formData.append("title", courseTitle);
    formData.append("description", courseDes);
    formData.append("duration", courseDuration);
    formData.append("language", language);
    formData.append("level", level);
    formData.append("mode", mode);
    formData.append("lecturer", mId);
    formData.append("image", imgFile);

    fetch("http://localhost:3001/csslcourse/editCourseInfo", {
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
        console.log(res.data);
        alert("Successful");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const setComponents = (record) => {
    setCourseTitle(record.name);
    setCourseDes(record.description);
    setCourseDuration(record.duration);
    setLanguage(record.language);
    setLevel(record.skillLevel);
    setMode(record.mode);
    setImgFile(record.image);
  };

  const redirectCourse = () => {
    let path = "/courseView/cssl00" + id + "/" + title;
    history.push(path);
  };

  return (
    <>
      <div className="course-basic-info">
        <h2 className="course-basic-info-title">BASIC COURSE DETAILS</h2>
        <hr></hr>
        <div className="course-basic-info-form">
          <input
            type="submit"
            className="course-btn-redirect-course"
            value="Back to Course"
            onClick={redirectCourse}
          />
          <div className="course-basic-info-block">
            <div className="course-field-block">
              <h4 className="course-info-title">Name</h4>
              <input
                className="input"
                placeholder="--Course Title--"
                value={courseTitle}
                onChange={(e) => setCourseTitle(e.target.value)}
              ></input>
            </div>
            <div className="course-field-block">
              <h4 className="course-info-title">Description</h4>
              <textarea
                value={courseDes}
                onChange={(e) => setCourseDes(e.target.value)}
              ></textarea>
            </div>
            <div className="course-field-block">
              <h4 className="course-info-title">Duration</h4>
              <input
                className="input"
                placeholder="--Approximate Duration--"
                value={courseDuration}
                onChange={(e) => setCourseDuration(e.target.value)}
              ></input>
            </div>
            <div className="course-field-block">
              <h4 className="course-info-title">Language</h4>
              <select
                name="select"
                id="course-language"
                value={language}
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
                value={level}
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
                value={mode}
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
            {/*<input
              type="submit"
              className="course-btn-submit"
              value="Submit"
              onClick={InsertCourseInfo}
            />*/}
            {
              <Link
                to={"/courseView/cssl00" + id + "/" + courseTitle}
                className="course-btn-submit"
                onClick={UpdateCourseInfo}
              >
                <a href="#" className="course-btn-submit">
                  Update Course
                </a>
              </Link>
            }
          </div>
        </div>
      </div>
    </>
  );
}
export default EditCourseInfo;
