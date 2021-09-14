import Page from 'components/Page';
import React, { useContext, useState, useEffect } from 'react';

import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../helpers/AuthContext';

import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Form,
  FormFeedback,
  FormGroup,
  FormText,
  Input,
  Alert,
  Label,
  UncontrolledAlert,
  Row,
} from 'reactstrap';
// let history = useHistory();

const AddCV = () => {
  // job
  const [jobId, setJobId] = useState('');

  const { id } = useParams();

  const { finalMarks } = useParams(0);
  const marks = (finalMarks * 20) / 15051;
  var today = new Date(),
    Currentdate =
      today.getFullYear() +
      '-' +
      (today.getMonth() + 1) +
      '-' +
      today.getDate();
  const { authState, setAuthState } = useContext(AuthContext);

  const [description, setDescription] = useState('');
  const [memberId, setMemberId] = useState('');
  const [image, setCVFile] = useState();
  const [result, setResult] = useState();
  let history = useHistory();

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
  const addJobApp = () => {
    const addJobData = new FormData();
    addJobData.append('image', image);
    addJobData.append('description', description);
    addJobData.append('marks', marks);
    addJobData.append('jobId', id);
    // addJobData.append("memberId", authState.id);
    addJobData.append('memberId', authState.id);
    addJobData.append('Currentdate', Currentdate);

    fetch('http://localhost:3001/job/addJobApplicaation', {
      method: 'POST',
      body: addJobData,
      headers: {
        Accept: 'multipart/form-data',
      },
      credentials: 'include',
    })
      .then(res => res.json())
      .then(res => {
        console.log(res.data);
        setResult('done');
        setTimeout(
          function () {
            history.push('/job');
          },

          2000,
        );

        const next = 'Content';
      })
      .catch(error => {
        setResult('err');
        setTimeout(
          function () {
            history.push('/jobAddvertisment/' + id);
          },

          2000,
        );
      });
  };

  return (
    <Page title="Add Your CV" breadcrumbs={[{ name: 'Forms', active: true }]}>
      <Col sm="10" md={{ size: 8, offset: 2 }}>
        <center>
          {msg()}
          <Card>
            <CardHeader>Add Your CV</CardHeader>
            <CardBody>
              <Form>
                <FormGroup row>
                  <Label for="exampleEmail" sm={3}>
                    Description
                  </Label>
                  <Col sm={9}>
                    <Input
                      type="textarea"
                      className="note"
                      placeholder="Description"
                      onChange={event => {
                        setDescription(event.target.value);
                      }}
                    />
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Label for="exampleEmail" sm={3}>
                   Add Your CV
                  </Label>
                  <Col sm={9}>
                    <Input
                      type="file"
                      className="input"
                      id="course-img"
                      name="course-img"
                      accept="file/pdf"
                      onChange={e => setCVFile(e.target.files[0])}
                    />
                  </Col>
                </FormGroup>

                <FormGroup check row>
                  <Col sm={{ size: 15 }}>
                    <Button onClick={addJobApp} color="success">
                      Add
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
};

export default AddCV;
