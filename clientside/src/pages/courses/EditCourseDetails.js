import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link, useHistory, useParams } from 'react-router-dom';
import Page from 'components/Page';
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
import Modal from 'reactstrap/lib/Modal';


const EditCourseDetails = () => {
  const [courseTitle, setCourseTitle] = useState('');
  const [courseDes, setCourseDes] = useState('');
  const [courseDuration, setCourseDuration] = useState('');
  const [language, setLanguage] = useState('');
  const [level, setLevel] = useState('');
  const [mode, setMode] = useState('');
  const [imgFile, setImgFile] = useState();
  const [durationType, setDurationType] = useState('');
  const [result, setResult] = useState();
  const [imgUrl, setImgUrl] = useState();
  const { authState, setAuthState } = useContext(AuthContext);

  const [uploadStatus, setUploadStatus] = useState('');
  const [page, setPage] = useState('Content');

  const { id } = useParams();
  const { title } = useParams();

  let history = useHistory();

  useEffect(() => {
    const sendData = {
      //id: props.cid,
      cid: id,
    };
    axios
      .post('http://localhost:3001/csslcourse/getCourseInfo', sendData)
      .then(response => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          setComponents(response.data[0]);
        }
      })
      .catch(error => {
        alert(error);
      });
  }, []);

  const UpdateCourseInfo = () => {
    const mId = authState.memberId;
    const formData = new FormData();
    formData.append('id', id);
    formData.append('title', courseTitle);
    formData.append('description', courseDes);
    formData.append('duration', courseDuration);
    formData.append('durationType', durationType);
    formData.append('language', language);
    formData.append('level', level);
    formData.append('mode', mode);
    formData.append('image', imgFile);

    fetch('http://localhost:3001/csslcourse/editCourseInfo', {
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
        console.log(res.data);
        setResult('done');
        redirectCourse();
      })
      .catch(error => {
        console.log(error);
      });
  };

  const setComponents = record => {
    setCourseTitle(record.name);
    setCourseDes(record.description);
    setCourseDuration(record.duration);
    setDurationType(record.durationType);
    setLanguage(record.language);
    setLevel(record.skillLevel);
    setMode(record.mode);
    //setImgFile('http://localhost:3001/uploads/csslCourses/'+record.image);
    setImgFile(record.image);
    setImgUrl('http://localhost:3001/uploads/csslCourses/'+record.image);
  };

  const redirectCourse = () => {
    let path = '/courseView/cssl00' + id + '/' + title;
    history.push(path);
  };

  const getImageUrl = (event) =>{
    console.log(event.target.files[0]);
    setImgFile(event.target.files[0]);
    setImgUrl(URL.createObjectURL(event.target.files[0]));
  }


  function msg() {
    if (result == 'err') {
      return (
        <>
          <Alert color="danger">Unsuccessfull Attempt,Try Again</Alert>
        </>
      );
    } else if (result == 'done') {
      return (
        <>
          <Alert color="success">Attempt Successfull</Alert>
        </>
      );
    }
  }
return (
  <Page title="Lecturing Course">
  <Link to="/lecCourse">
    <Button color="primary">Course List</Button>
  </Link>
  <Col sm="10" md={{ size: 8, offset: 2 }}>
    <center>
    {msg()}
      <Card>
        <CardHeader>Basic Course Details</CardHeader>

        <CardBody>
          <Form>
            <FormGroup row>
              <Label for="exampleEmail" sm={3}>
                Name
              </Label>
              <Col sm={9}>
                <Input
                  required={true}
                  value={courseTitle}
                  className="input"
                  onChange={e => setCourseTitle(e.target.value)}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="exampleEmail" sm={3}>
                Description
              </Label>
              <Col sm={9}>
                <Input
                  required
                  value={courseDes}
                  className="input"
                  type="textarea"
                  onChange={e => setCourseDes(e.target.value)}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="exampleEmail" sm={3}>
                Duration
              </Label>
              <Col sm={3}>
                <Input
                  className="input"
                  required
                  value={courseDuration}
                  type="number"
                  onChange={e => setCourseDuration(e.target.value)}
                />
              </Col>
              <Col sm={6}>
                <Input
                  type="select"
                  name="select"
                  required
                  value={durationType}
                  onChange={e => setDurationType(e.target.value)}
                >
                  <option value="type"></option>
                  <option value="Hours">Hours</option>
                  <option value="Days">Days</option>
                  <option value="Weeks">Weeks</option>
                  <option value="Months">Months</option>
                </Input>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="exampleEmail" sm={3}>
                Language
              </Label>

              <Col sm={9}>
                <Input
                  type="select"
                  name="select"
                  value={language}
                  onChange={e => setLanguage(e.target.value)}
                >
                  <option value="type"></option>
                  <option value="English">English</option>
                  <option value="Sinhala">Sinhala</option>
                  <option value="Other">Other</option>
                </Input>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="exampleEmail" sm={3}>
                Level
              </Label>

              <Col sm={9}>
                <Input
                  type="select"
                  required
                  value={level}
                  name="select"
                  onChange={e => setLevel(e.target.value)}
                >
                  <option value="type"></option>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </Input>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="exampleEmail" sm={3}>
                Mode
              </Label>

              <Col sm={9}>
                <Input
                  required
                  value={mode}
                  type="select"
                  name="select"
                  onChange={e => setMode(e.target.value)}
                >
                  <option value="type"></option>
                  <option value="Online">Online</option>
                  <option value="Offline">Offline</option>
                </Input>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="exampleEmail" sm="12" md={{ size: 6, offset: 3 }}>
                Course Image
              </Label>
              <Col sm="12" md={{ size: 6, offset: 3 }}>
                <center>
                  {imgFile && (
                    <img
                      className="writeImg"
                      height="60%"
                      width="60%"
                      src={imgUrl}
                      alt=""
                    />
                  )}
                </center>
              </Col>

              <Col sm="12" md={{ size: 6, offset: 4 }}>
                <input
                  type="file"
                  className="input"
                  id="course-img"
                  name="course-img"
                  //value={imgFile}
                  required
                  accept="image/*"
                  onChange={getImageUrl}
                ></input>
              </Col>
            </FormGroup>

            <FormGroup check row>
              <Col sm={{ size: 15 }}>
                <Button 
                onClick={UpdateCourseInfo}
                 color="success">
                    Update Course
                </Button>
              </Col>
            </FormGroup>
          </Form>
          </CardBody>
      </Card>
    </center>
  </Col>
  <hr></hr>
</Page>
);
};
export default EditCourseDetails;
