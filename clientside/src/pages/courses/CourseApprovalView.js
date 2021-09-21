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

const CourseApprovalView = () => {
  const { id } = useParams();
  const { title } = useParams();

  const [courseImg, setCourseImg] = useState('');
  const [profileImg, setProfileImg] = useState('');
  const [courseData, setCourseData] = useState([]);
  const [content, setContent] = useState(null);
  const { authState, setAuthState } = useContext(AuthContext);

  const [result, setResult] = useState();

  let history = useHistory();
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0');
  var yyyy = today.getFullYear();
  today = yyyy + '-' + mm + '-' + dd;

  useEffect(() => {
    const formData = {
      cId: id,
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
      .post('http://localhost:3001/csslcourse/getContentList', formData)

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
  }, []);
  const contentList =
    content &&
    content.map((content, i) => (
      <>
        <Card>
          <CardBody>
            <h4>{content.title} </h4>
            <Link
              to={
                '/courseapproval/csslcourses/cssl00' +
                id +
                '/' +
                title +
                '/' +
                content.contentId +
                '/' +
                content.title
              }
            >
              <Button color="primary">View</Button>
            </Link>
            <hr></hr>
            <p>{content.description}</p>
          </CardBody>
        </Card>
        <br></br>
      </>
    ));

  const approveCourse = () => {
    const formData = {
      mId: authState.memberId,
      cId: id,
      appDate: today,
    };
    axios
      .post('http://localhost:3001/council/approveCourse', formData)

      .then(response => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          var st = 'Approved'
          statusChangeAllContent(st);
        }
      })
      .catch(error => {
        setResult('done');
      });
  };

  const rejectCourse = () => {
    const formData = {
      mId: authState.memberId,
      cId: id,
      appDate: today,
    };
    axios
      .post('http://localhost:3001/council/rejectCourse', formData)

      .then(response => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          var st = 'Rejected'
          statusChangeAllContent(st);
        }
      })
      .catch(error => {
        setResult('done');
      });
  };

  const statusChangeAllContent = st => {
    const formData = {
      cId: id,
      status: st,
    };
    axios
      .post('http://localhost:3001/council/changeAllContentStatus', formData)

      .then(response => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          if(st == 'Approved'){
            setResult('approve');
          }
          else{
            setResult('reject');
          }
          setTimeout(function () {
            history.push('/courseapproval/csslcourses');
          }, 2000);
        }
      })
      .catch(error => {
        setResult('done');
      });
  };

  function msg() {
    if (result == 'err') {
      return (
        <>
          <Alert color="danger">Unsuccessfull Attempt,Try Again</Alert>
        </>
      );
    } else if (result == 'approve') {
      return (
        <>
          <Alert color="success">Course Approved Successfully</Alert>
        </>
      );
    } else if (result == 'reject') {
      return (
        <>
          <Alert color="success">Course Rejected Successfully</Alert>
        </>
      );
    }
  }

  return (
    <Page title={courseData.name}>
      <Row>
        <Col sm="10" md={{ size: 8, offset: 0 }}>
          <Card>
            <center>{msg()}</center>
            <CardBody>
              <center>
                {courseImg && (
                  <img
                    src={courseImg}
                    width="180px"
                    height="150px"
                    className="course-img"
                  ></img>
                )}
                <br />
                <br />
                <Badge color="warning" className="mr-1">
                  {courseData.category}
                </Badge>{' '}
                <Badge color="warning" className="mr-1">
                  {courseData.skillLevel} Level
                </Badge>{' '}
                <Badge color="warning" className="mr-1">
                  {courseData.duration} {courseData.durationType}
                </Badge>{' '}
                <Badge color="warning" className="mr-1">
                  {courseData.language}
                </Badge>{' '}
                <br />
                <br />
                <CardText>{courseData.description}</CardText>
              </center>
            </CardBody>
          </Card>
        </Col>

        <Col sm="6" md={{ size: 4, offset: 0 }}>
          <Card>
            <CardBody>
              <br />
              <center>
                {courseData.status != 'Approved' && (
                  <Link onClick={approveCourse}>
                    <Button color="success">Approve Course</Button>
                  </Link>
                )}
                {'  '}
                {courseData.status != 'Rejected' && (
                  <Link onClick={rejectCourse}>
                    <Button color="danger">Reject Course</Button>
                  </Link>
                )}
              </center>
            </CardBody>
            <hr />
            <CardBody>
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
                {courseData.title}. {courseData.firstName} {courseData.lastName}
              </center>
            </CardBody>
          </Card>
        </Col>
        <Col sm={12}>
          <Card>
            <CardBody>{contentList}</CardBody>
          </Card>
        </Col>
      </Row>
    </Page>
  );
};

export default CourseApprovalView;
