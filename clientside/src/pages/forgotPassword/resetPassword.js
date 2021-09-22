import Page from 'components/Page';
import React, { useContext, useState, useEffect } from 'react';
import logo200Image from 'assets/img/logo/logo_200.png';
import { Field, Form, Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  CardTitle,
  FormFeedback,
  FormGroup,
  FormText,
  Input,
  Label,
  Row,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';
import Alert from 'reactstrap/lib/Alert';
// let history = useHistory();

const ResetPassword = props => {
  const { buttonLabel, className } = props;

  const [modal, setModal] = useState(false);

  const initialValues = {
    token: props.match.params.token,
    password: '',
    confirmPassword: '',
  };

  const validationSchema = Yup.object().shape({
    password: Yup.string()
      .min(6, 'Password must at least have 6 charaters')
      .required('Password is required')
      .matches(
        /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
        'Password must contain at least 8 characters, one uppercase, one number and one special case character',
      ),
    confirmPassword: Yup.string()
      .oneOf(
        [Yup.ref('password'), null],
        'Password and confirm password should match',
      )
      .required('Confirm password is required'),
  });

  let history = useHistory();
  axios.defaults.withCredentials = true;

  const onSubmit = data => {
    axios.post('http://localhost:3001/auth/reset', data).then(response => {
      if (response.data.errorUser) {
      } else {
        setModal(!modal);
      }
    });
  };

  const Redirect = () => {
    setModal(!modal);
    history.push('./');
  };

  return (
    <Row className="loginForm">
      <Col sm="6" md={{ size: 4, offset: 4 }}>
        <center>
          <div>
            <Modal isOpen={modal} toggle={onSubmit} className={className}>
              <ModalHeader toggle={onSubmit}>Password Resetted</ModalHeader>
              <ModalBody>
                Your password has been resetted. You can log into your account
                with new credentials.
              </ModalBody>
              <ModalFooter>
                <Button color="success" onClick={Redirect}>
                  Done
                </Button>{' '}
              </ModalFooter>
            </Modal>
          </div>
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
          >
            {({ setFieldValue, errors }) => (
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

                <CardBody>
                  <CardTitle tag="h6" className="mb-4 mt-1 text-left">
                    Please enter your new password
                  </CardTitle>
                  <Form>
                    <FormGroup row>
                      <Label for="exampleEmail" className="text-md-left" sm={5}>
                        Password
                      </Label>
                      <Col sm={6}>
                        <Input
                          type="password"
                          name="password"
                          onChange={e =>
                            setFieldValue('password', e.target.value, false)
                          }
                          className="bg-light"
                        />
                      </Col>
                      <ErrorMessage
                        name="password"
                        render={msg => (
                          <div className="text-danger">
                            <b>{msg}</b> *
                          </div>
                        )}
                      />
                    </FormGroup>
                    <FormGroup row>
                      <Label for="exampleEmail" className="text-md-left" sm={5}>
                        Confirm Password
                      </Label>
                      <Col sm={6} className="mb-2">
                        <Input
                          type="password"
                          name="confirmPassword"
                          onChange={e =>
                            setFieldValue(
                              'confirmPassword',
                              e.target.value,
                              false,
                            )
                          }
                          className="bg-light"
                        />
                      </Col>
                      <ErrorMessage
                        name="confirmPassword"
                        render={msg => (
                          <div className="text-danger">
                            <b>{msg}</b> *
                          </div>
                        )}
                      />
                    </FormGroup>

                    <FormGroup check row>
                      <Col sm={6}>
                        <Button color="success" type="submit">
                          Reset
                        </Button>
                      </Col>
                    </FormGroup>
                  </Form>
                </CardBody>
              </Card>
            )}
          </Formik>
        </center>
      </Col>
    </Row>
  );
};

export default ResetPassword;
