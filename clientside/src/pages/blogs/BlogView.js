import Page from 'components/Page';
import { AuthContext } from '../../helpers/AuthContext';
import { Link } from 'react-router-dom';
import TextEditor from '../../components/TextEditor/RichTextEditor';
import DOMPurify from 'dompurify';

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

  const createMarkup = html => {
    return {
      __html: DOMPurify.sanitize(html),
    };
  };
  return (
    <Page title={title}>
      <hr />
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
                <p>
                  {blogData.title}. {blogData.firstName}
                </p>
                <p> {blogData.email}</p>
              </center>

              <hr />
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
              <span>
                <AiIcons.AiOutlineWechat />
              </span>
              {'  '}
              <span>Comment: 5</span>
              {/* <span> {courseData.language}</span> */}
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
              <span>
                <AiIcons.AiOutlineBarChart />{' '}
              </span>
              <span>
                publish Date {blogData.publishedDate}
                {/* {"  "}
                    {courseData.skillLevel} */}
              </span>
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
      </Row>
    </Page>
  );
};

export default BlogView;
