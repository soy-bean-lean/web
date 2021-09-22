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
  const [image, setFileName] = useState('');

  const addDataFile = () => {
    const formData = new FormData();
    formData.append('image', image);

    alert(image);
    fetch('http://localhost:3001/auth/addUserProofs', {
      method: 'POST',
      body: formData,
      headers: {
        Accept: 'multipart/form-data',
      },
      credentials: 'include',
    })
      .then(res => res.json())
      .then(res => {
        setTimeout(
          function () {
            history.push('/');
            history.push('/');
          },

          2000,
        );
      })
      .catch(error => {
        setTimeout(
          function () {
            // history.push('/jobadvertisements');
          },

          2000,
        );
      });
  };

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
    nic: '',
    birthDate: '',
    email: '',
    password: '',
    confirmPassword: '',
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
  const category = ['student', 'associate', 'professional'];

  const SUPPORTED_FORMATS = [
    'application/pdf',
    'application/zip',
    'application/rar',
  ];

  const SUPPORTED_FORMATS_IMAGE = ['image/jpg', 'image/jpeg', 'image/png'];

  const validationSchema = Yup.object().shape({
    title: Yup.string().required('Please Select a Title').oneOf(title),
    category: Yup.string()
      .required('Please Select Member Type')
      .oneOf(category, 'Member should be a student, associate, professional'),
    firstName: Yup.string()
      .min(5, 'Must be more than 5 characters')
      .required('Required')
      .label('First Name'),
    lastName: Yup.string()
      .min(5, 'Must be more than 5 characters')
      .required('Required'),
    designation: Yup.string().required('Required'),
    companyName: Yup.string().required('Required'),
    businessAddress: Yup.string().required('Required'),
    residentialAddress: Yup.string().required('Required'),
    contactNumber: Yup.string()
      .required('Required')
      .matches(phoneRegExp, 'Phone number is not valid')
      .min(10, 'Too short')
      .max(10, 'Too long'),
    nic: Yup.string()
      .min(10, 'Must be more than 10 characters')
      .required('Required'),
    birthDate: Yup.date()
      .max(new Date(), 'Birth Date should be earlier date than today')
      .required('Required'),
    email: Yup.string().email('Email is invalid').required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 charaters')
      .required('Password is required')
      .matches(
        /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
        'Password must contain at least 8 characters, one uppercase, one number and one special case character',
      ),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Password must match')
      .required('Confirm password is required'),
   
  });

  const [error, setError] = useState('');
  const [err, setErr] = useState('');


  const onSubmit = data => {
    axios.post('http://localhost:3001/auth', data).then(response => {
      if (response.data.error) {
        setError(response.data.error);
      } 
      else if(response.data.err) {
        setErr(response.data.error);
      }
      else{
      history.push('./');
    }
    });
  };

  const login = () => {
    history.push('./');
  };

  const handler = event => {
    setError('');
  };

  return (
    <>
      <Page>
        <br></br>
        <br></br>
        <br></br>
        <Col sm="11" md={{ size: 9, offset: 2 }}>
          <center>
            <Formik
              initialValues={initialValues}
              onSubmit={onSubmit}
              validationSchema={validationSchema}
            >
              {({ setFieldValue, errors, resetForm }) => (
                <Card>
                  <CardHeader tag="h1">Membership Registration</CardHeader>
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
                        <Col sm={4}>
                          <Input
                            type="select"
                            name="category"
                            onChange={e =>
                              setFieldValue('category', e.target.value, false)
                            }
                            className="bg-light"
                          >
                            <option value="">Membership category</option>
                            <option value="student">Student</option>
                            <option value="associate">Associate</option>
                            <option value="professional">Professional</option>
                          </Input>
                          <ErrorMessage
                            name="category"
                            render={msg => (
                              <div className="text-md-left text-danger">
                                <b>{msg}</b> *
                              </div>
                            )}
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup row className="mb-0 ml-2">
                        <Label
                          for="exampleEmail"
                          sm={3}
                          className="text-md-left"
                        >
                          <b>
                            Title <span className="text-danger">*</span>
                          </b>
                        </Label>
                        <Label for="First Name" sm={4} className="text-md-left">
                          <b>
                            First Name <span className="text-danger">*</span>
                          </b>
                        </Label>
                        <Label
                          for="exampleEmail"
                          sm={4}
                          className="text-md-left"
                        >
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
                            render={msg => (
                              <div className="text-md-left text-danger">
                                <b>{msg}</b> *
                              </div>
                            )}
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
                            render={msg => (
                              <div className="text-md-left text-danger">
                                <b>{msg}</b> *
                              </div>
                            )}
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
                            render={msg => (
                              <div className="text-md-left text-danger">
                                <b>{msg}</b> *
                              </div>
                            )}
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
                            render={msg => (
                              <div className="text-md-left text-danger">
                                <b>{msg}</b> *
                              </div>
                            )}
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
                            Contact Number{' '}
                            <span className="text-danger">*</span>
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
                            render={msg => (
                              <div className="text-md-left text-danger">
                                <b>{msg}</b> *
                              </div>
                            )}
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup row className="mb-0 ml-2">
                        <Label
                          for="exampleEmail"
                          sm={6}
                          className="text-md-left mb-1"
                        >
                          <b>
                            NIC <span className="text-danger">*</span>
                          </b>
                        </Label>
                        <Label
                          for="exampleEmail"
                          sm={6}
                          className="text-md-left mb-1"
                        >
                          <b>
                            Birth Date <span className="text-danger">*</span>
                          </b>
                        </Label>
                      </FormGroup>
                      <FormGroup row className="mb-1 ml-2">
                        <Col sm={6} className="text-box">
                          <Input
                            type="text"
                            name="nic"
                            onChange={e =>
                              setFieldValue('nic', e.target.value, false)
                            }
                            className="bg-light"
                          />
                          <div className="text-md-left text-danger">
                            <b>{err}</b>
                          </div>
                          <ErrorMessage
                            name="nic"
                            render={msg => (
                              <div className="text-md-left text-danger">
                                <b>{msg}</b> *
                              </div>
                            )}
                          />
                        </Col>
                        <Col sm={6} className="text-box">
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
                            render={msg => (
                              <div className="text-md-left text-danger">
                                <b>{msg}</b> *
                              </div>
                            )}
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
                              setFieldValue(
                                'designation',
                                e.target.value,
                                false,
                              )
                            }
                            className="bg-light"
                          />
                          <ErrorMessage
                            name="designation"
                            render={msg => (
                              <div className="text-md-left text-danger">
                                <b>{msg}</b> *
                              </div>
                            )}
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
                              setFieldValue(
                                'companyName',
                                e.target.value,
                                false,
                              )
                            }
                            className="bg-light"
                          />
                          <ErrorMessage
                            name="companyName"
                            render={msg => (
                              <div className="text-md-left text-danger">
                                <b>{msg}</b> *
                              </div>
                            )}
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
                            render={msg => (
                              <div className="text-md-left text-danger">
                                <b>{msg}</b> *
                              </div>
                            )}
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
                          sm={5}
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
                            onKeyPress={e => handler(e)}
                            className="bg-light"
                          />
                          <div className="text-md-left text-danger">
                            <b>{error}</b>
                          </div>
                          <ErrorMessage
                            name="email"
                            render={msg => (
                              <div className="text-md-left text-danger">
                                <b>{msg}</b> *
                              </div>
                            )}
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
                            type="password"
                            name="password"
                            onChange={e =>
                              setFieldValue('password', e.target.value, false)
                            }
                            className="bg-light"
                          />
                          <ErrorMessage
                            name="password"
                            render={msg => (
                              <div className="text-md-left text-danger">
                                <b>{msg}</b> *
                              </div>
                            )}
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
                            type="password"
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
                            render={msg => (
                              <div className="text-md-left text-danger">
                                <b>{msg}</b> *
                              </div>
                            )}
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup check row>
                        <Col sm={{ size: 15 }}>
                          <Button color="success" type="submit">
                            Register
                          </Button>
                          <Button
                            color="warning"
                            type="reset"
                            onClick={resetForm}
                            className="ml-3"
                          >
                            Reset
                          </Button>
                          <Button
                            color="danger"
                            onClick={login}
                            className="ml-4"
                            type="reset"
                          >
                            Cancel
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
        <br></br>
        <br></br>
        <br></br>

        <CardBody>
          <center>
            <br></br>
            <FormGroup row>
              <Label for="exampleEmail" sm={5}>
                Add Profile Image{' '}
              </Label>
              <Col sm={7}>
                <Input
                  type="file"
                  className="input"
                  id="course-img"
                  name="course-img"
                  accept="file/pdf"
                  onChange={e => setFileName(e.target.files[0])}
                />
              </Col>
            </FormGroup>
            <FormGroup check row>
              <center>
                <Col sm={{ size: 15 }}>
                  <Button onClick={addDataFile} color="success">
                    Update Profile Picture
                  </Button>
                </Col>
              </center>
            </FormGroup>{' '}
          </center>
        </CardBody>
      </Page>
    </>
  );
};

export default Registration;
