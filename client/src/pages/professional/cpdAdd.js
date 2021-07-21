import React from "react";
import "./style/addCPD.css";
import { Link } from "react-router-dom";

function addCPD() {
  return (
    <div className="h2">
      <h1 className="title">NEW CPD RECORD</h1>
      <hr></hr>
      <div className="addCPDMain">
        <div className="addForm">
          <div className="cpdType">
            <h4 className="textName">Record Type </h4>
            <select name="select" id="types">
              <option value="type">--Select Type--</option>
              <option value="course">Courses</option>
              <option value="workshops">Workshops</option>
              <option value="guestLec">Guest Lectures</option>
              <option value="others">Others</option>
            </select>
          </div>
          <hr className="line"></hr>
          <div className="courseD">
            <h4 className="textName">Course Type </h4>
            <select name="select" id="types">
              <option value="">--Select Course Type--</option>
              <option value="CSSLcourse">CSSL Courses</option>
              <option value="others">Others</option>
            </select>
          </div>
          <hr className="line"></hr>
          <div className="courseD">
            <h4 className="textName">Workshop Type </h4>
            <select name="select" id="types">
              <option value="">--Select Workshop Type--</option>
              <option value="CSSLcourse">CSSL Workshop</option>
              <option value="others">Others</option>
            </select>
            <h4 className="textName">Workshop Date </h4>

            <input
              className="input"
              type="date"
              placeholder="--Workshop Date--"
            ></input>
          </div>
          <hr className="line"></hr>
          <div className="courseD">
            <h4 className="textName">Activity</h4>
            <select name="select" id="types">
              <option value="">--Select Activity--</option>
              <option value="CSSLcourse">CSSL Workshop</option>
              <option value="others">Others</option>
            </select>
          </div>
          <hr className="line"></hr>
          <div className="courseD">
            <h4 className="textName">Event</h4>
            <input
              className="input"
              placeholder="--Enter Event Title--"
            ></input>
            <h4 className="textName">Event Description</h4>
            <p className="para">Add Description About This Event</p>
            <textarea className="note"></textarea>
          </div>
          <hr className="line"></hr>

          <div className="courseD">
            <h4 className="textName">Assigned Credits</h4>

            <input className="input" readOnly></input>
          </div>
          <hr className="line"></hr>

          <div className="courseD">
            <h4 className="textName">Proof</h4>
            <p className="para">
              Import Your Proof File From the Chooser (images and pdf files
              only)
            </p>
            <input
              type="file"
              className="input"
              id="avatar"
              name="avatar"
              accept="image/*, application/pdf"
            ></input>
          </div>
          <hr className="line"></hr>

          <div className="courseD">
            <h4 className="textName">Note</h4>
            <p className="para">Add Description About This CPD Record</p>
            <textarea className="note"></textarea>
          </div>
        </div>
        <div className="submitBtn">
        <div className="bottom">
        <Link to={"/cpdP/"} className="review">
        <a href="#" className="review">
            Submit
          </a>
          </Link>
          <Link to={"/cpdP/"} className="review">
          <a href="#" className="review">
            Back
          </a>
          </Link>
          
        </div>
    </div>
      </div>

   
    </div>
  );
}

export default addCPD;
/*Type
Div dekk
Field
Credit readonly
Prof
Note*/
