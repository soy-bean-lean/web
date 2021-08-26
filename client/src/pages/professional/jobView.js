import React, { useState, useEffect } from "react";
import "./style/jobView.css";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

import axios from "axios";

function Job() {
  const { id } = useParams();
  const [compayData, setCompayData] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3001/job/getJobView", { params: { id: id } })
      .then((response) => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          setCompayData(response.data);
          console.log(compayData);
          console.log(compayData);

          console.log(response.data);
        }
      })
      .catch((error) => {
        alert(error);
      });
  }, []);
  const jobview =
    compayData &&
    compayData.map((compayData) => (
      <>
        <div className="headder">
          <div className="mainL">
            <h1>{compayData.companyName}</h1>
            <h2>{compayData.designation}</h2>
            <h4>{compayData.location}</h4>
            <h4>{compayData.contact}</h4>
            <h4>{compayData.email}</h4>

            <p>{compayData.description}</p>
          </div>
          <div className="mainR">Image Here</div>
          <div className="footer">
            <Link to={""} className="btn">
              <a href="#" className="review">
                Apply
              </a>
            </Link>
            <Link to={"/job"} className="btn">
              <a href="#" className="review">
                Back
              </a>
            </Link>
          </div>
        </div>
      </>
    ));
  return <div className="jobviewS">{jobview}</div>;
}

export default Job;
