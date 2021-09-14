import bg11Image from 'assets/img/bg/background_1920-11.jpg';
import bg18Image from 'assets/img/bg/background_1920-18.jpg';
import bg1Image from 'assets/img/bg/background_640-1.jpg';
import bg3Image from 'assets/img/bg/background_640-3.jpg';
import user1Image from 'assets/img/users/100_1.jpg';
import { UserCard } from 'components/Card';
import Page from 'components/Page';
import { bgCards, gradientCards, overlayCards } from 'demos/cardPage';
import { getStackLineChart, stackLineChartOptions } from 'demos/chartjs';
import React, { useContext, useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Typography,
  CardImg,
  CardImgOverlay,
  CardLink,
  CardText,
  CardTitle,
  Col,
  ListGroup,
  ListGroupItem,
  Row,
} from 'reactstrap';
import FormGroup from 'reactstrap/lib/FormGroup';
function Questionare() {
  const { id } = useParams();

  const [answer, setAnswer] = useState([id, 0, 0, 0, 0, 0]);
  const [data, setData] = useState(null);
  //const [correctAnswers, setCorrectAnswers] = useState(null);
  const [correction, serCorrection] = useState(null);
  var correctAnswers = 0;
  let history = useHistory();

  useEffect(() => {
    axios
      .post('http://localhost:3001/job/getQuestion', data)

      .then(response => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          setData(response.data);
        }
      })
      .catch(error => {
        alert(error);
      });
  }, []);

  function next() {
    console.log(data);
    var finalMarks = 0;

    for (let Qnumber = 1; Qnumber <= 5; Qnumber++) {
      if (answer[Qnumber] === data[Qnumber - 1].Correct) {
        console.log(answer[Qnumber] + '---' + data[Qnumber - 1].Correct);
        console.log(Qnumber + 'is Correct');
        finalMarks = finalMarks + 1;
      }
    }
    console.log(finalMarks);
    history.push('/addJobCV/' + id + finalMarks * 15051);
  }

  const Questions =
    data &&
    data.map(data => (
      <>
        <CardBody>
          <Card body>
            <Col md={12} sm={10} xs={10} className="mb-2">
              <Card className="flex-row">
                <CardBody>
                  {data.Qnumber}) {data.Question}{' '}
                </CardBody>
              </Card>
              <Card className="flex-row">
                <FormGroup>
                  <br></br>
                  <CardBody>
                    <input
                      className="answerRadio"
                      type="radio"
                      id="answer"
                      name={data.Qnumber}
                      value="1"
                      onChange={event => {
                        setAnswer(
                          answer.map((element, index) => {
                            if (index === data.Qnumber) {
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
                      name={data.Qnumber}
                      value="2"
                      onChange={event => {
                        setAnswer(
                          answer.map((element, index) => {
                            if (index === data.Qnumber) {
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
                      name={data.Qnumber}
                      value="3"
                      onChange={event => {
                        setAnswer(
                          answer.map((element, index) => {
                            if (index === data.Qnumber) {
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
                      name={data.Qnumber}
                      value="4"
                      onChange={event => {
                        setAnswer(
                          answer.map((element, index) => {
                            if (index === data.Qnumber) {
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
    ));
  return (
    <>
      {Questions}
      <CardBody>
        <Link to={'/jobAddvertisment/'+id}>
          <Button color="primary" size="LG">
            Back
          </Button>
        </Link>{' '}
       
          <Button color="success" size="LG" onClick={next}>
           Next
          </Button>
      </CardBody>
      ;
    </>
  );
}

export default Questionare;
