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
    <Page title="Courses">
      <hr></hr>
      <Link to="/login">
        <Button color="success" to="/login">
          Add New Course
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
            Courses
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '3' })}
            onClick={() => {
              toggle('3');
            }}
          >
            My Courses
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
          <Row>
            <Col sm="12">
              <CardHeader>
                <Typography className="text-success">All Courses</Typography>
              </CardHeader>
              <CardBody>
                  <Card body>
                    <Row>
                      <Col md={12} sm={6} xs={12} className="mb-3">
                        <Card className="flex-row">
                          <CardImg
                            className="card-img-left"
                            src={bg1Image}
                            style={{ width: 'auto', height: 150 }}
                          />
                          <CardBody>
                            <CardTitle>Horizontal Image Card(Left)</CardTitle>
                            <CardText>
                              Some quick example text to build on the card title
                              and make up the bulk of the card's content.
                            </CardText>
                          </CardBody>
                        </Card>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={12} sm={6} xs={12} className="mb-3">
                        <Card className="flex-row">
                          <CardImg
                              className="card-img-left"
                            src={bg18Image}
                            style={{ width: 'auto', height: 150 }}
                          />
                          <CardBody>
                            <CardTitle>Horizontal Image Card(Left)</CardTitle>
                            <CardText>
                              Some quick example text to build on the card title
                              and make up the bulk of the card's content.
                            </CardText>
                          </CardBody>
                        </Card>
                      </Col>
                    </Row>
                  </Card>
                </CardBody>
            </Col>
          </Row>
        </TabPane>
        <TabPane tabId="2">
          <Row>
            <Col sm="12">
              <Card className="mb-3">
                <CardHeader>
                  <Typography className="text-success">Courses</Typography>
                </CardHeader>
                <CardBody>
                  <Card body>
                    <Row>
                      <Col md={12} sm={6} xs={12} className="mb-3">
                        <Card className="flex-row">
                          <CardImg
                            className="card-img-left"
                            src={bg1Image}
                            style={{ width: 'auto', height: 150 }}
                          />
                          <CardBody>
                            <CardTitle>Horizontal Image Card(Left)</CardTitle>
                            <CardText>
                              Some quick example text to build on the card title
                              and make up the bulk of the card's content.
                            </CardText>
                          </CardBody>
                        </Card>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={12} sm={6} xs={12} className="mb-3">
                        <Card className="flex-row">
                          <CardImg
                            className="card-img-left"
                            src={bg11Image}
                            style={{ width: 'auto', height: 150 }}
                          />
                          <CardBody>
                            <CardTitle>Horizontal Image Card(Left)</CardTitle>
                            <CardText>
                              Some quick example text to build on the card title
                              and make up the bulk of the card's content.
                            </CardText>
                          </CardBody>
                        </Card>
                      </Col>
                    </Row>
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
                  <Typography className="text-success">My Courses</Typography>
                </CardHeader>
                {/* map Starts */}
                <CardBody>
                  <Card body>
                    <Col md={12} sm={10} xs={10} className="mb-2">
                      <Card className="flex-row">
                        <CardImg
                          className="card-img-left"
                          src={bg18Image}
                          style={{ width: 'auto', height: 150 }}
                        />
                        <CardBody>
                          <CardTitle>Horizontal Image Card(Left)</CardTitle>
                          <CardText>
                            Some quick example text to build on the card title
                            and make up the bulk of the card's content.
                          </CardText>
                        </CardBody>
                      </Card>
                      <Button color="primary" className="buttonDIV">
                        Edit
                      </Button>

                      <Button color="danger" className="buttonDIV">
                        Delete
                      </Button>
                    </Col>
                  </Card>
                </CardBody>
                {/* map end                 */}
                <CardBody>
                  <Card body>
                    <Col md={12} sm={10} xs={10} className="mb-2">
                      <Card className="flex-row">
                        <CardImg
                          className="card-img-left"
                          src={bg18Image}
                          style={{ width: 'auto', height: 150 }}
                        />
                        <CardBody>
                          <CardTitle>Horizontal Image Card(Left)</CardTitle>
                          <CardText>
                            Some quick example text to build on the card title
                            and make up the bulk of the card's content.
                          </CardText>
                        </CardBody>
                      </Card>
                      <Button color="primary" className="buttonDIV">
                        Edit
                      </Button>

                      <Button color="danger" className="buttonDIV">
                        Delete
                      </Button>
                    </Col>
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
