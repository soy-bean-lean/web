import React, { useState, useContext, useEffect } from "react";
import "./style/basicDetails.css";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../../helpers/AuthContext";

function AddJob() {
  const [companyName, setCompanyName] = useState("");
  const [jobRole, setJobRole] = useState("");
  const [location, setLocation] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [imgFile, setImgFile] = useState();
  const { authState, setAuthState } = useContext(AuthContext);

  //  const [image, setImage] = useState("");

  let history = useHistory();

  const addJob = () => {
    const formData = new FormData();
    formData.append("image", imgFile);
    formData.append("companyName", companyName);
    formData.append("jobRole", jobRole);
    formData.append("location", location);
    formData.append("contact", contact);
    formData.append("email", email);
    formData.append("description", description);
    formData.append("memberId", authState.id);


    fetch("http://localhost:3001/job", {
      method: "POST",
      body: formData,
      headers: {
        Accept: "multipart/form-data",
      },
      credentials: "include",
    })
      .then((res) => res.json())
      .then((res) => {
       
        toast.success("Job Vacancy Has Successfully Added!", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
        });
        history.push("/dashboardSec");

      })
      .catch((error) => {
        toast.error("Unable to Uploaded Job Vacancy,Try Again!", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
        });
        history.push("/addjob");

        console.log(error);
      });
    
  };

  return (
    <>
      <div className="job-basic-info">
        <h1 className="job-basic-info-title">Add Job Vacancies</h1>
        <hr></hr>
        <div className="job-basic-info-form">
          <div className="job-basic-info-block">
            <div className="job-field-block">
              <h4 className="job-info-title">Company Name</h4>
              <input
                className="input"
                placeholder="--Company Name--"
                onChange={(event) => {
                  setCompanyName(event.target.value);
                }}
              ></input>
            </div>
            <div className="job-field-block">
              <h4 className="job-info-title">Job Role</h4>
              <input
                className="input"
                placeholder="--Job Role--"
                onChange={(event) => {
                  setJobRole(event.target.value);
                }}
              ></input>
            </div>
            <div className="job-field-block">
              <h4 className="job-info-title">Location</h4>
              <input
                className="input"
                placeholder="--Location--"
                onChange={(event) => {
                  setLocation(event.target.value);
                }}
              ></input>
            </div>
            <div className="job-field-block">
              <h4 className="job-info-title">Contact Number</h4>
              <input
                className="input"
                placeholder="--Contact Number--"
                onChange={(event) => {
                  setContact(event.target.value);
                }}
              ></input>
            </div>
            <div className="job-field-block">
              <h4 className="job-info-title">Email</h4>
              <input
                className="input"
                placeholder="--Email--"
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
              ></input>
            </div>
            <div className="job-field-block">
              <h4 className="job-info-title">Description</h4>
              <textarea
                className="note"
                placeholder="--Description--"
                onChange={(event) => {
                  setDescription(event.target.value);
                }}
              ></textarea>
            </div>
            <div className="job-field-block">
              <h4 className="job-info-title">Advertisement Image</h4>
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
          <button className="job-btn-submit" onClick={addJob}>
            {" "}
            Add{" "}
          </button>
        </div>
      </div>
    </>
  );
}

export default AddJob;
