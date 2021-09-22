import { Link } from 'react-router-dom';
import Page from 'components/Page';
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AuthContext } from '../../helpers/AuthContext';

import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css';
import '../../main.css';
import { useParams } from 'react-router-dom';

import { useHistory } from 'react-router-dom';

import QRCode from 'react-qr-code';

import {
  Badge,
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

function AddCredit() {
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
  const [wId, setWid] = useState(0);

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

  const approve = () => {
    const data = {
      wid: wId,
      verifiedBy: authState.memberId,
      credit: credit,
    };
    console.log(id);
    axios
      .post('http://localhost:3001/workshop/addCredit', data)
      .then(response => {
        if (response.data.error) {
          setResult('err');
          setTimeout(
            function () {
              history.push('/addCredit/cssl00' + data.wid + '/' + title);
            },

            2000,
          );
        } else {
          setResult('done');

          setTimeout(
            function () {
              history.push('/sendEmail/cssl00' + data.wid + '/' + title);
              //hri giyoth yana thena
            },

            2000,
          );
        }
      });
  };

  const deleteItem = () => {
    const data = {
      wid: id,
      tableName: 'csslworkshop',
      coloum: 'wId',
    };
    console.log(id);
    axios
      .post('http://localhost:3001/workshop/deleteItem', data)
      .then(response => {
        if (response.data.error) {
          setResult('err');
          setTimeout(
            function () {
              history.push('/manageworksops');
            },

            2000,
          );
        } else {
          setResult('done');

          setTimeout(
            function () {
              history.push('/manageworksops');
              //hri giyoth yana thena
            },

            2000,
          );
        }
      });
  };

  const submit = () => {
    confirmAlert({
      message: 'Are you sure to Delete ?.',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            deleteItem();
          },
        },
        {
          label: 'No',
          onClick: () => {
            //alert('Click No')
          },
        },
      ],
    });
  };

  //   const approve = () => {
  //     const blogData = new FormData();
  //     blogData.append('image', image);
  //     blogData.append('title', title);
  //     blogData.append('description', desc);
  //     blogData.append('subject', subject);
  //     blogData.append('fromDate', fromDate);
  //     blogData.append('toDate', toDate);
  //     blogData.append('duration', duration);
  //     blogData.append('credit', credit);
  //     blogData.append('wId', wId);

  //     blogData.append('verifiedBy', authState.memberId);

  //     console.log("data;",blogData);
  //     fetch('http://localhost:3001/workshop/addCredit', {
  //       method: 'POST',
  //       body:blogData,
  //       headers: {
  //         Accept: 'multipart/form-data',
  //       },
  //       credentials: 'include',
  //     })
  //     .then(res => res.json())
  //       .then(res => {
  //         setResult('done');
  //         setTimeout(
  //           function () {
  //             history.push('/sendEmail/cssl00' + blogData.wId + '/' + blogData.title);
  //           },

  //           2000,
  //         );
  //       })
  //       .catch(error => {
  //         setResult('err');
  //         setTimeout(
  //           function () {
  //             history.push('/addCredit/cssl00' + blogData.wId + '/' + blogData.title);
  //           },

  //           2000,
  //         );
  //       });
  //   };

  useEffect(() => {
    const sendData = {
      id: id,
    };
    axios
      .post('http://localhost:3001/workshop/getWorkshopView', sendData)

      .then(response => {
        if (response.data.error) {
          //    alert(response.data.error);
        } else {
          console.log(response.data[0]);
          setTitle(response.data[0].title);
          setDesc(response.data[0].description);
          setSubject(response.data[0].subject);
          setFromDate(response.data[0].fromDate);
          setToDate(response.data[0].toDate);
          setDuration(response.data[0].duration);
          setCredit(response.data[0].credit);
          setImage(response.data[0].image);
          setWid(response.data[0].wId);
        }
      })
      .catch(error => {
        //   alert(error);
      });
  }, []);

  //   return (
  //     <Page title="Assign Credit/Deny Request">
  //        <Link to="/manageworksops">
  //         <Button color="primary">Back</Button>
  //       </Link>

  //     </Page>
  //   );
  const back = () => {
    history.push('/manageworksops');
  };

  return (
    <Page title="Requested Workshop">
      <hr></hr>

      <Row>
        <Col sm="5" md={{ size: 8, offset: 2 }}>
          <br></br>
          <center>
            <Card className="profileInfo">
              <CardBody>
                <center>
                  <h4>{title}</h4>
                  <hr />
                  {/* <br /> */}
                  <img
                    src={'http://localhost:3001/uploads/workshop/' + image}
                    height="60%"
                    width="60%"
                    className="workshopImg"
                  />
                  <br />
                 
                 <hr/>
                  <br />
                  <p>{desc}</p>
                  <p>{subject}</p>
                  <p> {'From' + '  ' + fromDate + '  To ' + toDate}</p>
                  <p>{duration + '  hours per Day'}</p>
                </center>
                <FormGroup row>
                  <Col sm="10" md={{ size: 4, offset: 4 }}>
                    <Input
                      type="number"
                      name="title"
                      min="0"
                      placeholder="Assign  Credit"
                      onChange={e => setCredit(e.target.value)}
                    />
                  </Col>
                </FormGroup>
                <hr />
                <FormGroup check row>
                  <center>
                    <Col sm={{ size: 15 }}>
                      <Button onClick={back} color="primary">
                        Back
                      </Button>{' '}
                      <Button onClick={submit} color="danger">
                        Reject
                      </Button>{' '}
                      <Button onClick={approve} color="success">
                        Approve
                      </Button>
                    </Col>
                  </center>
                </FormGroup>{' '}
              </CardBody>
            </Card>
          </center>
        </Col>
      </Row>
    </Page>
  );
}

export default AddCredit;
