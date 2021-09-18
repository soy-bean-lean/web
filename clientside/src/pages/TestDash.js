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
  const percentage = 66;
  const [value, setValue] = useState(new Date());
  const changeDate = e => {
    setValue(value);
  };
  const { authState } = useContext(AuthContext);


  const datesToAddContentTo = [5, 6];

  // const [day, setDay] = useState([]);
  // const da=5;
  var i = 0;

  function tileClassName({ date, view }) {
    // Add class to tiles in month view only
    //datesToAddContentTo&&datesToAddContentTo.map((datesToAddContentTo) =>{
    //     setDay(datesToAddContentTo);
    for (i = 0; i < datesToAddContentTo.length; i++) {
      if (view === 'month' && date.getDay() === datesToAddContentTo[i]) {
        return 'activityColor';
      }
    }
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

  const [dataDoughnut, setdataDoughnut] = useState({});
  const [dataPie, setdataPie] = useState({});
  const [dataLine, setdataLine] = useState({});
  const [dataAnnouncement, setdataAnnouncement] = useState([]);
  const [recentActivities, setrecentActivities] = useState([]);
  const [retrieveLine, setretrieveLine] = useState([]);

  

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
  }, []);

  //Recent Activities
  useEffect(() => {
    const data = {
      id: authState.id,
    };
    axios
      .post('http://localhost:3001/Dash/recent',data)
      .then(response => {
        if (response.data.error) {
          console.log(response.data.error);
        } else {
          console.log(response.data.title);
          setrecentActivities(response.data);
        }
      })
      .catch(error => {
        alert(error);
      });
  }, []);

//line
  useEffect(() => {
    const data = {
      id: authState.id,
    };
    axios
      .post('http://localhost:3001/Dash/cpdactivities',data)
      .then(response => {
        if (response.data.error) {
          console.log(response.data.error);
        } else {
          setretrieveLine(response.data)
          setdataLine({
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
                label: 'CPD Activities Completed this year',
                borderColor: '#08186e',
                backgroundColor: '#08186e',
                data: data,
              },
            ],
          });
          //setrecentActivities(response.data);
        }
      })
      .catch(error => {
        alert(error);
      });
  }, []);

  useEffect(() => {
    setdataDoughnut({
      labels: ['Course', 'Workshops', 'Guest Lectues', 'Others'],
      datasets: [
        {
          data: [20, 30, 50, 60],
          backgroundColor: ['#1d7e61', '#ec1317', '#ffc107', '#08186e'],
          label: 'Dataset 1',
        },
      ],
    });
  }, []);

  useEffect(() => {
    setdataPie({
      labels: ['SE', 'Data Analytics', 'Java', 'Python', 'C#', 'C++'],
      datasets: [
        {
          data: [2, 5, 7, 4, 5, 6],
          backgroundColor: [
            '#fa5256',
            '#f7c634',
            '#44c7a0',
            '#2138b5',
            '#7a3738',
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
                CPD Activities{' '}
                <small className="text-muted text-capitalize">This year</small>
              </CardHeader>
              <Row className="mt-2 ml-3">
                <Col xs="4">
                  <CardBody>
                    <div style={{ width: 200, height: 240 }}>
                      <CircularProgressbar
                        value={percentage}
                        text={`${percentage}%`}
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
                        <b>CPD Activity progress</b>
                      </div>
                    </div>
                  </CardBody>
                </Col>
                <Col xs="8" className="mt-2">
                  <CardBody>
                    <NumberWidget
                      title="CPD Progress of In-Progress Activities"
                      number="12"
                      color="danger"
                      progress={{
                        value: 25,
                        label: 'This year',
                      }}
                    />
                    <NumberWidget
                      title="CPD Progress of Completed Activities"
                      number="12"
                      color="success"
                      progress={{
                        value: 70,
                        label: 'This year',
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
                    CPD Activity Type{' '}
                    <small className="text-muted text-capitalize">
                      This year
                    </small>
                  </CardHeader>
                  <CardBody>
                    <Doughnut
                      data={dataDoughnut}
                      options={chartjs.doughnut.options}
                    />
                  </CardBody>
                </Col>

                <Col xs="6">
                  <CardHeader>
                    Activity Category{' '}
                    <small className="text-muted text-capitalize">
                      This year
                    </small>
                  </CardHeader>
                  <CardBody>
                    <Pie data={dataPie} options={chartjs.doughnut.options} />
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
                  )
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
                <Line data={dataLine} options={chartjs.line.options} />
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
                  )
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
