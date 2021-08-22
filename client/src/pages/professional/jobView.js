import React from "react";
import "./style/jobView.css";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

function Job() {
  const { id } = useParams();

  return (
    <div className="headder">
      <div className="mainL">
        <h1>Company Name Here</h1>
        <h2>Job Role</h2>
        <h4>Company Address</h4>
        <h4>Contact Number</h4> <h4>Email</h4>
        <p>
          Description About the Job
        </p>        
      </div>
      <div className="mainR">
        Image Here
      </div>
      <div className="footer">
        <Link to={""} className="btn">
          <a href="#" className="review">
            Apply
          </a>
        </Link>
        <Link to={"/jobP"} className="btn">
          <a href="#" className="review">
            Back
          </a>
        </Link>
      </div>
    </div>
  );
}

export default Job;
