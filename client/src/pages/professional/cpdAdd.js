import React, { useState } from "react";
import axios from "axios";
import "./style/addCPD.css";
import { Link } from "react-router-dom";

function AddCPD() {
  const [recType, setRecType] = useState("type");
  const [courseType, setCourseType] = useState("");
  const [workshopType, setWorkshopType] = useState("");
  const [workshopDate, setWorkshopDate] = useState("");
  const [guestLecture, setGuestLecture] = useState("");
  const [glDate, setGLDate] = useState("");

  const getCourses = () => {
    const submitCourseData = {
      mid: "",
      type: courseType,
    };
    axios
      .post("http://localhost:3001/cpd/getCourse", submitCourseData)

      .then((response) => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          //alert(response);
          console.log("Response:", response);
        }
      })
      .catch((error) => {
        alert(error);
      });
  };

  const getWorkshops = () => {
    const submitWorkshopData = {
      mid: "",
      type: workshopType,
      wdate: workshopDate,
    };

    if (workshopType != "" && workshopDate != "") {
      axios
        .post("http://localhost:3001/cpd/getWorkshop", submitWorkshopData)

        .then((response) => {
          if (response.data.error) {
            alert(response.data.error);
          } else {
            //alert(response);
            console.log("Response:", response);
          }
        })
        .catch((error) => {
          alert(error);
        });
    }
  };

  const getGuestLectures = () => {
    const submitGLData = {
      mid: "",
    };
    axios
      .post("http://localhost:3001/cpd/getGuestLecture", submitGLData)

      .then((response) => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          //alert(response);
          console.log("Response:", response);
        }
      })
      .catch((error) => {
        alert(error);
      });
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
            <select
              name="select"
              id="types"
              onChange={(e) => setCourseType(e.target.value)}
            >
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
            <select
              name="select"
              id="types"
              onChange={(e) => setWorkshopType(e.target.value)}
            >
              <option value="">--Select Workshop Type--</option>
              <option value="CSSLworkshop">CSSL Workshop</option>
              <option value="others">Others</option>
            </select>

            <h4 className="textName">Workshop Date </h4>
            <input
              className="input"
              type="date"
              placeholder="--Workshop Date--"
              onChange={(e) => setWorkshopDate(e.target.value)}
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
            <h4 className="textName">Guest Lecture Date </h4>
            <input
              className="input"
              type="date"
              placeholder="--Workshop Date--"
              onChange={(e) => setGLDate(e.target.value)}
            />
            <hr className="line"></hr>
          </div>
          {renderGuestLectureList(glDate)}
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
      getCourses();
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
      getCourses();
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
      getWorkshops();
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
      getWorkshops();
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

  function renderGuestLectureList(g_date){
    if(g_date == ""){
      return <div></div>;
    }
    else{
      getGuestLectures();
      return (
        <div>
          <div className="courseD">
            <h4 className="textName">Guest Lecture</h4>
            <select name="select" id="types">
              <option value="">--Select Guest Lecture--</option>
              <option value="gl001">UCSC - ML Lecture</option>
              <option value="gl002">UOM - Python Programming Lecture</option>
            </select>
          </div>
          <hr className="line"></hr>
        </div>
      );
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
