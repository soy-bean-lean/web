import React, { useState, useEffect } from "react";
import axios from "axios";
import "./style/courseView.css";
import { useParams } from "react-router";
import * as AiIcons from "react-icons/ai";
import { Link } from "react-router-dom";

function CourseView() {
  const { id } = useParams();
  const { title } = useParams();

  const [courseImg, setCourseImg] = useState("");
  const [profileImg, setProfileImg] = useState("");
  const [courseData, setCourseData] = useState([]);
  const [content, setContent] = useState(null);

  useEffect(() => {
    const formData = {
      cId: id,
    };
    axios
      .post("http://localhost:3001/csslcourse/getCourse", formData)
      .then((res) => {
        setCourseData(res.data[0]);
        setCourseImg("http://localhost:3001/uploads/" + res.data[0].image);
        setProfileImg(
          "http://localhost:3001/uploads/profileImages/" +
            res.data[0].profileImage
        );
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .post("http://localhost:3001/csslcourse/getContentList", formData)

      .then((response) => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          setContent(response.data);
        }
      })
      .catch((error) => {
        alert(error);
      });
  }, []);

  const contentList =
    content &&
    content.map((content, i) => (
      <>
        <div className="course-view-content-list" key={i}>
          <div className="course-view-content-title">
            <h3><strong>{content.title}</strong></h3>
          </div>
          <div className="course-view-content-align">
          <p>{content.description}</p>
          </div>
        </div>
      </>
    ));

  return (
    <>
      <div className="course-view-block">
        <div className="course-view-main">
          <div className="course-view-course-des">
            <h1>{courseData.name}</h1>
            <br />
            <br />
            <h2>About this Course</h2>
            <p>{courseData.description}</p>
            <br/>
            <br/>
            <h2>Syllabus - What you will learn from this course</h2>
            <br/>
            {contentList}
          </div>
          <div className="course-view-course-info">
            <div className="course-img">
              {courseImg && <img src={courseImg} className="course-img"></img>}
            </div>
            <div className="course-view-info">
              <div className="course-view-course-summary">
                <li>
                  <span>
                    <AiIcons.AiOutlineClockCircle />
                  </span>
                  <span>
                    {"  "}
                    Approx. {courseData.duration} {courseData.durationType} to
                    Complete
                  </span>
                </li>
              </div>
              <div className="course-view-course-summary">
                <li>
                  <span>
                    <AiIcons.AiOutlineWechat />
                  </span>
                  <span> {courseData.language}</span>
                </li>
              </div>
              <div className="course-view-course-summary">
                <li>
                  <span>
                    <AiIcons.AiOutlineDesktop />
                  </span>
                  <span>
                    {"  "} {courseData.mode}
                  </span>
                </li>
              </div>
              <div className="course-view-course-summary">
                <li>
                  <span>
                    <AiIcons.AiOutlineBarChart />{" "}
                  </span>
                  <span>
                    {"  "}
                    {courseData.skillLevel}
                  </span>
                </li>
              </div>
            </div>
            <div className="course-view-course-instructor">
              <div className="instructor-img">
                <img src={profileImg} className="instructor-img"></img>
              </div>
              <div className="instructor-name">
                <h2>Instructor</h2>
                <h4>
                  {courseData.title}. {courseData.firstName}{" "}
                  {courseData.lastName}
                </h4>
              </div>
            </div>
          </div>
        </div>
        <div className="bottomBar">
          <div className="left">
            <Link to={"/coursEnrollsP/" + id} className="review">
              <a href="#" className="review">
                Enroll
              </a>
            </Link>
            <Link to={"/courseReviewP/" + id + "view"} className="review">
              <a href="#" className="review">
                Reviews
              </a>
            </Link>
            <Link to={"/csslcourses"} className="review">
              <a href="#" className="review">
                Back
              </a>
            </Link>
          </div>
          <div className="right"></div>
        </div>
      </div>
    </>
  );
}

export default CourseView;
