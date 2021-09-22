import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import * as AiIcons from 'react-icons/ai';
import { AuthContext } from '../../helpers/AuthContext';
import { useParams, useHistory } from 'react-router-dom';
import Page from 'components/Page';
import { Link } from 'react-router-dom';
import Typography from 'components/Typography';
import {
  Button,
  Card,
  CardBody,
  Badge,
  Alert,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  CardImg,
  CardImgOverlay,
  CardLink,
  CardText,
  CardTitle,
  Col,
  ListGroup,
  CardHeader,
  Table,
  ListGroupItem,
  Row,
  CardGroup,
} from 'reactstrap';

const CourseView = () => {
  const { id } = useParams();
  const { title } = useParams();

  const [courseImg, setCourseImg] = useState('');
  const [profileImg, setProfileImg] = useState('');
  const [courseData, setCourseData] = useState([]);
  const [content, setContent] = useState(null);
  const { authState, setAuthState } = useContext(AuthContext);

  const [courseStatus, setCoursestatus] = useState('');
  const [certifiedDate, setCertifiedDate] = useState('');

  const [message, setMessage] = useState('');

  let history = useHistory();

  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0');
  var yyyy = today.getFullYear();
  var hh = String(today.getHours()).padStart(2, '0');
  var mn = String(today.getMinutes() + 1).padStart(2, '0');
  var ss = String(today.getSeconds()).padStart(2, '0');

  var nowDate = yyyy + '-' + mm + '-' + dd;
  var lastAcc = yyyy + '-' + mm + '-' + dd + ' ' + hh + ':' + mn + ':' + ss;

  useEffect(() => {
    const formData = {
      cId: id,
      mid: authState.memberId,
    };

    const submitData = {
      cId: id,
      mid: authState.memberId,
      certifiedDate: nowDate,
      lastAcc: lastAcc,
    };
    axios
      .post('http://localhost:3001/csslcourse/getCourse', formData)
      .then(res => {
        setCourseData(res.data[0]);
        setCourseImg(
          'http://localhost:3001/uploads/csslCourses/' + res.data[0].image,
        );
        setProfileImg(
          'http://localhost:3001/uploads/profileImages/' +
            res.data[0].profileImage,
        );
      })
      .catch(error => {
        console.log(error);
      });

    axios
      .post('http://localhost:3001/csslcourse/getEnrolledContentList', formData)

      .then(response => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          setContent(response.data);
        }
      })
      .catch(error => {
        alert(error);
      });

    axios
      .post('http://localhost:3001/csslcourse/completeEnrollCourse', submitData)

      .then(response => {
        if (response.data.error) {
          //alert(response.data.error);
          console.log(response.data.error);
        } else {
          console.log(response.data);
        }
      })
      .catch(error => {
        alert(error);
        console.log(error);
      });

    axios
      .post('http://localhost:3001/csslcourse/enrollCourseData', submitData)

      .then(response => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          console.log(response.data);
          setCertifiedDate(response.data[0].certifiedDate);
          setCoursestatus(response.data[0].status);
        }
      })
      .catch(error => {
        alert(error);
      });
  }, []);

  const updateEnCourse = () => {
    const submitData = {
      cId: id,
      mid: authState.memberId,
      certifiedDate: nowDate,
    };
    axios
      .post('http://localhost:3001/csslcourse/updateCourseData', submitData)

      .then(response => {
        if (response.data.error) {
          console.log(response.data.error);
        } else {
          console.log(response.data);
          setMessage('done');
          setTimeout(
            function () {
              history.push('/csslcourse');
            },
  
            2000,
          );
        }
      })
      .catch(error => {
        setMessage('err');
      });
  };

  function msg() {
    if (message == 'err') {
      return (
        <>
          <Alert color="danger">Network Error</Alert>
        </>
      );
    } else if (message == 'done') {
      return (
        <>
          <Alert color="success">Certificate Sent to Your Email</Alert>
        </>
      );
    }
  }

  const contentList =
    content &&
    content.map((content, i) => (
      <>
        <Card>
          <CardBody>
            <h4>{content.title} </h4>
            {content.status == 'Start' && (
              <Link
                to={
                  '/csslcourse/enrolledcourse/cssl00' +
                  id +
                  '/' +
                  title +
                  '/' +
                  'accesscontent' +
                  '/' +
                  content.contentId +
                  '/' +
                  content.title
                }
              >
                <Button color="success">Start</Button>
              </Link>
            )}

            {(content.status == 'Ongoing' || content.status == 'Test') && (
              <Link
                to={
                  '/csslcourse/enrolledcourse/cssl00' +
                  id +
                  '/' +
                  title +
                  '/' +
                  'accesscontent' +
                  '/' +
                  content.contentId +
                  '/' +
                  content.title
                }
              >
                <Button color="primary">Continue</Button>
              </Link>
            )}

            {content.status == 'Complete' && (
              <Link
                to={
                  '/csslcourse/enrolledcourse/cssl00' +
                  id +
                  '/' +
                  title +
                  '/' +
                  'accesscontent' +
                  '/' +
                  content.contentId +
                  '/' +
                  content.title
                }
              >
                <Button color="info">View</Button>
              </Link>
            )}
            <hr></hr>
            <p>{content.description}</p>
          </CardBody>
        </Card>

        <br></br>
      </>
    ));

  return (
    <Page title={courseData.name}>
      <Row>
        <Col sm={12}>
          <Card>
            <br />
            <center>
              {msg()}
              <Col sm={9}>
                <Card style={{ border: 'none' }}>
                  <CardBody
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      alignContent: 'center',
                    }}
                  >
                    <center>
                      {courseImg && (
                        <img
                          src={courseImg}
                          width="250px"
                          height="250px"
                          className="course-img"
                        ></img>
                      )}
                    </center>
                    <center>
                      <img
                        src={profileImg}
                        width="100px"
                        height="100px"
                        className="instructor-img"
                      ></img>
                      <br></br>
                      <br></br>
                      <h6>Conducted By</h6>
                      {courseData.title}. {courseData.firstName}{' '}
                      {courseData.lastName}
                    </center>
                  </CardBody>
                </Card>
              </Col>
            </center>
            <br />
          </Card>
        </Col>
        <Col sm={12}>
          <Card>
            <CardBody>{contentList}</CardBody>
            <CardBody>
              <center>
                <Link to={'/csslcourses'}>
                  <Button color="primary">Back</Button>
                </Link>
                {'  '}
                {courseStatus == 'Completed' &&
                  (certifiedDate == null || certifiedDate == '') && (
                    <Button color="primary" onClick={updateEnCourse}>
                      Request Certificate
                    </Button>
                  )}
                {courseStatus == 'Completed' &&
                  certifiedDate != null &&
                  certifiedDate != '' && (
                    <>
                    <br />
                    <Badge color="warning">Certificate Issued</Badge>
                    </>
                  )}
                <Link
                  to={
                    '/csslcourse/enrolledcourse/cssl00' +
                    id +
                    '/' +
                    title +
                    '/' +
                    'coursereviews'
                  }
                >
                  <Button hidden color="primary">
                    Reviews
                  </Button>
                </Link>
                {'  '}
              </center>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Page>
  );
};

export default CourseView;
