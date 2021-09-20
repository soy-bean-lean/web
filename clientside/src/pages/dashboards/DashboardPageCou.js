import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from '../../helpers/AuthContext';

import Page from 'components/Page';
import CountUp from 'react-countup';

import { chartjs } from 'demos/dashboardPage';
import { Bar, Doughnut, Line, Pie } from 'react-chartjs-2';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';

import Calendar from 'react-calendar';
import { Card, CardBody,Badge, CardLink, CardHeader, Col, Row } from 'reactstrap';
import CardText from 'reactstrap/lib/CardText';

const today = new Date();

const lastWeek = new Date(
  today.getFullYear(),
  today.getMonth(),
  today.getDate() - 7,
);

const date2 = new Date(
  today.getFullYear(),
  today.getMonth(),
  today.getDate() - 3,
);
const tableTypes = ['striped'];

function DashboardPage() {
  const primaryColor = '#EC6150';
  const secondaryColor = '#123123';
  const { authState, setAuthState } = useContext(AuthContext);
  const [record, setRecord] = useState(null);

  const [dataCPD, setData] = useState(null);
  const [members, setMemebrs] = useState(null);
  const [workshops, setWorkshops] = useState(null);
  const [length, setLength] = useState(null);
  const [lengthMember, setLengthMember] = useState(null);
  const [paidPersentage, setPaidCount] = useState(null);
  const [workshopsLength, setLengthWorkshops] = useState(null);

  const [user, setUserTypes] = useState('');

  const [applications, setApplications] = useState(null);
  const [status, setUserStatus] = useState(null);
  const [recentUsers, setRecentUsers] = useState(null);
  const [blogCount, setBlogCount] = useState(null);
  const [totalusers, setUserCount] = useState(null);

  const [value, setValue] = useState(new Date());
  const changeDate = e => {
    setValue(value);
  };

  var userCouts = [];
  var userType = [];

  var months = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  for (var i = 0; i < length; i++) {
    months[dataCPD[i].month] = dataCPD[i].credits;
  }

  var monthsWorkshops = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  for (var i = 0; i < workshopsLength; i++) {
    monthsWorkshops[workshops[i].month] = workshops[i].workshops;
  }

  var years = [];
  var yearData = [];

  members &&
    members.map(
      members => (years.push(members.year), yearData.push(members.members)),
    );

  // types &&
  //   members.map(
  //     types => (years.push(members.year), yearData.push(members.members)),
  //   );

  const recenrUsersofCSSL =
    recentUsers &&
    recentUsers.map(recentUsers => (
      <>
        <img
          className="newUsers"
          title={
            recentUsers.title +
            '.' +
            recentUsers.firstName +
            '' +
            recentUsers.lastName
          }
          src={
            'http://localhost:3001/uploads/profileImages/' +
            recentUsers.profileImage
          }
        />
      </>
    ));

  const applicationData =
    applications &&
    applications.map(applications => (
      <>
        <CardText>
          <img
            className="profileImageSmall"
            src={
              'http://localhost:3001/uploads/jobvacancy/' +
              applications.advertisment
            }
          />
          {applications.companyName} ({applications.numberOfApplicent})
        </CardText>
      </>
    ));
  const barGraphData = {
    labels: [
      'JAN',
      'FEB',
      'MAR',
      'APR',
      'MAY',
      'JUN',
      'JUL',
      'AUG',
      'SEP',
      'OCT',
      'NOV',
      'DEC',
    ],

    datasets: [
      {
        label: 'Records ',
        borderColor: '#08186e',
        borderWidth: 3,
        backgroundColor: '#0000',
        data: months,
      },
    ],
  };

  const state = {
    labels: years,
    datasets: [
      {
        fill: true,
        width: '200px',
        height: '150px',

        lineTension: 2,
        backgroundColor: [
          '#1d7e61',
          '#fd7e14',
          '#ec1317',
          '#ffc107',
          '#6a82fb',
        ],
        borderWidth: 3,
        data: yearData,
      },
    ],
  };
  const state1 = {
    labels: [
      'JAN',
      'FEB',
      'MAR',
      'APR',
      'MAY',
      'JUN',
      'JUL',
      'AUG',
      'SEP',
      'OCT',
      'NOV',
      'DEC',
    ],
    datasets: [
      {
        label: 'Toatal Workshop',
        fill: true,
        backgroundColor: '#defff9',
        backgroundColor: [
          '#1d7e61',
          '#fd7e14',
          '#ec1317',
          '#ffc107',
          '#6a82fb',
        ],
        hoverBackgroundColor: '#9ff5e5',
        borderWidth: 2,

        data: monthsWorkshops,
      },
    ],
  };

  const memberTypes = {
    labels: userType,
    datasets: [
      {
        label: 'CPD Uploads',
        fill: false,
        height: 350,
        lineTension: 1,

        width: 350,
        backgroundColor: [
          '#1d7e61',
          '#fd7e14',
          '#ec1317',
          '#ffc107',
          '#6a82fb',
        ],
        borderColor: '#fff',
        data: userCouts,
      },
    ],
  };
  var userStatus = [];
  var users = [];
  status &&
    status.map(index => {
      if (index.status == 0) {
        userStatus.push('PENDING');
        users.push(index.bbb);
      } else if (index.status == 1) {
        userStatus.push('APPROVED');
        users.push(index.bbb);
      } else if (index.status == 2) {
        userStatus.push('REJECTED');
        users.push(index.bbb);
      } else if (index.status == 3) {
        userStatus.push('VERIFIED');
        users.push(index.bbb);
      }
    });

  const memberStatus = {
    labels: userStatus,
    datasets: [
      {
        label: 'User Status',
        fill: false,
        height: 350,
        width: 350,
        backgroundColor: ['#6a82fb', '#1d7e61', '#ec1317', '#ffc107'],
        borderColor: '#fff',
        data: users,
      },
    ],
  };

  // const userTypes = {
  //   labels: userTypes.userType ,
  //   datasets: [
  //     {
  //       label: 'CPD Uploads',
  //       fill: false,
  //       height: 350,
  //       width: 350,
  //       backgroundColor: ['#1d7e61', '#ec1317', '#ffc107'],
  //       borderColor: '#fff',
  //       data: userTypes.,
  //     },
  //   ],
  // };
  var y = 0;
  useEffect(() => {
    axios
      .post('http://localhost:3001/Dash/getUserStatus')

      .then(response => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          setUserStatus(response.data);
        }
      })
      .catch(error => {
        alert(error);
      });
    axios
      .post('http://localhost:3001/Dash/getApplications')

      .then(response => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          setApplications(response.data);
        }
      })
      .catch(error => {
        alert(error);
      });
    const formData = {
      id: '',
      type: '',
      status: '',
      description: '',
    };

    // axios
    //   .post('http://localhost:3001/cpd/', formData)

    //   .then(response => {
    //     if (response.data.error) {
    //       alert(response.data.error);
    //     } else {
    //       setRecord(response.data);
    //       for (var i = 0; i < Object.keys(response.data).length; i++) {
    //         if (response.data[i].status == 'Approved') {
    //           a++;
    //           setStudents(a);
    //         } else if (response.data[i].status == 'Pending') {
    //           b++;
    //           setAssociates(b);
    //         } else if (response.data[i].status == 'Rejected') {
    //           c++;
    //           setPro(c);
    //         } else {
    //           console.log('Error:', i);
    //         }
    //       }
    //     }
    //   })
    //   .catch(error => {
    //     alert(error);
    //   });

    const data = {
      memberId: authState.id,
      year: '2021',
    };
    axios
      .post('http://localhost:3001/Dash/getCPDData', data)

      .then(response => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          setData(response.data);
          setLength(response.data.length);
        }
      })
      .catch(error => {
        alert(error);
      });
    axios
      .post('http://localhost:3001/Dash/getWorkshops', data)

      .then(response => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          setWorkshops(response.data);
          setLengthWorkshops(response.data.length);
        }
      })
      .catch(error => {
        alert(error);
      });

    axios
      .post('http://localhost:3001/reports/getBlogCount')

      .then(response => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          setBlogCount(response.data[0].blogs);
        }
      })
      .catch(error => {
        alert(error);
      });

    axios
      .post('http://localhost:3001/reports/getUsers')

      .then(response => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          setUserCount(response.data[0].users);
        }
      })
      .catch(error => {
        alert(error);
      });

    axios
      .post('http://localhost:3001/Dash/getUserCount')

      .then(response => {
        if (response.data.error) {
          // console.log('OOOOO');
        } else {
          setUserTypes(response.data);
          console.log(response.data[0].aaa + '====');
          console.log(response.data[0].type + '++++');
        }
      })
      .catch(error => {
        alert(error);
      });
    axios
      .post('http://localhost:3001/reports/getRecentUsers')

      .then(response => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          setRecentUsers(response.data);
        }
      })
      .catch(error => {
        alert(error);
      });

    axios
      .post('http://localhost:3001/Dash/getMemberData', data)

      .then(response => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          setMemebrs(response.data);
          setLengthMember(response.data.length);
        }
      })
      .catch(error => {
        alert(error);
      });

    axios
      .post('http://localhost:3001/reports/getPaidCount', data)

      .then(res => {
        if (res.data.error) {
          alert(res.data.error);
        } else {
          axios
            .post('http://localhost:3001/reports/getUsers')

            .then(response => {
              if (response.data.error) {
                alert(response.data.error);
              } else {
                y = response.data[0].users;
                var x = res.data[0].paid;
                setPaidCount((x / y) * 100);
              }
            });
        }
      })
      .catch(error => {
        alert(error);
      });
  }, []);

  user &&
    user.map(index => {
      console.log(index.type);
      userType.push(index.type.toUpperCase());
      userCouts.push(index.aaa);
    });

  return (
    <Page title="DashBoard">
      <Badge color="warning" pill className="mr-1">
                 Council Member
                </Badge>
      <hr />
      <Row>
        <Col xs="8">
          {' '}
          <Card className="shadow">
            <center>
              <CardHeader>CSSL Member Informations </CardHeader>{' '}
            </center>

            <Row className="mt-2 ml-3">
              <Col xs="6">
                <CardBody>
                  <Pie data={memberTypes} options={chartjs.doughnut.options} />
                </CardBody>
              </Col>
              <Col xs="6">
                <CardBody>
                  <Doughnut
                    data={memberStatus}
                    options={chartjs.doughnut.options}
                  />
                </CardBody>
              </Col>
            </Row>
          </Card>
        </Col>

        <Col xs="4">
          <Card className="shadow">
            <Calendar
              //onChange={onChange}
              value={lastWeek}
              className="calender"
              onChange={changeDate}
              //tileClassName={tileContent}
            />
          </Card>
        </Col>
      </Row>
      <Row>
        <Col xs="4">
          <Card className="shadow">
            <center>
              <CardHeader>Member Registrations in each year</CardHeader>{' '}
            </center>

            <CardBody>
              <Bar data={state} options={chartjs.line.options} />
            </CardBody>
          </Card>
        </Col>
        <Col xs="4">
          <Card className="shadow">
            <center>
              <CardHeader>Member Payment Completion</CardHeader>{' '}
            </center>
            <center>
              <CardBody style={{ width: 150, height: 190 }}>
                <br />
                <CircularProgressbar
                  value={paidPersentage}
                  text={`${paidPersentage}%`}
                  styles={buildStyles({
                    // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                    strokeLinecap: 'round',
                    lineTension: 3,
                    // Text size
                    textSize: '28px',
                    backgroundPadding: 5,
                    // How long animation takes to go from one percentage to another, in seconds
                    pathTransitionDuration: 1,

                    // Can specify path transition in more detail, or remove it entirely
                    // pathTransition: 'none',

                    // Colors
                    background: true,
                    pathColor: '#1d7e61',
                    textColor: '#1d7e61',
                    trailColor: '#fff',
                    borderColor: '#1d7e61',
                    backgroundColor: '#08186e',
                  })}
                />{' '}
              </CardBody>
            </center>
          </Card>
        </Col>

        <Col sm="4" md={{ size: 4, offset: 0 }}>
          <Card className="shadow">
            <center>
              {' '}
              <CardHeader>New Members</CardHeader>{' '}
            </center>
            <center>
            
              <CardBody className="userCards">
                {recenrUsersofCSSL}
                
                
              </CardBody>
            </center>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col sm="5" md={{ size: 6, offset: 0 }}>
          <Card className="shadow">
            <center>
              {' '}
              <CardHeader>Recenet Job Applications</CardHeader>{' '}
            </center>
            <CardBody>
              <Col sm="12">
                {tableTypes.map((tableType, index) => (
                  <tbody>{applicationData}</tbody>
                ))}
              </Col>

              <hr />
              <center>
                <CardLink href="/jobapplications" className="text-center">
                  View More
                </CardLink>
              </center>
            </CardBody>
          </Card>
        </Col>
        <Col sm="5" md={{ size: 6, offset: 0 }}>
          <Card className="shadow">
            <center>
              {' '}
              <CardHeader>CPD Reports </CardHeader>{' '}
            </center>
            <CardBody>
              <Line data={barGraphData} options={chartjs.line.options} />
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Page>
  );
}
export default DashboardPage;
