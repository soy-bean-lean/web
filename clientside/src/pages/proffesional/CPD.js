import bg11Image from 'assets/img/bg/background_1920-11.jpg';
import bg18Image from 'assets/img/bg/background_1920-18.jpg';
import bg1Image from 'assets/img/bg/background_640-1.jpg';
import bg3Image from 'assets/img/bg/background_640-3.jpg';
import user1Image from 'assets/img/users/100_1.jpg';
import { UserCard } from 'components/Card';
import Page from 'components/Page';
import { bgCards, gradientCards, overlayCards } from 'demos/cardPage';
import { getStackLineChart, stackLineChartOptions } from 'demos/chartjs';
import React, { useState } from 'react';
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
import { Link } from 'react-router-dom';
const CardPage = props => {
  const [activeTab, setActiveTab] = useState('1');

  const toggle = tab => {
    if (activeTab !== tab) setActiveTab(tab);
  };
  return (
    <Page title="CPD Records">
      <hr></hr>
      <Link to="/cpdAdd">
        <Button color="success">
          Add New CPD Record
        </Button>
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
            Approved
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '3' })}
            onClick={() => {
              toggle('3');
            }}
          >
            Pending
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '4' })}
            onClick={() => {
              toggle('4');
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
                <CardHeader>All CPD Records</CardHeader>
                <CardBody>
                  <Card body>
                    <Table {...{ ['striped']: true }}>
                      <tbody>
                        <tr>
                          <th scope="row">1</th>
                          <td>Mark</td>
                          <td>Otto</td>
                          <td>
                            <center>
                              {' '}
                              <Badge color="success" pill className="mr-1">
                                Accepted
                              </Badge>
                            </center>
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">1</th>
                          <td>Mark</td>
                          <td>Otto</td>
                          <td>
                            <center>
                              {' '}
                              <Badge color="primary" pill className="mr-1">
                                Pending
                              </Badge>
                            </center>
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">1</th>
                          <td>Mark</td>
                          <td>Otto</td>
                          <td>
                            <center>
                              {' '}
                              <Badge color="danger" pill className="mr-1">
                                Rejected
                              </Badge>
                            </center>
                          </td>
                        </tr>
                      </tbody>
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
                  <Typography className="text-success">
                    Approved CPD Reports
                  </Typography>
                </CardHeader>
                <CardBody>
                  <Card body>
                    <Table {...{ ['striped']: true }}>
                      <tbody>
                        <tr>
                          <th scope="row">1</th>
                          <td>Mark</td>
                          <td>Otto</td>
                          <td>
                            <center>
                              {' '}
                              <Badge color="success" pill className="mr-1">
                                Accepted
                              </Badge>
                            </center>
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">1</th>
                          <td>Mark</td>
                          <td>Otto</td>
                          <td>
                            <center>
                              {' '}
                              <Badge color="success" pill className="mr-1">
                                Accepted
                              </Badge>
                            </center>
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">1</th>
                          <td>Mark</td>
                          <td>Otto</td>
                          <td>
                            <center>
                              {' '}
                              <Badge color="success" pill className="mr-1">
                                Accepted
                              </Badge>
                            </center>
                          </td>
                        </tr>
                      </tbody>
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
                  {' '}
                  <Typography className="text-primary">
                    Pending CPD Reports
                  </Typography>
                </CardHeader>
                <CardBody>
                  <Card body>
                    <Table {...{ ['striped']: true }}>
                      <tbody>
                        <tr>
                          <th scope="row">1</th>
                          <td>Mark</td>
                          <td>Otto</td>
                          <td>
                            {' '}
                            <center>
                              {' '}
                              <Badge color="primary" pill className="mr-1">
                                Pending
                              </Badge>
                            </center>
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">1</th>
                          <td>Mark</td>
                          <td>Otto</td>
                          <td>
                            <center>
                              {' '}
                              <Badge color="primary" pill className="mr-1">
                                Pending
                              </Badge>
                            </center>
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">1</th>
                          <td>Mark</td>
                          <td>Otto</td>
                          <td>
                            {' '}
                            <center>
                              {' '}
                              <Badge color="primary" pill className="mr-1">
                                Pending
                              </Badge>
                            </center>
                          </td>
                        </tr>
                      </tbody>
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
                  <Typography className="text-danger">
                    Rejected CPD Reports
                  </Typography>
                </CardHeader>
                <CardBody>
                  <Card body>
                    <Table {...{ ['striped']: true }}>
                      <tbody>
                        <tr>
                          <th scope="row">1</th>
                          <td>Mark</td>
                          <td>Otto</td>
                          <td>
                            <center>
                              {' '}
                              <Badge color="danger" pill className="mr-1">
                                Rejected
                              </Badge>
                            </center>
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">1</th>
                          <td>Mark</td>
                          <td>Otto</td>
                          <td>
                            <center>
                              {' '}
                              <Badge color="danger" pill className="mr-1">
                                Rejected
                              </Badge>
                            </center>
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">1</th>
                          <td>Mark</td>
                          <td>Otto</td>
                          <td>
                            <center>
                              {' '}
                              <Badge color="danger" pill className="mr-1">
                                Rejected
                              </Badge>
                            </center>
                          </td>
                        </tr>
                      </tbody>
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

export default CardPage;
