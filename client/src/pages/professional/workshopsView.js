import React from "react";
import "./style/workshopsView.css";
import workshopImg from "../../imgs/w1.jpeg";
import star1 from "../../imgs/star1.jpg";
import star4 from "../../imgs/star4.jpg";
import { useParams } from "react-router-dom";
import progileImg from "../../imgs/p4.jpeg";
import * as AiIcons from "react-icons/ai";
import { Link } from "react-router-dom";

function CoursView() {
  const { id } = useParams();

  return (
    <>
      <div className="Workshop">
        <div className="workDescription">
          <h2> AI for Marketing and Sales teams - DIY after this workshop</h2>
          <p>
            Too many discussions on adopting AI in marketing and sales and no
            action? Too much reliance on IT and Data teams to get any insights
            from data or predict anything? Welcome to the world of no-code AI.
            We are changing the landscape for Marketing and Sales teams to make
            you play with data yourself. Get the insights, make predictions at
            just clicks using the latest technologies. In this workshop, we will
            walk you through how you can be more data-savvy, build machine
            learning pipelines yourself and increase sales 2x.
          </p>
        </div>
        <div className="workDetails">
          <div className="Img">
            <img src={workshopImg} className="Img"></img>
          </div>
          <div className="info">
            <div className="infomation">
              <li>
                <AiIcons.AiOutlineCalendar />
                <span>Wed, Jul 21, 2021, 8:30 PM - 9:00 PM</span>
              </li>
            </div>
            
          </div>
          <div className="owner">
            <div className="ownerImg">
              <img src={progileImg} className="ownerImg"></img>
            </div>
            <div className="ownerDetails">
              <h3>Jihani</h3>
            </div>
          </div>
        </div>
      </div>
      <div className="bottomBar">
        <div className="left">
          <Link to={""} className="review">
            <a href="#" className="review">
              Request
            </a>
          </Link>
          <Link to={"/workshopP/"} className="review">
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
