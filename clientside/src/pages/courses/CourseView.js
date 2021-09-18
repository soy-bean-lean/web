import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as AiIcons from "react-icons/ai";
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
} from 'reactstrap';

const CourseView = () => {
  const { id } = useParams();
  const { title } = useParams();

  const [courseImg, setCourseImg] = useState('');
  const [profileImg, setProfileImg] = useState('');
  const [courseData, setCourseData] = useState([]);
  const [content, setContent] = useState(null);

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
          'http://localhost:3001/uploads/profileImages/' + res.data[0].profileImage,
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
            <h4>{content.title}</h4>
            <hr></hr>
            <p>{content.description}</p>
          </CardBody>
        </Card>

        <br></br>
      </>
    ));
  console.log(courseImg);
  return (
    <Page title="CSSL COURSES">
      <CardHeader>
        <h3>{courseData.name}</h3>
      </CardHeader>
      <Row>
        <Col lg={7} md={8} sm={8} xs={12}>
        <br></br>
          <Card>
          <CardHeader>
        <h5>About Course</h5>
      </CardHeader>
            <CardBody>
              <Typography className="text-primary">
                {courseData.description}
              </Typography>

              <hr></hr>
              <h2>Syllabus - What you will learn from this course</h2>

              {contentList}
            </CardBody>
          </Card>
        </Col>
        <Col lg={5} md={8} sm={8} xs={12}>
        <br></br>
          <Card>
            <CardBody>
              <center>
                <Link  to={"/csslcourses"}>
                  <Button   color="primary">Back</Button>
                </Link>
                {'  '}
                <Link to={"/courseReviewP/" + id + "view"}>
                  <Button color="primary">Reviews</Button>
                </Link>
                {'  '}
                <Link to={"/coursEnrollsP/" + id}>
                  <Button color="primary">Enroll</Button>
                </Link>
              </center>
            </CardBody>
          </Card>
          <br></br>
          <Card>
            <CardBody>
              <center>
                {courseImg && (
                  <img
                    src={courseImg}
                    width="300px"
                    height="200px"
                    className="course-img"
                  ></img>
                )}
                <br></br>
                <br></br>
                </center>

                  
                <Card>
                <CardBody>
                <span>
                    <AiIcons.AiOutlineClockCircle />
                  </span>
                  {"  "}
                  <span>
                   
                    Approx. {courseData.duration} {courseData.durationType} to
                    Complete
                  </span>
                <br></br>
                <br></br>
                  <span>
                    <AiIcons.AiOutlineWechat />
                  </span>
                  {"  "}
                  <span> {courseData.language}</span>
                <br></br>
                <br></br>
                  <span>
                    <AiIcons.AiOutlineDesktop />
                  </span>
                  {"  "}
                  <span>
                    {"  "} {courseData.mode}
                  </span>
                <br></br>
                <br></br>
                  <span>
                    <AiIcons.AiOutlineBarChart />{" "}
                  </span>
                  <span>
                    {"  "}
                    {courseData.skillLevel}
                  </span>
</CardBody>

                  </Card>
            </CardBody>
          </Card>
          <br></br>
          <Card>
            <CardBody>
              <center>
                <img
                  src={profileImg}
                  width="100px"
                  height="100px"
                  className="instructor-img"
                ></img>
                <br></br>
                <hr></hr>
                {courseData.title}. {courseData.firstName} {courseData.lastName}
              </center>
            </CardBody>
          </Card>
          
        </Col>
      </Row>
    </Page>
  );
};

export default CourseView;
