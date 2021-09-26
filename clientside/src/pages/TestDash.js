import { AnnouncementCard, TodosCard } from 'components/Card';
import HorizontalAvatarList from 'components/HorizontalAvatarList';
import MapWithBubbles from 'components/MapWithBubbles';
import Page from 'components/Page';
import ProductMedia from 'components/ProductMedia';
import SupportTicket from 'components/SupportTicket';
import UserProgressTable from 'components/UserProgressTable';
import { IconWidget, NumberWidget } from 'components/Widget';
import { getStackLineChart, stackLineChartOptions } from 'demos/chartjs';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import {
  avatarsData,
  chartjs,
  productsData,
  supportTicketsData,
  todosData,
  userProgressTableData,
} from 'demos/dashboardPage';
import React, { useState, useEffect, useContext } from 'react';
import { Bar, Line, Doughnut, Pie } from 'react-chartjs-2';
import {
  MdBubbleChart,
  MdInsertChart,
  MdPersonPin,
  MdPieChart,
  MdRateReview,
  MdShare,
  MdShowChart,
  MdThumbUp,
} from 'react-icons/md';
import InfiniteCalendar from 'react-infinite-calendar';
import {
  Badge,
  Button,
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
  CardSubtitle,
  CardText,
  CardLink,
} from 'reactstrap';
import { getColor } from 'utils/colors';
import Calendar from 'react-calendar';
import './calender.css';
import { differenceInCalendarDays } from 'date-fns';
import axios from 'axios';
import { AuthContext } from '../helpers/AuthContext';

const today = new Date();
const lastWeek = new Date(
  today.getFullYear(),
  today.getMonth(),
  today.getDate() - 7,
);

// componentDidMount() {
//     // this is needed, because InfiniteCalendar forces window scroll
//     window.scrollTo(0, 0);
// };

// function tileContent({ date, view }) {

//     // Add class to tiles in month view only
//     if (view === 'month') {
//       // Check if a date React-Calendar wants to check is on the list of dates to add class to
//       if (datesToAddContentTo.find(dDate => isSameDay(dDate, date))) {
//         return 'My content';
//       }
//     }
//   }

// function isSameDay(a, b) {
//     console.log(a);
//     console.log(b);
//     return differenceInCalendarDays(a, b) === 0;
// }

// function tileContent (date, view) {
//     if(view === 'month' && date.getDay() === 3){
//         console.log("anushka");
//         return 'navigationLabel';
//     }
//   }

