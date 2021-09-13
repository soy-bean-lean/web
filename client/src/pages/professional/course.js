import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./style/course.css";
import star1 from "../../imgs/star1.jpg";
import star4 from "../../imgs/star4.jpg";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { CircularProgress } from "@material-ui/core";
import { AuthContext } from "../../helpers/AuthContext";

function CourseListView() {
  const { authState, setAuthState } = useContext(AuthContext);
  const [memberId, setMemberId] = useState("");
  const [course, setCourse] = useState(null);
  const [enCourse, setEnCourse] = useState(null);

  useEffect(() => {
    setMemberId(authState.id);
    const formData = {
      mId: "cssl001",
    };
    axios
      .post("http://localhost:3001/csslcourse/getCourseList", formData)

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

    axios
      .post("http://localhost:3001/csslcourse/getEnrollCourseList", formData)

      .then((response) => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          setEnCourse(response.data);
        }
      })
      .catch((error) => {
        alert(error);
      });
  }, []);

  /*const courseImages = course &&
  course.map((course, i) => (
    setCourseImg(courseImg => [...courseImg, "http://localhost:3001/uploads/" + course.image])
  ));*/
  const allCourseList =
    course &&
    course.map((course, i) => (
      <>
        <Link
          to={"/csslcourses/courseview/cssl00" + course.courseId + "/" + course.name}
          className="lec-course-list-link"
          key={i}
        >
          <div className="course">
            <div className="">
              <img
                src={"http://localhost:3001/uploads/" + course.image}
                alt="Course Image"
                className="courseImg"
              ></img>
            </div>
            <div className="courseDes">
              <h2>{course.name}</h2>
              <p>
                Rating: {course.avgRate} | {course.noOfInteraction} students
              </p>
              <img src={star4} className="rating"></img>
            </div>
          </div>
        </Link>
        <hr className="course-view-line"></hr>
      </>
    ));

  const enrollOngoingCourseList =
    enCourse &&
    enCourse.map((enCourse, i) => {
      if (enCourse.status == "Ongoing") {
        return (
          <>
            <Link
              to={
                "/courseView/cssl00" + enCourse.courseId + "/" + enCourse.name
              }
              className="lec-course-list-link"
              key={i}
            >
              <div className="course">
                <div className="">
                  <img
                    src={"http://localhost:3001/uploads/" + enCourse.image}
                    alt="Course Image"
                    className="courseImg"
                  ></img>
                </div>
                <div className="courseDes">
                  <h2>{enCourse.name}</h2>
                  <p>{enCourse.status}</p>
                  {/*<img src={star4} className="rating"></img>*/}
                </div>
              </div>
            </Link>
            <hr className="course-view-line"></hr>
          </>
        );
      }
    });

  const enrollCompletedCourseList =
    enCourse &&
    enCourse.map((enCourse, i) => {
      if (enCourse.status == "Completed") {
        return (
          <>
            <Link
              to={
                "/courseView/cssl00" + enCourse.courseId + "/" + enCourse.name
              }
              className="lec-course-list-link"
              key={i}
            >
              <div className="course">
                <div className="">
                  <img
                    src={"http://localhost:3001/uploads/" + enCourse.image}
                    alt="Course Image"
                    className="courseImg"
                  ></img>
                </div>
                <div className="courseDes">
                  <h2>{enCourse.name}</h2>
                  <p>{enCourse.status}</p>
                  {/*<img src={star4} className="rating"></img>*/}
                </div>
              </div>
            </Link>
            <hr className="course-view-line"></hr>
          </>
        );
      }
    });

  return (
    <>
      <Tabs style={{ paddingTop: "65px", paddingLeft: "3px" }}>
        <TabList>
          <Tab>Courses</Tab>
          <Tab>My Courses</Tab>
        </TabList>
        <TabPanel>
          <div className="search">
            <input placeholder="Categories"></input>
          </div>

          <div className="mainCourses">
            {allCourseList}
            {/*<Link to={"/coursViewP/" + id} className="Link">
              <div className="course">
                <div className="">
                  <img src={courseImg} className="courseImg"></img>
                </div>
                <div className="courseDes">
                  <h2>
                    The Complete Java and Android Studio Course for Beginners
                  </h2>
                  <p>Learn how to code in Java and master Android Studio</p>
                  <img src={star4} className="rating"></img>
                </div>
              </div>
            </Link>

            <div className="course">
              <div className="">
                <img src={courseImg2} className="courseImg"></img>
              </div>
              <div className="courseDes">
                <h2>
                  The Complete Java and Android Studio Course for Beginners
                </h2>
                <p>Learn how to code in Java and master Android Studio</p>
                <img src={star1} className="rating"></img>
              </div>
            </div>*/}
          </div>
        </TabPanel>
        <TabPanel>
          <div className="search">
            <input placeholder="Categories"></input>
          </div>

          <div className="mainCourses">
            {enrollOngoingCourseList}
            {enrollCompletedCourseList}
            {/*<Link to={"/coursMyViewP/" + id} className="Link">
              <div className="course">
                <div className="">
                  <img src={courseImg3} className="courseImg"></img>
                </div>
                <div className="courseDes">
                  <h2>Angular - The Complete Guide (2021 Edition)</h2>
                  <p>
                    Master Angular 12 (formerly "Angular 2") and build awesome,
                    reactive web apps with the successor of Angular.js{" "}
                  </p>
                  <div className="done">
                    <CircularProgress
                      className="circle"
                      color="primary"
                      variant="static"
                      value={75}
                      size={50}
                    />
                    <h4>75%</h4>
                  </div>
                </div>
              </div>
            </Link>

            <div className="course">
              <div className="">
                <img src={courseImg4} className="courseImg"></img>
              </div>
              <div className="courseDes">
                <h2>Spring Boot Fundamentals with Unit Testing</h2>
                <p>Learn how to code in Java and master Android Studio</p>
                <div className="done">
                  <h4 className="sucess">Completed</h4>
                </div>
              </div>
            </div>

            <div className="course">
              <div className="">
                <img src={courseImg5} className="courseImg"></img>
              </div>
              <div className="courseDes">
                <h2>Android Java Masterclass - Become an App Developer</h2>

                <p>
                  Improve your career options by learning Android app
                  Development. Master Android Studio and build your first app
                  today
                </p>

                <div className="done">
                  <CircularProgress
                    className="circle"
                    color="primary"
                    variant="static"
                    value={50}
                    size={50}
                  />
                  <h4>50%</h4>
                </div>
              </div>
            </div>*/}
          </div>
        </TabPanel>
      </Tabs>
    </>
  );
}

export default CourseListView;
