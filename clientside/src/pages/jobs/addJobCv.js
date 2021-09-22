import Page from 'components/Page';
import React, { useContext, useState, useEffect } from 'react';

import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../helpers/AuthContext';

import { useParams } from 'react-router-dom';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Form,
  FormGroup,
  Input,
  Alert,
  Label,
} from 'reactstrap';
// let history = useHistory();

const AddCV = () => {
  // job
  const [count, setCount] = useState(null);
  useEffect(() => {
    const data = {
      memberId: '1001',
      jobId: id,
    };

    axios
      .get('http://localhost:3001/job/getJobView', { params: { id: id } })

      .then(response => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          console.log(response.data);
          setCount(response.data[0].questionCount);
        }
      })
      .catch(error => {
        alert(error);
      });
  }, []);
  const { id } = useParams();

  const { finalMarks } = useParams(0);

  const marks = (finalMarks / 871431678287616712873) * (100 / count);

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

  console.log(' correct count  = ' + finalMarks / 871431678287616712873);
  console.log('questions = ' + count);

  console.log('finalMarks =' + marks);

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
          <Alert color="success">Attempt Successfull</Alert>
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
            history.push('/jobadvertisements');
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
    <Page title="Add Your CV">
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
