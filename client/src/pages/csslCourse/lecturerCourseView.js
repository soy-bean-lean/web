import React, { useState, useEffect } from "react";
import axios from "axios";
import "./lecturerCourseView.css";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

function LecturerCourseView() {
  const { id } = useParams();
  const { title } = useParams();
  return (
    <>
      <div className="lecturer-course-view">
        <h2 className="lecturer-course-view-title">{title}</h2>
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
        <div className="lecturer-course-view-content-list">
          <div className="lecturer-course-view-block"></div>
        </div>
      </div>
    </>
  );
}

export default LecturerCourseView;
