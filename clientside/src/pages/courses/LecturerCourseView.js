import React, { useState, useEffect } from 'react';
import axios from 'axios';
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

const LecturerCourseView = () => {
  const { id } = useParams();
  const { title } = useParams();

  const [courseImg, setCourseImg] = useState('');
  const [content, setContent] = useState(null);

  useEffect(() => {
    const formData = {
      cId: id,
    };
    axios
      .post('http://localhost:3001/csslcourse/getCourseImg', formData)
      .then(res => {
        setCourseImg('http://localhost:3001/uploads/csslCourses/' + res.data[0].image);
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
        <Row>
          <Col md={12} sm={6} xs={12} className="mb-3">
            <Card className="flex-row">
              <CardBody>
                <CardTitle>
                  <h4>{content.title}</h4>
                </CardTitle>
                <CardText>{content.description}</CardText>
                <Link to={"/csslcourse/editCourseContent/cssl00" + id + "/" + title + "/" + content.contentId + "/" + content.title}>
                  <Button color="warning">
                    Edit
                  </Button>
                </Link>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </>
    ));

  return (
    <Page title="Course">
      <hr></hr>
      <Link to="">
        <Button color="success">
          Get Approval
        </Button>
      </Link>
      {'  '}
      <Link to={'/csslcourse/editCourse/cssl00' + id + '/' + title}>
        <Button color="warning">
          Edit Course
        </Button>
      </Link>
      {'  '}
      <Link to="">
        <Button color="danger">Delete Course</Button>
      </Link>
      <br></br>
      <hr></hr>
      <Row>
        <Col sm="12">
          <CardHeader>
            <Typography>
              <h2>{title}</h2>
            </Typography>
            <hr></hr>
            <Link to={'/csslcourse/addCourseContent/cssl00' + id + '/' + title}>
              <Button color="primary">Add Content</Button>
            </Link>
            {'  '}
            <Link to="">
              <Button color="primary">Add Quiz</Button>
            </Link>
          </CardHeader>

          <CardBody>
            <Card body>{contentList}</Card>
          </CardBody>
        </Col>
      </Row>
    </Page>
  );
};

export default LecturerCourseView;
