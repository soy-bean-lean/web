import Page from 'components/Page';
import React, { useContext, useState, useEffect } from 'react';

 import { useHistory } from 'react-router-dom';
import axios from 'axios';
 import { toast } from 'react-toastify';
 import 'react-toastify/dist/ReactToastify.css';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Form,
  FormFeedback,
  FormGroup,
  FormText,
  Input,
  Label,
  Row,
} from 'reactstrap';
import Alert from 'reactstrap/lib/Alert';
// let history = useHistory();

const FormPage = () => {
  // job
  const [companyName, setCompanyName] = useState('');
  const [jobRole, setJobRole] = useState('');
  const [location, setLocation] = useState('');
  const [contact, setContact] = useState('');
  const [email, setEmail] = useState('');
  const [description, setDescription] = useState('');
  const [imgFile, setImgFile] = useState('asd');

  //cpd
  const [recType, setRecType] = useState('type');

  const [courseId, setCourseId] = useState('');
  const [courseName, setCourseName] = useState('');
  const [courseType, setCourseType] = useState('');
  const [mode, setMode] = useState('');
  const [level, setLevel] = useState('');
  const [platform, setPlatform] = useState('');
  const [partner, setPartner] = useState('');
  const [credit, setCredit] = useState('');

  const [workshopId, setWorkshopId] = useState('');
  const [workshopName, setWorkshopName] = useState('');
  const [workshopType, setWorkshopType] = useState('');
  const [workshopDate, setWorkshopDate] = useState('');

  const [glDate, setGLDate] = useState('');
  const [guestLecture, setGuestLecture] = useState('');
  const [guestLectureId, setGuestLectureId] = useState('');

  const [inCourseList, setInCourseList] = useState(null);
  const [outCourseList, setOutCourseList] = useState(null);
  const [outCoursePlatform, setOutCoursePlatform] = useState(null);
  const [outCoursePartner, setOutCoursePartner] = useState(null);
  const [inWorkshopList, setInWorkshopList] = useState(null);
  const [outWorkshopList, setOutWorkshopList] = useState(null);
  const [guestLectureList, setGuestLectureList] = useState(null);

  const addJob = () => {
    const formData = new FormData();
    formData.append('image', imgFile);
    formData.append('companyName', companyName);
    formData.append('jobRole', jobRole);
    formData.append('location', location);
    formData.append('contact', contact);
    formData.append('email', email);
    formData.append('description', description);
    formData.append('memberId', 1);

    fetch('http://localhost:3001/job', {
      method: 'POST',
      body: formData,
      headers: {
        Accept: 'multipart/form-data',
      },
      credentials: 'include',
    })
      .then(res => res.json())
      .then(res => {
        Alert('OOO');
        // history.push('/dashboardSec');
      })
      .catch(error => {
        // toast.error('Unable to Uploaded Job Vacancy,Try Again!', {
        //   position: toast.POSITION.TOP_CENTER,
        //   autoClose: 3000,
        // });
        //  history.push('/addjob');
        Alert(error);

        console.log(error);
      });
  };
  
  return (
    <Page title="Add Jobs" breadcrumbs={[{ name: 'Forms', active: true }]}>
      {/* <Col xl={6} lg={12} md={12}>
          <Card>
            <CardHeader>Input Types</CardHeader>
            <CardBody>
              <Form>
                <FormGroup>
                  <Label for="exampleEmail">Plain Text (Static)</Label>
                  <Input
                    plaintext
                    value="Some plain text/ static value"
                    readOnly
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="exampleEmail">Email</Label>
                  <Input
                    type="email"
                    name="email"
                    placeholder="with a placeholder"
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="examplePassword">Password</Label>
                  <Input
                    type="password"
                    name="password"
                    placeholder="password placeholder"
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="exampleUrl">Url</Label>
                  <Input
                    type="url"
                    name="url"
                    id="exampleUrl"
                    placeholder="url placeholder"
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="exampleNumber">Number</Label>
                  <Input
                    type="number"
                    name="number"
                    id="exampleNumber"
                    placeholder="number placeholder"
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="exampleDatetime">Datetime</Label>
                  <Input
                    type="datetime"
                    name="datetime"
                    id="exampleDatetime"
                    placeholder="datetime placeholder"
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="exampleDate">Date</Label>
                  <Input
                    type="date"
                    name="date"
                    id="exampleDate"
                    placeholder="date placeholder"
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="exampleTime">Time</Label>
                  <Input
                    type="time"
                    name="time"
                    id="exampleTime"
                    placeholder="time placeholder"
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="exampleColor">Color</Label>
                  <Input
                    type="color"
                    name="color"
                    id="exampleColor"
                    placeholder="color placeholder"
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="exampleSearch">Search</Label>
                  <Input
                    type="search"
                    name="search"
                    id="exampleSearch"
                    placeholder="search placeholder"
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="exampleSelect">Select</Label>
                  <Input type="select" name="select">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </Input>
                </FormGroup>
                <FormGroup>
                  <Label for="exampleSelectMulti">Select Multiple</Label>
                  <Input type="select" name="selectMulti" multiple>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </Input>
                </FormGroup>
                <FormGroup>
                  <Label for="exampleText">Text Area</Label>
                  <Input type="textarea" name="text" />
                </FormGroup>
                <FormGroup>
                  <Label for="exampleFile">File</Label>
                  <Input type="file" name="file" />
                  <FormText color="muted">
                    This is some placeholder block-level help text for the above
                    input. It's a bit lighter and easily wraps to a new line.
                  </FormText>
                </FormGroup>
                <FormGroup check>
                  <Label check>
                    <Input type="radio" /> Option one is this and that—be sure
                    to include why it's great
                  </Label>
                </FormGroup>
                <FormGroup check>
                  <Label check>
                    <Input type="checkbox" /> Check me out
                  </Label>
                </FormGroup>
              </Form>
            </CardBody>
          </Card>
        </Col> */}

      <Col sm="10" md={{ size: 8, offset: 2 }}>
        <center>
          <Card>
            <CardHeader>Add Job Vacancies</CardHeader>
            <CardBody>
              <Form>
                <FormGroup row>
                  <Label for="exampleEmail" sm={3}>
                    Company Name
                  </Label>
                  <Col sm={9}>
                    <Input
                      type="text"
                      name="email"
                      placeholder="Company Name"
                      onChange={event => {
                        setCompanyName(event.target.value);
                      }}
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="exampleEmail" sm={3}>
                    Job Role
                  </Label>
                  <Col sm={9}>
                    <Input
                      className="input"
                      placeholder="Job Role"
                      onChange={event => {
                        setJobRole(event.target.value);
                      }}
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="exampleEmail" sm={3}>
                    Location
                  </Label>
                  <Col sm={9}>
                    <Input
                      className="input"
                      placeholder="Location"
                      onChange={event => {
                        setLocation(event.target.value);
                      }}
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="exampleEmail" sm={3}>
                    Contact Number
                  </Label>
                  <Col sm={9}>
                    <Input
                      className="input"
                      placeholder="Contact Number"
                      onChange={event => {
                        setContact(event.target.value);
                      }}
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="exampleEmail" sm={3}>
                    Email
                  </Label>
                  <Col sm={9}>
                    <Input
                      type="email"
                      name="email"
                      placeholder="Email"
                      onChange={event => {
                        setEmail(event.target.value);
                      }}
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="exampleEmail" sm={3}>
                    Description
                  </Label>
                  <Col sm={9}>
                    <Input
                      type="textarea"
                      className="note"
                      placeholder="Description"
                      onChange={event => {
                        setDescription(event.target.value);
                      }}
                    />
                  </Col>
                </FormGroup>

               
                <FormGroup row>
                  <Label for="exampleEmail" sm="12" md={{ size: 6, offset: 3 }}>
                  Advertisement Image
                  </Label>
                  <Col sm="12" md={{ size: 6, offset: 3 }}>
                    <center>
                      {imgFile && (
                        <img
                          className="writeImg"
                          height="60%"
                          width="60%"
                          src={URL.createObjectURL(imgFile)}
                          alt=""
                        />
                      )}
                    </center>
                  </Col>

                  <Col sm="12" md={{ size: 6, offset: 4 }}>
                    <input
                      type="file"
                      className="input"
                      id="course-img"
                      name="course-img"
                      required
                      accept="image/*"
                      onChange={e => setImgFile(e.target.files[0])}
                    ></input>
                  </Col>
                </FormGroup>
                <FormGroup check row>
                  <Col sm={{ size: 15 }}>
                    <Button onClick={addJob} color="success">
                      Add Job
                    </Button>
                  </Col>
                </FormGroup>
              </Form>
            </CardBody>
          </Card>
        </center>
      </Col>
      <hr></hr>
      <Col sm="10" md={{ size: 8, offset: 2 }}>
        <center>
          <Card>
            <CardHeader>New CPD Records</CardHeader>
            <CardBody>
              <Form>
                <FormGroup row>
                  <Label for="exampleEmail" sm={3}>
                    Record Title
                  </Label>
                  <Col sm={9}>
                    <Input
                      type="text"
                      name="email"
                      onChange={event => {
                        //  setCompanyName(event.target.value);
                      }}
                    />
                  </Col>
                </FormGroup>



                <FormGroup row>
                  <Label for="exampleEmail" sm={3}>
                  Record Type
                  </Label>
                  <Col sm={9}>
                  <Input type="select" name="select">
                    <option value="type"></option>
                    <option value="course">Courses</option>
                    <option value="workshops">Workshops</option>
                    <option value="guestLec">Guest Lectures</option>
                    <option value="others">Others</option>
                  </Input>
                  </Col>
                </FormGroup>



                <FormGroup row>
                  <Label for="exampleEmail" sm={3}>
                    Contact Number
                  </Label>
                  <Col sm={9}>
                    <Input
                      className="input"
                      placeholder="Contact Number"
                      onChange={event => {
                        setContact(event.target.value);
                      }}
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="exampleEmail" sm={3}>
                    Email
                  </Label>
                  <Col sm={9}>
                    <Input
                      type="email"
                      name="email"
                      placeholder="Email"
                      onChange={event => {
                        setEmail(event.target.value);
                      }}
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="exampleEmail" sm={3}>
                    Description
                  </Label>
                  <Col sm={9}>
                    <Input
                      type="textarea"
                      className="note"
                      placeholder="Description"
                      onChange={event => {
                        setDescription(event.target.value);
                      }}
                    />
                  </Col>
                </FormGroup>
                <Form>
                  <Input className="mb-2" placeholder="lg" bsSize="lg" />
                  <Input className="mb-2" placeholder="default" />
                  <Input className="mb-2" placeholder="sm" bsSize="sm" />
                  <Input className="mb-2" type="select" bsSize="lg">
                    <option>Large Select</option>
                  </Input>
                  <Input className="mb-2" type="select">
                    <option>Default Select</option>
                  </Input>
                  <Input className="mb-2" type="select" bsSize="sm">
                    <option>Small Select</option>
                  </Input>
                </Form>
                <FormGroup row>
                  <Label for="exampleEmail" sm={3}>
                    Advertisement Image
                  </Label>
                  <Col sm={9}>
                    <Input
                      type="file"
                      className="input"
                      id="course-img"
                      name="course-img"
                      accept="image/*"
                      onChange={e => setImgFile(e.target.files[0])}
                    />
                  </Col>
                </FormGroup>

                <FormGroup check row>
                  <Col sm={{ size: 15 }}>
                    <Button onClick={addJob} color="success">
                      Add Job
                    </Button>
                  </Col>
                </FormGroup>
              </Form>
            </CardBody>
          </Card>
        </center>
      </Col>
      {/* 
      <Row>
        <Col xl={6} lg={12} md={12}>
          <Card>
            <CardHeader>Form Validation</CardHeader>
            <CardBody>
              <Form>
                <FormGroup>
                  <Label for="exampleEmail">Input with success</Label>
                  <Input valid />
                  <FormFeedback>
                    <a href="https://github.com/twbs/bootstrap/issues/23372">
                      A bug
                    </a>{' '}
                    fixed in (the currently unreleased) (
                    <a href="https://github.com/twbs/bootstrap/pull/23377">
                      PR
                    </a>
                    ) bootstrap{' '}
                    <a href="https://github.com/twbs/bootstrap/issues/23278">
                      v4 beta-2
                    </a>{' '}
                    shows invalid-feedback with is-valid inputs.
                  </FormFeedback>
                  <FormText>Example help text that remains unchanged.</FormText>
                </FormGroup>
                <FormGroup>
                  <Label for="examplePassword">Input with danger</Label>
                  <Input valid={false} />
                  <FormFeedback>
                    Oh noes! that name is already taken
                  </FormFeedback>
                  <FormText>Example help text that remains unchanged.</FormText>
                </FormGroup>
              </Form>
            </CardBody>
          </Card>
        </Col>

        <Col xl={6} lg={12} md={12}>
          <Card>
            <CardHeader>Hidden Labels</CardHeader>
            <CardBody>
              <Form inline>
                <FormGroup>
                  <Label for="exampleEmail" hidden>
                    Email
                  </Label>
                  <Input type="email" name="email" placeholder="Email" />
                </FormGroup>{' '}
                <FormGroup>
                  <Label for="examplePassword" hidden>
                    Password
                  </Label>
                  <Input
                    type="password"
                    name="password"
                    placeholder="Password"
                  />
                </FormGroup>{' '}
                <Button>Submit</Button>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col xl={6} lg={12} md={12}>
          <Card>
            <CardHeader>Inline Form</CardHeader>
            <CardBody>
              <Form inline>
                <FormGroup>
                  <Label for="exampleEmail">Email</Label>{' '}
                  <Input
                    type="email"
                    name="email"
                    placeholder="something@idk.cool"
                  />
                </FormGroup>{' '}
                <FormGroup>
                  <Label for="examplePassword">Password</Label>{' '}
                  <Input
                    type="password"
                    name="password"
                    placeholder="don't tell!"
                  />
                </FormGroup>{' '}
                <Button>Submit</Button>
              </Form>
            </CardBody>
          </Card>
        </Col>

        <Col xl={6} lg={12} md={12}>
          <Card>
            <CardHeader>Inline Checkboxes</CardHeader>
            <CardBody>
              <Form>
                <FormGroup check inline>
                  <Label check>
                    <Input type="checkbox" /> Some input
                  </Label>
                </FormGroup>
                <FormGroup check inline>
                  <Label check>
                    <Input type="checkbox" /> Some other input
                  </Label>
                </FormGroup>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col xl={6} lg={12} md={12}>
          <Card>
            <CardHeader>Input Sizing</CardHeader>
            <CardBody>
              <Form>
                <Input className="mb-2" placeholder="lg" bsSize="lg" />
                <Input className="mb-2" placeholder="default" />
                <Input className="mb-2" placeholder="sm" bsSize="sm" />
                <Input className="mb-2" type="select" bsSize="lg">
                  <option>Large Select</option>
                </Input>
                <Input className="mb-2" type="select">
                  <option>Default Select</option>
                </Input>
                <Input className="mb-2" type="select" bsSize="sm">
                  <option>Small Select</option>
                </Input>
              </Form>
            </CardBody>
          </Card>
        </Col>

        <Col xl={6} lg={12} md={12}>
          <Card>
            <CardHeader>Input Grid Sizing</CardHeader>
            <CardBody>
              <Form>
                <FormGroup row>
                  <Label for="exampleEmail" sm={2} size="lg">
                    Email
                  </Label>
                  <Col sm={10}>
                    <Input
                      type="email"
                      name="email"
                      placeholder="lg"
                      bsSize="lg"
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="exampleEmail2" sm={2}>
                    Email
                  </Label>
                  <Col sm={10}>
                    <Input
                      type="email"
                      name="email"
                      id="exampleEmail2"
                      placeholder="default"
                    />
                  </Col>
                </FormGroup>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row> */}
    </Page>
  );
};

export default FormPage;
