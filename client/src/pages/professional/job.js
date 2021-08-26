import React, { useState, useEffect } from "react";
import "./style/job.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useHistory } from "react-router-dom";

function Job() {
  const [data, setData] = useState(null);
  useEffect(() => {
    axios
      .get("http://localhost:3001/job/getJobs")
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
      <div className="header">
        <h1>s</h1>
      </div>
      <div className="jobview">{jobview}</div>
      <div className="CV">
        <Link to={"/createCV"} className="cvCreate">
          <a href="#" className="review">
            Genarate My CV
          </a>
        </Link>
      </div>
    </div>
  );
}

export default Job;