function TestDash() {
  const primaryColor = getColor('primary');
  const secondaryColor = getColor('secondary');
  const [value, setValue] = useState(new Date());
  const changeDate = e => {
    setValue(value);
  };
  const { authState } = useContext(AuthContext);

  // const [day, setDay] = useState([]);
  // const da=5;
  var i = 0;

  function tileClassName({ date, view }) {
    // Add class to tiles in month view only
    //datesToAddContentTo&&datesToAddContentTo.map((datesToAddContentTo) =>{
    //     setDay(datesToAddContentTo);
    //});
    // if (view === 'month' && date.getDay() === aaa) {
    //     console.log(date.getDay());
    //     console.log(aaa);
    // // Check if a date React-Calendar wants to check is on the list of dates to add class to
    // //   if (datesToAddContentTo.find(dDate => isSameDay(dDate, date))) {
    // //     return 'navigationLabel';
    // //   }
    //     return 'activityColor';
    // }
  }

  const [dataAnnouncement, setdataAnnouncement] = useState([]);
  const [recentActivities, setrecentActivities] = useState([]);

  const [retrieveLine, setretrieveLine] = useState(null);
  const [creditEarnedLength, setcreditEarnedLength] = useState(null);

  const [retrieveDonut, setretrieveDonut] = useState(null);

  const [retrievePie, setretrievePie] = useState(null);

  const [progressPercentage, setprogressPercentage] = useState(0);

  const [upcomingDate, setupcomingDate] = useState(null);
  const [upcomingDateLength, setupcomingDateLength] = useState(null);

  const [creditsEarned, setcreditsEarned] = useState("");
  const [remainingCredits, setremainingCredits] = useState("");
  const [remainingCreditsPercentage, setremainingCreditsPercentage] = useState("");


  //this year credits earned
  var months = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  for (var i = 0; i < creditEarnedLength; i++) {
    months[retrieveLine[i].month] = retrieveLine[i].credits;
  }

  var day = [];
  upcomingDate && upcomingDate.map(upcomingDate => day.push(upcomingDate.day));

  function tileClassName({ date, view }) {
    for (i = 0; i < upcomingDateLength; i++) {
      if (view === 'month' && date.getDate() === day[i]) {
        // //console.log();
        // //console.log();
        // const x = day[i];
        // const y = date.getDate();
        // if(x<y){
        //   return 'activityColor';
        // }else if(day[i]>date.getDate()){
        return 'activityOverColor';
        // }
      }
    }
  }

  var count = [];

  retrieveDonut &&
    retrieveDonut.map(retrieveDonut => count.push(retrieveDonut.count));

  var category = [];
  var countType = [];

  retrievePie &&
    retrievePie.map(
      retrievePie => (
        category.push(retrievePie.recordCategory),
        countType.push(retrievePie.credits)
      ),
    );

  //credits earned line chart
  const state = {
    labels: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'Octorber',
      'November',
      'December',
    ],
    datasets: [
      {
        label: 'Credits Earned',
        borderColor: '#08186e',
        backgroundColor: '#ddddff',
        data: months,
      },
    ],
  };

  //credits earned line chart
  const state2 = {
    labels: ['Course', 'Guest Lectues', 'Others', 'Workshops'],
    datasets: [
      {
        data: count,
        backgroundColor: ['#1d7e61', '#ec1317', '#ffc107', '#08186e'],
        label: 'Dataset 1',
      },
    ],
  };

  const state3 = {
    labels: category,
    datasets: [
      {
        data: countType,
        backgroundColor: [
          '#D65353',
          '#f7c634',
          '#44c7a0',
          '#2138b5',
          '#CA723D',
          '#5b7536',
          '#5e93ad',
          '#94529c',
          '#b08093',
          '#a3e6a5',
          '#91aebd',
          '#bca3d6',
          '#debdca',
          '#91a19b',
          '#4c87fc',
          '#ed9b68',
        ],
        label: 'Dataset 1',
      },
    ],
  };

  //Announcements
  useEffect(() => {
    axios
      .post('http://localhost:3001/Dash/announcement')
      .then(response => {
        if (response.data.error) {
          console.log(response.data.error);
        } else {
          setdataAnnouncement(response.data);
        }
      })
      .catch(error => {
        alert(error);
      });

    //Recent Activities
    const data = {
      id: authState.id,
    };
    axios
      .post('http://localhost:3001/Dash/recent', data)
      .then(response => {
        if (response.data.error) {
          console.log(response.data.error);
        } else {
          setrecentActivities(response.data);
        }
      })
      .catch(error => {
        alert(error);
      });

    axios
      .post('http://localhost:3001/Dash/creditsearned', data)
      .then(response => {
        if (response.data.error) {
          console.log(response.data.error);
        } else {
          setretrieveLine(response.data);
          setcreditEarnedLength(response.data.length);
        }
      })
      .catch(error => {
        alert(error);
      });

    axios
      .post('http://localhost:3001/Dash/activityType', data)
      .then(response => {
        if (response.data.error) {
          console.log(response.data.error);
        } else {
          setretrieveDonut(response.data);
        }
      })
      .catch(error => {
        alert(error);
      });

    axios
      .post('http://localhost:3001/Dash/activityTypeCredits', data)
      .then(response => {
        if (response.data.error) {
          console.log(response.data.error);
        } else {
          setretrievePie(response.data);
        }
      })
      .catch(error => {
        alert(error);
      });

    axios
      .post('http://localhost:3001/Dash/progressPercentage', data)
      .then(response => {
        if (response.data.error) {
          console.log(response.data.error);
        } else {
          setprogressPercentage(response.data);
        }
      })
      .catch(error => {
        alert(error);
      });

    axios
      .post('http://localhost:3001/Dash/upcoming', data)
      .then(response => {
        if (response.data.error) {
          console.log(response.data.error);
        } else {
          console.log(response.data);
          setupcomingDate(response.data);
          setupcomingDateLength(response.data.length);
        }
      })
      .catch(error => {
        alert(error);
      });

      axios
      .post('http://localhost:3001/Dash/earned', data)
      .then(response => {
        if (response.data.error) {
          console.log(response.data.error);
        } else {
          setcreditsEarned(response.data);
        }
      })
      .catch(error => {
        alert(error);
      });

      axios
      .post('http://localhost:3001/Dash/remaining', data)
      .then(response => {
        if (response.data.error) {
          console.log(response.data.error);
        } else {
          setremainingCredits(response.data);
        }
      })
      .catch(error => {
        alert(error);
      });

      axios
      .post('http://localhost:3001/Dash/remainingPercentage', data)
      .then(response => {
        if (response.data.error) {
          console.log(response.data.error);
        } else {
          setremainingCreditsPercentage(response.data);
        }
      })
      .catch(error => {
        alert(error);
      });

  }, []);

  return (
    <>
      <Page
        className="DashboardPage"
        title="Dashboard"
        breadcrumbs={[{ name: 'Dashboard', active: true }]}
      >
        <Row>
          <Col xs="8">
            <Card className="shadow">
              <CardHeader>
                CPD Activity Progress{' '}
                <small className="text-muted text-capitalize">This year</small>
              </CardHeader>
              <Row className="mt-2 ml-3">
                <Col xs="4">
                  <CardBody>
                    <div style={{ width: 200, height: 240 }}>
                      <CircularProgressbar
                        value={progressPercentage}
                        text={`${progressPercentage}%`}
                        styles={buildStyles({
                          // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                          strokeLinecap: 'butt',

                          // Text size
                          textSize: '16px',

                          // How long animation takes to go from one percentage to another, in seconds
                          pathTransitionDuration: 0.5,

                          // Can specify path transition in more detail, or remove it entirely
                          // pathTransition: 'none',

                          // Colors
                          pathColor: '#08186e',
                          textColor: '#1F2C56',
                          trailColor: '#d6d6d6',
                          backgroundColor: '#3e98c7',
                        })}
                      />
                      <div className="mt-2 text-md-center text-dark">
                        <b>CPD Activity Progress</b>
                      </div>
                    </div>
                  </CardBody>
                </Col>
                <Col xs="8" className="mt-2">
                  <CardBody>
                    <NumberWidget
                      title="Earned Credits"
                      number={creditsEarned}
                      color="success"
                      progress={{
                        value: progressPercentage,
                        label: 'In This Year',
                      }}
                    />
                    <NumberWidget
                      title="Credits Remaining"
                      number={remainingCredits}
                      color="danger"
                      progress={{
                        value: remainingCreditsPercentage,
                        label: 'For This Year',
                      }}
                    />
                  </CardBody>
                </Col>
              </Row>
            </Card>
          </Col>
          <Col xs="4">
            <Card className="shadow">
              <CardHeader className="mt-0 mb-0">Upcoming activities</CardHeader>
              <CardBody className="mt-0 mb-0">
                <Calendar
                  //onChange={onChange}
                  value={value}
                  className="calender"
                  onChange={changeDate}
                  tileClassName={tileClassName}
                  //tileClassName={tileContent}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col xs="8">
            <Card className="shadow">
              <Row className="ml-2">
                <Col xs="6">
                  <CardHeader>
                    Activity Type{' '}
                    <small className="text-muted text-capitalize">
                      Credits Earned
                    </small>
                  </CardHeader>
                  <CardBody>
                    <Doughnut
                      data={state2}
                      options={chartjs.doughnut.options}
                    />
                  </CardBody>
                </Col>

                <Col xs="6">
                  <CardHeader>
                    Type of the category{' '}
                    <small className="text-muted text-capitalize">
                      Credits Earned
                    </small>
                  </CardHeader>
                  <CardBody>
                    <Pie data={state3} options={chartjs.doughnut.options} />
                  </CardBody>
                </Col>
              </Row>
            </Card>
          </Col>
          <Col xs="4">
            <Card className="shadow">
              <CardHeader>
                <div className="d-flex justify-content-between align-items-center">
                  <span>Announcements</span>
                </div>
              </CardHeader>
              <CardBody className="mt-0 mb-0">
                {dataAnnouncement.map(index => {
                  return (
                    <>
                      <CardTitle tag="h5">
                        <b>{index.title}</b>
                      </CardTitle>
                      <CardSubtitle tag="h6" className="mb-2 text-muted">
                        {index.description}
                      </CardSubtitle>
                    </>
                  );
                })}
                <hr />
                <center>
                  <CardLink href="#" className="text-center">
                    View More
                  </CardLink>
                </center>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col xs="8">
            <Card className="shadow">
              <CardHeader>
                Credits Earned{' '}
                <small className="text-muted text-capitalize">This year</small>
              </CardHeader>
              <CardBody>
                <Line data={state} options={chartjs.line.options} />
              </CardBody>
            </Card>
          </Col>
          <Col xs="4">
            <Card className="shadow">
              <CardHeader>
                <div className="d-flex justify-content-between align-items-center">
                  <span>Recent Activities</span>
                </div>
              </CardHeader>
              <CardBody className="mt-0 mb-0">
                {recentActivities.map(index => {
                  return (
                    <>
                      <CardTitle tag="h5">
                        <b>{index.title}</b>
                      </CardTitle>
                      <CardSubtitle tag="h6" className="mb-2 text-muted">
                        {index.description}
                      </CardSubtitle>
                    </>
                  );
                })}
                <hr />
                <center>
                  <CardLink href="#" className="text-center">
                    View More
                  </CardLink>
                </center>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Page>
    </>
  );
}

export default TestDash;
