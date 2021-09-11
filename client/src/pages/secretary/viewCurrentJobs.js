import React, { useState, useEffect } from "react";
import "./style/job.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";

function ViewCurrentJobs() {
  const [data, setData] = useState(null);

  const [companyName, setCompanyName] = useState("");
  const [jobRole, setJobRole] = useState("");
  const [location, setLocation] = useState("");

  const getData = () => {
    const data = {
      companyName: companyName,
      jobRole: jobRole,
      location: location,
    };
    axios
      .post("http://localhost:3001/job/getJobsSec", data)
      .then((response) => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          setData(response.data);
        }
      })
      .catch((error) => {
        alert(error);
      });
  };
  useEffect(() => {
    const data = {
      companyName: "",
      jobRole: "",
      location: "",
    };
    axios
      .post("http://localhost:3001/job/getJobs", data)

      .then((response) => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          setData(response.data);
        }
      })
      .catch((error) => {
        alert(error);
      });
  }, []);

  console.log(data == null);
  const jobview =
    data &&
    data.map((data) => (
      <>
        <div className="JOB">
          <div className="jobAllign">
            <div className="job">
              {"                    " +
                data.jvId +
                " - " +
                data.companyName +
                "                         ,    " +
                data.location +
                " ," +
                data.designation}{" "}
            </div>

            <Link to={"/editDeleteJob/" + data.jvId} className="ViewJob">
              {" "}
              <a href="#" className="review">
                Edit / Delete
              </a>
            </Link>
          </div>
        </div>
      </>
    ));
  return (
    <div className="titleJob">
      <div className="header1">
        
       
      </div>

      <div className="jobviewedit">{jobview}</div>
      <div className="CV">
        <Link to={"/addNewJob"} className="cvCreate">
          <a href="#" className="review">
           Add New Job
          </a>
        </Link>
      </div>
    </div>
  );
}

export default ViewCurrentJobs;
