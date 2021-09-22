import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import * as AiIcons from 'react-icons/ai';

import { useParams } from 'react-router-dom';
import Page from 'components/Page';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../helpers/AuthContext';
import DOMPurify from 'dompurify';
import Typography from 'components/Typography';
import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Input,
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
  CardGroup,
} from 'reactstrap';
import ViewPDF from '../../components/ViewPDF/ViewPDF';
import ReactPlayer from 'react-player';

const CourseView = () => {
  const { id } = useParams();
  const { title } = useParams();
  const { cntId } = useParams();
  const { cntTitle } = useParams();

  const { authState, setAuthState } = useContext(AuthContext);

  const [contentData, setContentData] = useState(null);
  const [contentTitle, setContentTitle] = useState('');
  const [contentNote, setContentNote] = useState('');
  const [fileContent, setFileContent] = useState('');

  const [accessInfo, setAccessInfo] = useState(null);

  const [cntAccessStatus, setCntAccessStatus] = useState('');
  const [cntStDate, setCntStDate] = useState('');
  const [cntLastAccess, setcCntLastAccess] = useState('');

  useEffect(() => {
    const formData = {
      cId: id,
      cntId: cntId,
      mId: authState.memberId,
    };
    axios
      .post('http://localhost:3001/csslcourse/getContent', formData)

      .then(response => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          setContentData(response.data);
          setData(response.data[0]);
        }
      })
      .catch(error => {
        alert(error);
      });

    axios
      .post('http://localhost:3001/csslcourse/getContentAccessInfo', formData)

      .then(response => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          setAccessInfo(response.data[0]);
          updateAccessInfo(response.data[0]);
        }
      })
      .catch(error => {
        alert(error);
      });
  }, []);

  const updateAccessInfo = info => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();

    var hh = String(today.getHours()).padStart(2, '0');
    var mn = String(today.getMinutes() + 1).padStart(2, '0');
    var ss = String(today.getSeconds()).padStart(2, '0');

    var stDate = yyyy + '-' + mm + '-' + dd;
    var lastAcc = yyyy + '-' + mm + '-' + dd + ' ' + hh + ':' + mn + ':' + ss;

    if (
      info.startDate == null ||
      info.startDate == '' ||
      info.status == 'Start'
    ) {
      setCntStDate(today);
      setcCntLastAccess(lastAcc);
      setCntAccessStatus('Ongoing');
      const submitData = {
        cId: id,
        cntId: cntId,
        mId: authState.memberId,
        stDate: stDate,
        lastAccess: lastAcc,
        status: 'Ongoing',
        type: 'Initial',
      };
      axios
        .post(
          'http://localhost:3001/csslcourse/updateContentAccessInfo',
          submitData,
        )

        .then(response => {
          if (response.data.error) {
            alert(response.data.error);
          } else {
            console.log(response.data);
          }
        })
        .catch(error => {
          alert(error);
        });
    } else {
      setcCntLastAccess(lastAcc);
      const submitData = {
        cId: id,
        cntId: cntId,
        mId: authState.memberId,
        stDate: info.startDate,
        lastAccess: lastAcc,
        status: info.status,
        type: 'Other',
      };
      axios
        .post(
          'http://localhost:3001/csslcourse/updateContentAccessInfo',
          submitData,
        )

        .then(response => {
          if (response.data.error) {
            alert(response.data.error);
          } else {
            console.log(response.data);
          }
        })
        .catch(error => {
          alert(error);
        });
    }
  };

  const setData = val => {
    setContentTitle(val.title);
    setContentNote(val.note);
    console.log(val);
    setFileContent('http://localhost:3001/uploads/csslCourses/' + val.content);
  };

  const videoErrorMsg = () => {
    alert('Error on Video Player');
    console.error();
  };

  const createMarkup = html => {
    return {
      __html: DOMPurify.sanitize(html),
    };
  };

  const content =
    contentData &&
    contentData.map((li, i) => {
      if (li.contentType == 'File') {
        return (
          <>
            <Col sm="10" md={{ size: 12, offset: 0 }}>
              <Card>
                <CardBody>
                  <ViewPDF pdf={fileContent} />
                  <a
                    href={
                      'http://localhost:3001/uploads/csslCourses/' + li.content
                    }
                    download
                  >
                    File (click to download)
                  </a>
                </CardBody>
              </Card>
            </Col>
            <br></br>
          </>
        );
      } else if (li.contentType == 'Video') {
        return (
          <>
            <Card style={{ border: 'none' }}>
              <CardBody>
                <center>
                  <ReactPlayer
                    url={li.content}
                    pip={false}
                    controls={true}
                    playing={true}
                    onError={videoErrorMsg}
                    onContextMenu={e => e.preventDefault()}
                    config={{
                      youtube: {
                        playerVars: { modestbranding: 1, disablekb: 1 },
                      },
                    }}
                  />
                </center>
              </CardBody>
            </Card>
            <br></br>
          </>
        );
      } else {
        return (
          <>
            <Card style={{ border: 'none' }}>
              <CardBody>
                <a
                  href={
                    'http://localhost:3001/uploads/csslCourses/' + li.content
                  }
                  download
                >
                  File (click to download)
                </a>
              </CardBody>
            </Card>
            <br></br>
          </>
        );
      }
    });

  return (
    <Page title={title}>
      <Row>
        <Col sm={12}>
          <Card>
            <CardBody>
              <Card style={{ border: 'none' }}>
                <CardBody>
                  <h4>{contentTitle}</h4>
                  <hr></hr>
                  <CardBody
                    className="preview"
                    dangerouslySetInnerHTML={createMarkup(contentNote)}
                  ></CardBody>
                </CardBody>
              </Card>
            </CardBody>

            <CardBody>{content}</CardBody>

            <CardBody>
              <center>
                <Link>
                  <Button color="primary">Mark as Complete</Button>
                </Link>
                {'  '}
                <Link
                  to={
                    '/csslcourse/enrolledcourse/cssl00' +
                    id +
                    '/' +
                    title +
                    '/' +
                    'attemptquiz' +
                    '/' +
                    cntId +
                    cntTitle
                  }
                >
                  <Button color="success">Quiz</Button>
                </Link>
                {'  '}
              </center>
            </CardBody>
            <Col sm="10" md={{ size: 10, offset: 1 }}>
              <br></br>
              <Col sm="10" md={{ size: 12, offset: 0 }}>
                <FormGroup row>
                  <Col>
                    <center>
                      <Input
                        type="textarea"
                        name="title"
                        rows="5"
                        placeholder="Any Comments"
                        //onChange={e => setAddComment(e.target.value)}
                      />
                    </center>
                  </Col>
                </FormGroup>
                <FormGroup check row>
                  <Col sm={{ size: 15 }}>
                    <Button /*onClick={addComment}*/ color="success">
                      Add My Comment
                    </Button>
                  </Col>
                </FormGroup>
              </Col>
            </Col>
            <Col sm="10" md={{ size: 7, offset: 3 }}>
              {/* {comments} */}
            </Col>
          </Card>
        </Col>
      </Row>
    </Page>
  );
};

export default CourseView;
