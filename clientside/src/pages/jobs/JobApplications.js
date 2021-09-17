import Page from 'components/Page';
import React, { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';
import axios from 'axios';

import classnames from 'classnames';

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
  Col,
  Table,
  Row,
} from 'reactstrap';

const CardPage = props => {
  const [activeTab, setActiveTab] = useState('1');

  const toggle = tab => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const tableTypes = ['striped'];
  const [data, setData] = useState(null);
  const [applicents, setApplicents] = useState(null);
  const [total, setCount] = useState(0);

  const getData = () => {};
  useEffect(() => {
    const data = {
      companyName: '',
      jobRole: '',
      location: '',
    };
    axios
      .post('http://localhost:3001/job/getJobsApplications', data)

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

    axios
      .post('http://localhost:3001/job/getApplicents', data)
      .then(response => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          setApplicents(response.data);
        }
      })
      .catch(error => {
        alert(error);
      });
  }, []);

  const jobview =
    data &&
    data.map(data => (
      <>
        <tr>
          <td hidden> {data.jvId}</td>
          <td>{data.date}</td>
          <td>{data.companyName}</td>

          <td>
            <b>{data.marks} %</b>
          </td>
          <td>
            <p>{data.status}</p>
          </td>

          <td>
            <center>
              <Link to={''}>
                <Button color="success" size="sm">
                  Download CV{' '}
                </Button>
              </Link>
            </center>
          </td>
        </tr>
      </>
    ));

  const jobApplicents =
    applicents &&
    applicents.map(data => (
      <>
        <tr>
          <td hidden>{data.jvId}</td>
          <td>{data.companyName}</td>
          <td>
            <Badge color="danger">
              {' '}
              {data.numberOfApplicent} Applications{' '}
            </Badge>
          </td>

          <td>
            <center>
              <Link to={'/sendcv/' + data.jvId}>
                <Button color="success" size="sm">
                  View{' '}
                </Button>
              </Link>
            </center>
          </td>
        </tr>
      </>
    ));

  return (
    <Page title="Manage Job Aplications">
      <hr></hr>

      <Nav tabs>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '1' })}
            onClick={() => {
              toggle('1');
            }}
          >
            All Job Aplications
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '2' })}
            onClick={() => {
              toggle('2');
            }}
          >
            Job Applications For Advertisments
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
                                <tbody>{jobview}</tbody>
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
                                <tbody>{jobApplicents}</tbody>
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

export default CardPage;
