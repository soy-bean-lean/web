import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import bg11Image from 'assets/img/bg/background_1920-11.jpg';
import bg1Image from 'assets/img/bg/background_640-1.jpg';
import Page from 'components/Page';

import classnames from 'classnames';
import Typography from 'components/Typography';

import { Line } from 'react-chartjs-2';
import {
  Button,
  Card,
  CardBody,
  InputGroupAddon,
  InputGroup,
  FormGroup,
  Input,
  Badge,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  CardImg,
  CardImgOverlay,
  CardLink,
  CardText,
  CardTitle,
  Col,
  ListGroup,
  CardHeader,
  Table,
  ListGroupItem,
  Row,
} from 'reactstrap';
import { AuthContext } from '../../helpers/AuthContext';

const CardPage = props => {
  const [activeTab, setActiveTab] = useState('1');
  const [activeSubTab, setActiveSubTab] = useState('3');
  //const { authState, setAuthState } = useContext(AuthContext);
  const [memberId, setMemberId] = useState('');
  const [course, setCourse] = useState(null);
  const [enCourse, setEnCourse] = useState(null);

  useEffect(() => {
    //setMemberId(authState.id);
    const formData = {
      mId: 'cssl001',
    };
    axios
      .post('http://localhost:3001/csslcourse/getCourseList', formData)

      .then(response => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          setCourse(response.data);
        }
      })
      .catch(error => {
        alert(error);
      });

    axios
      .post('http://localhost:3001/csslcourse/getEnrollCourseList', formData)

      .then(response => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          setEnCourse(response.data);
        }
      })
      .catch(error => {
        alert(error);
      });
  }, []);

  const toggle = tab => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const toggleSub = tab => {
    if (activeSubTab !== tab) setActiveSubTab(tab);
  };

  const allCourseList =
    course &&
    course.map((course, i) => (
      <>
        <Link
          to={
            '/csslcourses/courseview/cssl00' +
            course.courseId +
            '/' +
            course.name
          }
          key={i}
          className="link-tag"
        >
          <Col md={12} sm={10} xs={10} className="mb-2">
            <Card className="flex-row">
              <CardImg
                src={'http://localhost:3001/uploads/' + course.image}
                style={{ width: 175, height: 150 }}
              />
              <CardBody>
                <h3>{course.name}</h3>
                <CardText>
                  Rating: {course.avgRate} | {course.noOfInteraction} students
                </CardText>
              </CardBody>
            </Card>
          </Col>
        </Link>
        <hr className="course-view-line"></hr>
      </>
    ));

  const enrollOngoingCourseList =
    enCourse &&
    enCourse.map((enCourse, i) => {
      if (enCourse.status == 'Ongoing') {
        return (
          <>
            <Link
              to={
                '/courseView/cssl00' + enCourse.courseId + '/' + enCourse.name
              }
              key={i}
              className="link-tag"
            >
              <Col md={12} sm={10} xs={10} className="mb-2">
                <Card className="flex-row">
                  <CardImg
                    src={'http://localhost:3001/uploads/' + enCourse.image}
                    style={{ width: 175, height: 150 }}
                  />
                  <CardBody>
                    <h3>{enCourse.name}</h3>
                    <CardText>{enCourse.status}</CardText>
                  </CardBody>
                </Card>
              </Col>
            </Link>
            <hr className="course-view-line"></hr>
          </>
        );
      }
    });

  const enrollCompletedCourseList =
    enCourse &&
    enCourse.map((enCourse, i) => {
      if (enCourse.status == 'Completed') {
        return (
          <>
            <Link
              to={
                '/courseView/cssl00' + enCourse.courseId + '/' + enCourse.name
              }
              key={i}
              className="link-tag"
            >
              <Col md={12} sm={10} xs={10} className="mb-2">
                <Card className="flex-row">
                  <CardImg
                    src={'http://localhost:3001/uploads/' + enCourse.image}
                    style={{ width: 175, height: 150 }}
                  />
                  <CardBody>
                    <h3>{enCourse.name}</h3>
                    <CardText>{enCourse.status}</CardText>
                  </CardBody>
                </Card>
              </Col>
            </Link>
          </>
        );
      }
    });

  return (
    <Page title="CSSL COURSES">
      <hr></hr>
      <Nav tabs>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '1' })}
            onClick={() => {
              toggle('1');
            }}
          >
            Courses
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '2' })}
            onClick={() => {
              toggle('2');
            }}
          >
            Enrolled Courses
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
          <Row>
            <Col sm="12">
              <Card className="mb-3">
                <CardHeader>
                  <InputGroup>
                    <Input
                      type="text"
                      className="note"
                      placeholder="What do you want to Learn"
                    />
                    <InputGroupAddon addonType="prepend">
                      <Button color="success" size="LG">
                        Search{' '}
                      </Button>
                    </InputGroupAddon>
                  </InputGroup>
                  <br></br>
                  <FormGroup row>
                    <Col sm={3}>
                      <Input type="select" className="note">
                        <option value="">Level</option>
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                      </Input>
                    </Col>
                    <Col sm={3}>
                      <Input
                        type="select"
                        className="note"
                        placeholder="Duration"
                      />
                    </Col>
                    <Col sm={3}>
                      <Input
                        type="select"
                        className="note"
                        placeholder="Category"
                      />
                    </Col>
                  </FormGroup>
                </CardHeader>
                <CardBody>{allCourseList}</CardBody>
              </Card>
            </Col>
          </Row>
        </TabPane>
        <TabPane tabId="2">
          {/* editing start */}
          <Nav tabs>
            <NavItem>
              <NavLink
                className={classnames({ active: activeSubTab === '3' })}
                onClick={() => {
                  toggleSub('3');
                }}
              >
                Ongoing Courses
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: activeSubTab === '4' })}
                onClick={() => {
                  toggleSub('4');
                }}
              >
                Completed Courses
              </NavLink>
            </NavItem>
          </Nav>
          <TabContent activeTab={activeSubTab}>
            <TabPane tabId="3">
              <Row>
                <Col sm="12">
                  <Card className="mb-3">
                    <CardHeader>
                      <Typography className="text-primary">Ongoing Courses</Typography>
                    </CardHeader>
                    <CardBody>{enrollOngoingCourseList}</CardBody>
                  </Card>
                </Col>
              </Row>
            </TabPane>
            <TabPane tabId="4">
              <Row>
                <Col sm="12">
                  <Card className="mb-3">
                    <CardHeader>
                      <Typography className="text-primary">Completed Courses</Typography>
                    </CardHeader>
                    <CardBody>
                      <CardBody>{enrollCompletedCourseList}</CardBody>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </TabPane>
          </TabContent>
          {/* editing end */}
        </TabPane>
      </TabContent>
    </Page>
  );
};

export default CardPage;
