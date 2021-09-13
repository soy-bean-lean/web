import React, { useState } from "react";
import axios from "axios";
import "./style/addCPD.css";
import { Link } from "react-router-dom";

function AddCPD() {
  const [recType, setRecType] = useState("type");

  const [courseId, setCourseId] = useState("");
  const [courseName, setCourseName] = useState("");
  const [courseType, setCourseType] = useState("");
  const [mode, setMode] = useState("");
  const [level, setLevel] = useState("");
  const [platform, setPlatform] = useState("");
  const [partner, setPartner] = useState("");
  const [credit, setCredit] = useState("");

  const [workshopId, setWorkshopId] = useState("");
  const [workshopName, setWorkshopName] = useState("");
  const [workshopType, setWorkshopType] = useState("");
  const [workshopDate, setWorkshopDate] = useState("");

  const [glDate, setGLDate] = useState("");
  const [guestLecture, setGuestLecture] = useState("");
  const [guestLectureId, setGuestLectureId] = useState("");

  const [inCourseList, setInCourseList] = useState(null);
  const [outCourseList, setOutCourseList] = useState(null);
  const [outCoursePlatform, setOutCoursePlatform] = useState(null);
  const [outCoursePartner, setOutCoursePartner] = useState(null);
  const [inWorkshopList, setInWorkshopList] = useState(null);
  const [outWorkshopList, setOutWorkshopList] = useState(null);
  const [guestLectureList, setGuestLectureList] = useState(null);

  //retireve course details from database (cssl courses and other courses - depending on the selection)
  const getCourses = (event) => {
    setCourseType(event.target.value);

    const submitCourseData = {
      mId: "cssl001",
      type: event.target.value,
    };

    if (submitCourseData.type != "") {
      axios
        .post("http://localhost:3001/cpd/getCourse", submitCourseData)

        .then((response) => {
          if (response.data.error) {
            alert(response.data.error);
          } else {
            if (submitCourseData.type == "CSSLcourse") {
              setInCourseList(response.data);
            } else if (submitCourseData.type == "others") {
              setOutCourseList(response.data);
            } else {
              alert("Error:", response.data);
            }
          }
        })
        .catch((error) => {
          alert(error);
        });
    }
  };

  //retireve distinct platforms and distinct partners from other course according to the course mode
  const getOtherCourseDetails = (event) => {
    setMode(event.target.value);

    const submitOtherCourseData = {
      mode: event.target.value,
    };
    if (submitOtherCourseData.mode == "Online Course") {
      axios
        .post("http://localhost:3001/cpd/getPlatform", submitOtherCourseData)

        .then((response) => {
          if (response.data.error) {
            alert(response.data.error);
            setOutCoursePlatform("Error on Data Loading");
          } else {
            setOutCoursePlatform(response.data);
            console.log("Platforms:", response.data);
          }
        })
        .catch((error) => {
          alert(error);
        });
    }

    axios
      .post("http://localhost:3001/cpd/getPartner", submitOtherCourseData)

      .then((response) => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          setOutCoursePartner(response.data);
          console.log("Parners:", response.data);
        }
      })
      .catch((error) => {
        alert(error);
      });
  };

  //retireve workshop details from database (cssl workshop and other workshop - depending on the selection)
  const getWorkshops = (event) => {
    setWorkshopType(event.target.value);

    const submitWorkshopData = {
      mId: "cssl001",
      type: event.target.value,
    };

    axios
      .post("http://localhost:3001/cpd/getWorkshop", submitWorkshopData)

      .then((response) => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          if (submitWorkshopData.type == "CSSLworkshop") {
            setInWorkshopList(response.data);
          } else if (submitWorkshopData.type == "others") {
            setOutWorkshopList(response.data);
          } else {
            alert("Error:", response.data);
          }
        }
      })
      .catch((error) => {
        alert(error);
      });
  };

  //retireve guest lecture details from database
  const getGuestLectures = (event) => {
    setGLDate(event.target.value);

    const submitGLData = {
      mId: "cssl001",
      gDate: event.target.value,
    };
    axios
      .post("http://localhost:3001/cpd/getGuestLecture", submitGLData)

      .then((response) => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          setGuestLectureList(response.data);
        }
      })
      .catch((error) => {
        alert(error);
      });
  };

  //load data to CSSL Course dropdown list
  const allInCourses =
    inCourseList &&
    inCourseList.map((li, i) => {
      return (
        <option key={i} value={li.name}>
          {li.name}
        </option>
      );
    }, this);

  //load data to Course dropdown list (Online Other Courses)
  const allOnlineOutCourses =
    outCourseList &&
    outCourseList.map((li, i) => {
      if (li.mode == mode && li.platform == platform && li.partner == partner) {
        return (
          <option key={i} value={i}>
            {li.name}
          </option>
        );
      }
    }, this);

  //load data to Course dropdown list (Offline Other Courses)
  const allOfflineOutCourses =
    outCourseList &&
    outCourseList.map((li, i) => {
      if (li.mode == mode && li.partner == partner) {
        return (
          <option key={i} value={i}>
            {li.name}
          </option>
        );
      }
    }, this);

  //load data to Platform dropdown list
  const allOutPlatforms =
    outCoursePlatform &&
    outCoursePlatform.map((li, i) => {
      return (
        <option key={i} value={li.platform}>
          {li.platform}
        </option>
      );
    }, this);

  //load data to Online Partner/ Offline University dropdown list
  const allOutPartners =
    outCoursePartner &&
    outCoursePartner.map((li, i) => {
      return (
        <option key={i} value={li.partner}>
          {li.partner}
        </option>
      );
    }, this);

  //load data to CSSL Workshop dropdown list
  const allInWorkshops =
    inWorkshopList &&
    inWorkshopList.map((li, i) => {
      const fromDate = li.fromDate.substring(0, 10);
      const toDate = li.toDate.substring(0, 10);

      if (workshopDate >= fromDate && workshopDate <= toDate) {
        return (
          <option key={i} value={li.title}>
            {li.title}
          </option>
        );
      }
    }, this);

  //load data to Other Workshop dropdown list
  const allOutWorkshops =
    outWorkshopList &&
    outWorkshopList.map((li, i) => {
      const fromDate = li.fromDate.substring(0, 10);
      const toDate = li.toDate.substring(0, 10);
      if (workshopDate >= fromDate && workshopDate <= toDate) {
        return (
          <option key={i} value={li.title}>
            {li.title}
          </option>
        );
      }
    }, this);

  //load data to Guest Lecture dropdown list
  const allguestLectures =
    guestLectureList &&
    guestLectureList.map((li, i) => {
      return (
        <option key={i} value={li.university}>
          {li.university}
        </option>
      );
    }, this);

    const getCreditValue = (event) =>{
      const i = event.target.value;
      if(i != "Other" && i != ""){
        setCredit(outCourseList[i].credit);
      }
      else{
        setCredit("");
      }
    }

  return (
    <div className="h2">
      <h1 className="title">NEW CPD RECORD</h1>
      <hr></hr>

      <div className="addCPDMain">
        <div className="addForm">
          {/* Subject for CPD Record */}
          <div className="courseD">
            <h4 className="textName">Record Title</h4>
            <input className="input" /*placeholder="--Subject--"*/></input>
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
              <option value="type"></option>
              <option value="course">Courses</option>
              <option value="workshops">Workshops</option>
              <option value="guestLec">Guest Lectures</option>
              <option value="others">Others</option>
            </select>
          </div>
          <hr className="line"></hr>

          {/*render other fields according to the record type*/}
          {renderDetails(recType)}

          <div className="courseD">
            <h4 className="textName">Assigned Credits</h4>
            <input
              className="input"
              readOnly
              placeholder="No Credit Value Assigned"
              value={credit}
            ></input>
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
            <Link to={"/csslmember/cpdrecords/"} className="review">
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
              <option value=""></option>
              <option value="CSSLcourse">CSSL Courses</option>
              <option value="others">Others</option>
            </select>
            <hr className="line"></hr>
          </div>
          {/*render other fields according to the course type*/}
          {renderCourseDetails(courseType)}
        </div>
      );
    } else if (r_type == "workshops") {
      return (
        <div>
          <div className="courseD">
            <h4 className="textName">Workshop Type </h4>
            <select name="select" id="types" onChange={getWorkshops}>
              <option value=""></option>
              <option value="CSSLworkshop">CSSL Workshop</option>
              <option value="others">Others</option>
            </select>

            <h4 className="textName">Workshop Date </h4>
            <input
              className="input"
              type="date"
              //placeholder="--Workshop Date--"
              onChange={(e) => setWorkshopDate(e.target.value)}
            />
            <hr className="line"></hr>
          </div>
          {/*render other fields according to the workshop type and date*/}
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
              //placeholder="--Workshop Date--"
              onChange={getGuestLectures}
            />
            <hr className="line"></hr>
          </div>
          {/*render other field according to the guest lecture date*/}
          {renderGuestLectureList(glDate)}
        </div>
      );
    } else if (r_type == "others") {
      return (
        <div>
          <div className="courseD">
            <h4 className="textName">Event</h4>
            <input className="input" /*placeholder="--Enter Event Title--"*/ />
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
    }
    //render CSSL Course related fields
    else if (c_type == "CSSLcourse") {
      return (
        <div>
          <div className="courseD">
            <h4 className="textName">CSSL Course</h4>
            <select name="select" id="types">
              <option value=""></option>
              {allInCourses}
            </select>
          </div>
          <hr className="line"></hr>
        </div>
      );
    }
    //render Other Course related fields
    else if (c_type == "others") {
      return (
        <div>
          <div className="courseD">
            <h4 className="textName">Mode of the Course</h4>
            <select name="select" id="types" onChange={getOtherCourseDetails}>
              <option value=""></option>
              <option value="Online Course">Online Course</option>
              <option value="Onsite Course">Onsite Course</option>
            </select>
            <hr className="line"></hr>
          </div>
          <div className="courseD">
            <h4 className="textName">Difficulty Level</h4>
            <select
              name="select"
              id="types"
              value={level}
              onChange={(e) => setLevel(e.target.value)}
            >
              <option value=""></option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>\
              <option value="Professional">Professional</option>
            </select>
            <hr className="line"></hr>
          </div>
          {rederOtherCourseFields(mode, level)}
        </div>
      );
    } else {
      return <div></div>;
    }
  }

  function rederOtherCourseFields(mode, level) {
    if (level == "") {
      return <div></div>;
    } else {
      if (mode == "Online Course") {
        return (
          <div>
            <div className="courseD">
              <h4 className="textName">Online Platform</h4>
              <select
                name="select"
                id="types"
                value={platform}
                onChange={(e) => setPlatform(e.target.value)}
              >
                <option value=""></option>
                {allOutPlatforms}
                <option value="Other">Other</option>
              </select>
            </div>
            <hr className="line"></hr>
            <div className="courseD">
              <h4 className="textName">University/ Institute/ Partner</h4>
              <select
                name="select"
                id="types"
                value={partner}
                onChange={(e) => setPartner(e.target.value)}
              >
                <option value=""></option>
                {allOutPartners}
                <option value="Other">Other</option>
              </select>
            </div>
            <hr className="line"></hr>
            {rederOnlineOtherCourseList(platform, partner)}
          </div>
        );
      } else if (mode == "Onsite Course") {
        return (
          <div>
            <div className="courseD">
              <h4 className="textName">University/ Institute</h4>
              <select
                name="select"
                id="types"
                onChange={(e) => setPartner(e.target.value)}
                value={partner}
              >
                <option value=""></option>
                {allOutPartners}
                <option value="Other">Other</option>
              </select>
            </div>
            <hr className="line"></hr>
            {rederOfflineOtherCourseList(partner)}
          </div>
        );
      } else {
        return <div></div>;
      }
    }
  }

  function rederOnlineOtherCourseList(platform, partner) {
    if (
      platform == "" ||
      platform == "Other" ||
      partner == "" ||
      partner == "Other"
    ) {
      return <div></div>;
    } else {
      return (
        <div>
          <div className="courseD">
            <h4 className="textName">Course</h4>
            <select name="select" id="types" onChange={getCreditValue}>
              <option value=""></option>
              {allOnlineOutCourses}
              <option value="Other">Other</option>
            </select>
            <hr className="line"></hr>
          </div>
        </div>
      );
    }
  }

  function rederOfflineOtherCourseList(partner) {
    if (partner == "" || partner == "Other") {
      return <div></div>;
    } else {
      return (
        <div>
          <div className="courseD">
            <h4 className="textName">Course</h4>
            <select name="select" id="types">
              <option value=""></option>
              {allOfflineOutCourses}
              <option value="Other">Other</option>
            </select>
            <hr className="line"></hr>
          </div>
        </div>
      );
    }
  }

  function renderWorkshopDetails(w_type, w_date) {
    if (w_type == "" || w_date == "") {
      return <div></div>;
    }
    //render CSSL Workshop related fields
    else if (w_type == "CSSLworkshop") {
      return (
        <div>
          <div className="courseD">
            <h4 className="textName">CSSL Workshops</h4>
            <select name="select" id="types">
              <option value=""></option>
              {allInWorkshops}
            </select>
          </div>
          <hr className="line"></hr>
        </div>
      );
    }
    //render Other Course related fields
    else if (w_type == "others") {
      return (
        <div>
          <div className="courseD">
            <h4 className="textName">Workshops</h4>
            <select name="select" id="types">
              <option value=""></option>
              {allOutWorkshops}
              <option value="other">Other</option>
            </select>
          </div>
          <hr className="line"></hr>
        </div>
      );
    } else {
      return <div></div>;
    }
  }

  //render Guest Lecture related fields
  function renderGuestLectureList(g_date) {
    if (g_date == "") {
      return <div></div>;
    } else {
      return (
        <div>
          <div className="courseD">
            <h4 className="textName">Guest Lecture</h4>
            <select name="select" id="types">
              <option value=""></option>
              {allguestLectures}
            </select>
          </div>
          <hr className="line"></hr>
        </div>
      );
    }
  }

  /*function renderWorkshopDate(w_type) {
    if (w_type == "") {
      return <div></div>;
    } else {
      return (
        <div>
          <div className="courseD">
           <h4 className="textName">Workshop Date </h4>
            <input
              className="input"
              type="date"
              placeholder="--Workshop Date--"
              onChange={getWorkshops}
            />
            <hr className="line"></hr>
          </div>
          {renderWorkshopDetails(workshopType, workshopDate)}
        </div>
      );
    }
  }*/


}
export default AddCPD;
