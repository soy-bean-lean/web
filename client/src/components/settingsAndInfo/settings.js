import React, { useEffect, useState, useContext } from "react";
import "./settings.css";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../../helpers/AuthContext";

function Settings() {
  const [ProfileData, setProfileData] = useState();

  const { authState, setAuthState } = useContext(AuthContext);
  const memberId = authState.id;

  const [firstName, setFirstName] = useState("");
  const [secondName, setSecondName] = useState("");
  const [NIC, setNIC] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");
  const [dob, setDOB] = useState("");
  const [email, setEmail] = useState("");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [imgFile, setImgFile] = useState();

  //  const [image, setImage] = useState("");

  let history = useHistory();
  const logout = () => {
    localStorage.removeItem("accessToken");
    setAuthState({
      fname: "",
      lname: "",
      progileImg: "",
      role: "",
      id: 0,
      status: false,
    });
    history.push("/");
  };
  const addProfilPic = () => {
    const formData = new FormData();
    formData.append("image", imgFile);
    formData.append("memberId", memberId);
    fetch("http://localhost:3001/auth/updateProfileImage", {
      method: "POST",
      body: formData,
      headers: {
        Accept: "multipart/form-data",
      },
      credentials: "include",
    })
      .then((res) => res.json())
      .then((res) => {
        toast.success("Your Profile Image Has Successfully Updated!", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
        });
        // history.push("/dashboardCou");
      })
      .catch((error) => {
        toast.error("Unable to Update Profile Image,Try Again!", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
        });
        //history.push("/jobCou");

        console.log(error);
      });
  };

  const updateData = () => {
    const formData2 = {
      memberId: memberId,
      firstName: firstName,
      secondName: secondName,
      email: email,
      nic: NIC,
      address: address,
      contact: contact,
      dob: dob,
    };

    axios
      .post("http://localhost:3001/auth/updateBasicDetails", formData2)
      .then((response) => {
        if (response.data.error) {
          toast.error("Unable to Update Profile ,Try Again!", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 3000,
          });
        } else {
          toast.success("Your Profile  Has Successfully Updated!", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 3000,
          });
        }
      })
      .catch((error) => {
        toast.error("Unable to Update Profile ,Try Again!", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
        });
      });
  };

  const updatePassword = () => {
    const formData2 = {
      memberId: memberId,
      currentPass: currentPassword,
      newPass: newPassword,
      confirmPass: confirmPassword,
    };
    if (newPassword !== confirmPassword) {
      toast.error("Passwords does not Match", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
      });
    } else {
      axios
        .post("http://localhost:3001/auth/updatePassword", formData2)
        .then((response) => {
          if (response.data.errorPass === "errorCurrent") {
            toast.error("Current Password invalid ,Try Again!", {
              position: toast.POSITION.TOP_CENTER,
              autoClose: 3000,
            });
          } else if (response.data.errorPass === "error") {
            toast.error("Can not update your password, Try Again!", {
              position: toast.POSITION.TOP_CENTER,
              autoClose: 3000,
            });
          }else{
            toast.success("Your Password  Has Successfully Updated!", {
              position: toast.POSITION.TOP_CENTER,
              autoClose: 3000,
            });
          }
        })
        .catch((error) => {
          toast.error("Can not update your password, Try Again!", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 3000,
          });
        });
    }
  };

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

  return (
    <>
      <div className="setting-basic-info">
        <h1 className="setting-basic-info-title">Edit Profile</h1>
        <hr></hr>
        <div className="setting-basic-info-form">
          <div className="setting-basic-info-block">
            <div className="setting-field-block">
              <h3 className="input">
                Profile Image - Upload a image from your PC
              </h3>
              <br></br>

              <input
                type="file"
                className="setting-info-title"
                id="profile-img"
                name="profile-img"
                accept="image/*"
                onChange={(e) => setImgFile(e.target.files[0])}
              ></input>
            </div>

            <button className="setting-btn-submit" onClick={addProfilPic}>
              {" "}
              Upload Profile Image{" "}
            </button>

            <hr></hr>
            <br></br>
            <div className="setting-field-block">
              <h3 className="input">Basic Details</h3>

              <h4 className="setting-info-title">First Name</h4>
              <input
                className="input"
                value={firstName}
                onChange={(event) => {
                  setFirstName(event.target.value);
                }}
              ></input>
            </div>
            <div className="setting-field-block">
              <h4 className="setting-info-title">Last Name</h4>
              <input
                className="input"
                value={secondName}
                onChange={(event) => {
                  setSecondName(event.target.value);
                }}
              ></input>
            </div>
            <div className="setting-field-block">
              <h4 className="setting-info-title">NIC Number</h4>
              <input
                className="input"
                value={NIC}
                onChange={(event) => {
                  setNIC(event.target.value);
                }}
              ></input>
            </div>
            <div className="setting-field-block">
              <h4 className="setting-info-title">Address</h4>
              <textarea
                className="note"
                value={address}
                onChange={(event) => {
                  setAddress(event.target.value);
                }}
              ></textarea>
            </div>
            <div className="setting-field-block">
              <h4 className="setting-info-title">Contact Number</h4>
              <input
                value={contact}
                className="input"
                onChange={(event) => {
                  setContact(event.target.value);
                }}
              ></input>
            </div>
            <div className="setting-field-block">
              <h4 className="setting-info-title">Date of Birth</h4>
              <input
                className="input"
                type="date"
                value={dob}
                onChange={(event) => {
                  setDOB(event.target.value);
                }}
              ></input>
            </div>

            <div className="setting-field-block">
              <h4 className="setting-info-title">Email</h4>
              <input
                value={email}
                className="input"
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
              ></input>
            </div>
            <button className="setting-btn-update" onClick={updateData}>
              {" "}
              Update Profile{" "}
            </button>
            <br></br>

            <hr></hr>
            <br></br>

            <div className="setting-field-block">
              <h3 className="input">Account Login Details</h3>

              <h4 className="setting-info-title">Current Password</h4>
              <input
                className="input"
                type="password"
                onChange={(event) => {
                  setCurrentPassword(event.target.value);
                }}
              ></input>
            </div>
            <div className="setting-field-block">
              <h4 className="setting-info-title">New Password</h4>
              <input
                className="input"
                type="password"
                onChange={(event) => {
                  setNewPassword(event.target.value);
                }}
              ></input>
            </div>

            <div className="setting-field-block">
              <h4 className="setting-info-title">Confirm Password</h4>
              <input
                className="input"
                type="password"
                onChange={(event) => {
                  setConfirmPassword(event.target.value);
                }}
              ></input>
            </div>
            <button className="setting-btn-update" onClick={updatePassword}>
              {" "}
              Update Login Details{" "}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Settings;
