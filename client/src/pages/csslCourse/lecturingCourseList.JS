import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

function LecCourseList() {
  const [course, setCourse] = useState(null);

  useEffect(() => {
    const formData = {
      id: "",
    };
    axios
      .post("http://localhost:3001/csslcourse/", formData)

      .then((response) => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          setCourse(response.data);
        }
      })
      .catch((error) => {
        alert(error);
      });
  }, []);

  const allCourseList =
    course &&
    course.map((course, i) => (
      <>
        <div className="recentRec" key={i}>
          <div className="recType">{course.type}</div>
          <div className="recAllign">
            <div className="recDes">{course.description}</div>
            <div data-status={course.status} className="recPending">
              {course.status}
            </div>
          </div>
        </div>
      </>
    ));

  const ongoingCourses =
    course &&
    course.map((course, i) =>
      course.status === "OnGoing" ? (
        <>
          <div className="recentRec" key={i}>
            <div className="recType">{course.type}</div>
            <div className="recAllign">
              <div className="recDes">{course.description}</div>
              <div data-status={course.status} className="recPending">
                {course.status}
              </div>
            </div>
          </div>
        </>
      ) : (
        <></>
      )
    );

  const approvedCourses =
    course &&
    course.map((course, i) =>
      course.status === "Approved" ? (
        <>
          <div className="recentRec" key={i}>
            <div className="recType">{course.type}</div>
            <div className="recAllign">
              <div className="recDes">{course.description}</div>
              <div data-status={course.status} className="recPending">
                {course.status}
              </div>
            </div>
          </div>
        </>
      ) : (
        <></>
      )
    );

  const pendingCourses =
    course &&
    course.map((course, i) =>
      course.status === "Pending" ? (
        <>
          <div className="recentRec" key={i}>
            <div className="recType">{course.type}</div>
            <div className="recAllign">
              <div className="recDes">{course.description}</div>
              <div data-status={course.status} className="recPending">
                {course.status}
              </div>
            </div>
          </div>
        </>
      ) : (
        <></>
      )
    );

  const rejectedCourses =
    course &&
    course.map((course, i) =>
      course.status === "Rejected" ? (
        <>
          <div className="recentRec" key={i}>
            <div className="recType">{course.type}</div>
            <div className="recAllign">
              <div className="recDes">{course.description}</div>
              <div data-status={course.status} className="recPending">
                {course.status}
              </div>
            </div>
          </div>
        </>
      ) : (
        <></>
      )
    );

  return (
    <div className="mainCPD">
      <div className="recentCPDRec">
        <Tabs /*style={{ paddingTop: "5px", paddingLeft: "3px" }}*/>
          {" "}
          <TabList>
            <Tab>All</Tab>
            <Tab>OnGoing</Tab>
            <Tab>Approved</Tab>
            <Tab>Pending</Tab>
            <Tab>Rejected</Tab>
          </TabList>
          <h3 className="titleRecent">Recent CPD Submissions</h3>
          <TabPanel className="all">
            <div className="btn-cpdAdd"></div>
            <div className="recList">{allCourseList}</div>
          </TabPanel>
          <TabPanel className="ongoing">
            <div className="recList">{ongoingCourses}</div>
          </TabPanel>
          <TabPanel className="approved">
            <div className="recList">{approvedCourses}</div>
          </TabPanel>
          <TabPanel className="pending">
            <div className="recList">{pendingCourses}</div>
          </TabPanel>
          <TabPanel className="rejected">
            <div className="recList">{rejectedCourses}</div>
          </TabPanel>
        </Tabs>
      </div>
      <div className="cpdAdd">
        <div className="add-cpd-btn">
          <Link to={"/addCPD/"} className="add-cpd-btn">
            <a href="#" className="add-cpd-btn">
              ADD
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LecCourseList;
