import Page from 'components/Page';
import React, { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';
import axios from 'axios';

import {
  Card,
  Input,
  CardBody,
  Badge,
  Button,
  CardHeader,
  InputGroup,
  InputGroupAddon,
  Col,
  Row,
  Table,
} from 'reactstrap';

const tableTypes = ['striped'];

const TablePage = () => {
  const [data, setData] = useState(null);
  const [conductors, setConductore] = useState(null);

  const [workshop, setWorkshopTitle] = useState('');
  const [subject, setSubject] = useState('');
  const [location, setLocation] = useState('');

  const getData = () => {
    const data = {
      workshop: workshop,
      subject: subject,
      location: location,
    };
    axios
      .post('http://localhost:3001/workshop/getApprovedWorkshopCards', data)
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
  };
  useEffect(() => {
    const data = {
      workshop: workshop,
      subject: subject,
      location: location,
    };
    axios
      .post('http://localhost:3001/workshop/getApprovedWorkshopCards', data)

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
      .post('http://localhost:3001/workshop/getConductorsForCards', data)

      .then(response => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          setConductore(response.data);
        }
      })
      .catch(error => {
        alert(error);
      });
  }, []);

  const workshops =
    data &&
    data.map(data => (
      <>
        <Col sm="5" md={{ size: 4, offset: 0 }}>
          <Card className="shadow">
            <CardBody>
              <center>
                <h5 hidden> {data.wId}</h5>
                <h6>
                  <b>{data.title}</b>
                </h6>
                <hr />
                <img
                  src={'http://localhost:3001/uploads/workshop/' + data.image}
                  height="150px"
                  width="250px"
                  className="workshopImg"
                />
                <hr />
                <center>{data.subject} </center>

                <center>
                  <Badge color="warning" pill className="mr-1">
                    At {data.location}{' '}
                  </Badge>
                </center>

                <center>
                  <Badge color="danger" pill className="mr-1">
                    From :{data.fromDate}{' '}
                  </Badge>{' '}
                  <Badge color="danger" pill className="mr-1">
                    To :{data.toDate}{' '}
                  </Badge>
                </center>
                <hr />
              </center>
              <p>Conducting By</p>
              <center>
                <Row>
                  {conductors &&
                    conductors.map((li, i) => {
                      {
                        if (data.wId == li.wId) {
                          return (
                            <>
                              <Col sm="12" md={{ size: 2, offset: 0 }}>
                                <img
                                  src={
                                    'http://localhost:3001/uploads/profileImages/' +
                                    li.profileImage
                                  }
                                  height="80%"
                                  width="80%"
                                  title={
                                    li.T +
                                    '.' +
                                    li.firstName +
                                    ' ' +
                                    li.lastName
                                  }
                                  className="profileImageSmall"
                                />
                              </Col>
                            </>
                          );
                        }
                      }
                    }, this)}
                </Row>
              </center>
            </CardBody>
          </Card>
        </Col>
      </>
    ));

  return (
    <Page>
      {tableTypes.map((tableType, index) => (
        <Row>
          <Col>
            <Card className="shadow">
              <InputGroup>
                <Input
                  type="text"
                  className="note"
                  placeholder="Search By Workshop Title"
                  onChange={event => {
                    setWorkshopTitle(event.target.value);
                  }}
                  onKeyUp={getData}
                />{' '}
                <Input
                  type="text"
                  className="note"
                  onChange={event => {
                    setSubject(event.target.value);
                  }}
                  onKeyUp={getData}
                  placeholder="Seach By Subject"
                />
                <Input
                  type="text"
                  className="note"
                  onChange={event => {
                    setLocation(event.target.value);
                  }}
                  onKeyUp={getData}
                  placeholder="Seach By Location"
                />
              </InputGroup>
            </Card>

            <br />
            <Row>{workshops}</Row>
          </Col>
        </Row>
      ))}
    </Page>
  );
};

export default TablePage;
