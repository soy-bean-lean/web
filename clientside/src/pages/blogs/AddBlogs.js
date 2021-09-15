import { Link } from 'react-router-dom';
import Page from 'components/Page';
import React, { useState, useEffect,useContext } from 'react';
import axios from 'axios';
import { toast } from "react-toastify";
import { AuthContext } from "../../helpers/AuthContext";
import classnames from 'classnames';
import Typography from 'components/Typography';

import { useHistory } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Form,
  FormFeedback,
  FormGroup,
  FormText,
  Input,
  Label,
  Row,
} from 'reactstrap';


function AddBlogs(){
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [image, setBlogImage] = useState(null);
  const { authState, setAuthState } = useContext(AuthContext);
  var today = new Date(),
    Currentdate =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
  let history = useHistory();

  const addBlog = () => {
    const formData = new FormData();
    formData.append("image", image);
    formData.append("title", title);
    formData.append("desc", desc);
    formData.append("memberId", authState.id);
    formData.append("date", Currentdate);
    alert(image);
    fetch("http://localhost:3001/blog/addBlog", {
      method: "POST",
      body: formData,
      headers: {
        Accept: "multipart/form-data",
      },
      credentials: "include",
    })
      .then((res) => res.json())
      .then((res) => {
        toast.success("Blog Has Successfully Added!", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
        });
        history.push("/dashboardP");
      })
      .catch((error) => {
        toast.error("Unable to Uploaded  Blog,Try Again!", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
        });
        history.push("/addBlogs");

        console.log(error);
      });
  };


     return (
    <Page title="Add Blog" >
      <hr></hr>
      <Col sm="10" md={{ size: 8, offset: 2 }}>
        <center>
          <Card>
            <CardHeader>New Blog</CardHeader>
            <CardBody>
              <Form>

              <FormGroup row>
                  <Label for="exampleEmail" sm={12}>
                    Import Your Blog Image From the Chooser 
                  </Label>
                  <Col sm="12" md={{ size: 6, offset:4} }>
                    <Input
                      type="file"
                      className="input"
                      id="avatar"
                      name="avatar"
                      accept="image/*, application/pdf"
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
                      name="email"
                      onChange={event => {
                        //  setCompanyName(event.target.value);
                      }}
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
                      placeholder="Description"
                    />
                  </Col>
                </FormGroup>
                

                <FormGroup check row>
                  <Col sm={{ size: 15 }}>
                    <Button color="success">Submit</Button>
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