import Page from 'components/Page';
import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../helpers/AuthContext';
import { useParams } from 'react-router-dom';

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

function UpdateJobVacancies() {
  const { id } = useParams();
  const add = '';
  const [maximumCount, setQuestionCount] = useState(null);
  const [numberOfQuestions, setNumberOfQuestions] = useState('');

  const [companyName, setCompanyName] = useState('');
  const [jobRole, setJobRole] = useState('');
  const [location, setLocation] = useState('');
  const [contact, setContact] = useState('');
  const [email, setEmail] = useState('');
  const [description, setDescription] = useState('');
  const [imgFile, setImgFile] = useState();
  const [questionType, setQuestionType] = useState('Other');
  const [qType, getQuestionType] = useState(null);

  const { authState, setAuthState } = useContext(AuthContext);

  //  const [image, setImage] = useState("");

  let history = useHistory();
  const [result, setResult] = useState();


  const updateJob = () => {
    const jobData = {
      image: imgFile,
      companyName: companyName,
      jobRole: jobRole,
      location: location,
      contact: contact,
      email: email,
      description: description,
      imgFile: imgFile,
      jvId: id,
      questionType: questionType,
      numberOfQuestions: numberOfQuestions,
      addBy: authState.id,
    };
    console.log(jobData);
    axios
      .post('http://localhost:3001/job/updateJob', jobData)

      .then(res => {
        setResult('done');
        setTimeout(
          function () {
            history.push('/managejobs');
          },

          2000,
        );
      })
      .catch(error => {
        setResult('err');
        setTimeout(
          function () {
            history.push('/editJobVaccencies/' + id);
          },

          2000,
        );
      });
  };

  const allQuestionTypes =
    qType &&
    qType.map((li, i) => {
      return (
        <option key={i} value={li.name}>
          {li.type}
        </option>
      );
    }, this);

  useEffect(() => {
    axios
      .get('http://localhost:3001/job/getJobView', { params: { id: id } })

      .then(response => {
        if (response.data.error) {
          //    alert(response.data.error);
        } else {
          console.log(response.data[0]);
          setCompanyName(response.data[0].companyName);
          setJobRole(response.data[0].designation);
          setLocation(response.data[0].location);
          setEmail(response.data[0].email);
          setContact(response.data[0].contact);
          setDescription(response.data[0].description);
          setImgFile(response.data[0].advertisment);
          setNumberOfQuestions(response.data[0].questionCount);
          setQuestionType(response.data[0].questionType);
        }
      })
      .catch(error => {
        //   alert(error);
      });
    const data3 = {
      memberId: '1001',
      jobId: '',
    };

    axios
      .post('http://localhost:3001/job/getQuestionType', data3)

      .then(response => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          getQuestionType(response.data);
        }
      })
      .catch(error => {
        alert(error);
      });
  }, []);
  function msg() {
    if (result == 'err') {
      return (
        <>
          <Alert color="danger">Unsuccefull Attempt,Try Againg</Alert>
        </>
      );
    } else if (result == 'done') {
      return (
        <>
          <Alert color="success">Greate Attempt is Succesfull</Alert>
        </>
      );
    }
  }
  return (
    <Page title="Edit Jobs">
      <Col sm="10" md={{ size: 8, offset: 2 }}>
        <center>
          {msg()}
          <Card>
            <CardHeader>Edit Job Vacancies</CardHeader>
            <CardBody>
              <Form>
                <FormGroup row>
                  <Label for="exampleEmail" sm={3}>
                    Company Name
                  </Label>
                  <Col sm={9}>
                    <Input
                      type="text"
                      value={companyName}
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
                      value={jobRole}
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
                      value={location}
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
                      value={contact}
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
                      value={email}
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
                      value={description}
                      className="note"
                      placeholder="Description"
                      onChange={event => {
                        setDescription(event.target.value);
                      }}
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="exampleEmail" sm={3}>
                    Question Type
                  </Label>
                  <Col sm={9}>
                    <Input
                      type="select"
                      name="select"
                      onChange={e => setQuestionType(e.target.value)}
                     
                    >
                      <option value="default">{questionType}</option>
                      {allQuestionTypes}
                    </Input>
                  </Col>
                </FormGroup>
                {/* {renderDetails(questionType)} */}
                <FormGroup row>
                  <Label for="exampleEmail" sm={6}>
                    Number of Questions
                  </Label>
                  <Col sm={3}>
                    <Input
                      type="number"
                      onChange={event => {
                        setNumberOfQuestions(event.target.value);
                      }}
                      value={numberOfQuestions}
                      name="select"
                    ></Input>
                  </Col>
                </FormGroup>
                {/* <FormGroup row>
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
                </FormGroup> */}
                <FormGroup check row>
                  <Col sm={{ size: 15 }}>
                    <Button onClick={updateJob} color="success">
                      Update Job
                    </Button>
                  </Col>
                </FormGroup>
              </Form>
            </CardBody>
          </Card>
        </center>
      </Col>
      <hr></hr>
    </Page>
  );
}

export default UpdateJobVacancies;
