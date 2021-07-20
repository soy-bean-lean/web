import React from "react";
import "./style/workshop.css";
import workshopImg from "../../imgs/w1.jpeg";
import workshopImg2 from "../../imgs/w2.jpeg";
import star1 from "../../imgs/star1.jpg";
import star4 from "../../imgs/star4.jpg";
import { Link } from "react-router-dom";

function workshop() {
  const id = "1";
  return (
    <>
      <div className="search">
        <input placeholder="Categories"></input>
      </div>

      <div className="mainWorkshop">
        <Link to={"/workshopViewP/" + id} className="Link">
          <div className="workshop">
            <div className="">
              <img src={workshopImg} className="workshopImg"></img>
            </div>
            <div className="workshopDes">
              <h2>
                AI for Marketing and Sales teams - DIY after this workshop
              </h2>
              <p>Conducting by-IEEE</p>
              <img src={star4} className="rating"></img>
            </div>
          </div>
        </Link>

        <div className="workshop">
          <div className="">
            <img src={workshopImg2} className="workshopImg"></img>
          </div>
          <div className="workshopDes">
            <h2>Online Coding BOOTCAMP</h2>
            <p>Conducting by- MicroSoft</p>
            <img src={star1} className="rating"></img>
          </div>
        </div>
      </div>
    </>
  );
}

export default workshop;
