import Page from 'components/Page';
import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../helpers/AuthContext';

import { Link } from 'react-router-dom';
import axios from 'axios';


import {
  Card,
  Badge,
  Input,
  CardBody,
  Button,
  CardHeader,
  InputGroup,
  InputGroupAddon,
  Col,
  Row,
  Table,
} from 'reactstrap';

const tableTypes = ['striped'];

const TablePage = () => {
  const [data, setData] = useState(null);
  const { authState, setAuthState } = useContext(AuthContext);

  const [companyName, setCompanyName] = useState('');
  const [jobRole, setJobRole] = useState('');
  const [location, setLocation] = useState('');

  const getData = () => {
    const data = {
      companyName: companyName,
      jobRole: jobRole,
      location: location,
    };
    axios
      .post('http://localhost:3001/job/getJobs', data)
      .then(response => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          setData(response.data);
        }
      })
      .catch(error => {
        alert(error);
      });
  };
  useEffect(() => {
    const data = {
      companyName: '',
      jobRole: '',
      location: '',
      memberId : authState.id,

    };
    axios
      .post('http://localhost:3001/job/getJobs', data)

      .then(response => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          setData(response.data);
        }
      })
      .catch(error => {
        alert(error);
      });
  }, []);

  const jobview =
    data &&
    data.map(data => (
      <>
        <tr>
          <td hidden>{data.jvId}</td>
          <td>{data.companyName}</td>
          <td>
            <center>
              <Badge color="warning" pill className="mr-1">
                {data.designation}
              </Badge>
            </center>
          </td>
          <td>
            <center>
              <Badge color="danger" pill className="mr-1">
                {data.location}
              </Badge>
            </center>
          </td>


          <td>
            <Link to={'/jobAddvertisment/' + data.jvId}>
              <Button
                color="success"
                size="sm"
                to={'/jobAddvertisment/' + data.jvId}
              >
                Apply{' '}
              </Button>
            </Link>
          </td>
        </tr>
      </>
    ));
  return (
    <Page title="Jobs" className="TablePage">
      {tableTypes.map((tableType, index) => (
        <Row>
          <Col>
            <Card className="mb-2">
              <CardHeader>Current Job Vaccencies</CardHeader>
            </Card>
            <Card className="mb-2">
              <CardBody>
                <InputGroup>
                  <Input
                    type="text"
                    className="note"
                    placeholder="Search By Company Name"
                    onChange={event => {
                      setCompanyName(event.target.value);
                    }}
                    onKeyUp={getData}
                  />{' '}
                  <Input
                    type="text"
                    className="note"
                    onChange={event => {
                      setJobRole(event.target.value);
                    }}
                    onKeyUp={getData}
                    placeholder="Seach By Job Role"
                  />{' '}
                  <Input
                    type="text"
                    className="note"
                    onChange={event => {
                      setLocation(event.target.value);
                    }}
                    onKeyUp={getData}
                    placeholder="Seach By Location"
                  />
                </InputGroup>
              </CardBody>
            </Card>

            <Card>
              <CardBody>
                <Row>
                  <Col>
                    <Card body>
                      <Table {...{ ['striped']: true }}>
                        <tbody>{jobview}</tbody>
                      </Table>
                    </Card>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      ))}
    </Page>
  );
};

export default TablePage;
