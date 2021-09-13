import Page from 'components/Page';
import React, { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';
import axios from 'axios';

import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom';

import {
  Card,
  Alert,
  CardBody,
  Button,
  CardHeader,
  Col,
  Row,
  Table,
} from 'reactstrap';

const tableTypes = ['striped'];

const TablePage = () => {
  const [data, setData] = useState(null);

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
         
          <td>{data.jvId}</td>
          <td>{data.companyName}</td>
          <td>{data.designation}</td>

          <td>
            <Link to={"/jobAddvertisment/" + data.jvId}>
              <Button color="success" size="sm" to={"/jobAddvertisment/" + data.jvId}>
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
            <Card className="mb-3">
              <CardHeader>Current Job Vaccencies</CardHeader>
              <CardBody>
                <Row>
                  <Col>
                    <Card body>
                      <Table {...{ ['striped']: true }}>
                        <tbody>
                        {jobview}
                        </tbody>
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
