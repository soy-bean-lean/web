import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from '../../helpers/AuthContext';

import { AnnouncementCard, TodosCard } from 'components/Card';
import HorizontalAvatarList from 'components/HorizontalAvatarList';
import MapWithBubbles from 'components/MapWithBubbles';
import Page from 'components/Page';
import CountUp from 'react-countup';

import ProductMedia from 'components/ProductMedia';
import SupportTicket from 'components/SupportTicket';
import { IconWidget, NumberWidget } from 'components/Widget';
import { getStackLineChart, stackLineChartOptions } from 'demos/chartjs';
import {
  avatarsData,
  chartjs,
  productsData,
  supportTicketsData,
  todosData,
  userProgressTableData,
} from 'demos/dashboardPage';
import { Bar, Doughnut, Line, Pie } from 'react-chartjs-2';
import {
  MdBubbleChart,
  MdInsertChart,
  MdPersonPin,
  MdCardMembership,
  MdPieChart,
  MdRateReview,
  MdShare,
  MdShowChart,
  MdThumbUp,
} from 'react-icons/md';
import { FaUserGraduate } from 'react-icons/fa';
import InfiniteCalendar from 'react-infinite-calendar';
import {
  Badge,
  Button,
  Table,
  Card,
  CardBody,
  CardDeck,
  CardGroup,
  CardHeader,
  CardTitle,
  Col,
  ListGroup,
  ListGroupItem,
  Row,
} from 'reactstrap';
import { getColor } from 'utils/colors';
import CardText from 'reactstrap/lib/CardText';

const today = new Date();
const lastWeek = new Date(
  today.getFullYear(),
  today.getMonth(),
  today.getDate() - 7,
);
const tableTypes = ['striped'];

function DashboardPage() {
  const primaryColor = '#6a82fb';
  const secondaryColor = '#a5aacf';
  const { authState, setAuthState } = useContext(AuthContext);
  const [record, setRecord] = useState(null);

  const [dataCPD, setData] = useState(null);
  const [members, setMemebrs] = useState(null);
  const [workshops, setWorkshops] = useState(null);
  const [length, setLength] = useState(null);
  const [lengthMember, setLengthMember] = useState(null);
  const [workshopsLength, setLengthWorkshops] = useState(null);
  const [userCount, setUserCount] = useState(null);
  const [userTypes, setUserTypes] = useState(null);

  const [applications, setApplications] = useState(null);
  const [recentUsers, setRecentUsers] = useState(null);
  const [blogCount, setBlogCount] = useState(null);

  var userCouts = [0, 0, 0, 0];

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

  const recenrUsersofCSSL =
    recentUsers &&
    recentUsers.map(recentUsers => (
      <>
        <CardText>
          <img
            className="profileImageSmall"
            src={
              'http://localhost:3001/uploads/profileImages/' +
              recentUsers.profileImage
            }
          />
          {recentUsers.title} {recentUsers.firstName} {recentUsers.lastName}
          <hr />
        </CardText>
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
          <hr />
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
        label: 'Members',
        fill: true,
        hoverBackgroundColor: '#08186e',

        lineTension: 2,
        backgroundColor: ' #08186e ',
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
        borderColor: '#8ee6d6',
        hoverBackgroundColor: '#9ff5e5',
        borderWidth: 2,

        data: monthsWorkshops,
      },
    ],
  };
  var s = userCouts[0] * 1;
  var a = userCouts[1] * 1;
  var p = userCouts[2] * 1;
  var c = userCouts[3] * 1;
  const memberTypes = {
    labels: ['Student', 'Associate', 'Proffesional', 'Chartered'],
    datasets: [
      {
        label: 'CPD Uploads',
        fill: false,
        height: 350,
        width: 350,
        backgroundColor: ['#1d7e61', '#ec1317', '#ffc107'],
        borderColor: '#fff',
        data: [2,6,1,5],
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

  useEffect(() => {
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
          console.log(response.data);

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
          setBlogCount(response.data);
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
          setUserCount(response.data);
        }
      })
      .catch(error => {
        alert(error);
      });

    axios
      .post('http://localhost:3001/Dash/getUserCount')

      .then(response => {
        if (response.data.error) {
          console.log('OOOOO');
        } else {
          console.log(response.data);
          for (var i = 0; i < Object.keys(response.data).length; i++) {
            console.log(response.data[i].userType);

            if (response.data[i].userType == 'Student') {
              console.log(userCouts[0]);
              userCouts[0] = response.data[i].counts;
              console.log(userCouts[0]);
            } else if (response.data[i].userType == 'Associate') {
              console.log(userCouts[1]);
              userCouts[1] = response.data[i].counts;
              console.log(userCouts[1]);
            } else if (response.data[i].userType == 'Professional') {
              console.log(userCouts[2]);
              p = response.data[i].counts;
              console.log(userCouts[2]);
            } else if (response.data[i].userType == 'Chartered') {
              userCouts[3] = response.data[i].counts;
            }
          }
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
  }, []);

  var blogsCount;
  blogCount && blogCount.map(blogCount => (blogsCount = blogCount.blogs * 1));
  var users;
  userCount && userCount.map(userCount => (users = userCount.users * 1));

  return (
    <Page title="Council Member - DashBoard">
      <hr />
      <Row>
        <Col md={{ size: 7, offset: 0 }}>
          <Card>
            <CardHeader>Recent Activities</CardHeader>
            <CardBody></CardBody>
          </Card>
        </Col>

        <Col sm="5" md={{ size: 5, offset: 0 }}>
          <Card>
            <CardHeader>Upcoming Activities Users</CardHeader>
            <CardBody></CardBody>
          </Card>
        </Col>

        <Col sm="5" md={{ size: 6, offset: 0 }}>
          <Card>
            <CardHeader>CPD Reports Types </CardHeader>
            <CardBody>
              <Pie data={memberTypes} options={chartjs.doughnut.options} />
            </CardBody>
          </Card>
        </Col>

        <Col sm="5" md={{ size: 6, offset: 0 }}>
          <Card>
            <CardHeader>CPD Reports </CardHeader>
            <CardBody>
              <Line data={barGraphData} options={chartjs.line.options} />
            </CardBody>
          </Card>
        </Col>

        <Col sm="5" md={{ size: 7, offset: 0 }}>
          <Card>
            <CardHeader>Member Registrations</CardHeader>

            <CardBody>
              <Bar data={state} options={chartjs.line.options} />
            </CardBody>
          </Card>
        </Col>

        <Col sm="5" md={{ size: 5, offset: 0 }}>
          <Card>
            <CardHeader>Recenet member Registrations</CardHeader>
            <CardBody>
              <Col sm="12">
                {tableTypes.map((tableType, index) => (
                  <tbody>{recenrUsersofCSSL}</tbody>
                ))}
              </Col>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Page>
  );
}
export default DashboardPage;
