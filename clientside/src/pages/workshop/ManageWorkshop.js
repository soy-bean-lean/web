import Page from 'components/Page';
import { AuthContext } from '../../helpers/AuthContext';
import { Link } from 'react-router-dom';

import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css';
import '../../main.css';

import classnames from 'classnames';
import Typography from 'components/Typography';

import { Line } from 'react-chartjs-2';
import {
  Button,
  Card,
  CardBody,
  Nav,
  NavItem,
  InputGroup,
  Input,
  NavLink,
  TabContent,
  TabPane,
  CardImg,
  CardText,
  Col,
  CardHeader,
  Row,
} from 'reactstrap';

const ManageWorkshop = props => {
  const [workshop, setWorkshop] = useState(null);
  const [sendWorkshop, setSendWorkshop] = useState(null);

  const { authState, setAuthState } = useContext(AuthContext);

  useEffect(() => {
    const data = {
      // mId: authState.id,
      mId: 'cssl001',
    };
    axios
      .post('http://localhost:3001/workshop/getWorkshop', data)

      .then(response => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          setWorkshop(response.data);
        }
      })
      .catch(error => {
        alert(error);
      });

    // axios
    //   .post('http://localhost:3001/blog/getAllBloggers', formData)

    //   .then(response => {
    //     if (response.data.error) {
    //       alert(response.data.error);
    //     } else {
    //       setBlogger(response.data);
    //     }
    //   })
    //   .catch(error => {
    //     alert(error);
    //   });

    axios
      .post('http://localhost:3001/workshop/getSendWorkshop', data)

      .then(response => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          setSendWorkshop(response.data);
        }
      })
      .catch(error => {
        alert(error);
      });
  }, []);

  const [activeTab, setActiveTab] = useState('1');

  const toggle = tab => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  // const allbloggers =
  //   blogger &&
  //   blogger.map((blogger, i) => (
  //     <>
  //       <Link
  //         to={'/csslcourses/courseview/cssl00' + blogger.memberId}
  //         key={i}
  //         className="link-tag"
  //       >
  //         <Col md={12} sm={10} xs={10} className="mb-2">
  //           <Card className="flex-row">
  //             <CardImg
  //               src={
  //                 'http://localhost:3001/uploads/profileImages/' +
  //                 blogger.profileImage
  //               }
  //               style={{ width: 175, height: 150 }}
  //             />
  //             <CardBody>
  //               <h3>
  //                 {blogger.firstName} {blogger.lastName}{' '}
  //               </h3>
  //               <CardText>
  //                 Ratings
  //                 Number of Blogs :4
  //                 {/* Rating: {course.avgRate} | {course.noOfInteraction} students */}
  //               </CardText>
  //             </CardBody>
  //           </Card>
  //         </Col>
  //       </Link>
  //       <hr className="course-view-line"></hr>
  //     </>
  //   ));

  // const workshops =
  // workshop &&
  // workshop.map((workshop, i) => (
  //     <>
  //       <Link
  //         to={'/workshopview/cssl00' + workshop.wId + '/' + workshop.title}
  //         key={i}
  //         className="link-tag"
  //       >
  //         <Col md={12} sm={10} xs={10} className="mb-2">
  //           <Card className="flex-row">
  //             <CardImg
  //               src={'http://localhost:3001/uploads/workshop/' + workshop.image}
  //               style={{ width: 175, height: 150 }}
  //             />
  //             <CardBody>
  //               <h3>{workshop.title}</h3>
  //               <CardText>
  //                 Ratings
  //                 {/* Rating: {course.avgRate} | {course.noOfInteraction} students */}
  //               </CardText>
  //             </CardBody>
  //           </Card>
  //         </Col>
  //       </Link>
  //       <hr className="course-view-line"></hr>
  //     </>
  //   ));

  const approveWorkshops =
    workshop &&
    workshop.map((workshop, i) => (
      <>
        <Link
          to={'/workshopview/cssl00' + workshop.wId + '/' + workshop.title}
          key={i}
          className="link-tag"
        >
          <Col md={12} sm={10} xs={10} className="mb-2">
            <Card className="flex-row">
              <img
                src={'http://localhost:3001/uploads/workshop/' + workshop.image}
                style={{ width: 150, height: 120, margin: 15, radius: 50 }}
              />

              <CardBody>
                <h3>{workshop.title}</h3>
                {/* <h6>{blog.description}</h6> */}
                {/* <h8></h8> */}

                <br></br>
                <h8>
                  {/* Author: {blog.firstName} {blog.lastName} | published Date:  {blog.publishedDate} */}
                </h8>
              </CardBody>
            </Card>
          </Col>
        </Link>
        <hr className="course-view-line"></hr>
      </>
    ));

  const sendWorkshops =
    sendWorkshop &&
    sendWorkshop.map((sendWorkshop, i) => {
      return (
        <>
          <Link
            to={
              '/workshopview/cssl00' +
              sendWorkshop.wId +
              '/' +
              sendWorkshop.title
            }
            key={i}
            className="link-tag"
          >
            <Col md={12} sm={10} xs={10} className="mb-2">
              <Card className="flex-row">
                <CardImg
                  src={
                    'http://localhost:3001/uploads/workshop/' +
                    sendWorkshop.image
                  }
                  style={{ width: 150, height: 150 }}
                  className="card-img-left"
                  // style={{ width: 175, height: 150 }}
                />
                <CardBody>
                  {/* <h3>{myBlog.title}</h3> */}
                  <CardText>{sendWorkshop.title}</CardText>
                  <Link
                    to={
                      '/addCredit/cssl00' +
                      sendWorkshop.wId +
                      '/' +
                      sendWorkshop.title
                    }
                  >
                    <Button color="primary"> Approved Workshop</Button>
                  </Link>
                </CardBody>
              </Card>

              {'  '}
            </Col>
          </Link>
          <hr className="course-view-line"></hr>
        </>
      );
    });

  return (
    <Page title="Manage Workshops">
      <hr></hr>
      <Nav tabs>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '1' })}
            onClick={() => {
              toggle('1');
            }}
          >
            Approved Workshops
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '2' })}
            onClick={() => {
              toggle('2');
            }}
          >
            Requested Workshops
          </NavLink>
        </NavItem>
      </Nav>

      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
          <Row>
            <Col sm="12">
              <Card className="mb-3">
                <CardHeader>
                  <Typography className="text-success">
                    Approved List
                  </Typography>
                </CardHeader>
                {/* <CardBody>
                  <InputGroup>
                    <Input
                      type="text"
                      className="note"
                      placeholder="Search By Bloggers"
                      onChange={event => {
                        setFirstName(event.target.value);
                      }}
                      onKeyUp={getData}
                    />{' '}
                    <Input
                      type="text"
                      className="note"
                      onChange={event => {
                        setTitle(event.target.value);
                      }}
                      onKeyUp={getData}
                      placeholder="Seach By Blog Titles"
                    />{' '}
                  </InputGroup>
                </CardBody> */}
                <Card className="mb-2"></Card>
                {approveWorkshops}
              </Card>
            </Col>
          </Row>
        </TabPane>

        <TabPane tabId="2">
          <Row>
            <Col sm="12">
              <Card className="mb-3">
                <CardHeader>
                  <Typography className="text-success">
                    Requested List
                  </Typography>
                </CardHeader>
                {sendWorkshops}
              </Card>
            </Col>
          </Row>
        </TabPane>
      </TabContent>
    </Page>
  );
};

export default ManageWorkshop;
