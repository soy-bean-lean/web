import Page from 'components/Page';
import { AuthContext } from '../../helpers/AuthContext';
import { Link } from 'react-router-dom';

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
  Col,
  CardHeader,
  Row,
} from 'reactstrap';
import FormGroup from 'reactstrap/lib/FormGroup';

const Blogs = props => {
  const [blog, setBlog] = useState(null);
  const [blogger, setBlogger] = useState(null);
  const [myBlog, setMyBlog] = useState(null);
  const [title, setTitle] = useState('');

  const [firstName, setFirstName] = useState('');
  const { authState, setAuthState } = useContext(AuthContext);

  const bloggerData =
    blogger &&
    blogger.map((li, i) => {
      return (
        <option key={i} value={li.firstName}>
          {li.firstName} {li.lastName}({li.number})
        </option>
      );
    }, this);

  useEffect(() => {
    const data = {
      title: '',
      firstName: '',
      mId: 'cssl00' + authState.id,
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

    axios
      .post('http://localhost:3001/blog/getAllBloggers', data)

      .then(response => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          setBlogger(response.data);
        }
      })
      .catch(error => {
        alert(error);
      });

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
      title: title,
      firstName: firstName,
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

  const allblogs =
    blog &&
    blog.map((blog, i) => (
      <>
        <Link
          to={'/blogview/cssl00' + blog.blogId + '/' + blog.title}
          key={i}
          className="link-tag"
        >
          <Col md={12} sm={10} xs={10} className="mb-2">
            <Card className="flex-row">
              <img
                src={'http://localhost:3001/uploads/blog/' + blog.image}
                style={{ width: 150, height: 120, margin: 15, radius: 50 }}
              />

              <CardBody>
                <h3>{blog.title}</h3>
                <h6>{blog.description}</h6>
                {/* <h8></h8> */}

                <br></br>
                <h8>
                Author: {blog.firstName} {blog.lastName} | published Date:  {blog.publishedDate}
                </h8>
              
              </CardBody>
            </Card>
          </Col>
        </Link>
        <hr className="course-view-line"></hr>
      </>
    ));

  const myblogs =
    myBlog &&
    myBlog.map((blog, i) => {
      return (
        <>
          <Link
            to={
              '/blogview/cssl00' + blog.blogId + '/' + blog.title
            }
            key={i}
            className="link-tag"
          >
            <Col md={12} sm={10} xs={10} className="mb-2">
              <Card className="flex-row">
                <img
                  src={'http://localhost:3001/uploads/blog/' + blog.image}
                  style={{ width: 150, height: 120, margin: 15, radius: 50 }}
                />

                <CardBody>
                  <h3>{blog.title}</h3>
                  <h6>{blog.description}</h6>
                  <h8>{blog.publishedDate}</h8>

                  <br></br>
                  {/* <h6>
                    {blog.firstName} {blog.lastName}
                  </h6> */}
                  {/* Rating: {course.avgRate} | {course.noOfInteraction} students */}
                </CardBody>
              </Card>
              <Row className="buttonDIV">
                <Col sm="12">
                  <Link to={
                     '/blogview/cssl00' + blog.blogId + '/' + blog.title
                  }>
                    <Button color="primary">Edit</Button>
                  </Link>
                  {'  '}
                  <Link to="">
                    <Button color="danger">Delete</Button>
                  </Link>
                </Col>
              </Row>
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
            All Blogs
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
                      type="select"
                      className="note"
                      placeholder="Search By Bloggers"
                      onChange={event => {
                        setFirstName(event.target.value);
                      }}
                      onClick={getData}
                    >
                      {' '}
                      <option value="">Search By Bloggers</option>
                      {bloggerData}
                    </Input>
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
