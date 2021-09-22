import Page from 'components/Page';
import { AuthContext } from '../../helpers/AuthContext';
import { Link } from 'react-router-dom';

import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css';
import '../../main.css';

import classnames from 'classnames';
import Typography from 'components/Typography';

import { Line } from 'react-chartjs-2';
import {
  Button,
  Card,
  Badge,
  CardBody,
  Nav,
  NavItem,
  InputGroup,
  Input,
  NavLink,
  TabContent,
  TabPane,
  CardImg,
  CardText,
  Col,
  Table,
  CardHeader,
  Row,
} from 'reactstrap';
const tableTypes = ['striped'];

const ManageWorkshop = props => {
  const [workshop, setWorkshop] = useState(null);
  const [sendWorkshop, setSendWorkshop] = useState(null);
  //const[approveWorkshop]

  const { authState, setAuthState } = useContext(AuthContext);

  useEffect(() => {
    const data = {
      // mId: authState.id,
      mId: 'cssl001',
    };
    axios
      .post('http://localhost:3001/workshop/getWorkshop', data)

      .then(response => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          setWorkshop(response.data);
        }
      })
      .catch(error => {
        alert(error);
      });

    // axios
    //   .post('http://localhost:3001/workshop/getApprovedWorkshop', data)

    //   .then(response => {
    //     if (response.data.error) {
    //       alert(response.data.error);
    //     } else {
    //       setBlogger(response.data);
    //     }
    //   })
    //   .catch(error => {
    //     alert(error);
    //   });

    axios
      .post('http://localhost:3001/workshop/getSendWorkshop', data)

      .then(response => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          setSendWorkshop(response.data);
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

  const approveWorkshops =
    workshop &&
    workshop.map((workshop, i) => (
      <>
        <tr>
          <td>{workshop.title}</td>
          <td>
            <center>
              <Badge color="warning" pill className="mr-1">
                {workshop.fromDate}
              </Badge>
            </center>
          </td>
          <td>
            <center>
              <Badge color="warning" pill className="mr-1">
                {workshop.toDate}
              </Badge>
            </center>
          </td>

          <td>
            <center>
              {'   '}
              <Link
                to={
                  '/approveworkshopview/cssl00' +
                  workshop.wId +
                  '/' +
                  workshop.title
                }
              >
                <Button color="primary" size="sm">
                  View More{' '}
                </Button>
              </Link>
            </center>
          </td>
        </tr>
      </>
    ));

  const sendWorkshops =
    sendWorkshop &&
    sendWorkshop.map((sendWorkshop, i) => (
      <>
        <tr>
          <td>{sendWorkshop.title}</td>
          <td>
            <center>
              <Badge color="warning" pill className="mr-1">
                {sendWorkshop.fromDate}
              </Badge>
            </center>
          </td>
          <td>
            <center>
              <Badge color="warning" pill className="mr-1">
                {sendWorkshop.toDate}
              </Badge>
            </center>
          </td>

          <td>
            <center>
              {'   '}
              <Link
                to={
                  '/approveworkshopview/cssl00' +
                  sendWorkshop.wId +
                  '/' +
                  sendWorkshop.title
                }
              >
                <Button color="primary" size="sm">
                  View More{' '}
                </Button>
              </Link>
            </center>
          </td>
        </tr>
      </>
    ));

  return (
    <Page title="Manage Workshops">
      <hr></hr>
      <Nav tabs>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '1' })}
            onClick={() => {
              toggle('1');
            }}
          >
            Approved Workshops
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '2' })}
            onClick={() => {
              toggle('2');
            }}
          >
            Requested Workshops
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
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
                                  <th>Title</th>
                                  <th>From Date</th>
                                  <th>To Date</th>
                                  <th></th>
                                  {approveWorkshops}
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
        </TabPane>

        <TabPane tabId="2">
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
                                  <th>Title</th>
                                  <th>From Date</th>
                                  <th>To Date</th>
                                  <th></th>
                                  {sendWorkshops}
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
        </TabPane>
      </TabContent>
    </Page>
  );
};

export default ManageWorkshop;
