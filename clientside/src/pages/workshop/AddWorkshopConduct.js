import { Link } from 'react-router-dom';
import Page from 'components/Page';
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import { toast } from 'react-toastify';
import { AuthContext } from '../../helpers/AuthContext';
import classnames from 'classnames';
import Typography from 'components/Typography';

import { useHistory } from 'react-router-dom';

import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Alert,
  Form,
  FormFeedback,
  FormGroup,
  FormText,
  Input,
  Label,
  Row,
} from 'reactstrap';

function AddWorkshop() {
  const { authState, setAuthState } = useContext(AuthContext);

  const [from, setFromDate] = useState('');
  const [to, setToDate] = useState('');
  const [conducterId, setConducterId] = useState('');
  const [assignDate, setAssignDate] = useState('');
  const [date, setDate] = useState('');
  const { id } = useParams();
  const [result, setResult] = useState();

  let history = useHistory();

  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0');
  var yyyy = today.getFullYear();
  today = yyyy + '-' + mm + '-' + dd;

  const [conducts, setConductData] = useState('');

  const conductors =
    conducts &&
    conducts.map((li, i) => {
      return (
        <option key={i} value={li.id}>
          {li.title} {li.firstName} {li.lastName}
        </option>
      );
    }, this);

  const addConductor = () => {
    const data2 = {
      conducterId: 'cssl00' + conducterId,
      wid: id,
      assignDate: assignDate,
    };

    axios
      .post('http://localhost:3001/workshop/addConducter', data2)
      .then(response => {
        if (response.data.error) {
          setResult('err');
          setTimeout(
            function () {
              history.push('/AddWorkshopConducter/' + id);
            },

            2000,
          );
        } else {
          setResult('done');

          setTimeout(
            function () {
              history.push('/AddWorkshopConducter/' + id);
            },

            2000,
          );
        }
      });
  };

  const finish = () => {

history.push('/workshop')
  }
  const addConductorAndFinish = () => {
    const data2 = {
      conducterId: 'cssl00' + conducterId,
      wid: id,
      assignDate: assignDate,
    };

    axios
      .post('http://localhost:3001/workshop/addConducter', data2)
      .then(response => {
        if (response.data.error) {
          setResult('err');
          setTimeout(
            function () {
              history.push('/AddWorkshopConducter/' + id);
            },

            2000,
          );
        } else {
          setResult('done');

          setTimeout(
            function () {
              history.push('/workshop');
            },

            2000,
          );
        }
      });
  };

  useEffect(() => {
    const data = {
      memberId: authState.id,
      wid: id,
    };

    axios
      .post('http://localhost:3001/workshop/getConductors', data)

      .then(response => {
        if (response.data.error) {
        } else {
          setConductData(response.data);

          axios
            .post('http://localhost:3001/workshop/getWorkshopFromAndTo', data)

            .then(response => {
              if (response.data.error) {
              } else {
                console.log(response.data);
                setFromDate(response.data[0].fromDate);
                setToDate(response.data[0].toDate);
                console.log(to);
                console.log(from);
              }
            })
            .catch(error => {
              //   alert(error);
            });
        }
      })
      .catch(error => {
        //   alert(error);
      });
  }, []);

  function msg() {
    if (result == 'err') {
      return (
        <>
          <Alert color="danger">Unsuccefull Attempt,Try Againg</Alert>
        </>
      );
    } else if (result == 'done') {
      return (
        <>
          <Alert color="success">Greate Attempt is Succesfull</Alert>
        </>
      );
    }
  }
  return (
    <Page title="Add Workshop Conductors">
      <hr></hr>
      <Col sm="10" md={{ size: 8, offset: 2 }}>
        <center>
          {msg()}
          <Card>
            <CardHeader>Add Workshop Conductors</CardHeader>
            <CardBody>
              <Form>
                <FormGroup row>
                  <Label for="exampleEmail" sm={3}>
                    Members
                  </Label>
                  <Col sm={9}>
                    <Input
                      type="select"
                      name="email"
                      onChange={event => {
                        setConducterId(event.target.value);
                      }}
                    >
                      <option value="default">
                        Select CSSL Members for this Workshop
                      </option>
                      {conductors}
                    </Input>
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Label for="exampleEmail" sm={3}>
                    Pick a Date
                  </Label>

                  <Col sm={9}>
                    <Input
                      type="date"
                      max={to}
                      min={from}
                      name="title"
                      onChange={e => setAssignDate(e.target.value)}
                    />
                  </Col>
                </FormGroup>

                <FormGroup check row>
                  <Col sm={{ size: 15 }}>
                    <Button color="primary" onClick={addConductor}>
                      Save & Add Another
                    </Button>{' '}
                    <Button onClick={addConductorAndFinish} color="success">
                      Save & Finish
                    </Button>
                    {" "}
                    <Button onClick={finish} color="success">
                      Finish
                    </Button>
                  </Col>
                </FormGroup>
              </Form>
            </CardBody>
          </Card>
        </center>
      </Col>
      <hr></hr>
    </Page>
  );
}

export default AddWorkshop;
