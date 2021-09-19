import React, { useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Page from 'components/Page';
import { AuthContext } from '../../helpers/AuthContext';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Alert,
  Col,
  Form,
  FormFeedback,
  FormGroup,
  FormText,
  Input,
  Label,
  Row,
} from 'reactstrap';
const BasicCourseInfo = () => {

  const { authState, setAuthState } = useContext(AuthContext);

  const [courseId, setCourseId] = useState();
  const [courseTitle, setCourseTitle] = useState('');
  const [courseDes, setCourseDes] = useState('');
  const [courseDuration, setCourseDuration] = useState('');
  const [durationType, setDurationType] = useState('');
  const [language, setLanguage] = useState('');
  const [level, setLevel] = useState('');
  const [mode, setMode] = useState(''); 
  const [imgFile, setImgFile] = useState();
  const [uploadStatus, setUploadStatus] = useState('');
  const [page, setPage] = useState('Content');
  const [result, setResult] = useState();

  let history = useHistory();

  const InsertCourseInfo = () => {
    //const file = event.target.files[0];
    const mId = 'cssl001';
    const formData = new FormData();
    formData.append('image', imgFile);
    formData.append('title', courseTitle);
    formData.append('description', courseDes);
    formData.append('duration', courseDuration);
    formData.append('language', language);
    formData.append('durationType', durationType);
    formData.append('level', level);
    formData.append('mode', mode);
    formData.append('lecturer', mId);

    fetch('http://localhost:3001/csslcourse/basicInfo', {
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
        setCourseId(res.data.insertId);
        const next = 'Content';
        setResult('done');

        setTimeout(
          function () {
            history.push("/csslcourse/addCourseContent/cssl00"+res.data.insertId+"/"+courseTitle);
            //hri giyoth yana thena
          },

          2000,
        );
        setPage(next);
       
      })
      .catch(error => {
        setResult('err');
        setTimeout(
          function () {
            history.push('/csslcourse/addnewcourse');
          },

          2000,
        );
        console.log(error);
      });
  };

  const redirectCourseList = () => {
    let path = '/lecCourse';
    history.push(path);
  };

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
                      required
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
                      type="number"
                      onChange={e => setCourseDuration(e.target.value)}
                    />
                  </Col>
                  <Col sm={6}>
                    <Input
                      type="select"
                      name="select"
                      required
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
                          src={URL.createObjectURL(imgFile)}
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
                      required
                      accept="image/*"
                      onChange={e => setImgFile(e.target.files[0])}
                    ></input>
                  </Col>
                </FormGroup>

                <FormGroup check row>
                  <Col sm={{ size: 15 }}>
                    <Button 
                    onClick={InsertCourseInfo}
                     color="success">
                        Create Course
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
}
export default BasicCourseInfo;
