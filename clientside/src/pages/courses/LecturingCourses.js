import Page from 'components/Page';
import { Link } from 'react-router-dom';

import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';

import classnames from 'classnames';
import Typography from 'components/Typography';
import { AuthContext } from '../../helpers/AuthContext';
import { Line } from 'react-chartjs-2';
import {
  Button,
  Card,
  CardBody,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
 
  Col,
  CardHeader,
  Table,
  Row,
} from 'reactstrap';

const LecCourseList = props => {
  const [course, setCourse] = useState(null);
  const { authState, setAuthState } = useContext(AuthContext);

  useEffect(() => {
    const formData = {
      mId: 'cssl001',
    };
    axios
      .post('http://localhost:3001/csslcourse/', formData)

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
  }, []);
  const [activeTab, setActiveTab] = useState('1');

  const toggle = tab => {
    if (activeTab !== tab) setActiveTab(tab);
  };
  const allCourseList =
    course &&
    course.map((course, i) => (
      <>
        <tr>
          <th hidden="true">{i}</th>
          <td hidden="true">{course.courseId}</td>
          <td>{course.name}</td>
          <td>
            {course.status === 'OnGoing' ? (
              <Link
                to={'/courseView/cssl00' + course.courseId + '/' + course.name}
              >
                <Button
                  color="primary"
                  size="sm"
                  to={
                    '/courseView/cssl00' + course.courseId + '/' + course.name
                  }
                >
                  View{' '}
                </Button>
              </Link>
            ) : (
              <></>
            )}
            {course.status === 'Rejected' ? (
              <Link
                to={'/courseView/cssl00' + course.courseId + '/' + course.name}
              >
                <Button
                  color="danger"
                  size="sm"
                  to={
                    '/courseView/cssl00' + course.courseId + '/' + course.name
                  }
                >
                  View{' '}
                </Button>
              </Link>
            ) : (
              <></>
            )}

            {course.status === 'Pending' ? (
              <Link
                to={'/courseView/cssl00' + course.courseId + '/' + course.name}
              >
                <Button
                  color="warning"
                  size="sm"
                  to={
                    '/courseView/cssl00' + course.courseId + '/' + course.name
                  }
                >
                  View{' '}
                </Button>
              </Link>
            ) : (
              <></>
            )}
            {course.status === 'Approved' ? (
              <Link
                to={'/courseView/cssl00' + course.courseId + '/' + course.name}
              >
                <Button
                  color="success"
                  size="sm"
                  to={
                    '/courseView/cssl00' + course.courseId + '/' + course.name
                  }
                >
                  View{' '}
                </Button>
              </Link>
            ) : (
              <></>
            )}
          </td>
        </tr>
      </>
    ));

  const ongoingCourses =
    course &&
    course.map((course, i) =>
      course.status === 'OnGoing' ? (
        <>
          <tr>
            <th hidden="true">{i}</th>
            <td hidden="true">{course.courseId}</td>

            <td>{course.name}</td>
            <td>
              <Link
                to={'/courseView/cssl00' + course.courseId + '/' + course.name}
              >
                <Button
                  color="primary"
                  size="sm"
                  to={
                    '/courseView/cssl00' + course.courseId + '/' + course.name
                  }
                >
                  View{' '}
                </Button>
              </Link>
            </td>
          </tr>
        </>
      ) : (
        <></>
      ),
    );

  const approvedCourses =
    course &&
    course.map((course, i) =>
      course.status === 'Approved' ? (
        <>
          <tr>
            <th hidden="true">{i}</th>
            <td hidden="true">{course.courseId}</td>
            <td>{course.name}</td>
            <td>
              <Link
                to={'/courseView/cssl00' + course.courseId + '/' + course.name}
              >
                <Button
                  color="success"
                  size="sm"
                  to={
                    '/courseView/cssl00' + course.courseId + '/' + course.name
                  }
                >
                  View{' '}
                </Button>
              </Link>
            </td>
          </tr>
        </>
      ) : (
        <></>
      ),
    );

  const pendingCourses =
    course &&
    course.map((course, i) =>
      course.status === 'Pending' ? (
        <>
          <tr>
            <th hidden="true">{i}</th>
            <td hidden="true">{course.courseId}</td>
            <td>{course.name}</td>
            <td>
              <Link
                to={'/courseView/cssl00' + course.courseId + '/' + course.name}
              >
                <Button
                  color="warning"
                  size="sm"
                  to={
                    '/courseView/cssl00' + course.courseId + '/' + course.name
                  }
                >
                  View{' '}
                </Button>
              </Link>
            </td>
          </tr>
        </>
      ) : (
        <></>
      ),
    );

  const rejectedCourses =
    course &&
    course.map((course, i) =>
      course.status === 'Rejected' ? (
        <>
          <tr>
            <th hidden="true">{i}</th>
            <td hidden="true">{course.courseId}</td>
            <td>{course.name}</td>
            <td>
              <Link
                to={'/courseView/cssl00' + course.courseId + '/' + course.name}
              >
                <Button
                  color="danger"
                  size="sm"
                  to={
                    '/courseView/cssl00' + course.courseId + '/' + course.name
                  }
                >
                  View{' '}
                </Button>
              </Link>
            </td>
          </tr>
        </>
      ) : (
        <></>
      ),
    );

  return (
    <Page title="Lecturing Courses">
      <hr></hr>
      <Link to="/csslcourse/addnewcourse">
        <Button color="success">Add New Course</Button>
      </Link>
      <br></br>
      <hr></hr>
      <Nav tabs>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '1' })}
            onClick={() => {
              toggle('1');
            }}
          >
            All
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '2' })}
            onClick={() => {
              toggle('2');
            }}
          >
            OnGoing
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '3' })}
            onClick={() => {
              toggle('3');
            }}
          >
            Approved
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '4' })}
            onClick={() => {
              toggle('4');
            }}
          >
            Pending
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '5' })}
            onClick={() => {
              toggle('5');
            }}
          >
            Rejected
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
          <Row>
            <Col sm="12">
              <Card className="mb-3">
                <CardHeader>
                  <Typography className="text-info">
                    All Courses
                  </Typography>
                </CardHeader>
                <CardBody>
                  <Card body>
                    <Table {...{ ['striped']: true }}>
                      <tbody>{allCourseList}</tbody>
                    </Table>
                  </Card>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </TabPane>
        <TabPane tabId="2">
          <Row>
            <Col sm="12">
              <Card className="mb-3">
                <CardHeader>
                  <Typography className="text-primary">
                    OnGoing Courses
                  </Typography>
                </CardHeader>
                <CardBody>
                  <Card body>
                    <Table {...{ ['striped']: true }}>
                      <tbody>{ongoingCourses}</tbody>
                    </Table>
                  </Card>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </TabPane>

        <TabPane tabId="3">
          <Row>
            <Col sm="12">
              <Card className="mb-3">
                <CardHeader>
                  <Typography className="text-success">
                    Approved Courses
                  </Typography>
                </CardHeader>
                <CardBody>
                  <Card body>
                    <Table {...{ ['striped']: true }}>
                      <tbody>{approvedCourses}</tbody>
                    </Table>
                  </Card>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </TabPane>
        <TabPane tabId="4">
          <Row>
            <Col sm="12">
              <Card className="mb-3">
                <CardHeader>
                  {' '}
                  <Typography className="text-warning">
                    Pending Courses
                  </Typography>
                </CardHeader>
                <CardBody>
                  <Card body>
                    <Table {...{ ['striped']: true }}>
                      <tbody>{pendingCourses}</tbody>
                    </Table>
                  </Card>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </TabPane>

        <TabPane tabId="5">
          <Row>
            <Col sm="12">
              <Card className="mb-3">
                <CardHeader>
                  <Typography className="text-danger">
                    Rejected Courses
                  </Typography>
                </CardHeader>
                <CardBody>
                  <Card body>
                    <Table {...{ ['striped']: true }}>
                      <tbody>{rejectedCourses}</tbody>
                    </Table>
                  </Card>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </TabPane>
      </TabContent>
    </Page>
  );
};

export default LecCourseList;
