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
const RegistrationVerification = props => {
  const [activeTab, setActiveTab] = useState('1');

  const [data, setData] = useState([]);
  //const [user, setUser] = useState(userDetails);
  const [noApprovedUsers, setnoApprovedUsers] = useState(null);
  const [noRejectedUsers, setnoRejecteddUsers] = useState(null);
  const [noPendingUsers, setnoPendingUsers] = useState(null);
  const [count, setnoPendingUserCount] = useState(null);
  const [all, setAll] = useState(null);
  const toggle = tab => {
    if (activeTab !== tab) setActiveTab(tab);
  };
  useEffect(() => {
    axios
      .post('http://localhost:3001/secretary/regApproved', data)

      .then(response => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          setnoApprovedUsers(response.data);
          //setnoApprovedUsers(response.data.length);
        }
      })
      .catch(error => {
        alert(error);
      });
  }, []);

  useEffect(() => {
    axios
      .post('http://localhost:3001/secretary/regRejected', data)

      .then(response => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          setnoRejecteddUsers(response.data);
        }
      })
      .catch(error => {
        alert(error);
      });
  }, []);

  useEffect(() => {
    axios
      .post('http://localhost:3001/secretary/regVerified', data)

      .then(response => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          setnoPendingUsers(response.data);
          setnoPendingUserCount(response.data.length);
        }
      })
      .catch(error => {
        alert(error);
      });
  }, []);

  useEffect(() => {
    axios
      .post('http://localhost:3001/council/allReq', data)

      .then(response => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          setAll(response.data);
        }
      })
      .catch(error => {
        alert(error);
      });
  }, []);
  const users =
    all &&
    all.map((data, i) => {
      if (data.activity == 0) {
        return (
          <>
            <tr>
              <td>
                {data.title} {data.firstName} {data.lastName}
              </td>
              <td>
                <center>
                  <Badge color="warning" pill className="mr-1">
                    {data.currentStatus.toUpperCase()}{' '}
                  </Badge>
                  <Badge color="warning" pill className="mr-1">
                    {'-->'}
                  </Badge>

                  <Badge color="warning" pill className="mr-1">
                    {data.requestedStatus.toUpperCase()}{' '}
                  </Badge>
                </center>
              </td>
              <td>{data.contactNumber}</td>
              <td>{data.email}</td>
              <td>{data.registeredDate}</td>
              <td>
                <center>
                  <Badge pill color="primary" className="mr-1">
                    Pending
                  </Badge>
                </center>
              </td>
            </tr>
          </>
        );
      } else if (data.activity == 1) {
        return (
          <>
            <tr>
              <td>
                {data.title} {data.firstName} {data.lastName}
              </td>
              <td>
                <center>
                  <Badge color="warning" pill className="mr-1">
                    {data.currentStatus.toUpperCase()}{' '}
                  </Badge>
                  <Badge color="warning" pill className="mr-1">
                    {'-->'}
                  </Badge>

                  <Badge color="warning" pill className="mr-1">
                    {data.requestedStatus.toUpperCase()}{' '}
                  </Badge>
                </center>
              </td>
              <td>{data.contactNumber}</td>
              <td>{data.email}</td>
              <td>{data.registeredDate}</td>
              <td>
                <center>
                  <Badge pill color="success" className="mr-1">
                    Approved
                  </Badge>
                </center>
              </td>
            </tr>
          </>
        );
      } else if (data.activity == 2) {
        return (
          <>
            <tr>
              <td>
                {data.title} {data.firstName} {data.lastName}
              </td>
              <td>
                <center>
                  <Badge color="warning" pill className="mr-1">
                    {data.currentStatus.toUpperCase()}{' '}
                  </Badge>
                  <Badge color="warning" pill className="mr-1">
                    {'-->'}
                  </Badge>

                  <Badge color="warning" pill className="mr-1">
                    {data.requestedStatus.toUpperCase()}{' '}
                  </Badge>
                </center>
              </td>
              <td>{data.contactNumber}</td>
              <td>{data.email}</td>
              <td>{data.registeredDate}</td>
              <td>
                <center>
                  <Badge pill color="danger" className="mr-1">
                    Rejected
                  </Badge>
                </center>
              </td>
            </tr>
          </>
        );
      }
    });

  const approved =
    all &&
    all.map((data, i) => {
      if (data.activity == 1) {
        return (
          <>
            <tr>
              <td>
                {data.title} {data.firstName} {data.lastName}
              </td>
              <td>
                <center>
                  <Badge color="warning" pill className="mr-1">
                    {data.currentStatus.toUpperCase()}{' '}
                  </Badge>
                  <Badge color="warning" pill className="mr-1">
                    {'-->'}
                  </Badge>

                  <Badge color="warning" pill className="mr-1">
                    {data.requestedStatus.toUpperCase()}{' '}
                  </Badge>
                </center>
              </td>
              <td>{data.contactNumber}</td>
              <td>{data.email}</td>
              <td>{data.registeredDate}</td>
              <td>
                <center>
                  <Badge pill color="success" className="mr-1">
                    Approved
                  </Badge>
                </center>
              </td>
            </tr>
          </>
        );
      }
    });

  const rejected =
    all &&
    all.map((data, i) => {
      if (data.activity == 2) {
        return (
          <>
            <tr>
              <td>
                {data.title} {data.firstName} {data.lastName}
              </td>
              <td>
                <center>
                  <Badge color="warning" pill className="mr-1">
                    {data.currentStatus.toUpperCase()}{' '}
                  </Badge>
                  <Badge color="warning" pill className="mr-1">
                    {'-->'}
                  </Badge>

                  <Badge color="warning" pill className="mr-1">
                    {data.requestedStatus.toUpperCase()}{' '}
                  </Badge>
                </center>
              </td>
              <td>{data.contactNumber}</td>
              <td>{data.email}</td>
              <td>{data.registeredDate}</td>
              <td>
                <center>
                  <Badge pill color="danger" className="mr-1">
                    Rejected
                  </Badge>
                </center>
              </td>
            </tr>
          </>
        );
      }
    });

  const pending =
    all &&
    all.map((data, i) => {
      if (data.activity == 0) {
        return (
          <>
            <tr>
              <td>
                {data.title} {data.firstName} {data.lastName}
              </td>
              <td>
                <center>
                  <Badge color="warning" pill className="mr-1">
                    {data.currentStatus.toUpperCase()}{' '}
                  </Badge>
                  <Badge color="warning" pill className="mr-1">
                    {'-->'}
                  </Badge>

                  <Badge color="warning" pill className="mr-1">
                    {data.requestedStatus.toUpperCase()}{' '}
                  </Badge>
                </center>
              </td>
              <td>{data.contactNumber}</td>
              <td>{data.email}</td>
              <td>{data.registeredDate}</td>
              <td>
                <center>
                  <Link
                    /*to={'/cpdView/' + data.recordId}*/ to={
                      '/upgradeView/' +  data.id + '/' }
                  >
                    <Button pill color="success" size="sm">
                      View Request{' '}
                    </Button>
                  </Link>
                </center>
              </td>
            </tr>
          </>
        );
      }
    });

  return (
    <Page title="User Requests">
      <hr></hr>

      <Nav tabs>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '1' })}
            onClick={() => {
              toggle('1');
            }}
          >
            Pending User Requests
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '2' })}
            onClick={() => {
              toggle('2');
            }}
          >
            All Users Requests
          </NavLink>
        </NavItem>

        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '3' })}
            onClick={() => {
              toggle('3');
            }}
          >
            Approved User Requests
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '4' })}
            onClick={() => {
              toggle('4');
            }}
          >
            Rejected User Requests
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="2">
          <Row>
            <Col sm="12">
              <Card className="mb-3">
                <CardBody>
                  <Card body>
                    <Table {...{ ['striped']: true }}>
                      <tbody>{users}</tbody>
                    </Table>
                  </Card>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </TabPane>
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
        <TabPane tabId="3">
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
        <TabPane tabId="4">
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
      </TabContent>
    </Page>
  );
};

export default RegistrationVerification;
