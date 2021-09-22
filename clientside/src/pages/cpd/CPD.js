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

const ViewCPD = props => {
  const [record, setRecord] = useState(null);
  const [approveCount, setApproveCount] = useState(0);
  const [pendingCount, setPendingCount] = useState(0);
  const [rejectCount, setRejectCount] = useState(0);
  var a = 0,
    b = 0,
    c = 0;

  const [activeTab, setActiveTab] = useState('1');

  useEffect(() => {
    const formData = {
      id: '',
      type: '',
      status: '',
      description: '',
    };
    axios
      .post('http://localhost:3001/cpd/', formData)

      .then(response => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          setRecord(response.data);
          for (var i = 0; i < Object.keys(response.data).length; i++) {
            if (response.data[i].status == 'Approved') {
              a++;
              setApproveCount(a);
            } else if (response.data[i].status == 'Pending') {
              b++;
              setPendingCount(b);
            } else if (response.data[i].status == 'Rejected') {
              c++;
              setRejectCount(c);
            } else {
              console.log('Error:', i);
            }
          }
        }
      })
      .catch(error => {
        alert(error);
      });
  }, []);

  const allRecords =
    record &&
    record.map((record, i) => {
      if (record.status == 'Approved') {
        return (
          <>
            <tr key={i}>
              <td>{record.type.toUpperCase()}</td>
              <td>{record.recTitle}</td>
              <td>
                <center>
                  {' '}
                  <h6>
                  <Badge color="success" className="mr-1">
                    {record.status}
                  </Badge>
                  </h6>
                </center>
              </td>
            </tr>
          </>
        );
      } else if (record.status == 'Pending') {
        return (
          <>
            <tr key={i}>
              <td>{record.type.toUpperCase()}</td>
              <td>{record.recTitle}</td>
              <td>
                <center>
                  {' '}
                  <h6>
                  <Badge color="warning" className="mr-1">
                    {record.status}
                  </Badge>
                  </h6>
                </center>
              </td>
            </tr>
          </>
        );
      } else {
        return (
          <>
            <tr key={i}>
              <td>{record.type.toUpperCase()}</td>
              <td>{record.recTitle}</td>
              <td>
                <center>
                  {' '}
                  <h6>
                  <Badge color="danger" className="mr-1">
                    {record.status}
                  </Badge>
                  </h6>
                </center>
              </td>
            </tr>
          </>
        );
      }
    });

  const approvedRecords =
    record &&
    record.map((record, i) => {
      if (record.status == 'Approved') {
        return (
          <>
            <tr key={i}>
              <td>{record.type.toUpperCase()}</td>
              <td>{record.recTitle}</td>
              <td>
                <center>
                  <Link to={'/csslmember/viewcpdrecord/record00' + record.recordId}>
                    <Button color="primary" size="sm">
                      View{' '}
                    </Button>
                  </Link>
                </center>
              </td>
            </tr>
          </>
        );
      }
    });

    const pendingRecords =
    record &&
    record.map((record, i) => {
      if (record.status == 'Pending') {
        return (
          <>
            <tr key={i}>
              <td>{record.type.toUpperCase()}</td>
              <td>{record.recTitle}</td>
              <td>
                <center>
                  <Link to={'/csslmember/viewcpdrecord/record00' + record.recordId}>
                    <Button color="primary" size="sm">
                      View
                    </Button>
                  </Link>
                  {' '}
                  <Link to={'/csslmember/viewcpdrecord/record00' + record.recordId}>
                    <Button color="warning" size="sm">
                      Edit{' '}
                    </Button>
                  </Link>
                </center>
              </td>
            </tr>
          </>
        );
      }
    });

    const rejectedRecords =
    record &&
    record.map((record, i) => {
      if (record.status == 'Rejected') {
        return (
          <>
            <tr key={i}>
              <td>{record.type.toUpperCase()}</td>
              <td>{record.recTitle}</td>
              <td>
                <center>
                  <Link to={'/csslmember/viewcpdrecord/record00' + record.recordId}>
                    <Button color="primary" size="sm">
                      View{' '}
                    </Button>
                  </Link>
                </center>
              </td>
            </tr>
          </>
        );
      }
    });

  const toggle = tab => {
    if (activeTab !== tab) setActiveTab(tab);
  };
  return (
    <Page title="CPD Records">
      <hr></hr>
      <Link to="/csslmember/cpdrecords/addcpdrecord">
        <Button color="success">Add New CPD Record</Button>
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
                <CardHeader>
                  <Typography className="text-primary">All CPD Records</Typography>
                </CardHeader>
                <CardBody>
                  <Card body>
                    <Table {...{ ['striped']: true }}>
                      <tbody>{allRecords}</tbody>
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
                    Approved CPD Records
                  </Typography>
                </CardHeader>
                <CardBody>
                  <Card body>
                    <Table {...{ ['striped']: true }}>
                      <tbody>
                        {approvedRecords}
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
                  <Typography className="text-warning">
                    Pending CPD Records
                  </Typography>
                </CardHeader>
                <CardBody>
                  <Card body>
                    <Table {...{ ['striped']: true }}>
                      <tbody>
                        {pendingRecords}
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
                    Rejected CPD Recoords
                  </Typography>
                </CardHeader>
                <CardBody>
                  <Card body>
                    <Table {...{ ['striped']: true }}>
                      <tbody>
                        {rejectedRecords}
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

export default ViewCPD;
