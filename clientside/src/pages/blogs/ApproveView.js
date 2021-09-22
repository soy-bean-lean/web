import { Link } from 'react-router-dom';
import Page from 'components/Page';
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../helpers/AuthContext';
import DOMPurify from 'dompurify';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css';
import '../../main.css';
import { useParams } from 'react-router-dom';

import { useHistory } from 'react-router-dom';

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

function ApproveView() {
  const { id } = useParams();
  const add = '';
  const [bId, setWid] = useState(0);
  const { title } = useParams();
  const [result, setResult] = useState();
  const { authState, setAuthState } = useContext(AuthContext);
  const [blogImg, setBlogImg] = useState('');
  const [profileImg, setProfileImg] = useState('');
  const [blogData, setBlogData] = useState([]);

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
    const data = {
      bid: bId,
      reviewBy: authState.memberId,
    };
    console.log(id);
    axios.post('http://localhost:3001/blog/approve', data).then(response => {
      if (response.data.error) {
        setResult('err');
        setTimeout(
          function () {
            history.push(
              '/approveworkshopview/cssl00' + data.bid + '/' + title,
            );
          },

          2000,
        );
      } else {
        setResult('done');

        setTimeout(
          function () {
            history.push('/reviewblogs');
            //hri giyoth yana thena
          },

          2000,
        );
      }
    });
  };

  const deleteItem = () => {
    const data = {
      bid: id,
      tableName: 'blog',
      coloum: 'blogId',
    };
    //console.log(id);
    axios.post('http://localhost:3001/blog/deleteItem', data).then(response => {
      if (response.data.error) {
        setResult('err');
        setTimeout(
          function () {
            history.push(
              '/approveworkshopview/cssl00' + data.bid + '/' + title,
            );
          },

          2000,
        );
      } else {
        setResult('done');

        setTimeout(
          function () {
            history.push('/reviewblogs');
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
    const formData = {
      bId: id,
    };
    axios
      .post('http://localhost:3001/blog/getBlog', formData)
      .then(res => {
        setBlogData(res.data[0]);
        setBlogImg('http://localhost:3001/uploads/blog/' + res.data[0].image);
        setProfileImg(
          'http://localhost:3001/uploads/profileImages/' +
            res.data[0].profileImage,
        );
      })
      .catch(error => {
        console.log(error);
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
    history.push('/reviewblogs');
  };
  const createMarkup = html => {
    return {
      __html: DOMPurify.sanitize(html),
    };
  };

  return (
    <Page title="Review Blog">
      <hr />
      {title}

      <hr />
      <Row>
        <Col sm="10" md={{ size: 8, offset: 0 }}>
          <Card>
            <center>
              {blogImg && (
                <img
                  src={blogImg}
                  width="100%"
                  height="400px"
                  className="course-img"
                ></img>
              )}
            </center>
          </Card>
        </Col>
        <Col sm="10" md={{ size: 4, offset: 0 }}>
          <Card>
            <CardBody>
              <center>
                <img
                  src={profileImg}
                  width="60px"
                  height="60px"
                  className="profileImg"
                ></img>
                <br />
                <Badge color="warning" pill className="mr-3">
                  {blogData.title}. {blogData.firstName} {blogData.lastName}
                </Badge>
                <br />
                <Badge color="primary" pill className="mr-3">
                  {blogData.email}
                </Badge>
                <hr />
                {'  '}
                <Badge color="success" pill className="mr-3">
                  10 min Read
                </Badge>

                <br />
                <Badge color="success" pill className="mr-3">
                  Published on {blogData.publishedDate}
                </Badge>
              </center>
            </CardBody>
          </Card>
        </Col>
        <Col sm="10" md={{ size: 12, offset: 0 }}>
          <br></br>
          <Card>
            <CardBody>
              <h6>{blogData.description}</h6>

              <CardBody
                className="preview"
                dangerouslySetInnerHTML={createMarkup(blogData.content)}
              ></CardBody>
            </CardBody>
          </Card>
        </Col>
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
      </Row>
    </Page>
  );
}

export default ApproveView;
