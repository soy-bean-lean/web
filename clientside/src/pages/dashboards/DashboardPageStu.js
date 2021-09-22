
import Page from 'components/Page';

import React from 'react';

import {
  Badge,
  Button,
  Card,
  CardBody,
  CardDeck,
  CardGroup,
  CardHeader,
  CardTitle,
  Col,
  ListGroup,
  ListGroupItem,
  Row,
  CardSubtitle,
  CardText,
  CardLink,
  CardImg,
} from 'reactstrap';

import Calendar from 'react-calendar';
import './calender.css';


const today = new Date();
const lastWeek = new Date(
  today.getFullYear(),
  today.getMonth(),
  today.getDate() + 5,
);
const a = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 15);



function DashboardPage() { 

  return (
    <>
      <Page className="DashboardPage" title="Dashboard">
        <Badge color="warning" pill className="mr-1">
          Student Member
        </Badge>

        <hr />
        <Row>
          <Col xs="8">
            <Card className="shadow">
              <CardHeader className="text-primary">Courses</CardHeader>
              <Row>
                <Col xs="2">
                  <CardBody>
                    <CardImg
                      src={
                        'http://localhost:3001/uploads/csslCourses/1630861057365-react-native.png'
                      }
                      style={{ width: 120, height: 130 }}
                    />
                  </CardBody>
                </Col>
                <Col xs="10">
                  <CardBody>
                    <h3 className="ml-2">React Native + Hooks Course</h3>
                    <Badge color="warning" pill className="ml-2 mb-2">
                      Beginner
                    </Badge>
                    <CardText className="ml-2">
                      We'll start by mastering the fundamentals of React,
                      including JSX, “props", “state", and event handling.
                      Source code is provided for each lecture
                    </CardText>
                  </CardBody>
                </Col>
              </Row>
              <Row>
                <Col xs="2">
                  <CardBody>
                    <CardImg
                      src={
                        'http://localhost:3001/uploads/csslCourses/1630940718332-react.png'
                      }
                      style={{ width: 120, height: 130 }}
                    />
                  </CardBody>
                </Col>
                <Col xs="10">
                  <CardBody>
                    <h3 className="ml-2">React</h3>
                    <Badge color="warning" pill className="ml-2 mb-2 mt-0">
                      Intermediate
                    </Badge>
                    <CardText className="ml-2">
                      React enables you to declaratively describe user
                      interfaces in terms of their state, and it will do the
                      heavy lifting of natively building them for you.
                    </CardText>
                  </CardBody>
                  <hr/>
                  <center>
                  <CardLink href="http://localhost:3000/csslcourses" className="text-md-right">
                    View More
                  </CardLink>
                  </center>
                </Col>
              </Row>
            </Card>
          </Col>
          <Col xs="4">
            <Card className="shadow">
              <CardHeader className="mt-0 mb-0">Upcoming activities</CardHeader>
              <CardBody>
                <Calendar
                  value={(a, lastWeek)}
                  className="calender"
                />
              </CardBody>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col xs="8">
            <Card className="shadow">
              <CardHeader className="text-primary">Workshops</CardHeader>
              <Row>
                <Col xs="2">
                  <CardBody>
                    <CardImg
                      src={
                        'http://localhost:3001/uploads/jobvacancy/1631362241389-w2.jpeg'
                      }
                      style={{ width: 120, height: 130 }}
                    />
                  </CardBody>
                </Col>
                <Col xs="10">
                  <CardBody>
                    <h3 className="ml-2">Java Bootcamp</h3>
                    <Badge color="warning" pill className="ml-2 mb-2">
                      Intermediate
                    </Badge>
                    <CardText className="ml-2">
                      You may thinking that there are many other programming
                      languages in the world like C++, Python and much more like
                      that then why we need Java. Well, every programming
                      language has it's own features.
                    </CardText>
                  </CardBody>
                </Col>
              </Row>
              <Row>
                <Col xs="2">
                  <CardBody>
                    <CardImg
                      src={
                        'http://localhost:3001/uploads/csslCourses/1630940718332-angular.png'
                      }
                      style={{ width: 120, height: 130 }}
                    />
                  </CardBody>

                </Col>
                  <hr/>
                <Col xs="10">
                  <CardBody>
                    <h3 className="ml-2">Advanced Angular</h3>
                    <Badge color="warning" pill className="ml-2 mb-2 mt-0">
                      Hard
                    </Badge>
                    <CardText className="ml-2">
                      Structure with monorepos, Nx, and Strategic Design (DDD)
                      Microfrontends with Module Federation and Angular Elements
                      Reactive architectures with RxJS State management patterns
                      with NGRX
                    </CardText>
                  </CardBody>
                  <hr/>
                  <center>
                  <CardLink href="http://localhost:3000/csslworkshops" className="text-md-right">
                    View More
                  </CardLink>
                  </center>
                </Col>
              </Row>
            </Card>
          </Col>
          <Col xs="4">
            <Card className="shadow">
              <CardHeader>
                <div className="d-flex justify-content-between align-items-center">
                  <span>Recent Activities</span>
                </div>
              </CardHeader>
              <CardBody className="mt-0 mb-0">
                <CardTitle tag="h5">
                  <b>Participated to Machine Learning Workshop</b>
                </CardTitle>
                <CardSubtitle tag="h6" className="mb-2 text-muted">
                Your Participation in the Machine Learning workshop which was conducted by Dr Ajantha Athukorala was confirmed by the Computer Society of Sri Lanka.
                </CardSubtitle>

                <CardTitle tag="h5">
                  <b>Cerfificate for the Java E2EE diploma</b>
                </CardTitle>
                <CardSubtitle tag="h6" className="mb-2 text-muted">
                You have received the diploma certificate of the Java E2EE diploma course which was conducted by the Computer Society of Sri Lanka.
                </CardSubtitle>

                <CardTitle tag="h5">
                  <b>Application for the Software Engineering position</b>
                </CardTitle>
                <CardSubtitle tag="h6" className="mb-2 text-muted">
                  Your CV for the Software Engineering position was sent to WSO2. You will be notice in the future about thier feedback
               
                </CardSubtitle>
                
                <hr />
                <center>
                  <CardLink href="http://localhost:3000/csslworkshops" className="text-center">
                    View More
                  </CardLink>
                </center>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Page>
    </>
  );
}

export default DashboardPage;
