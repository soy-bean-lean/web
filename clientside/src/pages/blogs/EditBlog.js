import { Link } from 'react-router-dom';
import Page from 'components/Page';
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AuthContext } from '../../helpers/AuthContext';
import classnames from 'classnames';
import Typography from 'components/Typography';

import { useHistory } from 'react-router-dom';

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

function EditBlog() {
  const [title, setTitle] = useState('');
  const [about, setAbout] = useState('');
  const [desc, setDesc] = useState('');
  const [image, setBlogImage] = useState(null);
  const { authState, setAuthState } = useContext(AuthContext);
  const [result, setResult] = useState();

  var today = new Date(),
    Currentdate =
      today.getFullYear() +
      '-' +
      (today.getMonth() + 1) +
      '-' +
      today.getDate();
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

//   const addBlog = () => {
//     const formData = new FormData();
//     formData.append('image', image);
//     formData.append('title', title);
//     formData.append('desc', desc);
//     formData.append('about', about);
  
//     formData.append('memberId', 'cssl001');
//     formData.append('date', Currentdate);
//     //alert(image);
//     fetch('http://localhost:3001/blog/addBlog', {
//       method: 'POST',
//       body: formData,
//       headers: {
//         Accept: 'multipart/form-data',
//       },
//       credentials: 'include',
//     })
//       .then(res => res.json())
//       .then(res => {
//         setResult('done');
//         setTimeout(
//           function () {
//             history.push('/blogs');
//           },

//           2000,
//         );
//       })
//       .catch(error => {
//         setResult('err');
//         setTimeout(
//           function () {
//             history.push('/blogs');
//             history.push('/addBlogs');
//           },

//           2000,
//         );
//         console.log(error);
//       });
//   };

  return (
    <Page title="Edit Blog">
       <Link to="/blogs">
        <Button color="primary">Back</Button>
      </Link>
      <hr></hr>
      <Col sm="10" md={{ size: 8, offset: 2 }}>
        <center>
          {msg()}
          <Card>
            <CardHeader>New Blog</CardHeader>
            <CardBody>
              <Form>
                <FormGroup row>
                  <Label for="exampleEmail" sm={12}>
                    Import Your Blog Image From the Chooser
                  </Label>
                  <Col sm="12" md={{ size: 6, offset: 4 }}>
                    <center>
                      {/* {image && (
                        <img
                          className="writeImg"
                          height="60%"
                          width="60%"
                          src={URL.createObjectURL(image)}
                          alt=""
                        />
                      )} */}
                    </center>
                  </Col>

                  <Col sm="12" md={{ size: 6, offset: 4 }}>
                    {/* <Input
                      type="file"
                      className="input"
                      id="avatar"
                      name="avatar"
                      required
                      accept="image/*"
                      onChange={e => setBlogImage(e.target.files[0])}
                    /> */}
                  </Col>
                </FormGroup>

                <FormGroup row>
                  {/* <Label for="exampleEmail" sm={3}>
                    Blog Topic
                  </Label> */}
                  
                  <Col sm={9}>
                    
                    <Input
                      type="text"
                      name="title"
                     
                       
                      placeholder="Add Title . . . . . "
                      //onChange={e => setTitle(e.target.value)}
                    />
                  </Col>
                </FormGroup>

                <FormGroup row>
                  {/* <Label for="exampleEmail" sm={3}>
                    Blog Topic
                  </Label> */}
                  
                  <Col sm={9}>
                    
                    <Input
                      type="text"
                      name="title"
                     
                       
                      placeholder="Add Description About Your Blog . . . . ."
                     // onChange={e => setAbout(e.target.value)}
                    />
                  </Col>
                </FormGroup>
               

                <FormGroup row>
                  {/* <Label for="exampleEmail" sm={3}>
                    Blog Description
                  </Label> */}
                  <Col sm={9}>
                    <Input
                      type="textarea"
                      className="note"
                      placeholder="Write Your Blog . . . . . ."
                      //onChange={e => setDesc(e.target.value)}
                    />
                  </Col>
                </FormGroup>

                <FormGroup check row>
                  <Col sm={{ size: 15 }}>
                    <Button color="success">
                      Update
                    </Button>

                    {'  '}

                    <Button  color="danger">
                      Delete
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

export default EditBlog;
