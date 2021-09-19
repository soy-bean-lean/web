import Page from 'components/Page';
import React, { useContext, useState, useEffect } from 'react';
import logo200Image from 'assets/img/logo/loginLogo.jpeg';
import { Link } from 'react-router-dom';

import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../helpers/AuthContext';
import sidebarBgImage from 'assets/img/sidebar/sidebar-4.jpg';
import Typography from 'components/Typography';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  CardLink,
  Form,
  FormFeedback,
  FormGroup,
  FormText,
  Input,
  Label,
  Row,
} from 'reactstrap';
import Alert from 'reactstrap/lib/Alert';
// let history = useHistory();

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('Anushka');
  const [errorUser, setErrorUser] = useState('');
  const [errorPass, setErrorPass] = useState('');
  const [temp, setTempory] = useState();
  const { setAuthState } = useContext(AuthContext);
  const [result, setResult] = useState();

  const handlerUser = event => {
    setErrorUser('');
  };
  const handlerPass = event => {
    setErrorPass('');
  };

  let history = useHistory();
  axios.defaults.withCredentials = true;

  const login = () => {
    if (username == '' && password == '') {
    } else if (username == '') {
      setResult('requiredU');
    } else if (password == '') {
      setResult('requiredP');
    } else {
      const data = { username: username, password: password };

      axios.post('http://localhost:3001/auth/login', data).then(response => {
        if (response.data.errorUser) {
          setResult('errorUser');
          setErrorUser(response.data.error);
        } else if (response.data.errorPass) {
          setResult('errorPass');
          setErrorPass(response.data.errorPass);
        } else if (response.data.error) {
          setResult('err');
          console.log(response.data.error);
        } else {
          localStorage.setItem('accessToken', response.data.token);
          setResult('done');

          setAuthState({
            fname: response.data.firstName,
            lname: response.data.lastName,
            role: response.data.role,
            id: response.data.id,
            profileImage: response.data.profileImage,
            email: response.data.email,
            memberId: response.data.memberId,
            status: true,
          });
          if (response.data.role == 'student') {
            history.push('/dashboard');
          } else if (response.data.role == 'associate') {
            history.push('/dashboard');
          } else if (response.data.role == 'professional') {
            history.push('/dashboard');
          } else if (response.data.role == 'chartered') {
            history.push('/dashboard');
          } else if (response.data.role == 'secretariat') {
            history.push('/dashboard');
          } else if (response.data.role == 'council') {
            history.push('/dashboard');
          }
        }
      });
      //    }
    }
  };

  function msg() {
    if (result == 'err') {
      return (
        <>
          <Alert className="loginAlert" color="danger">
            Login Unsuccefull,Try Againg
          </Alert>
        </>
      );
    } else if (result == 'done') {
      return (
        <>
          <Alert className="loginAlert" color="success">
            Login Succefull
          </Alert>
        </>
      );
    } else if (result == 'errorUser') {
      return (
        <>
          <Alert className="loginAlert" color="danger">
            Invalid Details
          </Alert>
        </>
      );
    } else if (result == 'errorPass') {
      return (
        <>
          <Alert className="loginAlert" color="danger">
            Invalid Details
          </Alert>
        </>
      );
    } else if (result == 'requiredU') {
      return (
        <>
          <Alert className="loginAlert" color="danger">
            Username is required
          </Alert>
        </>
      );
    } else if (result == 'requiredP') {
      return (
        <>
          <Alert className="loginAlert" color="danger">
            Password is required
          </Alert>
        </>
      );
    }
  }
  return (
    <Page className="loginPage">
      <Row className="loginForm">
        <Col lg={7} md={8} sm={8} xs={12}>
          <center>
            {' '}
            <img
              src={logo200Image}
              className="rounded"
              style={{ width: 320, height: 350 }}
              alt="logo"
            />
          </center>
        </Col>
        <Col lg={4} md={8} sm={8} xs={12}>
          <center>
            <Card>
              <CardHeader>
                <h3 color="primary">CPDMF Login</h3>
                <Typography className="text-success">User Login</Typography>
              </CardHeader>

              <CardBody>
                <Form>
                  <FormGroup row>
                    <Label for="exampleEmail" sm={5}>
                      User Name
                    </Label>
                    <Col sm={6}>
                      <Input
                        type="text"
                        onChange={event => {
                          setUsername(event.target.value);
                        }}
                        onKeyPress={e => handlerUser(e)}
                        className="user"
                        required
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label for="exampleEmail" sm={5}>
                      Password
                    </Label>
                    <Col sm={6}>
                      <Input
                        type="password"
                        onChange={event => {
                          setPassword(event.target.value);
                        }}
                        onKeyPress={e => handlerPass(e)}
                        className="pass"
                        required
                      />
                    </Col>
                    <Col className="forget" sm={12}>
                      <Label
                        className="forget"
                        to="/forgotpassword"
                        tag="a"
                        href="/forgotpassword"
                      >
                        forget password?{' '}
                      </Label>
                    </Col>
                  </FormGroup>
                  {msg()}

                  <FormGroup check row>
                    <Col>
                      <Link to="/registration">
                        <Button className="buttonDIV" color="primary">
                          Sign Up
                        </Button>
                      </Link>

                      <Button
                        className="buttonDIV"
                        onClick={login}
                        color="success"
                      >
                        Sign In
                      </Button>
                    </Col>
                  </FormGroup>
                </Form>
                <hr />
                <p className="text-muted">
                  Continuous Professional Development Management Framework
                </p>
              </CardBody>
            </Card>

            <FormGroup>
              <Col sm={9}>
                <Input
                  type="select"
                  name="select"
                  onChange={e => setUsername(e.target.value)}
                >
                  <option value="type"></option>
                  <option value="jihaninanayakkara@gmail.com">pro</option>
                  <option value="cha">cha</option>
                  <option value="chamikadeshan1997@gmail.com">ass</option>
                  <option value="uthpalasudeshi@gmail.com">coun</option>
                  <option value="supunnanayakkara11@gmail.com">sec</option>
                  <option value="anushka.darshana01@gmail.com">ass</option>
                  <option value="anushka.darshana01@gmail.com">std</option>
                </Input>
              </Col>
            </FormGroup>
          </center>
        </Col>
      </Row>
    </Page>
  );
};

export default Login;
