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
  Badge,
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
  Table,
  CardHeader,
  Row,
} from 'reactstrap';
const tableTypes = ['striped'];

const ManageWorkshop = props => {
  const [approveBlog, setApprove] = useState(null);
 
  const [blogs, setPending] = useState(null);
  //const[approveWorkshop]

  const { authState, setAuthState } = useContext(AuthContext);

  useEffect(() => {
    const data = {
      // mId: authState.id,
      mId: 'cssl001',
    };
   
    
    axios
      .post('http://localhost:3001/blog/getPendingBlog', data)

      .then(response => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          setPending(response.data);
        }
      })
      .catch(error => {
        alert(error);
      });

      
    axios
    .post('http://localhost:3001/blog/getApproveBlog', data)

    .then(response => {
      if (response.data.error) {
        alert(response.data.error);
      } else {
        setApprove(response.data);
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

  const pendingBlogs =
    blogs &&
    blogs.map((workshop, i) => (
      <>
        <tr>
          <td hidden>{workshop.blogId}</td>
          <td>{workshop.title}</td>
          <td>
            <center>
              <Badge color="warning" pill className="mr-1">
                {workshop.publishedDate}
              </Badge>
            </center>
          </td>
          
          

          <td>
            <center>
              {'   '}
              <Link
                to={
                  '/approveblogview/cssl00' +     workshop.blogId +        '/' +                  workshop.title
                }
              >
                <Button color="primary" size="sm">
                  View More{' '}
                </Button>
              </Link>
            </center>
          </td>
        </tr>
      </>
    ));

  const approveBlogs =
  approveBlog &&
  approveBlog.map((sendWorkshop, i) => (
      <>
        <tr>
          <td>{sendWorkshop.title}</td>
          <td>
            <center>
              <Badge color="warning" pill className="mr-1">
                {sendWorkshop.publishedDate}
              </Badge>
            </center>
          </td>
         
          <td>
            <center>
              {'   '}
              <Link
                to={
                  '/addCredit/cssl00' +
                  sendWorkshop.wId +
                  '/' +
                  sendWorkshop.title
                }
              >
                <Button color="primary" size="sm">
                  View More{' '}
                </Button>
              </Link>
            </center>
          </td>
        </tr>
      </>
    ));

  return (
    <Page title="Manage Blogs">
      <hr></hr>
      <Nav tabs>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '1' })}
            onClick={() => {
              toggle('1');
            }}
          >
            Pending Blogs          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '2' })}
            onClick={() => {
              toggle('2');
            }}
          >
           Approve Blogs
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
          <Row>
            <Col sm="12">
              {tableTypes.map((tableType, index) => (
                <Row>
                  <Col>
                    <Card className="mb-3">
                      <CardBody>
                        <Row>
                          <Col>
                            <Card body>
                              <Table {...{ ['striped']: true }}>
                                <tbody>
                                <th>Title</th>
                                  <th>Published Date</th>
                                  {pendingBlogs}
                                </tbody>
                              </Table>
                            </Card>
                          </Col>
                        </Row>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
              ))}
            </Col>
          </Row>
        </TabPane>

        <TabPane tabId="2">
          <Row>
            <Col sm="12">
              {tableTypes.map((tableType, index) => (
                <Row>
                  <Col>
                    <Card className="mb-3">
                      <CardBody>
                        <Row>
                          <Col>
                            <Card body>
                              <Table {...{ ['striped']: true }}>
                                <tbody>
                                  <th>Title</th>
                                  <th>Published Date</th>
                                  
                                  {approveBlogs}
                                </tbody>
                              </Table>
                            </Card>
                          </Col>
                        </Row>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
              ))}
            </Col>
          </Row>
        </TabPane>
      </TabContent>
    </Page>
  );
};

export default ManageWorkshop;
