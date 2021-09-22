import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import * as AiIcons from 'react-icons/ai';
import { useHistory } from 'react-router-dom';

import { useParams } from 'react-router-dom';
import Page from 'components/Page';
import { Link } from 'react-router-dom';
import Typography from 'components/Typography';
import {
  Button,
  Card,
  Badge,
  CardBody,
  FormGroup,
  Input,
  Label,
  Col,
  Alert,
  CardHeader,
  Row,
} from 'reactstrap';
import { AuthContext } from '../../helpers/AuthContext';

const ViewCPD = () => {
  const { authState, setAuthState } = useContext(AuthContext);

  const { id } = useParams();

  const [reId, setRecId] = useState('');
  const [courseName, setCourseName] = useState('');
  const [recordType, setRecordType] = useState('');
  const [actType, setActType] = useState('');
  const [credit, setCredit] = useState('');
  const [recordDate, setRecordDate] = useState('');
  const [recordTitle, setRecordTitle] = useState('');
  const [note, setNote] = useState('');
  const [proof, setProof] = useState();
  const [memberId, setMemberId] = useState('');

  const [cpdData, setCpdData] = useState(null);

  const [result, setResultBasic] = useState();

  const [imgFile, setImgFile] = useState();

  const [recordData, setRecordData] = useState(null);
  const [activityData, setActivityData] = useState(null);

  let history = useHistory();

  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0');
  var yyyy = today.getFullYear();
  today = yyyy + '-' + mm + '-' + dd;

  useEffect(() => {
    const data = {
      cpdId: id,
    };

    axios
      .post('http://localhost:3001/cpd/getcpdData', data)

      .then(response => {
        if (response.data.error) {
          console.log(response.data.error);
        } else {
          setRecordData(response.data);
          setRecId(response.data[0].recordId);
          setCourseName(response.data[0].name);
          setRecordTitle(response.data[0].recTitle);
          setRecordType(response.data[0].recordType);
          setCredit(response.data[0].credit);
          setProof(response.data[0].proof);
          setActType(response.data[0].type);
          setNote(response.data[0].note);
          setRecordDate(response.data[0].recordDate);
          setMemberId(response.data[0].memberId);

          console.log(recordData);
          /*getActivityInfo(
            response.data[0].refId,
            response.data[0].recType,
            response.data[0].type,
          );*/
        }
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const cpdRecordRender =
    recordData &&
    recordData.map((li, i) => {
      if (actType == 'CSSLcourse') {
        return (
          <>
            <FormGroup row>
              <Label for="exampleEmail" sm={3}>
                Member Id
              </Label>
              <Col sm={9}>
                <Input readOnly value={memberId} />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="exampleEmail" sm={3}>
                Record Title
              </Label>
              <Col sm={9}>
                <Input readOnly value={recordTitle} />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="exampleEmail" sm={3}>
                Record Date
              </Label>
              <Col sm={9}>
                <Input readOnly value={recordDate} />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="exampleEmail" sm={3}>
                Record Type
              </Label>
              <Col sm={9}>
                <Input readOnly value="CSSL COURSE" />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="exampleEmail" sm={3}>
                Course Name
              </Label>
              <Col sm={9}>
                <Input readOnly value={courseName} />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="exampleEmail" sm={3}>
                Credit Value
              </Label>
              <Col sm={9}>
                <Input readOnly value={credit} />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="exampleEmail" sm={3}>
                Note
              </Label>
              <Col sm={9}>
                <p>{note}</p>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="exampleEmail" sm={3}>
                Uploaded Files
              </Label>
              <Col sm={9}>
                <p style={{ border: 'solid', width: 150 }}>
                  <a
                    href={'http://localhost:3001/uploads/cpdRecords/' + proof}
                    download
                  >
                    Click Here to Download
                  </a>
                </p>
              </Col>
            </FormGroup>
          </>
        );
      }
    });

  const back = () => {
    history.push('/cpdapproval/cpdrecords');
  };

  function msg() {
    if (result == 'err') {
      return (
        <>
          <Alert color="danger">Unsuccessfull Attempt, Try Again</Alert>
        </>
      );
    } else if (result == 'done') {
      return (
        <>
          <Alert color="success">Attempt Succesfull</Alert>
        </>
      );
    }
  }

  const approveRecord = () => {
    const formData = {
      cpdId: id,
      appId: authState.memberId,
      appDate: today,
    };

    axios
      .post('http://localhost:3001/cpd/approveRecord', formData)
      .then(response => {
        if (response.data.error) {
          setResultBasic('err');
        } else {
          setResultBasic('done');
          setTimeout(
            function () {
              history.push('/cpdapproval/cpdrecords');
            },
            2000,
          );
        }
      })
      .catch(error => {
        setResultBasic('err');
      });
  };


  const rejectRecord = () => {
    const formData = {
      cpdId: id,
      appId: authState.memberId,
      appDate: today,
    };

    axios
      .post('http://localhost:3001/cpd/rejectRecord', formData)
      .then(response => {
        if (response.data.error) {
          setResultBasic('err');
        } else {
          setResultBasic('done');
          setTimeout(
            function () {
              history.push('/cpdapproval/cpdrecords');
            },

            2000,
          );
        }
      })
      .catch(error => {
        setResultBasic('err');
      });
  };

  /*const getActivityInfo = (recId, recType, actType) => {
    const actData = {
      cpdId: recId,
      recType: recType,
      actType: actType,
    };

    axios
      .post('http://localhost:3001/cpd/getActivityDetails', actData)

      .then(response => {
        if (response.data.error) {
          console.log(response.data.error);
        } else {
          setActivityData(response.data[0]);
          console.log(response.data);
        }
      })
      .catch(error => {
        console.log(error);
      });
  };*/

  return (
    <Page title="CPD Approvals">
      <Row>
        <Col sm="10" md={{ size: 8, offset: 2 }}>
          <br></br>
          <Card>
            <CardBody>
              <center>
                {msg()}
                <br />
                <br />
                {cpdRecordRender}
              </center>
              <CardBody>
                <FormGroup check row>
                  <center>
                    <Col sm={{ size: 15 }}>
                      <Button onClick={back} color="primary">
                        Back
                      </Button>{' '}
                      <Button onClick={rejectRecord} color="danger">
                        Reject
                      </Button>{' '}
                      <Button onClick={approveRecord} color="success">
                        Approve
                      </Button>
                    </Col>
                  </center>
                </FormGroup>{' '}
              </CardBody>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Page>
  );
};

export default ViewCPD;
