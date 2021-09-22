import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Page from 'components/Page';
import classnames from 'classnames';
import Typography from 'components/Typography';

import { Line } from 'react-chartjs-2';
import {
  Button,
  Card,
  CardBody,
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
const tableTypes = ['striped'];

const CourseApproval = props => {

  const [activeTab, setActiveTab] = useState('1');

  const [data, setData] = useState([]);
  //const [user, setUser] = useState(userDetails);
  const [approvedCourses, setApprovedCourses] = useState(null);
  const [rejectedCourses, setRejecteddCourses] = useState(null);
  const [pendingCourses, setPendingCourses] = useState(null);
  const [deleteCourses, setDeletedCourses] = useState(null);
  const [pendingCount, setPending] = useState(null);
  const toggle = tab => {
    if (activeTab !== tab) setActiveTab(tab);
  };
  useEffect(() => {
    axios
      .post('http://localhost:3001/council/CourseApproved', data)

      .then(response => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          setApprovedCourses(response.data);
          //setApprovedCourses(response.data.length);
        }
      })
      .catch(error => {
        alert(error);
      });
  }, []);

  useEffect(() => {
    axios
      .post('http://localhost:3001/council/CoursePending', data)

      .then(response => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          setPendingCourses(response.data);
          setPending(response.data.length);
        }
      })
      .catch(error => {
        alert(error);
      });
  }, []);

  useEffect(() => {
    axios
      .post('http://localhost:3001/council/CourseDeleted', data)

      .then(response => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          setDeletedCourses(response.data);
        }
      })
      .catch(error => {
        alert(error);
      });
  }, []);

  useEffect(() => {
    axios
      .post('http://localhost:3001/council/CoursesRejected', data)

      .then(response => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          setRejecteddCourses(response.data);
        }
      })
      .catch(error => {
        alert(error);
      });
  }, []);
  const pending =
  pendingCourses &&
  pendingCourses.map((data, i) => {
      return (
        <>
          <tr>
            <td>{data.name}</td>
            <td>{data.title}. {data.firstName} {data.lastName}</td>
            <td>
              <center>
                <Badge color="warning" pill className="mr-1">
                  {data.skillLevel.toUpperCase()}{' '}
                </Badge>
              </center>
            </td>
          
            <td>
            <Link to={'/courseapproval/csslcourses/cssl00' + data.courseId + '/' + data.name}>
              <Button
                pill
                color="success"
                size="sm"
                //to={'/memberView/' + data.id}
              >
                View{' '}
              </Button>
            </Link>
          </td>
          </tr>
        </>
      );
    });

  const approved =
  approvedCourses &&
  approvedCourses.map(data => (
      <>
      <tr>
        <td>{data.name}</td>
        <td>{data.title}. {data.firstName} {data.lastName}</td>
        <td>
          <center>
            <Badge color="warning" pill className="mr-1">
              {data.skillLevel.toUpperCase()}{' '}
            </Badge>
          </center>
        </td>
        <td>
          <Badge pill color="success" className="mr-1">
            Approved
          </Badge>
        </td>
      </tr>
    </>
    ));

  const deleted =
  deleteCourses &&
  deleteCourses.map(data => (
      <>
      <tr>
        <td>{data.name}</td>
        <td>{data.title}. {data.firstName} {data.lastName}</td>
        <td>
          <center>
            <Badge color="warning" pill className="mr-1">
              {data.skillLevel.toUpperCase()}{' '}
            </Badge>
          </center>
        </td>

        <td>
          <Badge pill color="danger" className="mr-1">
            Deleted
          </Badge>
        </td>
      </tr>
    </>
    ));

  const rejected =
  rejectedCourses &&
  rejectedCourses.map(data => (
      <>
      <tr>
        <td>{data.name}</td>
        <td>{data.title}. {data.firstName} {data.lastName}</td>
        <td>
          <center>
            <Badge color="warning" pill className="mr-1">
              {data.skillLevel.toUpperCase()}{' '}
            </Badge>
          </center>
        </td>
        <td>
          <Badge pill color="danger" className="mr-1">
            Rejected
          </Badge>
        </td>
      </tr>
    </>
    ));


  return (
    <Page title="Course Approval">
      <hr></hr>

      <Nav tabs>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '1' })}
            onClick={() => {
              toggle('1');
            }}
          >
            Pending Course Approvals 
            {pendingCount > 0 && (<Badge color="info"> {pendingCount}</Badge>)}
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '2' })}
            onClick={() => {
              toggle('2');
            }}
          >
            Approved Courses
          </NavLink>
        </NavItem>

        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '3' })}
            onClick={() => {
              toggle('3');
            }}
          >
            Rejected Courses
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '4' })}
            onClick={() => {
              toggle('4');
            }}
          >
            Deleted Courses{' '}
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
          <Row>
            <Col sm="12">
              <Card className="mb-3">
                <CardBody>
                  <Card body>
                    <Table {...{ ['striped']: true }}>
                      <tbody>{pending}</tbody>
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
                <CardBody>
                  <Card body>
                    <Table {...{ ['striped']: true }}>
                      <tbody>{approved}</tbody>
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
                <CardBody>
                  <Card body>
                    <Table {...{ ['striped']: true }}>
                      <tbody>{rejected}</tbody>
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
                <CardBody>
                  <Card body>
                    <Table {...{ ['striped']: true }}>
                      <tbody>{deleted}</tbody>
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

export default CourseApproval;
