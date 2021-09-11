import React, { useEffect, useState, useContext } from "react";
import "./infor.css";
import * as FaIcons from "react-icons/fa";
import CountUp from "react-countup";

import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../../helpers/AuthContext";

function Info() {
  const { authState, setAuthState } = useContext(AuthContext);
  const memberId = authState.id;

  const [firstName, setFirstName] = useState("");
  const [secondName, setSecondName] = useState("");
  const [NIC, setNIC] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");
  const [dob, setDOB] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const data = {
      memberId: authState.id,
    };

    axios
      .post("http://localhost:3001/auth/getProfileData", data)

      .then((response) => {
        if (response.data.error) {
          //    alert(response.data.error);
        } else {
          setFirstName(response.data[0].firstName);
          setSecondName(response.data[0].lastName);
          setAddress(response.data[0].residentialAddress);
          setEmail(response.data[0].email);
          setContact(response.data[0].contactNumber);
          setNIC(response.data[0].nic);
          setDOB(response.data[0].birthDate);
        }
      })
      .catch((error) => {
        //   alert(error);
      });
  }, []);
  const image =
    "http://localhost:3001/uploads/profileImages/" + authState.profileImage;
  return (
    <>
      <div className="profileMain">
        <div className="profileLeft">
          <div className="myImage">
            {image && <img src={image} alt="Image" className="mypIC" />}
          </div>

          <div className="fullName">
            {" "}
            <h1>
              {firstName} {secondName}
            </h1>
          </div>
          <div className="myemail">
            {" "}
            <h2>{email}</h2>
          </div>
          <div className="myContact">
            {" "}
            <h2>{contact}</h2>
          </div>
          <div className="myAddress">
            {" "}
            <p>{address}</p>
          </div>
          <div className="myNic">
            {" "}
            <h2>{NIC}</h2>
          </div>
          <div className="myBirthDay">
            {" "}
            <h2>{dob}</h2>
          </div>

          <div className="updateButn">
            <Link to="/settings">
              <button className="update" onClick="/settings">
                {" "}
                Edit Profile{" "}
              </button>
            </Link>
          </div>
        </div>
        <div className="paymentsRightTop"></div>
        <div className="paymentsRightBottem">
          <h2 className="tpc">My Total Payments</h2>
          <br></br>
          <CountUp
            className="countPay"
            start={0}
            end={15000}
            duration={30}
          ></CountUp>
    
        </div>
      </div>
    </>
  );
}
export default Info;
