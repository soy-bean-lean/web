import React from "react";
import "./style/courseView.css";
import courseImg from "../../imgs/course1.jpg";
import courseImg2 from "../../imgs/course2.jpg";
import star1 from "../../imgs/star1.jpg";
import star4 from "../../imgs/star4.jpg";
import { useParams } from "react-router-dom";
import progileImg from "../../imgs/p2.jpg";
import * as AiIcons from "react-icons/ai";
import { Link  } from "react-router-dom";

function CoursView() {
  const { id } = useParams();
  
  return (
    <>
      <div className="Courses">
        <div className="courseDescription">
          <h3>The Complete Java and Android Studio Course for Beginners</h3>
          <p>
            So here we are, you are on landing page of the course that teaches
            Android development. You are trying to become an Android developer?
            Have you ever wondered how Android apps are built? Do you want to
            create Android app for yourself, for your business or maybe you want
            to make money by selling your applications or uploading them to
            google play store? If answer on any of those questions is yes, The
            complete Java Android App development Bootcamp course will help you
            achieve that from scratch! The complete Java Android App development
            Bootcamp course uses most recent technologies, and we will build app
            for most recent Android Q version. During development we will use
            most recent Android studio 4 versions. For any questions that you
            might have i am waiting at the Q&A section of the course, happy to
            answer. Enroll now and : - Get familiar with Android studio, IDE for
            creating native Android applications. - Learn how Android apps are
            built, and how to build your own android apps from scratch. - Learn
            how to make design Android App UI. - Learn how to generate apk file
            so that you can send your app to your friends and they can install
            your app without downloading it from google play. - Learn how to use
            RecyclerView in Android - Learn how to make functional android app
            in general
          </p>
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
        <Link to={"/coursEnrollsP/"+id } className="review">
        <a href="#" className="review">
            Enroll
          </a>
          </Link>
          <Link to={"/courseReviewP/"+id+ "view"}  className="review">
          <a href="#" className="review">
            Reviews
          </a>
          </Link>
          <Link to={"/courseP/"}   className="review">
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
