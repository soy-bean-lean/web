import React from "react";
import "./style/basicDetails.css";
import { Link } from "react-router-dom";
//import DatePicker from "react-datepicker";
function addWorkshop() {

  return (
    <>
      <div className="job-basic-info">
        <h1 className="job-basic-info-title">Add Workshops</h1>
        <hr></hr>
        <div className="job-basic-info-form">
          <div className="job-basic-info-block">
            <div className="job-field-block">
              <h4 className="job-info-title">Workshop Title</h4>
              <input className="input" placeholder="--Company Name--"></input>
            </div>
           
            <div className="job-field-block">
              <h4 className="job-info-title">Subject</h4>
              <input className="input" placeholder="--Subject--"></input>
            </div>
            
            <div className="job-field-block">
              <h4 className="job-info-title">From Date</h4>             
              <input type="date" className="input"></input>
            </div>
            <div className="job-field-block">
              <h4 className="job-info-title">To Date</h4>             
              <input type="date" className="input"></input>
            </div>

            <div className="job-field-block">
              <h4 className="job-info-title">Location</h4>
              <input className="input" placeholder="--Location--"></input>
            </div>



            <div className="job-field-block">
              <h4 className="job-info-title">Description</h4>
              <textarea
                className="note"
                placeholder="--Description--"
              ></textarea>
            </div>



            <div className="job-field-block">
              <h4 className="job-info-title">Workshop Image</h4>
              <input
                type="file"
                className="input"
                id="job-img"
                name="job-img"
                accept="image/*"
              ></input>
            </div>
          </div>
          <div className="job-btn-block">
            {/*<input
                            type="submit"
                            className="job-btn-submit"
                            value="Submit"
                        />*/}
            <Link to={"/addjobContent/"} className="job-btn-submit">
              <a href="#" className="job-btn-submit">
                Add
              </a>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default addWorkshop;
