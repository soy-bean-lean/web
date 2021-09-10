import React, { useState, useEffect } from "react";
import axios from "axios";
import "./lecturerCourseView.css";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

function LecturerCourseView() {
  const { id } = useParams();
  const { title } = useParams();

  const [courseImg, setCourseImg] = useState("");
  const [content, setContent] = useState(null);

  useEffect(() => {
    const formData = {
      cId: id,
    };
    axios
      .post("http://localhost:3001/csslcourse/getCourseImg", formData)
      .then((res) => {
        setCourseImg("http://localhost:3001/uploads/" + res.data[0].image)
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
        <div className="lec-course-view-content" key={i}>
          <div className="lec-course-view-content-title">
            {/*<Link
              to={
                "/courseView/cssl00" +
                id +
                "/" +
                content.contentId +
                "/" +
                content.title
              }
              className="lec-course-list-link"
            >
              <a href="#" className="lec-course-list-link">
                {content.title}
              </a>
            </Link>*/}
            {content.title}
          </div>
          <div className="lec-course-view-content-align">
            <div className="lec-course-view-content-des">
              {content.description}
            </div>
            <div className="lec-course-view-content-btn">
              <Link
                to={
                  "/editCourseContent/cssl00" +
                  id +
                  "/" +
                  title +
                  "/" +
                  content.contentId +
                  "/" +
                  content.title
                }
                className="lcv-content-edit-btn"
              >
                <a href="#" className="lcv-content-edit-btn">
                  Edit
                </a>
              </Link>
              {/*<Link
                to={
                  "/addExam/cssl00" +
                  id +
                  "/" +
                  content.contentId +
                  "/" +
                  content.title
                }
                className="lcv-content-exam-btn"
              >
                <a href="#" className="lcv-content-exam-btn">
                  Add Exam
                </a>
              </Link>*/}
            </div>
          </div>
        </div>
      </>
    ));

  return (
    <>
      <div className="lecturer-course-view">
        <div className="lecturer-course-view-top">
          <h2 className="lecturer-course-view-title">{title}</h2>
          <input
            type="submit"
            className="lcv-course-approve-btn"
            value="Get Approval"
          />
          <Link
            to={
              "/editCourse/cssl00" +
              id +
              "/" +
              title
            }
            className="lcv-course-edit-btn"
          >
            <a href="#" className="lcv-course-edit-btn">
              Edit Course
            </a>
          </Link>
          {/*<input
            type="submit"
            className="lcv-course-edit-btn"
            value="Edit Course"
          />*/}
          <input
            type="submit"
            className="lcv-course-del-btn"
            value="Delete Course"
          />
          <Link
            to={"/lecCourse"}
            className="lcv-redirect-btn"
          >
            <a href="#" className="lcv-redirect-btn">
              Course List
            </a>
          </Link>
          <Link
            to={"/addCourseContent/cssl00" + id + "/" + title}
            className="lcv-content-add-btn"
          >
            <a href="#" className="lcv-content-add-btn">
              Add Content
            </a>
          </Link>
          {/*courseImg && <img src={courseImg} alt="Image" className="lcv-course-image" />*/}

        </div>
        <div className="lecturer-course-view-content-list">{contentList}</div>
      </div>
    </>
  );
}

export default LecturerCourseView;
