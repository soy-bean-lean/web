import React, { useState, useEffect } from "react";
import "./style/job.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";

function Job() {
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
    .post("http://localhost:3001/job/getJobs",data)
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
  }
  useEffect(() => {
    const data = {
      companyName: "",
      jobRole: "",
      location: "",

    };
    axios
    .post("http://localhost:3001/job/getJobs",data)
  
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

            <Link to={"/jobAddvertisment/" + data.jvId} className="ViewJob">
              {" "}
              <a href="#" className="review">
                View More...
              </a>
            </Link>
          </div>
        </div>
      </>
    ));
  return (
    <div className="titleJob">
      <div className="header1">
        <input
          className="filter1"
          placeholder="Company Name"
          onChange={(event) => {
            setCompanyName(event.target.value);
          }
          }
          onKeyUp={getData}
        ></input>
        <input
          className="filter2"
          placeholder="Jobe Role"
          onChange={(event) => {
            setJobRole(event.target.value);
          }}
          onKeyUp={getData}
        ></input>
        <input
          className="filter3"
          placeholder="Company Location"
          onChange={(event) => {
            setLocation(event.target.value);
          }}
          onKeyUp={getData}
          
        ></input>
      </div>

      <div className="jobview">{jobview}</div>
      <div className="CV">
        <Link to={"/createCV"} className="cvCreate">
          <a href="#" className="review">
            Create My CV
          </a>
        </Link>
      </div>
    </div>
  );
}

export default Job;
