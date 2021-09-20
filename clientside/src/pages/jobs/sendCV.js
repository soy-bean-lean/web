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
  InputGroupAddon,
  InputGroup,
  Alert,
  CardBody,
  CardHeader,
  Typography,
  CardImg,
  Row,
  CardImgOverlay,
  CardLink,
  CardText,
  CardTitle,
  Col,
  Table,
  Input,
  ListGroup,
  ListGroupItem,
} from 'reactstrap';
import { func } from 'prop-types';

const tableTypes = ['striped'];

function JobView() {
  const [application, setJobApplications] = useState(null);
  const [compayData, setCompayData] = useState(null);
  const [result, setResult] = useState();
  let history = useHistory();

  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [image, setJobImage] = useState('');
  const { id } = useParams();

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
  function sendEmail() {
    const data = {
      jobId: id,
      password: password,
      username: username,
    };

    axios
      .post('http://localhost:3001/job/sendEmail', data)

      .then(response => {
        if (response.data.error) {
          setResult('err');
          setTimeout(
            function () {
              history.push('/dashboard');
            },
  
            2000,
          );          } else {
          setResult('done');
          setTimeout(
            function () {
              history.push('/dashboard');
            },
  
            2000,
          );        }
      })
      .catch(error => {
        setResult('err');
        setTimeout(
          function () {
            history.push('/jobAddvertisment/' + id);
          },

          2000,
        );
      });
  }

  useEffect(() => {
    axios
      .get('http://localhost:3001/job/getJobView', { params: { id: id } })

      .then(response => {
        if (response.data.error) {
          console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
        } else {
          setCompayData(response.data);
          console.log(compayData);
          setJobImage(
            'http://localhost:3001/uploads/jobvacancy/' +
              response.data[0].advertisment,
          );
        }
      })
      .catch(error => {
        console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
      });
    axios
      .get('http://localhost:3001/job/getCVtoSend', { params: { id: id } })
      .then(response => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          setJobApplications(response.data);
        }
      })
      .catch(error => {
        alert(error);
      });
  }, []);

  const company =
    compayData &&
    compayData.map(compayData => (
      <>
        <CardBody>
          <Card body>
            <Col md={12} sm={10} xs={10} className="mb-2">
              <Card className="flex-row">
                <CardImg src={image} style={{ width: 300, height: 200 }} />

                <CardBody>
                  <h1 className="a">{compayData.companyName}</h1>
                  <CardText>
                    <h2 className="a">{compayData.designation}</h2>
                    <h4 className="a">{compayData.location}</h4>
                  </CardText>
            
                  <h4 className="a">{compayData.contact}</h4>
                  <h4 className="a">{compayData.email}</h4>
            
                  <CardTitle>{compayData.description}</CardTitle>
                </CardBody>
              </Card>
              <Card className="flex-row">
                <CardBody>
                  <Col sm="12" md={{ size: 6, offset: 3 }}>
                    <InputGroup>
                      <Input
                        type="email"
                        className="note"
                        onChange={e => setUsername(e.target.value)}
                        required
                        placeholder="Enter System Email "
                      />
                      
                    </InputGroup>
                    <br>
                    </br>
                    <InputGroup>
      
                      {" "}
                      <InputGroupAddon addonType="prepend">
                        <Button color="success" size="LG" onClick={sendEmail}>
                          Send CV{' '}
                        </Button>
                      </InputGroupAddon>
                    </InputGroup>
                  </Col>
                  {/* <Button color="success" size="LG" onClick={sendEmail}>
                    Send CV to Company{' '}
                  </Button>
          */}
                </CardBody>
              </Card>
            </Col>
          </Card>
        </CardBody>
      </>
    ));
  const applications =
    application &&
    application.map(applicationData => (
      <>
        <tr>
          <td hidden> {applicationData.jvId}</td>
          <td> {applicationData.date}</td>
          <td>
            {applicationData.firstName} {applicationData.lastName}
          </td>
          <td>{applicationData.email}</td>

          <td>
            <b>{applicationData.marks} %</b>
          </td>

          <td>
            <center>
           
                <Button color="success" size="sm">
                  <a color="success" className='ancorTag'
                    href={
                      'http://localhost:3001/uploads/jobApplicationCVs/' +
                      applicationData.cv
                    }
                    download
                  >
                    Download CV{' '}
                  </a>
                </Button>
            </center>
          </td>
        </tr>
      </>
    ));
  return (
    <>
      <Page title="Job Applications">
      
        <hr></hr>
        <center>
          {msg()}
          </center>
        {company}
        <Row>
          <Col sm="12">
            {tableTypes.map((tableType, index) => (
              <Row>
                <Col>
                  <Card className="mb-3">
                    <CardBody>
                      <Row>
                        <Col>
                          <Card body>
                            <Table {...{ ['striped']: true }}>
                              <tbody> 
                              
                              
                              <th>
                                Date
                              </th>
                              <th>
                                Applicants
                              </th>
                              <th>
                               Email
                              </th>
                              <th>
                              Marks
                              </th>
                              {applications}
                              </tbody>
                            </Table>
                          </Card>
                        </Col>
                      </Row>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            ))}
          </Col>
        </Row>
       
      </Page>
    </>
  );
}

export default JobView;
