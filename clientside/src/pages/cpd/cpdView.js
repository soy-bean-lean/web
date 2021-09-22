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

  const [firstName, setFirstName] = useState('');
  const [secondName, setSecondName] = useState('');
  const [NIC, setNIC] = useState('');
  const [address, setAddress] = useState('');
  const [contact, setContact] = useState('');
  const [dob, setDOB] = useState('');
  const [email, setEmail] = useState('');
  const [proPic, setProfileImage] = useState('');
  const [title, setUserTitle] = useState('');
  const [type, setUserType] = useState('');
  const [cpdData, setData] = useState(null);

  const [result, setResultBasic] = useState();

  const [imgFile, setImgFile] = useState();

  const [recordData, setRecordData] = useState(null);
  const [activityData, setActivityData] = useState(null);  

  const reject = () => {
    const formData2 = {
      userID: id,
      secID: authState.id,
    };

    axios
      .post('http://localhost:3001/cpd/rejectRecord', formData2)
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
  const verify = () => {
    const formData2 = {
      userID: id,
      secID: authState.id,
    };

    axios
      .post('http://localhost:3001/cpd/approveRecord', formData2)
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
  let history = useHistory();

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
          setRecordData(response.data[0]);
          console.log(response.data);
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

  const getActivityInfo = (recId, recType, actType) => {
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
  };

  return (
    <Page title="CPD Approvals">
      <Row>
        <Col sm="5" md={{ size: 6, offset: 3 }}>
          <br></br>
          <Card className="profileInfo">
            <CardBody>
              <center>
                {msg()}
                <br />
                <br />
                {/* <h4>{recordData.recTitle}</h4>
                <p>{recordData.memberId}</p>
                <p>{recordData.recType} - {recordData.type == 'CSSLcourse' &&( "CSSL")}</p>
                <p>{recordData.note}</p>
                <p>{recordData.recordDate}</p> */}
              </center>
              <CardBody>
                <FormGroup check row>
                  <center>
                    <Col sm={{ size: 15 }}>
                      <Button onClick={back} color="primary">
                        Back
                      </Button>{' '}
                      <Button onClick={reject} color="danger">
                        Reject
                      </Button>{' '}
                      <Button onClick={verify} color="success">
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
