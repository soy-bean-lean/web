import React from "react";
import "./style/courseView.css";
import courseImg from "../../imgs/course3.jpg";
import courseImg2 from "../../imgs/course2.jpg";
import star1 from "../../imgs/star1.jpg";
import star4 from "../../imgs/star4.jpg";
import { useParams } from "react-router-dom";
import progileImg from "../../imgs/p2.jpg";
import * as AiIcons from "react-icons/ai";
import { Link } from "react-router-dom";
import { CircularProgress } from "@material-ui/core";
function CoursView() {
  const { id } = useParams();

  return (
    <>
      <div className="Courses">
        <div className="courseDescription">
          <h3>Angular - The Complete Guide (2021 Edition)</h3>
          <p>
            Develop modern, complex, responsive and scalable web applications
            with Angular 12 Fully understand the architecture behind an Angular
            application and how to use it. Use the gained, deep understanding of
            the Angular fundamentals to quickly establish yourself as a frontend
            developer
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
        
        <div className="courseDetails">
          <div className="Img">
            <img src={courseImg} className="Img"></img>
          </div>
          <div className="info">
            <div className="infomation">
              <li>
                <AiIcons.AiOutlineClockCircle />
                <span>3 Hours</span>
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
                <span>Intermediate</span>
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
          <Link to={"/coursEnrollsP/" + id} className="review">
            <a href="#" className="review">
              Continue
            </a>
          </Link>
        
          <Link to={"/courseP/"} className="review">
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
