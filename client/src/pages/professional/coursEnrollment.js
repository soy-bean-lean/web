import React from "react";
import "./style/courseEnroll.css";
import courseImg from "../../imgs/course1.jpg";
import courseImg2 from "../../imgs/course2.jpg";
import star1 from "../../imgs/star1.jpg";
import star4 from "../../imgs/star4.jpg";
import { useParams } from "react-router-dom";
import progileImg from "../../imgs/p2.jpg";
import * as AiIcons from "react-icons/ai";
import { Link } from "react-router-dom";

function CoursView() {
  const { id } = useParams();
  return (
    <>
      <div className="Courses">
        <div className="courseDescription">
          <h3>The Complete Java and Android Studio Course for Beginners</h3>
          <div className="CourseDes">
            <div className="topic">
              <h3>Part 1</h3>
            </div>
            <div className="detailTopic">
              <div className="detailTopicCourse1">
                <h3>Introduction</h3>
              </div>
            </div>
          </div>
          <div className="CourseDes" >
            <div className="topic">
              <h3>Part 2</h3>
            </div>
            <div className="detailTopic">
              <div className="detailTopicCourse" style={{ backgroundColor: "grey", color: "white" }}>
              <h3>About Android</h3>
              </div>
            </div>
          </div>
          <div className="CourseDes">
            <div className="topic">
              <h3>Part 3</h3>
            </div>
            <div className="detailTopic">
              <div className="detailTopicCourse" style={{ backgroundColor: "grey", color: "white" }}>
                <h3>Introduction to the Basics</h3>
              </div>
            </div>
          </div>
        </div>
        <div className="courseDetails">
          <div className="Img">
            <img src={courseImg} className="Img"></img>
          </div>
          <div className="info">
            <div className="infomation">
              <li>
                <AiIcons.AiOutlineClockCircle />
                <span>2 Hours</span>
              </li>
            </div>
            <div className="infomation">
              <li>
                <AiIcons.AiOutlineWechat />
                <span>English</span>
              </li>
            </div>
            <div className="infomation">
              <li>
                <AiIcons.AiOutlineDesktop />
                <span>Online</span>
              </li>
            </div>
            <div className="infomation">
              <li>
                <AiIcons.AiOutlineBarChart />
                <span>Basic</span>
              </li>
            </div>
          </div>
          <div className="owner">
            <div className="ownerImg">
              <img src={progileImg} className="ownerImg"></img>
            </div>
            <div className="ownerDetails">
              <h3>Chamika</h3>
            </div>
          </div>
        </div>
      </div>
      <div className="bottomBar">
        <div className="left">
          <Link to={"/coursViewP/" + id} className="review">
            <a href="#" className="review">
              Back
            </a>
          </Link>
        </div>
        <div className="right"></div>
      </div>
    </>
  );
}

export default CoursView;
