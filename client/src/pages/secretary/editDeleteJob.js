import React, { useState, useContext, useEffect } from "react";
import "./style/editJobs.css";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../../helpers/AuthContext";
import { useParams } from "react-router-dom";

function EditDelete() {
  const { id } = useParams();
  const add = "";

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

  const updateJob = () => {
    const jobData = {
      image: imgFile,
      companyName: companyName,
      jobRole: jobRole,
      location: location,
      contact: contact,
      email: email,
      description: description,
      imgFile: imgFile,
      jvId: id,
    };

    axios
      .post("http://localhost:3001/job/updateJob", jobData)

      .then((res) => {
        toast.success("Job Vacancy Has Successfully Updated!", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
        });
        history.push("/dashboardSec");
      })
      .catch((error) => {
        toast.error("Unable to Update Job Vacancy,Try Again!", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
        });
        history.push("/addjob");

        console.log(error);
      });
  };
  useEffect(() => {
    const data = {
      jid: id,
    };

    axios
      .get("http://localhost:3001/job/getJobView", { params: { id: id } })

      .then((response) => {
        if (response.data.error) {
          //    alert(response.data.error);
        } else {
          console.log(response.data[0]);
          setCompanyName(response.data[0].companyName);
          setJobRole(response.data[0].designation);
          setLocation(response.data[0].location);
          setEmail(response.data[0].email);
          setContact(response.data[0].contact);
          setDescription(response.data[0].description);
          add = response.data[0].advertisment;
        }
      })
      .catch((error) => {
        //   alert(error);
      });
  }, []);

  return (
    <>
      <div className="job-basic-info">
        <h1 className="job-basic-info-title">Edit Or Delete Job Vacancies</h1>
        <hr></hr>
        <div className="job-basic-info-form">
          <div className="job-basic-info-block">
            <div className="job-field-block">
              <h4 className="job-info-title">Company Name</h4>
              <input
                className="input"
                value={companyName}
                onChange={(event) => {
                  setCompanyName(event.target.value);
                }}
              ></input>
            </div>
            <div className="job-field-block">
              <h4 className="job-info-title">Job Role</h4>
              <input
                className="input"
                value={jobRole}
                onChange={(event) => {
                  setJobRole(event.target.value);
                }}
              ></input>
            </div>
            <div className="job-field-block">
              <h4 className="job-info-title">Location</h4>
              <input
                className="input"
                value={location}
                onChange={(event) => {
                  setLocation(event.target.value);
                }}
              ></input>
            </div>
            <div className="job-field-block">
              <h4 className="job-info-title">Contact Number</h4>
              <input
                className="input"
                value={contact}
                onChange={(event) => {
                  setContact(event.target.value);
                }}
              ></input>
            </div>
            <div className="job-field-block">
              <h4 className="job-info-title">Email</h4>
              <input
                className="input"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
              ></input>
            </div>
            <div className="job-field-block">
              <h4 className="job-info-title">Description</h4>
              <textarea
                className="note"
                value={description}
                onChange={(event) => {
                  setDescription(event.target.value);
                }}
              ></textarea>
            </div>
          </div>
        <div className="JobButns">
        <button className="update" onClick={updateJob}>
            {" "}
            Update{" "}
          </button>
          <br>
          </br>
          <button className="delete" onClick={updateJob}>
            {" "}
            Delete{" "}
          </button>
        </div>


        </div>
      </div>
    </>
  );
}

export default EditDelete;
