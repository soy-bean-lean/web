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
import { useHistory } from 'react-router-dom';

import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Input,
  Badge,
  CardImg,
  CardImgOverlay,
  CardLink,
  CardText,
  CardTitle,
  Col,
  Alert,
  Row,
} from 'reactstrap';

const BlogView = () => {
  const { id } = useParams();
  const { title } = useParams();
  const [result, setResult] = useState();
  const { authState, setAuthState } = useContext(AuthContext);

  const [blogImg, setBlogImg] = useState('');
  const [profileImg, setProfileImg] = useState('');
  const [blogData, setBlogData] = useState([]);
  const [comment, setComments] = useState([]);
  const [numberofComments, setCommentsCount] = useState();
  const [newComment, setAddComment] = useState('');
  let history = useHistory();

  function msg() {
    if (result == 'err') {
      return (
        <>
          <Alert color="danger">Unsuccefull Attempt,Try Againg</Alert>
        </>
      );
    } else if (result == 'done') {
      return (
        <>
          <Alert color="success">Greate Attempt is Succesfull</Alert>
        </>
      );
    }
  }
  // function newComment(isnew) {
  //   if (isnew == 'ok') {
  //     return (
  //       <>
  //         <FormGroup row>
  //           <Col>
  //             <Input
  //               type="textarea"
  //               name="title"
  //               placeholder="Add Short Description About Your Blog . . . . ."
  //               // onChange={e => setAbout(e.target.value)}
  //             />
  //           </Col>
  //         </FormGroup>
  //       </>
  //     );
  //   } else {
  //     return (
  //       <>
  //         <FormGroup row></FormGroup>
  //       </>
  //     );
  //   }
  // }

  var today = new Date(),
    Currentdate =
      today.getFullYear() +
      '-' +
      (today.getMonth() + 1) +
      '-' +
      today.getDate();

  const addComment = () => {
    const data = {
      bId: id,
      memberId: authState.memberId,
      comment: newComment,
      date: Currentdate,
    };
    axios.post('http://localhost:3001/blog/addComment', data).then(response => {
      if (response.data.error) {
        setResult('err');
        setTimeout(
          function () {
            reload();
          },

          2000,
        );
      } else {
        setResult('done');

        setTimeout(
          function () {
            reload();
          },

          2000,
        );
      }
    });
  };

  const reload = () => {
    const formData = {
      bId: id,
    };
    axios
      .post('http://localhost:3001/blog/getBlog', formData)
      .then(res => {
        setBlogData(res.data[0]);
        setBlogImg('http://localhost:3001/uploads/blog/' + res.data[0].image);
        setProfileImg(
          'http://localhost:3001/uploads/profileImages/' +
            res.data[0].profileImage,
        );
      })
      .catch(error => {
        setResult('err');
        setTimeout(
          function () {
            reload();
          },

          2000,
        );
      });

    axios
      .post('http://localhost:3001/blog/getBlogComments', formData)
      .then(res => {
        setComments(res.data);
        setCommentsCount(res.data.length);
      })
      .catch(error => {
        setResult('err');
        setTimeout(
          function () {
            reload();
          },

          2000,
        );
      });
  };

  useEffect(() => {
    const formData = {
      bId: id,
    };
    axios
      .post('http://localhost:3001/blog/getBlog', formData)
      .then(res => {
        setBlogData(res.data[0]);
        setBlogImg('http://localhost:3001/uploads/blog/' + res.data[0].image);
        setProfileImg(
          'http://localhost:3001/uploads/profileImages/' +
            res.data[0].profileImage,
        );
      })
      .catch(error => {
        console.log(error);
      });

    axios
      .post('http://localhost:3001/blog/getBlogComments', formData)
      .then(res => {
        setComments(res.data);
        setCommentsCount(res.data.length);
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

  const comments =
    comment &&
    comment.map(data => (
      <>
        <Badge color="warning" pill className="mr-3">
          {data.title}. {data.firstName} {data.lastName}
        </Badge>
        <br />
        <Badge color="primary" className="mr-3">
          {data.date}
        </Badge>
        <CardText className="comments">{data.description}</CardText>
      </>
    ));
  return (
    <Page title={title}>
      <hr />
      <Link to={'/blogs'}>
        <Button color="primary">Back</Button>
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
                <br />
                <Badge color="warning" pill className="mr-3">
                  {blogData.title}. {blogData.firstName} {blogData.lastName}
                </Badge>
                <br />
                <Badge color="primary" pill className="mr-3">
                  {blogData.email}
                </Badge>

                <hr />

                {'  '}

                <Badge color="success" pill className="mr-3">
                  10 min Read
                </Badge>

                <br />
                <Badge color="success" pill className="mr-3">
                  {numberofComments} Comments
                </Badge>

                {/* <span> {courseData.language}</span> */}
                <br></br>

                <Badge color="success" pill className="mr-3">
                  3 Reads
                </Badge>
                {/* {"  "} {courseData.mode} */}

                <br />
                <Badge color="success" pill className="mr-3">
                  Published on {blogData.publishedDate}
                </Badge>
              </center>
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
        <Col sm="10" md={{ size: 10, offset: 1 }}>
          <br></br>
          <Col sm="10" md={{ size: 12, offset: 0 }}>
            <FormGroup row>
              <Col>
                <center>
                  {msg()}
                  <Input
                    type="textarea"
                    name="title"
                    rows="5"
                    placeholder="Any Comments..........."
                    onChange={e => setAddComment(e.target.value)}
                  />
                </center>
              </Col>
            </FormGroup>
            <FormGroup check row>
              <Col sm={{ size: 15 }}>
                <Button onClick={addComment} color="success">
                  Add My Comment
                </Button>
              </Col>
            </FormGroup>
          </Col>
        </Col>
        <Col sm="10" md={{ size: 7, offset: 3 }}>
          {comments}
        </Col>
      </Row>
    </Page>
  );
};

export default BlogView;
