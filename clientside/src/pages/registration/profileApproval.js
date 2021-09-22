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

const Profile = () => {
  const { authState, setAuthState } = useContext(AuthContext);
  const [ProfileData, setProfileData] = useState();

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
  const [file, setFileName] = useState('');

  const [result, setResultBasic] = useState();

  const [imgFile, setImgFile] = useState();

  const reject = () => {
    const formData2 = {
      userID: id,
      secID: authState.id,
    };

    axios
      .post('http://localhost:3001/secretary/reject', formData2)
      .then(response => {
        if (response.data.error) {
          setResultBasic('err');
          setTimeout(
            function () {
               history.push('/managemembers');
            },

            2000,
          );
        } else {
          setResultBasic('done');
          setTimeout(
            function () {
              history.push('/managemembers');
            },

            2000,
          );
        }
      })
      .catch(error => {});
  };

  const back = () => {
    history.push('/managemembers');
  };

  function msg() {
    if (result == 'err') {
      return (
        <>
          <Alert color="danger">Unsuccessfull Attempt,Try Againg</Alert>
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
  const approve = () => {
    const formData2 = {
      userID: id,
      councilId: authState.id,
    };

    axios
      .post('http://localhost:3001/secretary/approve', formData2)
      .then(response => {
        if (response.data.error) {
          setResultBasic('err');
          setTimeout(
            function () {
              history.push('/managemembers');
            },

            2000,
          );
        } else {
          setResultBasic('done');
          setTimeout(
            function () {
              history.push('/managemembers');
            },

            2000,
          );
        }
      })
      .catch(error => {});
  };
  let history = useHistory();

  useEffect(() => {
    const data = {
      memberId: id,
    };

    axios
      .post('http://localhost:3001/auth/getProfileData', data)

      .then(response => {
        if (response.data.error) {
          //    alert(response.data.error);
        } else {
          setFirstName(response.data[0].firstName);
          setSecondName(response.data[0].lastName);
          setAddress(response.data[0].residentialAddress);
          setEmail(response.data[0].email);
          setUserType(response.data[0].userType);
          setUserTitle(response.data[0].title);
          setContact(response.data[0].contactNumber);
          setNIC(response.data[0].nic);
          setDOB(response.data[0].birthDate);
          setProfileImage(response.data[0].profileImage);
          setFileName(response.data[0].userProof);

        }
      })
      .catch(error => {
        //   alert(error);
      });
  }, []);

  return (
    <Page title={title + '.' + firstName + ' ' + secondName}>
      <Row>
        <Col sm="5" md={{ size: 6, offset: 3 }}>
          <br></br>
          <Card className="profileInfo">
            <CardBody>
              <center>
                {msg()}{' '}
                <Badge pill color="primary" className="mr-1">
                  VERIFIED
                </Badge>
                <br />
                <br />
                <img
                  src={'http://localhost:3001/uploads/profileImages/' + proPic}
                  width="160px"
                  height="160px"
                  className="profileImg"
                />
                <br></br>
                <br></br>
                <h4>
                  {title} . {firstName} {secondName}
                </h4>{' '}
                <Badge pill color="warning" className="mr-1">
                  {type.toUpperCase()}
                </Badge>
                <br />
                <br />
                <p>{email}</p>
                <p>{contact}</p>
                <p>{dob}</p>
                <p>{address}</p>
                <p>{NIC}</p>
                <a
                  download
                  href={
                    'http://localhost:3001/uploads/memberRegistraion/' + file
                  }
                >
                  Download Attachments
                </a>
              </center>
              <CardBody>
                <FormGroup check row>
                  <center>
                    <Col sm={{ size: 15 }}>
                      <Button onClick={back} color="primary">
                        Ignore
                      </Button>{' '}
                      <Button onClick={reject} color="danger">
                        Reject
                      </Button>{' '}
                      <Button onClick={approve} color="success">
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

export default Profile;
