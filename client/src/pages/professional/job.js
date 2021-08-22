import React from "react";
import "./style/job.css";
import { Link } from "react-router-dom";

function job() {
  const id = "1";
  const jobs = [
    {
      id: 1,
      description: "Java Programming Beginner Level",
      path:"/jobViewP/",
    },
    {
      id: 2,
      description: "Machine Learning Workshop",
      path:"",

    },
    {
      id: 1,
      description: "Java Programming Beginner Level",
      path:"",

      
    },
    {
      id: 2,
      description: "Machine Learning Workshop",
      path:"",

    },
  ];
  const jobview = jobs.map((jobs) => (
    <>
      <div className="JOB">
        <div className="jobAllign">
          <div className="recDes">{jobs.description}</div>

          <Link to={"/jobViewP/" + id} className="ViewJob">
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

export default job;
