import Page from 'components/Page';
import React, { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

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

function UpdateQuestion() {
  const { id } = useParams();

  const [question, setQuestion] = useState('');
  const [ans1, setAnswer1] = useState('');
  const [ans2, setAnswer2] = useState('');
  const [ans3, setAnswer3] = useState('');
  const [ans4, setAnswer4] = useState('');
  const [correct, setCorrectAnswer] = useState(0);
  const [result, setResult] = useState();
  const [data, setData] = useState(null);

  //  const [image, setImage] = useState("");

  let history = useHistory();

  const updateQuestion = () => {
    const data = {
      qid: id,
      question: question,
      ans1: ans1,
      ans2: ans2,
      ans3: ans3,
      ans4: ans4,
      correct: correct,
    };
    if (
      question !== '' ||
      ans1 !== '' ||
      ans2 !== '' ||
      ans3 !== '' ||
      ans4 !== '' ||
      correct !== ''
    ) {
      axios
        .post('http://localhost:3001/job/updateQuestion', data)
        .then(response => {
          if (response.data.error) {
            setResult('err');
            setTimeout(
              function () {
                history.push('/managejobs');
              },

              2000,
            );
          } else {
            setResult('done');

            setTimeout(
              function () {
                history.push('/managejobs');
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
          history.push('/managejobs');
        },

        2000,
      );
    }
  };

  useEffect(() => {
    const data = {
      jid: id,
    };

    axios
      .get('http://localhost:3001/job/aaa', { params: { id: id } })

      .then(response => {
        if (response.data.error) {
          //    alert(response.data.error);
        } else {
          console.log(response.data[0]);
          setQuestion(response.data[0].Question);
          setAnswer1(response.data[0].Answer1);
          setAnswer2(response.data[0].Answer2);
          setAnswer3(response.data[0].Answer3);
          setAnswer4(response.data[0].Answer4);
          setCorrectAnswer(response.data[0].Correct);
        }
      })
      .catch(error => {
        //   alert(error);
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
    <Page title="Job Questions">
      <Col sm="10" md={{ size: 8, offset: 2 }}>
        <center>
          {msg()}
          <Card>
            <CardHeader>Edit Job Questions</CardHeader>

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
                      value={question}
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
                      value={ans1}
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
                      value={ans2}
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
                      value={ans3}
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
                      value={ans4}
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
                      type="number"
                      min="1"
                      max="4"
                      name="select"
                      value={correct}
                      onChange={event => {
                        setCorrectAnswer(event.target.value);
                      }}
                    >
                      
                    </Input>
                  </Col>
                </FormGroup>

                <FormGroup check row>
                  <Col sm={{ size: 15 }}>
                    <Button onClick={updateQuestion} color="success">
                      Update Question
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

export default UpdateQuestion;
