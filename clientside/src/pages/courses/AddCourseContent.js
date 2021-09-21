import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useHistory, useParams } from 'react-router-dom';
import Page from 'components/Page';
import TextEditor from '../../components/TextEditor/RichTextEditor';
import { AuthContext } from '../../helpers/AuthContext';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Alert,
  Form,
  FormFeedback,
  FormGroup,
  FormText,
  Input,
  Label,
  Row,
} from 'reactstrap';

const AddCourseContent = () => {

  const { authState, setAuthState } = useContext(AuthContext);
  
  const [contentTitle, setContentTitle] = useState('');
  const [contentDes, setContentDes] = useState('');
  const [contentType, setContentType] = useState('');
  const [note, setNote] = useState('');
  const [contentFile, setContentFile] = useState();
  const [videoLink, setVideoLink] = useState('');
  const [contentNum, setContentNum] = useState(0);
  const [uploadStatus, setUploadStatus] = useState('');
  const [contentOrder, setContentOrder] = useState(0);
  const [contentOrderList, setContentOrderList] = useState(null);


  const [result, setResult] = useState();

  //const cId = props.cid;
  const { id } = useParams();
  const { title } = useParams();
  //setCourseTitle(props.location.state);

  let history = useHistory();


  
  function msg() {
    if (result == 'err') {
      return (
        <>
          <Alert color="danger">Unsuccefull Attempt,Try Again</Alert>
        </>
      );
    } else if (result == 'done') {
      return (
        <>
          <Alert color="success">Attempt Succesfull</Alert>
        </>
      );
    }
  }

  useEffect(() => {
    const sendData = {
      //id: props.cid,
      id: id,
    };
    axios
      .post('http://localhost:3001/csslcourse/getContentNo', sendData)
      .then(response => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          if (response.data[0].contentNo != null) {
            setContentNum(response.data[0].contentNo + 1);
          } else {
            setContentNum(contentNum + 1);
          }
        }
      })
      .catch(error => {
        alert(error);
      });

    axios
      .post('http://localhost:3001/csslcourse/getContentOrderList', sendData)
      .then(response => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          setContentOrderList(response.data);
        }
      })
      .catch(error => {
        alert(error);
      });
  }, []);

  const orderList =
    contentOrderList &&
    contentOrderList.map((li, i) => {
      return (
        <option key={i} value={li.contentOrder + 1}>
          After {li.title}
        </option>
      );
    }, this);

  const UpdateContentOrderNext = () => {
    const sendData = {
      //id: props.cid,
      courseId: id,
      order: contentOrder,
    };

    axios
      .post('http://localhost:3001/csslcourse/changeContentOrder', sendData)

      .then(response => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          //insert course content if update order is success
          InsertCourseContentNext();
        }
      })
      .catch(error => {
        alert(error);
      });
  };

  const UpdateContentOrderFinish = () => {
    const sendData = {
      //id: props.cid,
      courseId: id,
      order: contentOrder,
    };

    axios
      .post('http://localhost:3001/csslcourse/changeContentOrder', sendData)

      .then(response => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          //insert course content if update order is success
          InsertCourseContentFinish();
        }
      })
      .catch(error => {
        alert(error);
      });
  };

  const InsertCourseContentNext = () => {
    const mId = authState.memberId;
    const contentId = 'cssl00' + id + '-0' + contentNum;

    const formData = new FormData();
    formData.append('courseId', id);
    formData.append('contentNo', contentNum);
    formData.append('contentId', contentId);
    formData.append('title', contentTitle);
    formData.append('description', contentDes);
    formData.append('type', contentType);
    formData.append('note', note);
    formData.append('order', contentOrder);

    if (contentType == 'File') {
      formData.append('cfile', contentFile);
    } else {
      formData.append('vlink', videoLink);
    }

    fetch('http://localhost:3001/csslcourse/courseContent', {
      method: 'POST',
      body: formData,
      headers: {
        Accept: 'multipart/form-data',
      },
      credentials: 'include',
    })
      .then(res => res.json())
      .then(res => {
        setUploadStatus(res.msg);
        setResult('done');

        setTimeout(
          function () {
            redirectCourse();
            redirectContentAdd();
          },

          2000,
        );        
    
      })
      .catch(error => {
        setResult('err');
        setTimeout(
          function () {

          },

          2000,
        );      });
  };

  const InsertCourseContentFinish = () => {
    const mId = authState.memberId;
    const contentId = 'cssl00' + id + '-0' + contentNum;

    const formData = new FormData();
    formData.append('courseId', id);
    formData.append('contentNo', contentNum);
    formData.append('contentId', contentId);
    formData.append('title', contentTitle);
    formData.append('description', contentDes);
    formData.append('type', contentType);
    formData.append('note', note);
    formData.append('order', contentOrder);

    if (contentType == 'File') {
      formData.append('cfile', contentFile);
    } else {
      formData.append('vlink', videoLink);
    }

    fetch('http://localhost:3001/csslcourse/courseContent', {
      method: 'POST',
      body: formData,
      headers: {
        Accept: 'multipart/form-data',
      },
      credentials: 'include',
    })
      .then(res => res.json())
      .then(res => {
        setUploadStatus(res.msg);
        setResult('done');

        setTimeout(
          function () {
            redirectCourse();

          },

          2000,
        );
      })
      .catch(error => {
        setResult('err');
        setTimeout(
          function () {

          },

          2000,
        );      });
  };

  const redirectContentAdd = () => {
    let path = '/csslcourse/addCourseContent/cssl00' + id + '/' + title;
    history.push(path);
  };

  const redirectCourseList = () => {
    let path = '/lecCourse';
    history.push(path);
  };

  const redirectCourse = () => {
    let path = '/courseView/cssl00' + id + '/' + title;
    history.push(path);
  };

  const resetComponents = () => {
    setContentTitle('');
    setContentDes('');
    setContentType('');
    setContentFile();
    setVideoLink('');
    setNote('');
  };
  const setEditorValue = val => {
    setNote(val);
  };

  return (
    <Page title="Course Content Details">
      <hr></hr>
      <CardBody>
        <h4>{title}</h4>
        <Button color="primary" onClick={redirectCourseList}>
          Course List
        </Button>{' '}
        <Button color="primary" onClick={redirectCourse}>
          Back to Course
        </Button>
      </CardBody>
      <hr></hr>
      <Col sm="10" md={{ size: 8, offset: 2 }}>
      <center>
        {msg()}
        <Card>
    
          <CardHeader>
            <center>Add Content</center>
          </CardHeader>
          <CardBody>
            <Form>
              <FormGroup row>
                <Label for="exampleEmail" sm={3}>
                  Title{' '}
                </Label>
                <Col sm={9}>
                  <Input
                    className="input"
                    value={contentTitle}
                    placeholder="Add Title"
                    onChange={e => setContentTitle(e.target.value)}
                  />
                </Col>
              </FormGroup>

              <FormGroup row>
                <Label for="exampleEmail" sm={3}>
                  Description{' '}
                </Label>
                <Col sm={9}>
                  <Input
                    type="textarea"
                    value={contentDes}
                    onChange={e => setContentDes(e.target.value)}
                  />
                </Col>
              </FormGroup>

              <FormGroup row>
                <Label for="exampleEmail" sm={3}>
                  Content Order{' '}
                </Label>
                <Col sm={9}>
                  <Input
                    type="select"
                    value={contentOrder}
                    onChange={e => setContentOrder(e.target.value)}
                  >
                    <option value="0"></option>
                    <option value="1">First Content</option>
                    {orderList}
                  </Input>
                </Col>
              </FormGroup>

              <FormGroup row>
                <Label for="exampleEmail" sm={3}>
                  Note
                </Label>
                <Col sm={9}>
                  {/* <Input
                    type="textarea"
                    className="note"
                    placeholder="Description"
                    onChange={e => setContentDes(e.target.value)}
                  /> */}
                  <TextEditor onValueChange={setEditorValue} />
                </Col>
              </FormGroup>

              <FormGroup row>
                <Label for="exampleEmail" sm={3}>
                  Content Type
                </Label>
                <Col sm={9}>
                  <Input
                    type="select"
                    name="select"
                    value={contentType}
                    id="content-type"
                    onChange={e => setContentType(e.target.value)}
                  >
                    <option value="">--Select Content Type--</option>
                    <option value="File">File</option>
                    <option value="Video">Video</option>
                  </Input>
                </Col>
              </FormGroup>

              {renderContentAdd(contentType)}

              <FormGroup check row>
                <center>
                  <Button color="primary" onClick={UpdateContentOrderFinish}>
                    Save & Finish
                  </Button>{' '}
                  <Button color="success" onClick={UpdateContentOrderNext}>
                    Save & Next Content
                  </Button>
                </center>
              </FormGroup>
            </Form>
          </CardBody>
        </Card>
        </center>
      </Col>
      <hr></hr>
    </Page>
  );

  function renderContentAdd(type) {
    if (type == 'File') {
      return (
        <FormGroup row>
          <Label for="exampleEmail" sm={3}>
            Content File
          </Label>
          <Col sm={9}>
            <Input
              type="file"
              className="input"
              id="content-file"
              name="content-file"
              accept=".xlsx, .xls, .doc, .docx, .ppt, .pptx, .txt, .pdf, image/*"
              onChange={e => setContentFile(e.target.files[0])}
            />
          </Col>
        </FormGroup>
      );
    } else if (type == 'Video') {
      return (
        <FormGroup row>
          <Label for="exampleEmail" sm={3}>
            Video Link
          </Label>
          <Col sm={9}>
            <Input
              className="input"
              value={videoLink}
              placeholder="--Youtube Video Link--"
              onChange={e => setVideoLink(e.target.value)}
            />
          </Col>
        </FormGroup>
      );
    } else {
      return <FormGroup row></FormGroup>;
    }
  }
};

export default AddCourseContent;
