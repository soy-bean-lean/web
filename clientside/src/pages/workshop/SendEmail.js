import { Link } from 'react-router-dom';

import Page from 'components/Page';
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AuthContext } from '../../helpers/AuthContext';
import QRCode from 'react-qr-code';

import { confirmAlert } from 'react-confirm-alert';
import { useParams } from 'react-router-dom';

import { useHistory } from 'react-router-dom';

import {
  Badge,
  Button,
  Card,
  CardBody,
  FormGroup,
  CardHeader,
  Col,
  Alert,
  Input,
  Label,
  Row,
  Table,
} from 'reactstrap';
const tableTypes = ['striped'];

function SendEmail() {
  const { id } = useParams();
  const add = '';
  const [image, setImage] = useState('');
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [subject, setSubject] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [duration, setDuration] = useState('');
  const [credit, setCredit] = useState('');
  const [data, setData] = useState([]);
  const [conduct, setConductData] = useState(null);

  const { authState, setAuthState } = useContext(AuthContext);
  const [result, setResult] = useState();

  //const [image, setBlogImage] = useState();

  // var today = new Date(),
  //   Currentdate =
  //     today.getFullYear() +
  //     '-' +
  //     (today.getMonth() + 1) +
  //     '-' +
  //     today.getDate();
  let history = useHistory();

  function msg() {
    if (result == 'err') {
      return (
        <>
          <Alert color="danger">Unsuccessfull Attempt,Try Again</Alert>
        </>
      );
    } else if (result == 'done') {
      return (
        <>
          <Alert color="success">Greate Attempt is Successfull</Alert>
        </>
      );
    }
  }

  useEffect(() => {
    const sendData = {
      id: id,
    };
    axios
      .post('http://localhost:3001/workshop/getApprovedWorkshop', sendData)

      .then(response => {
        if (response.data.error) {
        } else {
          setData(response.data[0]);

          setTitle(response.data[0].title);
          setDesc(response.data[0].description);
          setSubject(response.data[0].subject);
          setFromDate(response.data[0].fromDate);
          setToDate(response.data[0].toDate);
          setDuration(response.data[0].duration);
          setCredit(response.data[0].credit);
          setImage(response.data[0].image);
          console.log(response.data[0]);
          setConductData(response.data);
          console.log(response.data);
          console.log(conduct);
        }
      })
      .catch(error => {
        //   alert(error);
      });
  }, []);

  
  const conductors =
    conduct &&
    conduct.map((conduct, i) => (
      <>
        <tr>
          <td>
            {' '}
            {conduct.T} . {conduct.firstName} {conduct.lastName}
          </td>

          <td>
            <center>
              <Badge color="warning" pill className="mr-1">
                {conduct.conductData}
              </Badge>
            </center>
          </td>
          <td hidden>{conduct.email}</td>

          <td>
            <center>
              <Button color="primary" size="sm">
                Send Email{' '}
              </Button>
            </center>
          </td>
        </tr>
      </>
    ));

  return (
    <Page title="Send Mail to Conductors">
      <Link to="/workshop">
        <Button color="primary">Workshop List</Button>
      </Link>
      <hr></hr>
      <Row>
        <Col sm="5" md={{ size: 10, offset: 1 }}>
          <br></br>
          <Card className="profileInfo">
            <CardBody>
              <center>
                {msg()} <br></br>
                <p>{title}</p>
                {/* <br></br>
                <Badge color="warning" pill className="mr-1">
                  {subject}
                </Badge>
                <br></br>
                <br></br>
                
                <Badge color="primary" pill className="mr-1">
                  {'From' + '  ' + fromDate + '  To ' + toDate}{' '}
                </Badge>
                <br></br>
                <br></br>
                <Badge color="primary" pill className="mr-1">
                  {duration + '  hours per Day'}
                </Badge>
                <br /> */}
                <hr />
                <FormGroup row>
                  <Col>
                    <QRCode value={id} />
                  </Col>
                </FormGroup>
              </center>

              <h3>Conduct By</h3>
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
                                      <th>Conductor Name</th>
                                      <th>Assigned Date</th>
                                      <th></th>
                                      {conductors}
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
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Page>
  );
}

export default SendEmail;
