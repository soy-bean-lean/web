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
  const [qType, getQuestionType] = useState(null);
  const [type, setType] = useState(null);
  const [typeN, setTypeN] = useState(null);

  //  const [image, setImage] = useState("");

  let history = useHistory();

  const addQuestion = () => {
    console.log(type);
    console.log(typeN);
    var finalType;
    if (type == 'Other') {
      console.log('+++++');
      finalType = typeN;
    } else {
      console.log('===');
      finalType = type;
    }
    const data = {
      question: question,
      ans1: ans1,
      ans2: ans2,
      ans3: ans3,
      ans4: ans4,
      correct: correct,
      type: finalType,
    };
    console.log(data);
    //|| ans1 !== "" || ans2 !== "" || ans3 !== "" || ans4 !== "" || correct !== ""
    if (
      question !== '' ||
      ans1 !== '' ||
      ans2 !== '' ||
      ans3 !== '' ||
      ans4 !== '' ||
      correct !== ''
    ) {
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
                history.push('/addJobQuestions');

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

  const allQuestionTypes =
    qType &&
    qType.map((li, i) => {
      return (
        <option key={i} value={li.name}>
          {li.type}
        </option>
      );
    }, this);

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

  function renderDetails(check) {
    console.log('TYpe is ' + type);
    console.log('qType is ' + qType);

    if (check == 'Other') {
      return (
        <FormGroup row>
          <Label for="exampleEmail" sm={3}>
            Custom Type
          </Label>
          <Col sm={9}>
            <Input
              type="text"
              name="email"
              onChange={event => {
                setTypeN(event.target.value);
              }}
            />
          </Col>
        </FormGroup>
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
                      onChange={event => {
                        setQuestion(event.target.value);
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
                      onChange={e => setType(e.target.value)}
                    >
                      <option value="type"></option>
                      {allQuestionTypes}
                      <option value="Other">Other</option>
                    </Input>
                  </Col>
                </FormGroup>
                {renderDetails(type)}

                <FormGroup row>
                  <Label for="exampleEmail" sm={3}>
                    Answer 1
                  </Label>
                  <Col sm={9}>
                    <Input
                      required
                      type="textarea"
                      className="input"
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
                      type="textarea"
                      className="input"
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
                      type="textarea"
                      className="input"
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
                      type="textarea"
                      className="input"
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
  );
}

export default AddQuestion;
