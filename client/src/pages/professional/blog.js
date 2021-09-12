import React from 'react';
import "./style/blog.css";
import courseImg from "../../imgs/course1.jpg";
import courseImg2 from "../../imgs/course2.jpg";
import courseImg3 from "../../imgs/course3.jpg";
import courseImg4 from "../../imgs/course4.jpg";
import courseImg5 from "../../imgs/course5.jpg";
import star1 from "../../imgs/star1.jpg";
import star4 from "../../imgs/star4.jpg";
import { Link } from "react-router-dom";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { CircularProgress } from "@material-ui/core";

function blog(){
    const id = "1";
  return (
    <>
      <Tabs style={{ paddingTop: "65px", paddingLeft: "3px" }}>
        <TabList>
          <Tab>Blogs</Tab>
          <Tab>my Blogs</Tab>
          <Link to={"/addBlogs/"} className="add-cpd-btn">
            
            <Tab>Publish Blog</Tab>
          </Link>
          
        </TabList>
        <TabPanel>
          <div className="search">
            <input placeholder="Categories"></input>
          </div>

          <div className="mainCourses">
            <Link to={"/coursViewP/" + id} className="Link">
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
            </div>
          </div>
        </TabPanel>
        <TabPanel>
          <div className="search">
            <input placeholder="Categories"></input>
          </div>

          <div className="mainCourses">
            <Link to={"/coursMyViewP/" + id} className="Link">
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
            </div>
          </div>
        </TabPanel>
      </Tabs>
    </>
  );
}

export default blog;

