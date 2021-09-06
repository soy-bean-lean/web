import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "./lecCourseList.css";

function LecCourseList() {
  const [course, setCourse] = useState(null);

  useEffect(() => {
    const formData = {
      mId: "cssl001",
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
        <div className="lec-course-list" key={i}>
          <div className="lec-course-list-cid">{course.courseId}</div>
          <div className="lec-course-list-align">
            <div className="lec-course-list-title">{course.name}</div>
            <div data-status={course.status} className="lec-course-list-status">
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
          <div className="lec-course-list" key={i}>
            <div className="lec-course-list-cid">{course.courseId}</div>
            <div className="lec-course-list-align">
              <div className="lec-course-list-title">{course.name}</div>
              <div data-status={course.status} className="lec-course-list-status">
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
          <div className="lec-course-list" key={i}>
            <div className="lec-course-list-cid">{course.courseId}</div>
            <div className="lec-course-list-align">
              <div className="lec-course-list-title">{course.name}</div>
              <div data-status={course.status} className="lec-course-list-status">
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
          <div className="lec-course-list" key={i}>
            <div className="lec-course-list-cid">{course.courseId}</div>
            <div className="lec-course-list-align">
              <div className="lec-course-list-title">{course.name}</div>
              <div data-status={course.status} className="lec-course-list-status">
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
          <div className="lec-course-list" key={i}>
            <div className="lec-course-list-cid">{course.courseId}</div>
            <div className="lec-course-list-align">
              <div className="lec-course-list-title">{course.name}</div>
              <div data-status={course.status} className="lec-course-list-status">
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
    <div className="lec-course-list-main">
      <div className="lec-course-list-sub">
        <Tabs /*style={{ paddingTop: "5px", paddingLeft: "3px" }}*/>
          {" "}
          <TabList>
            <Tab>All</Tab>
            <Tab>OnGoing</Tab>
            <Tab>Approved</Tab>
            <Tab>Pending</Tab>
            <Tab>Rejected</Tab>
          </TabList>
          <h3 className="lec-course-list-form-title">CONDUCTING COURSES</h3>
          <TabPanel className="lec-course-list-all">
            <div className="lec-course-list-courses">{allCourseList}</div>
          </TabPanel>
          <TabPanel className="ongoing">
            <div className="lec-course-list-courses">{ongoingCourses}</div>
          </TabPanel>
          <TabPanel className="approved">
            <div className="lec-course-list-courses">{approvedCourses}</div>
          </TabPanel>
          <TabPanel className="pending">
            <div className="lec-course-list-courses">{pendingCourses}</div>
          </TabPanel>
          <TabPanel className="rejected">
            <div className="lec-course-list-courses">{rejectedCourses}</div>
          </TabPanel>
        </Tabs>
      </div>
      <div className="lec-course-list-new-course">
        <div className="lec-course-list-new-course-btn">
          <Link to={"/addCourse/"} className="lec-course-list-new-course-btn">
            <a href="#" className="lec-course-list-new-course-btn">
              ADD
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LecCourseList;
