import Page from 'components/Page';
import { AuthContext } from '../../helpers/AuthContext';
import { Link } from 'react-router-dom';
import bg11Image from 'assets/img/bg/background_1920-11.jpg';
import bg18Image from 'assets/img/bg/background_1920-18.jpg';
import bg1Image from 'assets/img/bg/background_640-1.jpg';
import bg3Image from 'assets/img/bg/background_640-3.jpg';
import { bgCards, gradientCards, overlayCards } from 'demos/cardPage';
import { getStackLineChart, stackLineChartOptions } from 'demos/chartjs';
import React, { useState, useEffect,useContext  } from 'react';
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
  
  const tableTypes = ['striped'];
  const [blog, setBlog] = useState(null);
  const { authState, setAuthState } = useContext(AuthContext);


  useEffect(() => {
    const formData = {
      mId: 'cssl001',
    };
    axios
      .post('http://localhost:3001/blog/', formData)

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
  }, []);

  const [activeTab, setActiveTab] = useState('1');

  const toggle = tab => {
    if (activeTab !== tab) setActiveTab(tab);
  };

 


  const myBlogs =
  blog &&
  blog.map(( blog, i) =>
  blog.memberId === authState.id ? (
      <>
         <tr>
        <th hidden="true">{i}</th>
        <td hidden="true">{blog.blogId}</td>
        <td>{blog.image}</td>
        <td>{blog.title}</td>
        <td>{blog.content}</td>
        <td>
        <Link to={''}>
                <Button color="success" size="sm">
                 View{' '}
                </Button>
              </Link>
          </td>
        </tr>
      </>
    ) : (
      <></>
    ),
  );


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
        {tableTypes.map((tableType, index) => (
          <Row>
            <Col sm="12">
              <Card className="mb-3">
              <CardHeader>
                  <Typography className="text-success">All Blogs</Typography>
                </CardHeader>
               {/* {myBlogs } */}
              
                <CardBody>
                  <Card body>
                  <Table {...{ ['striped']: true }}>
                      <tbody>{myBlogs}</tbody>
                    </Table>
                
                    {/* <Col md={12} sm={10} xs={10} className="mb-2">
                      <Card className="flex-row">
                        <CardImg
                          className="card-img-left"
                          src={bg1Image}
                          style={{ width: 'auto', height: 150 }}
                        />
                        <CardBody>
                          <CardTitle>Horizontal Image Card(Left)</CardTitle>
                          <CardText>
                            Some quick example text to build on the card title
                            and make up the bulk of the card's content.
                          </CardText>
                        </CardBody>
                      </Card>
                    </Col> */}
                  </Card>
                </CardBody>
                
              </Card>
            </Col>
          </Row>
          ))}
        </TabPane>
       
       
       
        <TabPane tabId="2">
          <Row>
            <Col sm="12">
              <Card className="mb-3">
              <CardHeader>
                  <Typography className="text-success">My Blogs</Typography>
                </CardHeader>
                {/* map Starts */}
                <CardBody>
                  <Card body>
                    <Col md={12} sm={10} xs={10} className="mb-2">
                      <Card className="flex-row">
                        <CardImg
                          className="card-img-left"
                          src={bg18Image}
                          style={{ width: 'auto', height: 150 }}
                        />
                        <CardBody>
                          <CardTitle>Horizontal Image Card(Left)</CardTitle>
                          <CardText>
                            Some quick example text to build on the card title
                            and make up the bulk of the card's content.
                          </CardText>
                        </CardBody>
                      </Card>
                      <Button color="primary" className="buttonDIV">
                        Edit
                      </Button>

                      <Button color="danger" className="buttonDIV">
                        Delete
                      </Button>
                    </Col>
                  </Card>
                </CardBody>
                {/* map end                 */}
                <CardBody>
                  <Card body>
                    <Col md={12} sm={10} xs={10} className="mb-2">
                    <CardHeader>
                
                </CardHeader>
                      <Card className="flex-row">
                        <CardImg
                          className="card-img-left"
                          src={bg18Image}
                          style={{ width: 'auto', height: 150 }}
                        />
                        <CardBody>
                          <CardTitle>Horizontal Image Card(Left)</CardTitle>
                          <CardText>
                            Some quick example text to build on the card title
                            and make up the bulk of the card's content.
                          </CardText>
                        </CardBody>
                      </Card>
                      <Button color="primary" className="buttonDIV">
                        Edit
                      </Button>

                      <Button color="danger" className="buttonDIV">
                        Delete
                      </Button>
                    </Col>
                  </Card>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </TabPane>
      </TabContent>
    </Page>
  );
};

export default Blogs;
