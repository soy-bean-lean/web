import React, { useState } from "react";
import { Field, Form, Formik, ErrorMessage } from "formik";
import TextField from "./TextField";
import * as Yup from "yup";
import "./Registration.css";
import axios from "axios";
import { useHistory } from "react-router-dom";

function Registration() {
  let history = useHistory();
  const initialValues = {
    category: "",
    title: "",
    firstName: "",
    lastName: "",
    designation: "",
    companyName: "",
    businessAddress: "",
    residentialAddress: "",
    contactNumber: "",
    birthDate: "",
    email: "",
    password: "",
    confirmPassword: "",
    file: "",
  };

  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const title = ["Prof", "Prof (Mrs)", "Dr", "Dr (Mrs)", "Rev", "Major", "Brigadier", "Capt", "Lt", "Mr", "Mrs", "Miss", "Ms", "Master"];
  const category = ["associate", "professional", "charter"];
  
  const FILE_SIZE = 160 * 1024;
  const SUPPORTED_FORMATS = [
      "image/jpg",
      "image/jpeg",
      "image/gif",
      "image/png"
  ];

  

  const validationSchema = Yup.object().shape({
    // title: Yup.string().required('Please Select a title').oneOf(title),
    // category: Yup.string().required('Please select member type').oneOf(category),    
    // firstName: Yup.string()
    //   .min(5, "Must be more than 5 characters")
    //   .required("Required"),
    // lastName: Yup.string()
    //   .min(5, "Must be more than 5 characters")
    //   .required("Required"),
    // designation: Yup.string().required("Required"),
    // companyName: Yup.string().required("Required"),
    // businessAddress: Yup.string().required("Required"),
    // residentialAddress: Yup.string().required("Required"),
    // contactNumber: Yup.string()
    //   .required("Required")
    //   .matches(phoneRegExp, 'Phone number is not valid')
    //   .min(10, "Too short")
    //   .max(10, "Too long"),
    // birthDate: Yup.date()
    //   .max(new Date(), "Birth Date should be earlier date than today")
    //   .required("Required"),
    // email: Yup.string().email("Email is invalid").required("Email is required"),
    // password: Yup.string()
    //   .min(6, "Password must be at least 6 charaters")
    //   .required("Password is required")
    //   .matches(
    //     /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
    //     "Password must contain at least 8 characters, one uppercase, one number and one special case character"
    //   ),
    // confirmPassword: Yup.string()
    //   .oneOf([Yup.ref("password"), null], "Password must match")
    //   .required("Confirm password is required"),
  });

  const [error, setError] = useState("");
  
  const onSubmit = (data) => {
    axios.post("http://localhost:3001/auth", data).then((response) => {
      if (response.data.error) {
        setError(response.data.error);     
      } else {
        history.push("./"); 
      }
    });
    console.log(data);
  };

  const handler = (event) =>{
    setError("");
  }

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      <div>
        <section id="headline">
          <div className="container">
            <h2>APPLICATION FOR MEMBERSHIP</h2>
          </div>
        </section>

        {/* Start Page Content */}

        <section className="container" id="main-content">
          <div className="row-wrapper">
            <div className="col-md-10 col-offset-1 register-form">
              {/* <!-- <h3 class="pippin_header">Application for Membership</h3> --> */}
              <Form
                id="pippin_registration_form col-md-6"
                className="pippin_registration_form"
                noValidate="novalidate"
              >
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <p className="note">
                        Category of Membership<span className="req">*</span>
                      </p>
                    </div>
                    <div className="space"></div>
                    <label
                      className="control-label col-xs-12"
                      for="pippin_user_category"
                    >
                      Pls select the membership category that you are in/wish to
                      Apply
                    </label>
                    <div class="col-xs-12">
                      <Field as="select" name="category">
                        <option value="">Membership category</option>
                        <option value="associate">Associate</option>
                        <option value="professional">Professional</option>
                        <option value="charter">Charter</option>
                      </Field>
                      <ErrorMessage component="div" name="category" className="error" />
                    </div>
                  </div>
                </div>
                

                <div className="row">
                  <div className="form-group col-md-3">
                    <label
                      className="control-label col-xs-12"
                      for="pippin_user_salutation"
                    >
                      Title <span className="req">*</span>
                    </label>
                    <div className="col-xs-12">
                      <Field
                        as="select"
                        id="pippin_user_salutation"
                        name="title"
                      >
                        <option value="" label="Select a Title">
                          Select
                        </option>
                        <option value="Prof">Prof</option>
                        <option value="Prof (Mrs)">Prof (Mrs)</option>
                        <option value="Dr">Dr</option>
                        <option value="Dr (Mrs)">Dr (Mrs)</option>
                        <option value="Rev">Rev</option>
                        <option value="Major">Major</option>
                        <option value="Brigadier">Brigadier</option>
                        <option value="Capt">Capt</option>
                        <option value="Lt">Lt</option>
                        <option value="Mr">Mr</option>
                        <option value="Mrs">Mrs</option>
                        <option value="Miss">Miss</option>
                        <option value="Ms">Ms</option>
                        <option value="Master">Master</option>
                      </Field>
                      <ErrorMessage component="div" name="title" className="error" />
                    </div>
                  </div>
                  
                </div>

                <div className="row" style={{marginLeft:"1px"}}>
                  {" "}
                  <div className="form-group col-md-3" style={{marginRight:"5%"}}>
                    <TextField label="First Name" name="firstName" type="text" />
                  </div>
                  
                  <div className="form-group col-md-3" style={{marginRight:"5%"}}>
                    <TextField label="Last Name" name="lastName" type="text" />
                  </div>
                </div>

                <div className="space"></div>
                <div className="row">
                  <div className="form-group">
                    <p className="note">Current / Last Employment </p>
                  </div>
                  <div className="space"></div>
                  <div className="form-group ">
                    <div className="col-xs-8">
                      <TextField
                        label="Designation"
                        name="designation"
                        type="text"
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="col-xs-8">
                      <TextField
                        label="Company/Org Name"
                        name="companyName"
                        type="text"
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="col-xs-8">
                      <TextField
                        label="Business Address"
                        name="businessAddress"
                        type="text"
                      />
                    </div>
                  </div>
                </div>
                <div className="space"></div>
                <div className="row">
                  <div className="form-group">
                    <p className="note">Personal Information </p>
                  </div>
                  <div className="space"></div>
                  <div className="form-group">
                    <div className="col-xs-8">
                      <TextField
                        label="Residential Address"
                        name="residentialAddress"
                        type="text"
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="col-xs-4">
                      <TextField
                        label="Contact number"
                        name="contactNumber"
                        type="text"
                      />
                    </div>
                    
                  </div>

                  <div className="form-group">
                    <div className="col-xs-6">
                      <TextField
                        label="Birth Date"
                        name="birthDate"
                        type="date"
                      />
                    </div>
                  </div>
                </div>

                <hr />

                <div className="space"></div>

                <div class="form-group ">
                  <p class="note">Account Information</p>
                </div>
                <div className="space"></div>

                <div class="form-group">
                  <div class="col-xs-8">
                    <TextField
                      label="User Name(Email address)"
                      name="email"
                      type="email"
                      onKeyPress={(e) => handler(e)}
                    />
                    {error}
                  </div>
                </div>

                <div class="form-group">
                  <div class="col-xs-8">
                    <TextField
                      label="Password"
                      name="password"
                      type="password"
                    />
                  </div>
                </div>

                <div class="form-group">
                  <div class="col-xs-8">
                    <TextField
                      label="Confirm Password"
                      name="confirmPassword"
                      type="password"
                    />
                  </div>
                </div>

                <label
                  className="control-label col-xs-12"
                  for="pippin_user_category"
                >
                  Zip the necessary documents and attach the zip file here
                </label>
                <button className="btn btn-success mt-3" type="submit" >
                  Register
                </button>
                <button className="btn btn-danger mt-3 " type="reset">
                  Reset
                </button>
              </Form>
            </div>
          </div>
        </section>
      </div>
    </Formik>
  );
}

export default Registration;
