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
  const [recentUsers, setRecentUsers] = useState(null);
  const [blogCount, setBlogCount] = useState(null);
  const [approveCount, setApproveCount] = useState(0);
  const [pendingCount, setPendingCount] = useState(0);
  const [rejectCount, setRejectCount] = useState(0);
  var a = 0,
    b = 0,
    c = 0;

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
          {recentUsers.title} {recentUsers.lastName}
        </CardText>
      </>
    ));
  const state2 = {
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
        label: 'Revenue for this year',
        borderColor: '#6a82fb',

        backgroundColor: '#c7ccf2',
        data: months,
      },
    ],
  };
  const state = {
    labels: years,
    datasets: [
      {
        label: 'Total Members',
        fill: true,
        lineTension: 0.5,
        backgroundColor: ' #c5fcd4 ',
        borderColor: '#187d34 ',
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

  const cpdTypes = {
    labels: ['Approved', 'Pending', 'Rejected'],
    datasets: [
      {
        label: 'CPD Uploads',
        fill: false,
        height: 350,
        width: 350,
        backgroundColor: ['#00c9ff', '#353e82', '#ffd700'],
        borderColor: '#fff',
        data: [approveCount, pendingCount, rejectCount],
      },
    ],
  };

  useEffect(() => {
    const formData = {
      id: '',
      type: '',
      status: '',
      description: '',
    };
    axios
      .post('http://localhost:3001/cpd/', formData)

      .then(response => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          setRecord(response.data);
          for (var i = 0; i < Object.keys(response.data).length; i++) {
            if (response.data[i].status == 'Approved') {
              a++;
              setApproveCount(a);
            } else if (response.data[i].status == 'Pending') {
              b++;
              setPendingCount(b);
            } else if (response.data[i].status == 'Rejected') {
              c++;
              setRejectCount(c);
            } else {
              console.log('Error:', i);
            }
          }
        }
      })
      .catch(error => {
        alert(error);
      });

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
      <CardGroup style={{ margin: '1rem' }}>
        <IconWidget
          bgColor="light"
          inverse={false}
          icon={FaUserGraduate}
          title="Members"
          subtitle={
            <CountUp
              className="count"
              start={0}
              end={users}
              duration={2}
            ></CountUp>
          }
        ></IconWidget>
        <CardGroup style={{ marginRight: '1rem' }}></CardGroup>

        <IconWidget
          bgColor="success"
          inverse={false}
          icon={MdRateReview}
          title="Blogs"
          subtitle={
            <CountUp
              className="count"
              start={0}
              end={blogsCount}
              duration={2}
            ></CountUp>
          }
        />
        <CardGroup style={{ marginRight: '1rem' }}></CardGroup>
        <IconWidget
          bgColor="light"
          inverse={false}
          icon={MdShare}
          title="30+ Shares"
          subtitle="New Shares"
        />
      </CardGroup>

      <Row>
        <Col lg={6} md={8} sm={8} xs={12}>
          <Card>
            <CardHeader>
              CPD Reports{' '}
              <small className="text-muted text-capitalize">Last year</small>
            </CardHeader>
            <CardBody>
              <Line data={state2} options={chartjs.line.options} />
            </CardBody>
          </Card>
        </Col>
        <Col lg={6} md={8} sm={8} xs={12}>
          <Card>
            <CardHeader>
              CPD Reports Types{' '}
              <small className="text-muted text-capitalize">Last year</small>
            </CardHeader>
            <CardBody>
              <Pie data={cpdTypes} options={chartjs.doughnut.options} />
            </CardBody>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col md="6" sm="12" xs="12">
          <Card>
            <CardHeader>New Products</CardHeader>
            <CardBody>
              {productsData.map(({ id, image, title, description, right }) => (
                <ProductMedia
                  key={id}
                  image={image}
                  title={title}
                  description={description}
                  right={right}
                />
              ))}
            </CardBody>
          </Card>
        </Col>

        <Col md="6" sm="12" xs="12">
          <Card>
            <CardHeader>New Users</CardHeader>
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
{/* 
      <CardDeck style={{ marginBottom: '1rem' }}>
        <Card
          body
          style={{
            overflowX: 'auto',
            paddingBottom: '15px',
            height: 'fit-content',
            paddingTop: 'inherit',
          }}
        >
          <HorizontalAvatarList
            avatars={avatarsData}
            avatarProps={{ size: 50 }}
          />
        </Card>

        <Card
          body
          style={{
            overflowX: 'auto',
            paddingBottom: '15px',
            height: 'fit-content',
            paddingTop: 'inherit',
          }}
        >
          <HorizontalAvatarList
            avatars={avatarsData}
            avatarProps={{ size: 50 }}
            reversed
          />
        </Card>
      </CardDeck> */}
{/* 
      <Col lg="4" md="12" sm="12" xs="12">
        <AnnouncementCard
          color="gradient-secondary"
          header="Announcement"
          avatarSize={60}
          name="Jamy"
          date="1 hour ago"
          text="Lorem ipsum dolor sit amet,consectetuer edipiscing elit,sed diam nonummy euismod tinciduntut laoreet doloremagna"
          buttonProps={{
            children: 'show',
          }}
          style={{ height: 500 }}
        />
      </Col>

      <Col lg="4" md="12" sm="12" xs="12">
        <Card>
          <CardHeader>
            <div className="d-flex justify-content-between align-items-center">
              <span>Support Tickets</span>
              <Button>
                <small>View All</small>
              </Button>
            </div>
          </CardHeader>
          <CardBody>
            {supportTicketsData.map(supportTicket => (
              <SupportTicket key={supportTicket.id} {...supportTicket} />
            ))}
          </CardBody>
        </Card>
      </Col> */}
    </Page>
  );
}
export default DashboardPage;
