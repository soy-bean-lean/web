
import Page from 'components/Page';

import React, { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

import {
  Button,
  Card,
  CardBody,
  Col,

} from 'reactstrap';
import FormGroup from 'reactstrap/lib/FormGroup';
function Questionare() {
  const { id } = useParams();

  const [answer, setAnswer] = useState([
    id,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
  ]);
  const [data, setData] = useState(null);
  //const [correctAnswers, setCorrectAnswers] = useState(null);
  const [correction, serCorrection] = useState(null);
  const [count, setCount] = useState(null);
  var correctAnswers = 0;
  let history = useHistory();
  useEffect(() => {
    axios
      .get('http://localhost:3001/job/getQuestion', { params: { id: id } })

      .then(response => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          setData(response.data);
          setCount(response.data.length);
        }
      })
      .catch(error => {
        alert(error);
      });
  }, []);

  function next() {

    var finalMarks = 0;
    for (let Qnumber = 1; Qnumber <= count; Qnumber++) {
      if (answer[Qnumber] === data[Qnumber - 1].Correct) {
        console.log(answer[Qnumber] + '---' + data[Qnumber - 1].Correct);
        console.log(Qnumber + 'is Correct');
        finalMarks = finalMarks + 1;
      } else {
        console.log(answer[Qnumber] + '---' + data[Qnumber - 1].Correct);
      }
    }
    history.push('/addJobCV/' + id + (finalMarks*871431678287616712873));
  }
  var questioNumber = 123;
  const Questions =
    data &&
    data.map(
      (data, number) => (
        (
          <>
            <CardBody>
              <Card body>
                <Col md={12} sm={10} xs={10} className="mb-2">
                  <Card className="flex-row">
                    <CardBody>{data.Question} </CardBody>
                  </Card>
                  <Card className="flex-row">
                    <FormGroup>
                      <br></br>
                      <CardBody>
                        <input
                          className="answerRadio"
                          type="radio"
                          id="answer"
                          name={number + 1}
                          value="1"
                          onChange={event => {
                            setAnswer(
                              answer.map((element, index) => {
                                console.log(index);
                                if (index === number + 1) {
                                  return event.target.value * 1;
                                } else {
                                  return element;
                                }
                              }),
                            );
                          }}
                        ></input>
                         {' '}
                        <label className="answer" for="html">
                          {data.Answer1}
                        </label>
                         <br></br>
                        <input
                          className="answerRadio"
                          type="radio"
                          id="answer"
                          name={number + 1}
                          value="2"
                          onChange={event => {
                            setAnswer(
                              answer.map((element, index) => {
                                console.log(index);

                                if (index === number + 1) {
                                  return event.target.value * 1;
                                } else {
                                  return element;
                                }
                              }),
                            );
                          }}
                        ></input>
                         {' '}
                        <label className="answer" for="html">
                          {data.Answer2}
                        </label>
                         <br></br>
                        <input
                          className="answerRadio"
                          type="radio"
                          id="answer"
                          name={number + 1}
                          value="3"
                          onChange={event => {
                            setAnswer(
                              answer.map((element, index) => {
                                console.log(index);

                                if (index === number + 1) {
                                  return event.target.value * 1;
                                } else {
                                  return element;
                                }
                              }),
                            );
                          }}
                        ></input>
                         {' '}
                        <label className="answer" for="html">
                          {data.Answer3}
                        </label>
                         <br></br>
                        <input
                          className="answerRadio"
                          type="radio"
                          id="answer"
                          name={number + 1}
                          value="4"
                          onChange={event => {
                            setAnswer(
                              answer.map((element, index) => {
                                console.log(index);

                                if (index === number + 1) {
                                  return event.target.value * 1;
                                } else {
                                  return element;
                                }
                              }),
                            );
                          }}
                        ></input>
                         {' '}
                        <label className="answer" for="html">
                          {data.Answer4}
                        </label>
                           <br></br>
                      </CardBody>
                         
                    </FormGroup>
                  </Card>
                </Col>
              </Card>
            </CardBody>
          </>
        )
      ),
    );
  return (
    <>
        <Page title= "Questionare" >
        <hr></hr>
      <Col sm="14" md={{ size: 10, offset: 1 }}>
        {Questions}
        <CardBody>
          <Link to={'/jobAddvertisment/' + id}>
            <Button color="primary" size="LG">
              Back
            </Button>
          </Link>{' '}
          <Button color="success" size="LG" onClick={next}>
            Next
          </Button>
        </CardBody>
      </Col>
      <hr></hr>
      </Page>
    </>
  );
}

export default Questionare;
