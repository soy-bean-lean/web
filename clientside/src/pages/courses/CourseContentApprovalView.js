import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import * as AiIcons from 'react-icons/ai';

import { useParams, useHistory } from 'react-router-dom';
import Page from 'components/Page';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../helpers/AuthContext';
import DOMPurify from 'dompurify';
import Typography from 'components/Typography';
import {
  Button,
  Card,
  CardBody,
  Alert,
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

  let history = useHistory();

  const { id } = useParams();
  const { title } = useParams();
  const { cntId } = useParams();
  const { cntTitle } = useParams();

  const { authState, setAuthState } = useContext(AuthContext);

  const [contentData, setContentData] = useState(null);
  const [contentTitle, setContentTitle] = useState('');
  const [contentNote, setContentNote] = useState('');
  const [fileContent, setFileContent] = useState('');
  const [status, setStatus] = useState('');
  const [result, setResult] = useState();

  useEffect(() => {
    const formData = {
      cId: id,
      cntId: cntId,
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
  }, []);

  const setData = val => {
    setContentTitle(val.title);
    setContentNote(val.note);
    setFileContent('http://localhost:3001/uploads/csslCourses/' + val.content);
    setStatus(val.status);
    //setFileContent('https://cors-anywhere.herokuapp.com/http://www.pdf995.com/samples/pdf.pdf');
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

  const approveContent = () => {
    const formData = {
      cId: id,
      cntId: cntId,
    };
    axios
      .post('http://localhost:3001/council/approveContent', formData)

      .then(response => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          setResult('approve');
          setTimeout(function () {
            history.push(
              '/courseapproval/csslcourses/cssl00' + id + '/' + title
            );
          }, 2000);
        }
      })
      .catch(error => {
        setResult('done');
      });
  };

  const rejectContent = () => {
    const formData = {
      cId: id,
      cntId: cntId,
    };
    axios
      .post('http://localhost:3001/council/rejectContent', formData)

      .then(response => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          setResult('reject');
          setTimeout(function () {
            history.push(
              '/courseapproval/csslcourses/cssl00' + id + '/' + title
            );
          }, 2000);
        }
      })
      .catch(error => {
        setResult('done');
      });
  };

  function msg() {
    if (result == 'err') {
      return (
        <>
          <Alert color="danger">Unsuccessfull Attempt,Try Again</Alert>
        </>
      );
    } else if (result == 'approve') {
      return (
        <>
          <Alert color="success">Content Approved Successfully</Alert>
        </>
      );
    } else if (result == 'reject') {
      return (
        <>
          <Alert color="success">Content Rejected Successfully</Alert>
        </>
      );
    }
  }

  return (
    <Page title={title}>
      <Row>
        <Col sm={12}>
          <Card>
            <center>{msg()}</center>
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
                {status != 'Approved' && (
                  <Link onClick={approveContent}>
                    <Button color="success">Approve</Button>
                  </Link>
                )}
                {'  '}
                {status != 'Rejected' && (
                  <Link onClick={rejectContent}>
                    <Button color="danger">Reject</Button>
                  </Link>
                )}
                {'  '}
              </center>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Page>
  );
};

export default CourseView;
