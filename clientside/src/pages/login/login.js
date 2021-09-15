import Page from 'components/Page';
import React, { useContext, useState, useEffect } from 'react';
import logo200Image from 'assets/img/logo/logo_200.png';

import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../helpers/AuthContext';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
import Alert from 'reactstrap/lib/Alert';
// let history = useHistory();

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('Anushka');
  const [errorUser, setErrorUser] = useState('');
  const [errorPass, setErrorPass] = useState('');
  const [temp, setTempory] = useState();
  const { setAuthState } = useContext(AuthContext);

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
      setErrorUser('* Username is required');
      setErrorPass('* Password is required');
    } else if (username == '') {
      setErrorUser('* Username is required');
    } else if (password == '') {
      setErrorPass('* Password is required');
    } else {
    const data = { username: username, password: password };

    axios.post('http://localhost:3001/auth/login', data).then(response => {
      if (response.data.errorUser) {
        setErrorUser(response.data.error);
      } else if (response.data.errorPass) {
        setErrorPass(response.data.errorPass);
      } else if (response.data.error) {
        //Access token error
        console.log(response.data.error);
      } else {
        localStorage.setItem('accessToken', response.data.token);
        console.log(response.data);
        setAuthState({
          fname: response.data.firstName,
          lname: response.data.lastName,
          role: response.data.role,
          id: response.data.id,
          profileImage: response.data.profileImage,
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
  };
  }

  return (
    <Row className="loginForm">
      <Col sm="6" md={{ size: 4, offset: 4 }}>
        <center>
          <Card>
            <CardHeader>
              {' '}
              <img
                src={logo200Image}
                className="rounded"
                style={{ width: 60, height: 60, cursor: 'pointer' }}
                alt="logo"
              />
            </CardHeader>

            <FormGroup>
              <Col sm={9}>
                <Input
                  type="select"
                  name="select"
                  onChange={e => setUsername(e.target.value)}
                >
                  <option value="type"></option>
                  <option value="jihani">pro</option>
                  {/* <option value="cha">cha</option> */}
                  <option value="chamika">ass</option>
                  <option value="sudeshi">coun</option>
                  <option value="supun">sec</option>
                  {/* <option value="ass">ass</option>
                  <option value="std">std</option> */}
                  <option value="anushka">All DAta</option>
                </Input>
              </Col>
             
             
            </FormGroup>

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
                <label className="error">{errorUser}</label>

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
                </FormGroup>
                <FormGroup row></FormGroup>
                <label className="error">{errorPass}</label>

                <FormGroup check row>
                  <Col sm={6}>
                    <Button
                      className="buttonDIV"
                      onClick={login}
                      color="success"
                    >
                      Login
                    </Button>
                  </Col>
                </FormGroup>
              </Form>
            </CardBody>
          </Card>
        </center>
      </Col>
    </Row>
  );
};

export default Login;
