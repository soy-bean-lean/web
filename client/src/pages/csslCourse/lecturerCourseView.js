import React, { useState, useEffect } from "react";
import axios from "axios";
import "./lecturerCourseView.css";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

function LecturerCourseView() {
  const { id } = useParams();
  const { title } = useParams();

  const [content, setContent] = useState(null);

  useEffect(() => {
    const formData = {
      cId: id,
    };
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
            <div className="lec-course-view-content-des">{content.description}</div>
            <div className="lec-course-view-content-btn">
              <Link
                to={
                  "/courseView/cssl00" +
                  id +
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
          <input
            type="submit"
            className="lcv-course-edit-btn"
            value="Edit Course"
          />
          <input
            type="submit"
            className="lcv-course-del-btn"
            value="Delete Course"
          />
        </div>
        <div className="lecturer-course-view-content-list">
            {contentList}
        </div>
      </div>
    </>
  );
}

export default LecturerCourseView;
