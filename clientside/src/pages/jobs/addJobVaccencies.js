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

const AddJobVacancies = () => {
  // job
  const [result, setResult] = useState();

  const [companyName, setCompanyName] = useState('');
  const [numberOfQuestions, setNumberOfQuestions] = useState('');
  const [jobRole, setJobRole] = useState('');
  const [location, setLocation] = useState('');
  const [contact, setContact] = useState('');
  const [email, setEmail] = useState('');
  const [description, setDescription] = useState('');
  let history = useHistory();

  const [imgFile, setImgFile] = useState('');
  const [qType, getQuestionType] = useState(null);
  const [questionType, setQuestionTypeSelected] = useState('');
  const [maximumCount, setQuestionCount] = useState(null);
  useEffect(() => {
    const data = {
      memberId: '1001',
      jobId: '',
    };

    axios
      .post('http://localhost:3001/job/getQuestionType', data)

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
  function getmax(type) {}
  
  const allQuestionTypes =
    qType &&
    qType.map((li, i) => {
      return (
        <option key={i} value={li.name}>
          {li.type}
        </option>
      );
    }, this);

  function renderDetails(type) {
    console.log('TYpe is ' + type);
    console.log('qType is ' + qType);

    if (questionType == '') {
      console.log('qqqqqqqqqqqqqqqqqqqqqqqqqqqq');
      return <FormGroup row></FormGroup>;
    } else {
      console.log('questionType is ' + questionType);
      const data = {
        max: questionType,
      };
      axios
        .post('http://localhost:3001/job/getMaximumQuestions', data)

        .then(response => {
          if (response.data.error) {
            alert(response.data.error);
          } else {
            setQuestionCount(response.data[0].max);
            console.log(maximumCount);
          }
        })
        .catch(error => {
          alert(error);
        });

      return (
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
              max={maximumCount}
              name="select"
            ></Input>
          </Col>
        </FormGroup>
      );
    }
  }

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
  const addJob = () => {
    const formData = new FormData();
    formData.append('image', imgFile);
    formData.append('companyName', companyName);
    formData.append('jobRole', jobRole);
    formData.append('location', location);
    formData.append('contact', contact);
    formData.append('email', email);
    formData.append('description', description);
    formData.append('type', questionType);
    formData.append('count', numberOfQuestions);
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
        setResult('done');
        setTimeout(
          function () {
            history.push('/job');
          },

          2000,
        );
      })
      .catch(error => {
        setResult('err');
        setTimeout(
          function () {
            history.push('/addJobVaccencies');
          },

          2000,
        );
      });
  };

  return (
    <Page title="Add Jobs">
      <Col sm="10" md={{ size: 8, offset: 2 }}>
        <center>
          {msg()}

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
                  <Label for="exampleEmail" sm={3}>
                    Question Type
                  </Label>
                  <Col sm={9}>
                    <Input
                      type="select"
                      name="select"
                      onChange={e => setQuestionTypeSelected(e.target.value)}
                    >
                      <option value="default"></option>
                      {allQuestionTypes}
                    </Input>
                  </Col>
                </FormGroup>

                {renderDetails(questionType)}

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
    </Page>
  );
};

export default AddJobVacancies;
