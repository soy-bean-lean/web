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
    data.map((data, i) => {
      if (data.status == 'closed') {
        return (
          <>
            <tr>
              <td hidden> {data.jvId}</td>
              <td>{data.date}</td>
              <td>{data.companyName}</td>

              <td>
                <Badge color="warning" pill className="mr-1">
                  {data.marks}%{' '}
                </Badge>
              </td>

              <td>
                <center>
                  <Badge color="danger" pill className="mr-1">
                    {data.status.toUpperCase()}{' '}
                  </Badge>
                </center>
              </td>

              <td>
                <center>
                  <Button color="success" size="sm">
                    <a
                      color="success"
                      className="ancorTag"
                      href={
                        'http://localhost:3001/uploads/jobApplicationCVs/' +
                        data.cv
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
        );
      } else if (data.status == 'pending') {
        return (
          <>
            <tr>
              <td hidden> {data.jvId}</td>
              <td>{data.date}</td>
              <td>{data.companyName}</td>

              <td>
                <Badge color="warning" pill className="mr-1">
                  {data.marks}%{' '}
                </Badge>
              </td>

              <td>
                <center>
                  <Badge color="primary" pill className="mr-1">
                    {data.status.toUpperCase()}{' '}
                  </Badge>
                </center>
              </td>

              <td>
                <center>
                  <Button color="success" size="sm">
                    <a
                      color="success"
                      className="ancorTag"
                      href={
                        'http://localhost:3001/uploads/jobApplicationCVs/' +
                        data.cv
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
        );
      }
    });
  const jobApplicents =
    applicents &&
    applicents.map(data => (
      <>
        <tr>
          <td hidden>{data.jvId}</td>
          <td>{data.companyName}</td>
          <td>
            <center>
              <Badge color="warning" pill className="mr-1">
                {data.numberOfApplicent} Applications
              </Badge>
            </center>
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
            Job Applications For Advertisments
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '2' })}
            onClick={() => {
              toggle('2');
            }}
          >
            All Job Aplications
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
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
