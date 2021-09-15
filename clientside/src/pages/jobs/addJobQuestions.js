import Page from 'components/Page';
import React, { useContext, useState, useEffect } from 'react';

import { Link, useHistory } from 'react-router-dom';
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
  Alert,
  Row,
} from 'reactstrap';

function AddQuestion() {
  const [question, setQuestion] = useState('');
  const [ans1, setAnswer1] = useState('');
  const [ans2, setAnswer2] = useState('');
  const [ans3, setAnswer3] = useState('');
  const [ans4, setAnswer4] = useState('');
  const [correct, setCorrectAnswer] = useState('');
  const [result, setResult] = useState();

  //  const [image, setImage] = useState("");

  let history = useHistory();

  const addQuestion = () => {
    const data = {
      question: question,
      ans1: ans1,
      ans2: ans2,
      ans3: ans3,
      ans4: ans4,
      correct: correct,
    };
    //|| ans1 !== "" || ans2 !== "" || ans3 !== "" || ans4 !== "" || correct !== ""
    if ((question !== '' ) || (ans1 !== '') || (ans2 !== '') || (ans3 !== '') || (ans4 !== '') || (correct !== '' )) {
      axios
        .post('http://localhost:3001/job/addQuestion', data)
        .then(response => {
          if (response.data.error) {
            setResult('err');
            setTimeout(
              function () {
                history.push('/csslcourse/addnewcourse');
              },

              2000,
            );
          } else {
            setResult('done');

            setTimeout(
              function () {
                history.push('/dashboard');
                //hri giyoth yana thena
              },

              2000,
            );
          }
        });
    } else {
      setResult('err');
      setTimeout(
        function () {
          history.push('/addJobQuestions');
        },

        2000,
      );
    }
  };

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
    <Page title="Job Questions">
      <Col sm="10" md={{ size: 8, offset: 2 }}>
        <center>
          {msg()}
          <Card>
            <CardHeader>Add Job Questions</CardHeader>

            <CardBody>
              <Form>
                <FormGroup row>
                  <Label for="exampleEmail" sm={3}>
                    Question
                  </Label>
                  <Col sm={9}>
                    <Input
                    required
                      type="textarea"
                      className="note"
                      placeholder="Description"
                      onChange={event => {
                        setQuestion(event.target.value);
                      }}
                    />
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Label for="exampleEmail" sm={3}>
                    Answer 1
                  </Label>
                  <Col sm={9}>
                    <Input
                      required
                      className="input"
                      placeholder="Contact Number"
                      onChange={event => {
                        setAnswer1(event.target.value);
                      }}
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="exampleEmail" sm={3}>
                    Answer 2{' '}
                  </Label>
                  <Col sm={9}>
                    <Input
                      className="input"
                      placeholder="Contact Number"
                      onChange={event => {
                        setAnswer2(event.target.value);
                      }}
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="exampleEmail" sm={3}>
                    Answer 3{' '}
                  </Label>
                  <Col sm={9}>
                    <Input
                      className="input"
                      placeholder="Contact Number"
                      onChange={event => {
                        setAnswer3(event.target.value);
                      }}
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="exampleEmail" sm={3}>
                    Answer 4{' '}
                  </Label>
                  <Col sm={9}>
                    <Input
                      className="input"
                      placeholder="Contact Number"
                      onChange={event => {
                        setAnswer4(event.target.value);
                      }}
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="exampleEmail" sm={3}>
                    Correct Answer
                  </Label>
                  <Col sm={9}>
                    <Input
                      type="select"
                      name="select"
                      onChange={event => {
                        setCorrectAnswer(event.target.value);
                      }}
                    >
                      <option value="type"></option>
                      <option value="1">Answer 1 - {ans1}</option>
                      <option value="2">Answer 2 - {ans2}</option>
                      <option value="3">Answer 3 - {ans3}</option>
                      <option value="4">Answer 4 - {ans4}</option>
                    </Input>
                  </Col>
                </FormGroup>

                <FormGroup check row>
                  <Col sm={{ size: 15 }}>
                    <Button onClick={addQuestion} color="success">
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

    // <>
    //   <div className="jobQuestion-basic-info">
    //     <h1 className="jobQuestion-basic-info-title">Add Job Questions</h1>
    //     <hr></hr>
    //     <div className="jobQuestion-basic-info-form">
    //       <div className="jobQuestion-basic-info-block">
    //         <div className="jobQuestion-field-block">
    //           <textarea
    //             className="note"
    //             placeholder="--Enter the Question--"
    //             onChange={(event) => {
    //               setQuestion(event.target.value);
    //             }}
    //           ></textarea>
    //         </div>
    //         <div className="jobQuestion-field-block">
    //           <input
    //             className="input"
    //             placeholder="--Answer 1--"
    //             onChange={(event) => {
    //               setAnswer1(event.target.value);
    //             }}
    //           ></input>
    //         </div>
    //         <div className="jobQuestion-field-block">
    //           <input
    //             className="input"
    //             placeholder="--Answer 2--"
    //             onChange={(event) => {
    //               setAnswer2(event.target.value);
    //             }}
    //           ></input>
    //         </div>
    //         <div className="jobQuestion-field-block">
    //           <input
    //             className="input"
    //             placeholder="--Answer 3--"
    //             onChange={(event) => {
    //               setAnswer3(event.target.value);
    //             }}
    //           ></input>
    //         </div>
    //         <div className="jobQuestion-field-block">
    //           <input
    //             className="input"
    //             placeholder="--Answer 4--"
    //             onChange={(event) => {
    //               setAnswer4(event.target.value);
    //             }}
    //           ></input>
    //         </div>
    //         <h4 className="jobQuestion-info-title">The Correct Answer...</h4>

    //         <div className="jobQuestion-answer">
    //           <input
    //             type="radio"
    //             id="answer"
    //             name="answer"
    //             value="1"
    //             onChange={(event) => {
    //               setCorrectAnswer(event.target.value);
    //             }}
    //           ></input>
    //           <label className="answer">Answer 1</label>
    //           <input
    //             type="radio"
    //             id="answer"
    //             name="answer"
    //             value="2"
    //             onChange={(event) => {
    //               setCorrectAnswer(event.target.value);
    //             }}
    //           ></input>
    //           <label className="answer">Answer 2</label>
    //           <input
    //             type="radio"
    //             id="answer"
    //             name="answer"
    //             value="3"
    //             onChange={(event) => {
    //               setCorrectAnswer(event.target.value);
    //             }}
    //           ></input>
    //           <label className="answer">Answer 3</label>
    //           <input
    //             type="radio"
    //             id="answer"
    //             name="answer"
    //             value="4"
    //             onChange={(event) => {
    //               setCorrectAnswer(event.target.value);
    //             }}
    //           ></input>
    //           <label className="answer">Answer 4</label>
    //         </div>
    //       </div>
    //       <button className="jobQuestion-btn-submit" onClick={addJob}>
    //         {" "}
    //         Add{" "}
    //       </button>
    //     </div>
    //   </div>
    // </>
  );
}

export default AddQuestion;
