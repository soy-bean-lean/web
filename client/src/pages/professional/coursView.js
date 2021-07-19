import React from "react";
import "./style/course.css";
import courseImg from "../../imgs/course1.jpg";
import courseImg2 from "../../imgs/course2.jpg";
import star1 from "../../imgs/star1.jpg";
import star4 from "../../imgs/star4.jpg";
import { useParams } from "react-router-dom";

function CoursView() {
  const {id} = useParams();
  return (
    <>
      <div className="search">
        <input placeholder="Categories"></input>
      </div>
      <div className="mainCourses">
        <div className="course">
          <div className="">
          </div>
          <div className="courseDes">
       <h1>
       {id}
       </h1>
            <h2>The Complete Java and Android Studiofor Beginners</h2>
            <p>Learn how to code in Java and master Android Studio</p>
            <img src={star1} className="rating"></img>

          </div>
        </div>
      </div>
    </>
  );
}

export default CoursView;
