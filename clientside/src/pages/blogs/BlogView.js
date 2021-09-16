import Page from 'components/Page';
import { AuthContext } from '../../helpers/AuthContext';
import { Link } from 'react-router-dom';

import { bgCards, gradientCards, overlayCards } from 'demos/cardPage';
import { getStackLineChart, stackLineChartOptions } from 'demos/chartjs';
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';

import classnames from 'classnames';
import Typography from 'components/Typography';

import { Line } from 'react-chartjs-2';
import * as AiIcons from "react-icons/ai";

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

function BlogView(){
    return (
        <Page title="Blog View">
          <CardHeader>
              <h3>hello</h3>
            {/* <h3>{courseData.name}</h3> */}
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
                  <h2>Syllabus - What you will learn from this course</h2>
    
                    {/* {courseData.description} */}
                  </Typography>
    
                  <hr></hr>
                  <h2>Syllabus - What you will learn from this course</h2>
    
                  {/* {contentList} */}
                </CardBody>
              </Card>
            </Col>
            <Col lg={5} md={8} sm={8} xs={12}>
            <br></br>
              <Card>
                <CardBody>
                  <center>
                    {/* <Link  to={"/csslcourses"}>
                      <Button   color="primary">Back</Button>
                    </Link>
                    {'  '}
                    <Link to={"/courseReviewP/" + id + "view"}>
                      <Button color="primary">Reviews</Button>
                    </Link>
                    {'  '}
                    <Link to={"/coursEnrollsP/" + id}>
                      <Button color="primary">Enroll</Button>
                    </Link> */}
                  </center>
                </CardBody>
              </Card>
              <br></br>
              <Card>
                <CardBody>
                  <center>
                    {/* {courseImg && (
                      <img
                        src={courseImg}
                        width="300px"
                        height="200px"
                        className="course-img"
                      ></img>
                    )} */}
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
                       
                        {/* Approx. {courseData.duration} {courseData.durationType} to
                        Complete */}
                      </span>
                    <br></br>
                    <br></br>
                      <span>
                        <AiIcons.AiOutlineWechat />
                      </span>
                      {"  "}
                      <span>hello</span>
                      {/* <span> {courseData.language}</span> */}
                    <br></br>
                    <br></br>
                      <span>
                        <AiIcons.AiOutlineDesktop />
                      </span>
                      {"  "}
                      <span>
                        {/* {"  "} {courseData.mode} */}
                      </span>
                    <br></br>
                    <br></br>
                      <span>
                        <AiIcons.AiOutlineBarChart />{" "}
                      </span>
                      <span>
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
                    {/* <img
                      src={profileImg}
                      width="100px"
                      height="100px"
                      className="instructor-img"
                    ></img> */}
                    <br></br>
                    <hr></hr>
                    {/* {courseData.title}. {courseData.firstName} {courseData.lastName} */}
                  </center>
                </CardBody>
              </Card>
              
            </Col>
          </Row>
        </Page>
      );
}


export default BlogView;
