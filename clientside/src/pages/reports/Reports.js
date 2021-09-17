import Page from 'components/Page';
import React, { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';
import axios from 'axios';
import { jsPDF } from 'jspdf';
import classnames from 'classnames';
import Typography from 'components/Typography';

import {
  Card,
  Input,
  CardBody,
  TabContent,
  Button,
  CardHeader,
  NavItem,
  Nav,
  Navbar,
  NavLink,
  TabPane,
  InputGroup,
  InputGroupAddon,
  Col,
  Row,
  Table,
} from 'reactstrap';

const tableTypes = ['striped'];

const TablePage = () => {
  const [data, setData] = useState(null);

  const [firstName, setFirstName] = useState('');
  const [years, setYears] = useState('');
  const [year, setYear] = useState('');
  const [type, setType] = useState('');

  const yearData =
    years &&
    years.map((li, i) => {
      return (
        <option key={i} value={li.year}>
          {li.year}
        </option>
      );
    }, this);

  const getData = () => {
    const data = {
      firstName: firstName,
      years: year,
      type: type,
    };

    axios
      .post('http://localhost:3001/reports/payments', data)

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
      firstName: '',
      years: '',
      type: '',
    };
    axios
      .post('http://localhost:3001/reports/getYears', data)

      .then(response => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          setYears(response.data);
        }
      })
      .catch(error => {
        alert(error);
      });

 

    axios
      .post('http://localhost:3001/reports/payments', data)

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
  const [activeTab, setActiveTab] = useState('1');

  const toggle = tab => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const jobview =
    data &&
    data.map(data => (
      <>
        <tr>
          <td hidden>{data.paymentId}</td>
          <td>
            {data.title}
            {data.firstName}
            {data.lastName}
          </td>
          <td>{data.type}</td>

          <td>{data.year}</td>
          <td>{data.payDate}</td>
          <td>{data.amount} /=</td>
        </tr>
      </>
    ));

  function toPDF() {
    const doc = new jsPDF();

    doc.line(10, 10, 200, 10, 'F');
    doc.setFont('times');
    doc.setFontSize(24);
    doc.text('CPDMF', 100, 20, 'center');
    doc.setFontSize(13);
    doc.text(
      'Continuous Professional Development Management Framework',
      100,
      27,
      'center',
    );

    doc.line(10, 31, 200, 31, 'F');

    doc.text('Payment Report of CSSL Members', 100, 40, 'center');
    doc.setFontSize(20);
    const rowCount = document.getElementById('myTable').rows.length;

    const generateData = function (amount) {
      var result = [];

      for (var i = 0; i < amount; i += 1) {
        var Name = document
          .getElementById('myTable')
          .rows[i].cells.item(1).innerHTML;
        var Type = document
          .getElementById('myTable')
          .rows[i].cells.item(2).innerHTML;
        var Year = document
          .getElementById('myTable')
          .rows[i].cells.item(3).innerHTML;
        var dd = document
          .getElementById('myTable')
          .rows[i].cells.item(4).innerHTML;
        var Amount = document
          .getElementById('myTable')
          .rows[i].cells.item(5).innerHTML;

        var data = {
          Name: Name,
          Type: Type,
          Year: Year,
          Date: dd,
          Amount: Amount,
        };
        result.push(Object.assign({}, data));
      }
      return result;
    };
    function createHeaders(keys) {
      var result = [];
      for (var i = 0; i < keys.length; i += 1) {
        result.push({
          id: keys[i],
          name: keys[i],
          prompt: keys[i],
          width: 48,
          top: 3,
          align: 'center',
          padding: 0,
        });
      }
      return result;
    }
    var headers = createHeaders(['Name', 'Type', 'Year', 'Date', 'Amount']);

    doc.table(
      15,
      50,
      generateData(rowCount),
      headers,
      { fontSize: 10 },
      'center',
    );
    // doc.line(10, 35, 150, 35 , 'F');

    doc.save('cpdmf-payment-report.pdf');
  }
  return (
    <Page title="Reports">
      <hr></hr>
      <Nav tabs>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '1' })}
            onClick={() => {
              toggle('1');
            }}
          >
            Payments
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '2' })}
            onClick={() => {
              toggle('2');
            }}
          >
            Courses
          </NavLink>
        </NavItem>
      </Nav>

      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
          <Row>
            <Col sm="12">
              <Card className="mb-2">
                <CardBody>
                  <InputGroup>
                    <Input
                      type="text"
                      className="note"
                      onChange={event => {
                        setFirstName(event.target.value);
                      }}
                      onKeyUp={getData}
                      placeholder="Seach By Member"
                    />{' '}
                    <Input
                      type="select"
                      className="note"
                      placeholder="Search By Member Type"
                      onChange={event => {
                        setType(event.target.value);
                      }}
                      onClick={getData}
                    >
                      {' '}
                      <option value="">Search By Member Type</option>
                      <option value="Student">Student</option>
                      <option value="Associate">Associate</option>
                      <option value="Proffessional">Proffessional</option>
                      <option value="Chartered">Chartered</option>
                    </Input>
                    <Input
                      type="select"
                      className="note"
                      placeholder="Search By Payment Year"
                      onChange={event => {
                        setYear(event.target.value);
                      }}
                      onClick={getData}
                    >
                      {' '}
                      <option value="">Search By Payment Year</option>
                      {yearData}
                    </Input>
                  </InputGroup>
                </CardBody>
              </Card>
              <Card className="mb-3">
                <Card>
                  <CardBody>
                    <Row>
                      <Col>
                        <Card body>
                          <Table id="myTable" {...{ ['striped']: true }}>
                            <tbody>
                              <th>Member</th>
                              <th>Member Type</th>
                              <th>Payment Year</th>
                              <th>Paid Date</th>
                              <th>Payment</th>
                              {jobview}
                            </tbody>
                          </Table>
                        </Card>
                        <br></br>
                        <Link className="buttonDIV">
                          <Button color="success" onClick={toPDF}>
                            Download
                          </Button>
                        </Link>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Card>
            </Col>
          </Row>
        </TabPane>

        <TabPane tabId="2">
          <Row>
            <Col sm="12">
              <Card className="mb-3">
                <Card>
                  <CardBody>
                    <Row>
                      <Col></Col>
                    </Row>
                  </CardBody>
                </Card>
              </Card>
              <br></br>
              <Link className="buttonDIV" to="/addBlogs">
                <Button color="success">Download</Button>
              </Link>
            </Col>
          </Row>
        </TabPane>
      </TabContent>
    </Page>
  );
};

export default TablePage;
