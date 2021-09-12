import React, { useState, useContext, useEffect } from "react";
import "./style/basicDetails.css";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../helpers/AuthContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();
function AddCV() {
  const { id } = useParams();
  const { finalMarks } = useParams(0);
  const marks = (finalMarks * 20) / 15051;
  var today = new Date(),
    Currentdate =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
  const { authState, setAuthState } = useContext(AuthContext);

  const [description, setDescription] = useState("");
  const [jobId, setJobId] = useState("");
  const [memberId, setMemberId] = useState("");
  const [image, setCVFile] = useState();

  let history = useHistory();

  const addJobApp = () => {
    const addJobData = new FormData();
    addJobData.append("image", image);
    addJobData.append("description", description);
    addJobData.append("marks", marks);
    addJobData.append("jobId", id);
    addJobData.append("memberId", authState.id);
    addJobData.append("Currentdate", Currentdate);

    fetch("http://localhost:3001/job/addJobApplicaation", {
      method: "POST",
      body: addJobData,
      headers: {
        Accept: "multipart/form-data",
      },
      credentials: "include",
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res.data);
        //set course id

        toast.success("Your Job Application Has Successfully Uploaded!", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
        });
        history.push("/dashboardP");

        const next = "Content";
      })
      .catch((error) => {
        toast.error("Unable to Uploaded Job ,Try Again!", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
        });
        history.push("/jobAddvertisment/"+id);

      });
  };

  return (
    <>
      <div className="job-basic-info">
        <h1 className="job-basic-info-title">Add CV</h1>
        <hr></hr>
        <div className="job-basic-info-form">
          <div className="job-basic-info-block">
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
              <h4 className="job-info-title">Add CV Here</h4>
              <input
                type="file"
                className="input"
                id="course-img"
                name="course-img"
                accept="file/pdf"
                onChange={(e) => setCVFile(e.target.files[0])}
              ></input>
            </div>
          </div>
          <button className="job-btn-submit" onClick={addJobApp}>
            {" "}
            Add{" "}
          </button>
        </div>
      </div>
    </>
  );
}

export default AddCV;
