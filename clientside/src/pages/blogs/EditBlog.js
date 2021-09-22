import { Link } from 'react-router-dom';
import Page from 'components/Page';
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AuthContext } from '../../helpers/AuthContext';
import classnames from 'classnames';
import Typography from 'components/Typography';
import { confirmAlert } from 'react-confirm-alert';
import { useParams } from 'react-router-dom';
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

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
  const { id } = useParams();
  const add = '';
  const [title, setTitle] = useState('');
  const [about, setAbout] = useState('');
  const [desc, setDesc] = useState('');
  const [image, setBlogImage] = useState();
  const { authState, setAuthState } = useContext(AuthContext);
  const [result, setResult] = useState();

  // var today = new Date(),
  //   Currentdate =
  //     today.getFullYear() +
  //     '-' +
  //     (today.getMonth() + 1) +
  //     '-' +
  //     today.getDate();
  let history = useHistory();

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

  const deleteItem = () => {
    const data = {
      qid: id,
      tableName: 'blog',
      coloum: 'blogId',
    };
    axios.post('http://localhost:3001/blog/deleteItem', data).then(response => {
      if (response.data.error) {
        setResult('err');
        setTimeout(
          function () {
            history.push('/blogs');
          },

          2000,
        );
      } else {
        setResult('done');

        setTimeout(
          function () {
            history.push('/blogs');
            //hri giyoth yana thena
          },

          2000,
        );
      }
    });
  };


  const submit = () => {
    confirmAlert({
      message: 'Are you sure to Delete ?.',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            deleteItem();
          },
        },
        {
          label: 'No',
          onClick: () => {
            //alert('Click No')
          },
        },
      ],
    });
  };
  const updateBlog = () => {
    const blogData = new FormData();
    blogData.append('image', image);
    blogData.append('title', title);
    blogData.append('description', about);
    blogData.append('content', desc);
    blogData.append('blogId', id);

    console.log('data;', blogData);
    fetch('http://localhost:3001/blog/updateBlog', {
      method: 'POST',
      body: blogData,
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
            history.push(
              '/editview/cssl00' + blogData.blogId + '/' + blogData.title,
            );
          },

          2000,
        );
      });
  };

  useEffect(() => {
    const sendData = {
      id: id,
    };
    axios
      .post('http://localhost:3001/blog/getBlogView', sendData)

      .then(response => {
        if (response.data.error) {
          //    alert(response.data.error);
        } else {
          console.log(response.data[0]);
          setTitle(response.data[0].title);
          setAbout(response.data[0].description);
          setDesc(response.data[0].content);
          //setBlogImage(response.data[0].image);
        }
      })
      .catch(error => {
        //   alert(error);
      });
  }, []);

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
                  <Col sm={9}>
                    <center>
                      {image && (
                        <img
                          className="writeImg"
                          height="160px"
                          width="160px"
                          src={URL.createObjectURL(image)}
                          alt=""
                        />
                      )}
                    </center>
                  </Col>
                </FormGroup>

                <FormGroup row>
                <Col sm="12" md={{ size: 6, offset: 4 }}>
                    <Input
                      type="file"
                      className="input"
                      id="avatar"
                      name="avatar"
                      // value={image}
                      accept="image/*"
                      onChange={e => setBlogImage(e.target.files[0])}
                    />
                  </Col>
                </FormGroup>
               
               
       
                <FormGroup row>
                  <Label for="exampleEmail" sm={3}>
                    Blog Topic
                  </Label>

                  <Col sm={9}>
                    <Input
                      type="text"
                      name="title"
                      value={title}
                      placeholder="Add Title . . . . . "
                      onChange={e => setTitle(e.target.value)}
                    />
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Label for="exampleEmail" sm={3}>
                    Blog Topic
                  </Label>

                  <Col sm={9}>
                    <Input
                      type="text"
                      name="title"
                      value={about}
                      onChange={e => setAbout(e.target.value)}
                    />
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Label for="exampleEmail" sm={3}>
                    Blog Description
                  </Label>
                  <Col sm={9}>
                    <Input
                      type="textarea"
                      className="note"
                      value={desc}
                      onChange={e => setDesc(e.target.value)}
                    />
                  </Col>
                </FormGroup>

                <FormGroup check row>
                  <Col sm={{ size: 15 }}>
                    <Button onClick={updateBlog} color="success">
                      Update
                    </Button>

                    {'  '}

                    <Button onClick={submit} color="danger">
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
