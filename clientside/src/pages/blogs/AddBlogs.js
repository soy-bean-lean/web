import { Link } from 'react-router-dom';
import Page from 'components/Page';
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AuthContext } from '../../helpers/AuthContext';
import classnames from 'classnames';
import Typography from 'components/Typography';
import TextEditor from '../../components/TextEditor/RichTextEditor';

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

function AddBlogs() {
  const [title, setTitle] = useState('');
  const [about, setAbout] = useState('');
  const [desc, setDesc] = useState('');
  const [image, setBlogImage] = useState(null);
  const { authState, setAuthState } = useContext(AuthContext);
  const [result, setResult] = useState();
  const [note, setNote] = useState('');

  var today = new Date(),
    Currentdate =
      today.getFullYear() +
      '-' +
      (today.getMonth() + 1) +
      '-' +
      today.getDate();
  let history = useHistory();
  const setEditorValue = val => {
    setDesc(val);
  };

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
          <Alert color="success">Greate Attempt is Successfull</Alert>
        </>
      );
    }
  }

  const addBlog = () => {
    const formData = new FormData();
    formData.append('image', image);
    formData.append('title', title);
    formData.append('desc', desc);
    formData.append('about', about);

    formData.append('memberId', "cssl00"+authState.id);
    formData.append('date', Currentdate);
    console.log(authState.memberId);
    fetch('http://localhost:3001/blog/addBlog', {
      method: 'POST',
      body: formData,
      headers: {
        Accept: 'multipart/form-data',
      },
      credentials: 'include',
    })
      .then(res => res.json())
      .then(res => {
        setResult('done');
        setTimeout(
          function () {
            history.push('/blogs');
          },

          2000,
        );
      })
      .catch(error => {
        setResult('err');
        setTimeout(
          function () {
            history.push('/blogs');
            history.push('/addBlogs');
          },

          2000,
        );
        console.log(error);
      });
  };

  return (
    <Page title="Add Blog">
       <hr />
      <Link to={'/blogs'}>
        <Button color="primary">Blogs List</Button>
      </Link>

      <hr />
     
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
                  <Col sm="12" md={{ size:12, offset: 0 }}>
                    <center>
                      {image && (
                        <img
                          className="writeImg"
                          height="60%"
                          width="60%"
                          src={URL.createObjectURL(image)}
                          alt=""
                        />
                      )}
                    </center>
                  </Col>

                  <Col sm="12" md={{ size: 6, offset: 4 }}>
                    <Input
                      type="file"
                      className="input"
                      id="avatar"
                      name="avatar"
                      required
                      accept="image/*"
                      onChange={e => setBlogImage(e.target.files[0])}
                    />
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Col>
                    <Input
                      type="text"
                      name="title"
                      placeholder="Add Title . . . . . "
                      onChange={e => setTitle(e.target.value)}
                    />
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Col>
                    <Input
                      type="textarea"
                      name="title"
                     
                       
                      placeholder="Add Short Description About Your Blog . . . . ."
                      onChange={e => setAbout(e.target.value)}
                    />
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Col>
                    <TextEditor onValueChange={setEditorValue} />
                  </Col>
                </FormGroup>

                <FormGroup check row>
                  <Col sm={{ size: 15 }}>
                    <Button onClick={addBlog} color="success">
                      Publish
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

export default AddBlogs;
