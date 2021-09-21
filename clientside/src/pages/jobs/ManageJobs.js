import Page from 'components/Page';
import React, { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';
import axios from 'axios';

import classnames from 'classnames';

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
  
  Table,
  Row,
} from 'reactstrap';
import { func } from 'prop-types';

const CardPage = props => {
  const [activeTab, setActiveTab] = useState('1');

  const toggle = tab => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const tableTypes = ['striped'];
  const [data, setData] = useState(null);
  const [applicents, setApplicents] = useState(null);

  const getData = () => {};
  useEffect(() => {
    const data = {
      companyName: '',
      jobRole: '',
      location: '',
    };
    axios
      .post('http://localhost:3001/job/getJobs', data)

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
      .post('http://localhost:3001/job/getAllQuestion', data)
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
          <td>{data.companyName}</td>
          <td>{data.designation}</td>

          <td>
            <center>
              {'   '}
              <Link to={'/editJobVaccencies/' + data.jvId}>
                <Button color="primary" size="sm">
                  View More{' '}
                </Button>
              </Link>
             
            </center>
          </td>
        </tr>
      </>
    ));

  const jobQuestions =
    applicents &&
    applicents.map(data => (
      <>
        <tr>
          <td hidden>{data.Qnumber}</td>
          <td>{data.Question} </td>

          <td>
            <center>
              {'   '}
              <Link to={'/editQuestions/' + data.Qnumber}>
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
    <Page title="Manage Jobs">
      <hr></hr>
      <Link to="/addJobVaccencies">
        <Button color="success" to="/addJobVaccencies">
          Add New Job
        </Button>
      </Link>
      {'  '}
      <Link to="/addJobQuestions">
        <Button color="success" to="/addJobVaccencies">
          Add New Job Question
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
            All Job Vaccencies
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '2' })}
            onClick={() => {
              toggle('2');
            }}
          >
            Job Questions
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
                                <tbody>{jobQuestions}</tbody>
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
