import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Page from 'components/Page';
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
const tableTypes = ['striped'];

const CPDApproval = props => {
  const [activeTab, setActiveTab] = useState('1');

  const [data, setData] = useState([]);
  //const [user, setUser] = useState(userDetails);
  // const [noApprovedUsers, setnoApprovedUsers] = useState(null);
  // const [noRejectedUsers, setnoRejecteddUsers] = useState(null);
  // const [noPendingUsers, setnoPendingUsers] = useState(null);
  // const [count, setnoPendingUserCount] = useState(null);
  const [all, setAll] = useState(null);
  const toggle = tab => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  useEffect(() => {
    axios
      .post('http://localhost:3001/cpd/all', data)

      .then(response => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          setAll(response.data);
          console.log(all);
        }
      })
      .catch(error => {
        alert(error);
      });
  }, []);

  const allCPD =
    all &&
    all.map((data, i) => {
      if (data.status == 'Pending') {
        return (
          <>
            <tr>
              <td hidden>{data.recordId} </td>
              <td>
                {data.title}. {data.firstName} {data.lastName}
              </td>
              <td>{data.recTitle}</td>

              <td>
                <center>
                  <Badge color="warning" pill className="mr-1">
                    {data.type.toUpperCase()}{' '}
                  </Badge>
                </center>
              </td>

              <td>
                {' '}
                <center>
                  <Badge color="warning" pill className="mr-1">
                    {data.credit}
                  </Badge>
                </center>
              </td>

              <td>
                <Badge pill color="primary" className="mr-1">
                  Pending
                </Badge>
              </td>
            </tr>
          </>
        );
      } else if (data.status == 'Approved') {
        return (
          <>
            <tr>
              <td hidden>{data.recordId} </td>
              <td>
                {data.title}. {data.firstName} {data.lastName}
              </td>
              <td>{data.recTitle}</td>

              <td>
                <center>
                  <Badge color="warning" pill className="mr-1">
                    {data.type.toUpperCase()}{' '}
                  </Badge>
                </center>
              </td>

              <td>
                {' '}
                <center>
                  <Badge color="warning" pill className="mr-1">
                    {data.credit}
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
        );
      } else if (data.status == 'Rejected') {
        return (
          <>
            <tr>
              <td hidden>{data.recordId} </td>
              <td>
                {data.title}. {data.firstName} {data.lastName}
              </td>
              <td>{data.recTitle}</td>

              <td>
                <center>
                  <Badge color="warning" pill className="mr-1">
                    {data.type.toUpperCase()}{' '}
                  </Badge>
                </center>
              </td>

              <td>
                {' '}
                <center>
                  <Badge color="warning" pill className="mr-1">
                    {data.credit}
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
        );
      }
    });

  const approved =
    all &&
    all.map((data, i) => {
      if (data.status == 'Approved') {
        return (
          <>
            <tr>
              <td hidden>{data.recordId} </td>
              <td>
                {data.title}. {data.firstName} {data.lastName}
              </td>
              <td>{data.recTitle}</td>

              <td>
                <center>
                  <Badge color="warning" pill className="mr-1">
                    {data.type.toUpperCase()}{' '}
                  </Badge>
                </center>
              </td>

              <td>
                {' '}
                <center>
                  <Badge color="warning" pill className="mr-1">
                    {data.credit}
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
        );
      }
    });

  const rejected =
    all &&
    all.map((data, i) => {
      if (data.status == 'Rejected') {
        return (
          <>
            <tr>
              <td hidden>{data.recordId} </td>
              <td>
                {data.title}. {data.firstName} {data.lastName}
              </td>
              <td>{data.recTitle}</td>

              <td>
                <center>
                  <Badge color="warning" pill className="mr-1">
                    {data.type.toUpperCase()}{' '}
                  </Badge>
                </center>
              </td>

              <td>
                {' '}
                <center>
                  <Badge color="warning" pill className="mr-1">
                    {data.credit}
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
        );
      }
    });
  const pending =
    all &&
    all.map((data, i) => {
      if (data.status == 'Pending') {
        return (
          <>
            <tr>
              <td hidden>{data.recordId} </td>
              <td>
                {data.title}. {data.firstName} {data.lastName}
              </td>
              <td>{data.recTitle}</td>

              <td>
                <center>
                  <Badge color="warning" pill className="mr-1">
                    {data.type.toUpperCase()}{' '}
                  </Badge>
                </center>
              </td>

              <td>
                {' '}
                <center>
                  <Badge color="primary" pill className="mr-1">
                    {data.credit}
                  </Badge>
                </center>
              </td>
              <td>
                <Link /*to={'/cpdView/' + data.recordId}*/ to={'/cpdapproval/cpdrecords/record00' + data.recordId + '/' + data.recTitle}>
                  <Button
                    pill
                    color="success"
                    size="sm"
                  >
                    View{' '}
                  </Button>
                </Link>
                <td></td>
              </td>
            </tr>
          </>
        );
      }
    });

  return (
    <Page title="Review CPD Records">
      <hr></hr>

      <Nav tabs>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '1' })}
            onClick={() => {
              toggle('1');
            }}
          >
            Pending CPD Approvals 
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '2' })}
            onClick={() => {
              toggle('2');
            }}
          >
            All CPD Records
          </NavLink>
        </NavItem>

        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '3' })}
            onClick={() => {
              toggle('3');
            }}
          >
            Approved CPDs
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '4' })}
            onClick={() => {
              toggle('4');
            }}
          >
            Rejected CPDs
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
                      <tbody>{allCPD}</tbody>
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

export default CPDApproval;
