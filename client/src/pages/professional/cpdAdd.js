import React, { useState } from "react";
import axios from "axios";
import "./style/addCPD.css";
import { Link } from "react-router-dom";

function AddCPD() {
  const [recType, setRecType] = useState("type");
  const [courseType, setCourseType] = useState("");
  const [workshopType, setWorkshopType] = useState("");
  const [workshopDate, setWorkshopDate] = useState("");

  const getCourses = (event) => {
    setCourseType(event.target.value);
    console.log(courseType);
    const submitData = {
      type: event.target.value,
    };
    axios
      .post("http://localhost:3001/cpd/getCourse", submitData)

      .then((response) => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          //alert(response);
          console.log(response);
        }
      })
      .catch((error) => {
        alert(error);
      });
  };
  const setWType = (event) => {
    setWorkshopType({workshopType:event.target.value});
    getWorkshops();
  }

  const setWDate = (event) => {
    setWorkshopDate({workshopDate:event.target.value});
    getWorkshops();
  }
  const getWorkshops = () => {
    //setWorkshopType(event.target.value);
    //setWorkshopDate(event.target.value);
    console.log(workshopDate,workshopType);

    const submitData = {
      type: workshopType,
      //wdate: event.target.value 
      wdate: workshopDate
    };
    //console.log("Date:",workshopDate);
    if (workshopType != "" && workshopDate != "") {
      axios
        .post("http://localhost:3001/cpd/getWorkshop", submitData)

        .then((response) => {
          if (response.data.error) {
            alert(response.data.error);
          } else {
            //alert(response);
            console.log(response);
          }
        })
        .catch((error) => {
          alert(error);
        });
    }
  };

  return (
    <div className="h2">
      <h1 className="title">NEW CPD RECORD</h1>
      <hr></hr>

      <div className="addCPDMain">
        <div className="addForm">
          {/* Subject for CPD Record */}
          <div className="courseD">
            <h4 className="textName">Subject</h4>
            <input className="input" placeholder="--Subject--"></input>
          </div>
          <hr className="line"></hr>

          {/* Select Type of the CPD Record */}
          <div className="cpdType">
            <h4 className="textName">Record Type </h4>
            <select
              name="select"
              id="types"
              onChange={(e) => setRecType(e.target.value)}
            >
              <option value="type">--Select Type--</option>
              <option value="course">Courses</option>
              <option value="workshops">Workshops</option>
              <option value="guestLec">Guest Lectures</option>
              <option value="others">Others</option>
            </select>
          </div>
          <hr className="line"></hr>

          {renderDetails(recType)}

          <div className="courseD">
            <h4 className="textName">Assigned Credits</h4>
            <input className="input" readOnly></input>
          </div>
          <hr className="line"></hr>

          <div className="courseD">
            <h4 className="textName">Proof</h4>
            <p className="para">
              Import Your Proof File From the Chooser (Images and PDF Files
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

  function renderDetails(r_type) {
    if (r_type == "type") {
      return <div></div>;
    } else if (r_type == "course") {
      return (
        <div>
          <div className="courseD" id="cpdCourseType">
            <h4 className="textName">Course Type </h4>
            <select name="select" id="types" onChange={getCourses}>
              <option value="">--Select Course Type--</option>
              <option value="CSSLcourse">CSSL Courses</option>
              <option value="others">Others</option>
            </select>
            <hr className="line"></hr>
          </div>
          {renderCourseDetails(courseType)}
        </div>
      );
    } else if (r_type == "workshops") {
      return (
        <div>
          <div className="courseD">
            <h4 className="textName">Workshop Type </h4>
            <select name="select" id="types" onChange={setWType}>
              <option value="">--Select Workshop Type--</option>
              <option value="CSSLworkshop">CSSL Workshop</option>
              <option value="others">Others</option>
            </select>

            <h4 className="textName">Workshop Date </h4>
            <input
              className="input"
              type="date"
              placeholder="--Workshop Date--"
              onChange={setWDate}
            />
            <hr className="line"></hr>
          </div>
          {renderWorkshopDetails(workshopType, workshopDate)}
        </div>
      );
    } else if (r_type == "guestLec") {
      return (
        <div>
          <div className="courseD">
            <h4 className="textName">Activity</h4>
            <select name="select" id="types">
              <option value="">--Select Activity--</option>
              <option value="gl001">UCSC - ML Lecture</option>
              <option value="gl002">UOM - Python Programming Lecture</option>
            </select>
          </div>
          <hr className="line"></hr>
        </div>
      );
    } else if (r_type == "others") {
      return (
        <div>
          <div className="courseD">
            <h4 className="textName">Event</h4>
            <input className="input" placeholder="--Enter Event Title--" />
            <h4 className="textName">Event Description</h4>
            <p className="para">Add Description About The Event</p>
            <textarea className="note"></textarea>
          </div>
          <hr className="line"></hr>
        </div>
      );
    } else {
      return <div></div>;
    }
  }

  function renderCourseDetails(c_type) {
    if (c_type == "") {
      return <div></div>;
    } else if (c_type == "CSSLcourse") {
      return (
        <div>
          <div className="courseD">
            <h4 className="textName">CSSL Courses</h4>
            <select name="select" id="types">
              <option value="">--Select Course--</option>
              <option value="Java">Java</option>
              <option value="db">Database</option>
            </select>
          </div>
          <hr className="line"></hr>
        </div>
      );
    } else if (c_type == "others") {
      return (
        <div>
          <div className="courseD">
            <h4 className="textName">Courses</h4>
            <select name="select" id="types">
              <option value="">--Select Course--</option>
              <option value="cprog">C Programming</option>
              <option value="ml">Machine Learning</option>
            </select>
          </div>
          <hr className="line"></hr>
        </div>
      );
    } else {
      return <div></div>;
    }
  }

  function renderWorkshopDetails(w_type, w_date) {
    if (w_type == "" || w_date == "") {
      return <div></div>;
    } else if (w_type == "CSSLworkshop") {
      return (
        <div>
          <div className="courseD">
            <h4 className="textName">CSSL Workshops</h4>
            <select name="select" id="types">
              <option value="">--Select Workshop--</option>
              <option value="Java">Java Workshop</option>
              <option value="db">Database Workshop</option>
            </select>
          </div>
          <hr className="line"></hr>
        </div>
      );
    } else if (w_type == "others") {
      return (
        <div>
          <div className="courseD">
            <h4 className="textName">Workshops</h4>
            <select name="select" id="types">
              <option value="">--Select Workshop--</option>
              <option value="os">OS Workshop</option>
              <option value="ml">ML Workshop</option>
            </select>
          </div>
          <hr className="line"></hr>
        </div>
      );
    } else {
      return <div></div>;
    }
  }
}

export default AddCPD;
/*Type
Div dekk
Field
Credit readonly
Prof
Note*/
