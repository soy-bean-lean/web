import Page from 'components/Page';
import React from 'react';
import { Link } from 'react-router-dom';
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
                          <tr>
                            <th scope="row">1</th>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>Otto</td>
                            <td>                           
                            <Link to="/login">
                              <Button color="success" size="sm" to="/login">
                                View More ...{' '}
                              </Button>
                            </Link>
</td>
                           
                          </tr>
                          <tr>
                            <th scope="row">1</th>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>Otto</td>
                            <td><Link to="/login">
                              <Button color="success" size="sm" to="/login">
                                View More ...{' '}
                              </Button>
                            </Link></td>
                            
                          </tr>
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
