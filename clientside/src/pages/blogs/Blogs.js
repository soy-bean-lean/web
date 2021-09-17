import Page from 'components/Page';
import { AuthContext } from '../../helpers/AuthContext';
import { Link } from 'react-router-dom';
import bg11Image from 'assets/img/bg/background_1920-11.jpg';
import bg18Image from 'assets/img/bg/background_1920-18.jpg';
import bg1Image from 'assets/img/bg/background_640-1.jpg';
import bg3Image from 'assets/img/bg/background_640-3.jpg';
import { bgCards, gradientCards, overlayCards } from 'demos/cardPage';
import { getStackLineChart, stackLineChartOptions } from 'demos/chartjs';
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';

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

const Blogs = props => {
  const [blog, setBlog] = useState(null);
  const [blogger, setBlogger] = useState(null);
  const [myBlog, setMyBlog] = useState(null);
  const [title, setTitle] = useState('');

  const [firstName, setFirstName] = useState('');
  const { authState, setAuthState } = useContext(AuthContext);

  useEffect(() => {
    const data = {
      title:'',
      firstName:'',
      mId: 'cssl001',

    };
    // const formData = {
    //   // mId: authState.id,
    //   mId: 'cssl001',
    // };
    axios
      .post('http://localhost:3001/blog/getAllBlogs', data)

      .then(response => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          setBlog(response.data);
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
      .post('http://localhost:3001/blog/getMyBlogs', data)

      .then(response => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          setMyBlog(response.data);
        }
      })
      .catch(error => {
        alert(error);
      });
  }, []);


  const getData = () => {
    const data = {
      title:title,
      firstName:firstName,

    };
    axios
      .post('http://localhost:3001/blog/getAllBlogs', data)
      .then(response => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          setBlog(response.data);
        }
      })
      .catch(error => {
        alert(error);
      });
  };

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

  const allblogs =
    blog &&
    blog.map((blog, i) => (
      <>
        <Link
          to={'/csslcourses/courseview/cssl00' + blog.blogId + '/' + blog.title}
          key={i}
          className="link-tag"
        >
          <Col md={12} sm={10} xs={10} className="mb-2">
            <Card className="flex-row">
              <CardImg
                src={'http://localhost:3001/uploads/blog/' + blog.image}
                style={{ width: 175, height: 150 }}
              />
              <CardBody>
                <h3>{blog.title}</h3>
                <CardText>
                  Ratings
                  {/* Rating: {course.avgRate} | {course.noOfInteraction} students */}
                </CardText>
              </CardBody>
            </Card>
          </Col>
        </Link>
        <hr className="course-view-line"></hr>
      </>
    ));

  const myblogs =
    myBlog &&
    myBlog.map((myBlog, i) => {
      return (
        <>
          <Link
            to={'/blogview/cssl00' + myBlog.blogId + '/' + myBlog.title}
            key={i}
            className="link-tag"
          >
            <Col md={12} sm={10} xs={10} className="mb-2">
              <Card className="flex-row">
                <CardImg
                  src={'http://localhost:3001/uploads/blog/' + myBlog.image}
                  style={{ width: 'auto', height: 150 }}
                  className="card-img-left"
                  // style={{ width: 175, height: 150 }}
                />
                <CardBody>
                  <h3>{myBlog.title}</h3>
                  <CardText>{myBlog.content}</CardText>
                </CardBody>
              </Card>
              <Button color="primary" className="buttonDIV">
                Edit
              </Button>

              <Button color="danger" className="buttonDIV">
                Delete
              </Button>
            </Col>
          </Link>
          <hr className="course-view-line"></hr>
        </>
      );
    });

  return (
    <Page title="Blogs">
      <hr></hr>
      <Link to="/addBlogs">
        <Button color="success" to="/addBlogs">
          New Blog
        </Button>
      </Link>
      <br></br>
      <hr></hr>
      <Nav tabs>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '1' })}
            onClick={() => {
              toggle('1');
            }}
          >
            Bloggers
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '2' })}
            onClick={() => {
              toggle('2');
            }}
          >
            My Blogs
          </NavLink>
        </NavItem>
      </Nav>

      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
          <Row>
            <Col sm="12">
              <Card className="mb-3">
                <CardHeader>
                  <Typography className="text-success">All Blogs</Typography>
                </CardHeader>
                <CardBody>
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
                </CardBody>
                <Card className="mb-2"></Card>
                {allblogs}
                {/* {allbloggers} */}
              </Card>
            </Col>
          </Row>
        </TabPane>

        <TabPane tabId="2">
          <Row>
            <Col sm="12">
              <Card className="mb-3">
                <CardHeader>
                  <Typography className="text-success">My Blogs</Typography>
                </CardHeader>
                {myblogs}
              </Card>
            </Col>
          </Row>
        </TabPane>
      </TabContent>
    </Page>
  );
};

export default Blogs;
