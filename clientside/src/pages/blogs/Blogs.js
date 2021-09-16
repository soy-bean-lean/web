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

const Blogs = props => {
  const [blog, setBlog] = useState(null);
  const [blogger, setBlogger] = useState(null);
  const [myBlog, setMyBlog] = useState(null);
  const { authState, setAuthState } = useContext(AuthContext);

  useEffect(() => {
    const formData = {
     // mId: authState.id,
      mId: authState.id,
    };
    // axios
    //   .post('http://localhost:3001/blog/getAllBlogs', formData)

    //   .then(response => {
    //     if (response.data.error) {
    //       alert(response.data.error);
    //     } else {
    //       setBlog(response.data);
    //     }
    //   })
    //   .catch(error => {
    //     alert(error);
    //   });

      axios
      .post('http://localhost:3001/blog/getAllBloggers', formData)

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
      .post('http://localhost:3001/blog/getMyBlogs', formData)

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

  const [activeTab, setActiveTab] = useState('1');

  const toggle = tab => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const allbloggers =
  blogger &&
  blogger.map((blogger, i) => (
    <>
      <Link
        to={'/csslcourses/courseview/cssl00' + blogger.memberId }
        key={i}
        className="link-tag"
      >
        <Col md={12} sm={10} xs={10} className="mb-2">
          <Card className="flex-row">
            <CardImg
              src={'http://localhost:3001/uploads/profileImages/' + blogger.profileImage}
              style={{ width: 175, height: 150 }}
            />
            <CardBody>
              <h3>{blogger.firstName} {blogger.lastName} </h3>
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


  // const allblogs =
  //   blog &&
  //   blog.map((blog, i) => (
  //     <>
  //       <Link
  //         to={'/csslcourses/courseview/cssl00' + blog.blogId + '/' + blog.title}
  //         key={i}
  //         className="link-tag"
  //       >
  //         <Col md={12} sm={10} xs={10} className="mb-2">
  //           <Card className="flex-row">
  //             <CardImg
  //               src={'http://localhost:3001/uploads/blog/' + blog.image}
  //               style={{ width: 175, height: 150 }}
  //             />
  //             <CardBody>
  //               <h3>{blog.title}</h3>
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

  const myblogs =
    myBlog &&
    myBlog.map((myBlog, i) => {
        return (
          <>
            <Link
              to={'/courseView/cssl00' + myBlog.blogId + '/' + myBlog.title}
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

  // const myBlogs =
  // blog &&
  // blog.map((blog, i) => (
  //   <>
  //     <tr>
  //       <th hidden="true">{i}</th>
  //       <td hidden="true">{blog.blogId}</td>
  //       <td>{blog.image}</td>
  //       <td>{blog.title}</td>
  //       <td>{blog.content}</td>
  //       <td>
  //      { blog.memberId === authState.id ? (
  //       <Link
  //           to={''}
  //         >
  //           <Button
  //             color="success"
  //             size="sm"

  //           >
  //             View{' '}
  //           </Button>
  //         </Link>
  //       ) : (
  //     <></>
  //       )
  //      }
  //       </td>
  //     </tr>
  //   </>
  // ));

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
                {allbloggers}

               
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
