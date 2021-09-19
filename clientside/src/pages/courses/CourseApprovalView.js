import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import * as AiIcons from 'react-icons/ai';
import { AuthContext } from '../../helpers/AuthContext';
import { useParams } from 'react-router-dom';
import Page from 'components/Page';
import { Link } from 'react-router-dom';
import Typography from 'components/Typography';
import {
  Button,
  Card,
  CardBody,
  Badge,
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
            <h4>
              {content.title}{' '}
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
            </h4>
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
        <Col sm="10" md={{ size: 8, offset: 0 }}>
          <Card>
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
              <CardText>{courseData.description}</CardText>
              </center>
            </CardBody>
          </Card>
        </Col>

        <Col sm="6" md={{ size: 4, offset: 0 }}>
          <Card>

            <CardBody>
            <br/>
              <center>
                <Link>
                  <Button color="success">Approve Course</Button>
                </Link>
                {'  '}
                <Link>
                  <Button color="danger">Reject Course</Button>
                </Link>
                {'  '}
              </center>
            </CardBody>
            <hr/>
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
            <CardBody>
              <center>
                <Link to={'/csslcourses'}>
                  <Button color="primary">Back</Button>
                </Link>
                {'  '}
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
                  <Button color="primary">Reviews</Button>
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

export default CourseApprovalView;
