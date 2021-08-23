import React from "react";
import { Field, Form, Formik, useFormik, FormikProps } from "formik";
import TextField from "./TextField";
import * as Yup from "yup";
import "./Registration.css";
import axios from "axios";
import { useHistory } from "react-router-dom";

function Registration() {
  let history = useHistory();
  const initialValues = {
    category: "",
    presentGrade: "",
    membershipNo: "",
    title: "",
    surname: "",
    firstName: "",
    secondName: "",
    lastName: "",
    designation: "",
    companyName: "",
    businessAddress: "",
    residentialAddress: "",
    contactNumber: "",
    fax: "",
    birthDate: "",
    email: "",
    password: "",
    confirmPassword: "",
    // mapPropsToValues: () => ({ color: '' }),
    // acceptTerms: false,
  };

  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const validationSchema = Yup.object().shape({
    // category: Yup.string().required('Required'),
    //title: Yup.string().required('Required'),
    surname: Yup.string()
      .max(15, "Must be 15 characters or less")
      .required("Required"),
    fullName: Yup.string()
      .min(5, "Must be more than 5 characters")
      .required("Required"),
    residentialAddress: Yup.string().required("Required"),
    contactNumber: Yup.string()
      .required("Required")
      .matches(phoneRegExp, "Phone number is not valid"),
    birthDate: Yup.date()
      .max(new Date(), "Birth Date should be earlier than today")
      .required("Required"),
    email: Yup.string().email("Email is invalid").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 charaters")
      .required("Password is required")
      .matches(
        /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
        "Password must contain at least 8 characters, one uppercase, one number and one special case character"
      ),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Password must match")
      .required("Confirm password is required"),
  });
  const onSubmit = (data) => {
    history.push("./login");
    axios.post("http://localhost:3001/auth", data).then((response) => {
      if (response.data.error) {
        alert(response.data.error);
       
      } else {
        history.push("./");
        console.log(data);
      }
    });
    history.push("./");
  };

  // const MyInput = ({ field, form, ...props }) => {
  //     return <input {...field} {...props} />;
  // };

  // const MySpecialFieldHook = () => {
  //     const [field] = useField({ name: "acceptTerms", type: "checkbox" });
  //     return (
  //       <label className="text-gray-500 font-bold">
  //         <input {...field} className="mr-2 leading-tight" type="checkbox" />
  //         <span className="text-sm">Accept Terms</span>
  //       </label>
  //     );
  // //   };
  // onSubmit(){
  //   console.log("anushka");
  // }

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      // MySpecialFieldHook={MySpecialFieldHook}
      // onchange={handleChange}
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
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="space"></div>
                  <div className="form-group col-md-12">
                    <p className="control-label col-xs-12">
                      If you are already a member of the Society, please
                      indicate{" "}
                    </p>
                  </div>
                  <div className="col-md-6">
                    <div className="col-xs-12">
                      <TextField
                        label="Present Grade"
                        name="presentGrade"
                        type="text"
                      />
                    </div>
                  </div>

                  <div className="form-group col-md-6">
                    <div className="col-xs-12">
                      <TextField
                        label="Membership No"
                        name="membershipNo"
                        type="text"
                      />
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
                    </div>
                  </div>
                  <div className="form-group col-md-9">
                    <div className="col-xs-12">
                      <TextField
                        label="Surname with Initials"
                        name="surname"
                        type="text"
                      />
                    </div>
                  </div>
                </div>

                <div className="row" style={{marginLeft:"1px"}}>
                  {" "}
                  <div className="form-group col-md-3" style={{marginRight:"5%"}}>
                    <TextField label="First Name" name="firstName" type="text" />
                  </div>
                  <div className="form-group col-md-3"  style={{marginRight:"5%"}}>
                    <TextField label="Second Name" name="secondName" type="text" />
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
                    <div className="col-xs-4">
                      <TextField label="Fax" name="fax" type="text" />
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
                    />
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
