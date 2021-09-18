import Page from 'components/Page';
import { AuthContext } from '../../helpers/AuthContext';
import { Link } from 'react-router-dom';

import { bgCards, gradientCards, overlayCards } from 'demos/cardPage';
import { getStackLineChart, stackLineChartOptions } from 'demos/chartjs';
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import classnames from 'classnames';
import Typography from 'components/Typography';

import { Line } from 'react-chartjs-2';
import * as AiIcons from 'react-icons/ai';

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

const BlogView = () => {
  const { id } = useParams();
  const { title } = useParams();

  const [blogImg, setBlogImg] = useState('');
  const [profileImg, setProfileImg] = useState('');
  const [blogData, setBlogData] = useState([]);

  useEffect(() => {
    const formData = {
      bId: id,
    };
    axios
      .post('http://localhost:3001/blog/getBlog', formData)
      .then(res => {
        setBlogData(res.data[0]);
        setBlogImg('http://localhost:3001/uploads/blog/' + res.data[0].image);

        // console.log(
        //   'http://localhost:3001/uploads/csslCourses/' + res.data[0].image,
        // );
        setProfileImg(
          'http://localhost:3001/uploads/profileImages/' +
            res.data[0].profileImage,
        );
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <Page title="Blog View">
      <CardHeader>
        {/* <h3>hello</h3> */}
        <h3>{blogData.title}</h3>
      </CardHeader>
      <Row>
        <Col lg={7} md={8} sm={8} xs={12}>
          <br></br>
          <Card>
            <CardHeader>
              <h5>About Blog</h5>
            </CardHeader>
            <CardBody>
              <Typography className="text-primary">
               

              <h6>{blogData.description}</h6>
              </Typography>

              <hr></hr>
              <br></br>
              
              {/* <h2>Syllabus - What you will learn from this course</h2> */}
              
              {blogData.content}
              {/* {contentList} */}
            </CardBody>
          </Card>
        </Col>
        <Col lg={5} md={8} sm={8} xs={12}>
          <br></br>
          <Card>
            <CardBody>
              <center>
                <Link to={'/blogs'}>
                  <Button color="primary">Back</Button>
                </Link>
                {'  '}
                <Link to={'/courseReviewP/' + id + 'view'}>
                  <Button color="primary">Comments</Button>
                </Link>
                {'  '}
                <Link to={'/coursEnrollsP/' + id}>
                  <Button color="primary">Clap</Button>
                </Link>
              </center>
            </CardBody>
          </Card>
          <br></br>
          <Card>
            <CardBody>
              <center>
                {blogImg && (
                  <img
                    src={blogImg}
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
                  {'  '}
                  <span>
                    Read Min : 10 minu
                    {/* Approx. {courseData.duration} {courseData.durationType} to
                    Complete */}
                  </span>
                  <br></br>
                  <br></br>
                  <span>
                    <AiIcons.AiOutlineWechat />
                  </span>
                  {'  '}
                  <span>Comment: 5</span>
                  {/* <span> {courseData.language}</span> */}
                  <br></br>
                  <br></br>
                  <span>
                    <AiIcons.AiOutlineDesktop />
                  </span>
                  {'  '}
                  <span>
                    read count : 10
                    {/* {"  "} {courseData.mode} */}
                  </span>
                  <br></br>
                  <br></br>
                  <span>
                    <AiIcons.AiOutlineBarChart />{' '}
                  </span>
                  <span>
                    publish Date  {blogData.publishedDate}
                    {/* {"  "}
                    {courseData.skillLevel} */}
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
                {blogData.title}. {blogData.firstName} {blogData.lastName}
                <br></br>
                {blogData.email}
              </center>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Page>
  );
};

export default BlogView;
