import Page from 'components/Page';
import React, { useContext, useState, useEffect } from 'react';
import { Field, Form, Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';

// import { useHistory } from 'react-router-dom';
import axios from 'axios';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  CardSubtitle,
  FormFeedback,
  FormGroup,
  FormText,
  Input,
  Label,
  Row,
} from 'reactstrap';
import Alert from 'reactstrap/lib/Alert';
// let history = useHistory();

const Registration = props => {
  let history = useHistory();
  const initialValues = {
    category: '',
    title: '',
    firstName: '',
    lastName: '',
    designation: '',
    companyName: '',
    businessAddress: '',
    residentialAddress: '',
    contactNumber: '',
    birthDate: '',
    email: '',
    password: '',
    confirmPassword: '',
    file: '',
  };

  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const title = [
    'Prof',
    'Prof (Mrs)',
    'Dr',
    'Dr (Mrs)',
    'Rev',
    'Major',
    'Brigadier',
    'Capt',
    'Lt',
    'Mr',
    'Mrs',
    'Miss',
    'Ms',
    'Master',
  ];
  const category = ['associate', 'professional', 'charter'];

  
  const SUPPORTED_FORMATS = [    
    'application/pdf',
    'application/zip',
    'application/rar',
  ];

  const validationSchema = Yup.object().shape({
    // title: Yup.string().required('Please Select a title').oneOf(title),
    // category: Yup.string()
    //   .required('Please select member type')
    //   .oneOf(category),
    // firstName: Yup.string()
    //   .min(5, "Must be more than 5 characters")
    //   .required("Required").label("First Name"),
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
    // file: Yup.mixed()
    // .required("A file is required")
    // .test(
    //   "fileFormat",
    //   "Unsupported Format",
    //   value => value && SUPPORTED_FORMATS.includes(value.type)
    // )

  });

  const [error, setError] = useState('');

  const onSubmit = data => {
    axios.post('http://localhost:3001/auth', data).then(response => {
      if (response.data.error) {
        setError(response.data.error);
      } else {
        history.push('./');
      }
    });
    console.log(data);
  };

  const handler = event => {
    setError('');
  };

  return (
    <>
    <div className="bg-light">
      <Col sm="10" md={{ size: 10, offset: 1 }}>
        <center>
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
          >
            {({ setFieldValue, errors }) => (
              <Card>
                <CardHeader tag="h1">
                  <b>Membership Registration</b>
                </CardHeader>
                <CardBody>
                  <CardSubtitle
                    tag="h5"
                    className="mb-2 mt-2 text-muted text-md-left"
                  >
                    <b> Personal Information </b>
                  </CardSubtitle>
                  <hr />
                  <Form>
                    <FormGroup row className="mb-0 ml-2">
                      <Label
                        for="exampleEmail"
                        sm={3}
                        className="text-md-left mb-0"
                      >
                        <b>
                          Membership category{' '}
                          <span className="text-danger">*</span>
                        </b>
                      </Label>
                    </FormGroup>
                    <FormGroup row className="mb-1 ml-2">
                      <Col sm={3} >
                        <Input
                          type="select"
                          name="category"
                          onChange={e =>
                            setFieldValue('category', e.target.value, false)
                          }
                          className="bg-light"                       
                        >
                          <option value="">Membership category</option>
                          <option value="associate">Associate</option>
                          <option value="professional">Professional</option>
                          <option value="charter">Charter</option>
                        </Input>
                        <ErrorMessage
                            name="category"
                            render={msg => <div className="text-md-left text-danger"><b>{msg}</b> *</div>}
                        />
                      </Col>
                    </FormGroup>
                    <FormGroup row className="mb-0 ml-2">
                      <Label for="exampleEmail" sm={3} className="text-md-left">
                        <b>
                          Title <span className="text-danger">*</span>
                        </b>
                      </Label>
                      <Label for="First Name" sm={4} className="text-md-left">
                        <b>
                          First Name <span className="text-danger">*</span>
                        </b>
                      </Label>
                      <Label for="exampleEmail" sm={4} className="text-md-left">
                        <b>
                          Last Name <span className="text-danger">*</span>
                        </b>
                      </Label>
                    </FormGroup>
                    <FormGroup row className="mb-0 ml-2">
                      <Col sm={3}>
                        <Input
                          type="select"
                          name="title"
                          onChange={e =>
                            setFieldValue('title', e.target.value, false)
                          }
                          className="bg-light"
                        >
                          <option value="">Title</option>
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
                        </Input>
                        <ErrorMessage
                            name="title"
                            render={msg => <div className="text-md-left text-danger"><b>{msg}</b> *</div>}
                        />
                      </Col>

                      <Col sm={4}>
                        <Input
                          type="text"
                          name="firstName"
                          onChange={e =>
                            setFieldValue('firstName', e.target.value, false)
                          }
                          className="bg-light"
                        />
                        <ErrorMessage
                            name="firstName"
                            render={msg => <div className="text-md-left text-danger"><b>{msg}</b> *</div>}
                        />

                      </Col>

                      <Col sm={4}>
                        <Input
                          type="text"
                          name="lastName"
                          onChange={e =>
                            setFieldValue('lastName', e.target.value, false)
                          }
                          className="bg-light"
                        />
                        <ErrorMessage
                            name="lastName"
                            render={msg => <div className="text-md-left text-danger"><b>{msg}</b> *</div>}
                        />
                      </Col>
                    </FormGroup>
                    <FormGroup row className="mb-0 ml-2">
                      <Label
                        for="exampleEmail"
                        sm={3}
                        className="text-md-left mb-1"
                      >
                        <b>
                          Residential Address{' '}
                          <span className="text-danger">*</span>
                        </b>
                      </Label>
                    </FormGroup>
                    <FormGroup row className="mb-1 ml-2">
                      <Col sm={11} className="text-box">
                        <Input
                          type="text"
                          name="residentialAddress"
                          onChange={e =>
                            setFieldValue(
                              'residentialAddress',
                              e.target.value,
                              false,
                            )
                          }
                          className="bg-light"
                        />
                        <ErrorMessage
                            name="residentialAddress"
                            render={msg => <div className="text-md-left text-danger"><b>{msg}</b> *</div>}
                        />
                      </Col>
                    </FormGroup>
                    <FormGroup row className="mb-0 ml-2">
                      <Label
                        for="exampleEmail"
                        sm={3}
                        className="text-md-left mb-1"
                      >
                        <b>
                          Contact Number <span className="text-danger">*</span>
                        </b>
                      </Label>
                    </FormGroup>
                    <FormGroup row className="mb-1 ml-2">
                      <Col sm={11} className="text-box">
                        <Input
                          type="text"
                          name="contactNumber"
                          onChange={e =>
                            setFieldValue(
                              'contactNumber',
                              e.target.value,
                              false,
                            )
                          }
                          className="bg-light"
                        />
                        <ErrorMessage
                            name="contactNumber"
                            render={msg => <div className="text-md-left text-danger"><b>{msg}</b> *</div>}
                        />
                      </Col>
                    </FormGroup>
                    <FormGroup row className="mb-0 ml-2">
                      <Label
                        for="exampleEmail"
                        sm={3}
                        className="text-md-left mb-1"
                      >
                        <b>
                          Birth Date <span className="text-danger">*</span>
                        </b>
                      </Label>
                    </FormGroup>
                    <FormGroup row className="mb-1 ml-2">
                      <Col sm={11} className="text-box">
                        <Input
                          type="date"
                          name="birthDate"
                          onChange={e =>
                            setFieldValue('birthDate', e.target.value, false)
                          }
                          className="bg-light"
                        />
                        <ErrorMessage
                            name="birthDate"
                            render={msg => <div className="text-md-left text-danger"><b>{msg}</b> *</div>}
                        />
                      </Col>
                    </FormGroup>
                    <CardSubtitle
                      tag="h5"
                      className="mt-5 mb-2 text-muted text-md-left"
                    >
                      <b> Employment Information </b>
                    </CardSubtitle>
                    <hr />
                    <FormGroup row className="mb-0 ml-2">
                      <Label
                        for="exampleEmail"
                        sm={3}
                        className="text-md-left mb-1"
                      >
                        <b>
                          Designation <span className="text-danger">*</span>
                        </b>
                      </Label>
                    </FormGroup>
                    <FormGroup row className="mb-1 ml-2">
                      <Col sm={11} className="text-box">
                        <Input
                          type="text"
                          name="designation"
                          onChange={e =>
                            setFieldValue('designation', e.target.value, false)
                          }
                          className="bg-light"
                        />
                        <ErrorMessage
                            name="designation"
                            render={msg => <div className="text-md-left text-danger"><b>{msg}</b> *</div>}
                        />
                      </Col>
                    </FormGroup>
                    <FormGroup row className="mb-0 ml-2">
                      <Label
                        for="exampleEmail"
                        sm={3}
                        className="text-md-left mb-1"
                      >
                        <b>
                          Company Name <span className="text-danger">*</span>
                        </b>
                      </Label>
                    </FormGroup>
                    <FormGroup row className="mb-1 ml-2">
                      <Col sm={11} className="text-box">
                        <Input
                          type="text"
                          name="companyName"
                          onChange={e =>
                            setFieldValue('companyName', e.target.value, false)
                          }
                          className="bg-light"
                        />
                        <ErrorMessage
                            name="companyName"
                            render={msg => <div className="text-md-left text-danger"><b>{msg}</b> *</div>}
                        />
                      </Col>
                    </FormGroup>
                    <FormGroup row className="mb-0 ml-2">
                      <Label
                        for="exampleEmail"
                        sm={3}
                        className="text-md-left mb-1"
                      >
                        <b>
                          Business Address{' '}
                          <span className="text-danger">*</span>
                        </b>
                      </Label>
                    </FormGroup>
                    <FormGroup row className="mb-1 ml-2">
                      <Col sm={11} className="text-box">
                        <Input
                          type="text"
                          name="businessAddress"
                          onChange={e =>
                            setFieldValue(
                              'businessAddress',
                              e.target.value,
                              false,
                            )
                          }
                          className="bg-light"
                        />
                        <ErrorMessage
                            name="businessAddress"
                            render={msg => <div className="text-md-left text-danger"><b>{msg}</b> *</div>}
                        />
                      </Col>
                    </FormGroup>

                    <CardSubtitle
                      tag="h5"
                      className="mt-5 mb-2 text-muted text-md-left"
                    >
                      <b> Account Information </b>
                    </CardSubtitle>
                    <hr />
                    <FormGroup row className="mb-0 ml-2">
                      <Label
                        for="exampleEmail"
                        sm={3}
                        className="text-md-left mb-1"
                      >
                        <b>
                          Username (Email Address){' '}
                          <span className="text-danger">*</span>
                        </b>
                      </Label>
                    </FormGroup>
                    <FormGroup row className="mb-1 ml-2">
                      <Col sm={11} className="text-box">
                        <Input
                          type="text"
                          name="email"
                          onChange={e =>
                            setFieldValue('email', e.target.value, false)
                          }
                          onKeyPress={(e) => handler(e)}
                          className="bg-light"
                        />
                        <div className="text-md-left text-danger"><b>{error}</b></div>                        
                        <ErrorMessage
                            name="email"
                            render={msg => <div className="text-md-left text-danger"><b>{msg}</b> *</div>}
                        />
                      </Col>
                    </FormGroup>
                    <FormGroup row className="mb-0 ml-2">
                      <Label
                        for="exampleEmail"
                        sm={3}
                        className="text-md-left mb-1"
                      >
                        <b>
                          Password <span className="text-danger">*</span>
                        </b>
                      </Label>
                    </FormGroup>
                    <FormGroup row className="mb-1 ml-2">
                      <Col sm={11} className="text-box">
                        <Input
                          type="text"
                          name="password"
                          onChange={e =>
                            setFieldValue('password', e.target.value, false)
                          }
                          className="bg-light"
                        />
                        <ErrorMessage
                            name="password"
                            render={msg => <div className="text-md-left text-danger"><b>{msg}</b> *</div>}
                        />
                      </Col>
                    </FormGroup>
                    <FormGroup row className="mb-0 ml-2">
                      <Label
                        for="exampleEmail"
                        sm={3}
                        className="text-md-left mb-1"
                      >
                        <b>
                          Confirm Password{' '}
                          <span className="text-danger">*</span>
                        </b>
                      </Label>
                    </FormGroup>
                    <FormGroup row className="mb-3 ml-2">
                      <Col sm={11} className="text-box">
                        <Input
                          type="text"
                          name="confirmPassword"
                          onChange={e =>
                            setFieldValue(
                              'confirmPassword',
                              e.target.value,
                              false,
                            )
                          }
                          className="bg-light"
                        />
                        <ErrorMessage
                            name="confirmPassword"
                            render={msg => <div className="text-md-left text-danger"><b>{msg}</b> *</div>}
                        />
                      </Col>
                    </FormGroup>

                    <FormGroup row className="mb-0 ml-2">
                      <Label
                        for="exampleEmail"
                        sm={9}
                        className="text-md-left mb-1"
                      >
                        <b>Attach necessary documents needed to prove you an employee <span className="text-danger">*</span></b>
                        <div className="text-danger">only pdf, zip, rar file formats accepted</div>
                      </Label>
                    </FormGroup>
                    <FormGroup row className="mb-5 ml-2">
                      <Col sm={3} className="text-box">
                        <Input
                          type="file"
                          className="input"
                          id="file"
                          name="file"
                          accept="file/pdf"
                          file
                          onChange={e => 
                            setFieldValue(
                              'file',
                              e.target.files[0]
                            )}
                            className="bg-light"
                        />
                        <ErrorMessage
                            name="file"
                            render={msg => <div className="text-md-left text-danger"><b>{msg}</b> *</div>}
                        />
                      </Col>
                    </FormGroup>

                    <FormGroup check row>
                      <Col sm={{ size: 15 }}>
                        <Button color="success" className="mr-3" type="submit">
                          Register
                        </Button>
                        <Button color="danger"  className="ml-4" type="reset">
                          Reset
                        </Button>
                      </Col>
                    </FormGroup>
                  </Form>
                </CardBody>
              </Card>
            )}
          </Formik>
        </center>
      </Col>
      </div>
    </>
  );
};

export default Registration;
