import React, { useState, useEffect } from "react";
import "./style/jobView.css";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

import axios from "axios";

function Job() {
  const { id } = useParams();
  const [compayData, setCompayData] = useState(null);
  const [image, setJobImage] = useState("");

  useEffect(() => {
    const data = {
      memberId: "1001",
      jobId: id,
    };
    axios
      .get("http://localhost:3001/job/getJobView", { params: { id: id } })

      .then((response) => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          setCompayData(response.data);
          console.log(compayData);
          setJobImage(
            "http://localhost:3001/uploads/jobvacancy/" +
              response.data[0].advertisment
          );
        }
      })
      .catch((error) => {
        alert(error);
      });
  }, []);

  // setImage("http://localhost:3001/uploads/a.png");
  //console.log(image);

  const jobview =
    compayData &&
    compayData.map((compayData) => (
      <>
          <div className="mainL">
            <h1>{compayData.companyName}</h1>
            <h2 className="a">{compayData.designation}</h2>
            <h4 className="a" >{compayData.location}</h4>
            <h4 className="a">{compayData.contact}</h4>
            <h4 className="a">{compayData.email}</h4>

            <p>{compayData.description}</p>
          </div>
          <div className="mainR"></div>
          <div className="footer">
            <Link to={"/questionare/" + id} className="btn">
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
      </>
    ));
  return (
    <>
    
    <div className="headder">
      
    {jobview}
    <div className="mainR">
        {image && <img src={image} alt="Image" className="addvertizement" />}
      </div>
    </div>


     
      ;
    </>
  );
}

export default Job;
