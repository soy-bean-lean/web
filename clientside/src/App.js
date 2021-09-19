import { STATE_LOGIN, STATE_SIGNUP } from 'components/AuthForm';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from './helpers/AuthContext';

import GAListener from 'components/GAListener';

import { EmptyLayout, LayoutRoute } from 'components/Layout';

import { MainLayout as MainLayoutPro } from 'components/Layout/pro';
import { MainLayout as MainLayoutSec } from 'components/Layout/sec';
import { MainLayout as MainLayoutAdmin } from 'components/Layout/administrator';
import { MainLayout as MainLayoutChartered } from 'components/Layout/chartered';
import { MainLayout as MainLayoutAssosiate } from 'components/Layout/associate';
import { MainLayout as MainLayoutStudent } from 'components/Layout/student';
import { MainLayout as MainLayoutCouncil } from 'components/Layout/council';

import { MainLayout as MainLayoutDefault } from 'components/Layout/default';

import PageSpinner from 'components/PageSpinner';

import Login from 'pages/login/login';
import Registration from 'pages/registration/registration';
import Profile from 'pages/profile/profile';
import memberView from 'pages/registration/profile';
import approveMemberView from 'pages/registration/profileApproval';
import ForgotPassword from 'pages/forgotPassword/forgotPassword';
import ResetPassword from 'pages/forgotPassword/resetPassword';
import TestDash from 'pages/TestDash';

import AuthPage from 'pages/AuthPage';
import componentQueries from 'react-component-queries';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import './styles/reduction.scss';
import './main.css';

//login and registration

//dashboards
const DashboardPagePro = React.lazy(() =>
  import('pages/dashboards/DashboardPagePro'),
);
const DashboardPageAss = React.lazy(() =>
  import('pages/dashboards/DashboardPageAss'),
);
const DashboardPageCha = React.lazy(() =>
  import('pages/dashboards/DashboardPageCha'),
);
const DashboardPageCou = React.lazy(() =>
  import('pages/dashboards/DashboardPageCou'),
);
const DashboardPageSec = React.lazy(() =>
  import('pages/dashboards/DashboardPageSec'),
);
const DashboardPageStu = React.lazy(() =>
  import('pages/dashboards/DashboardPageStu'),
);

// const DashboardPageAdmin = React.lazy(() =>  import('pages/dashboards/DashboardPage'),);

//cpd
const cpdRecords = React.lazy(() => import('pages/cpd/CPD'));
const AddCPD = React.lazy(() => import('pages/cpd/addCPD'));

//courses
const csslCourses = React.lazy(() => import('pages/courses/Courses'));
const AddCourse = React.lazy(() => import('pages/courses/BasicCourseDetails'));
const lecCourseView = React.lazy(() =>
  import('pages/courses/LecturingCourses'),
);
const lecturerCourseView = React.lazy(() =>
  import('pages/courses/LecturerCourseView'),
);
const courseView = React.lazy(() => import('pages/courses/CourseView'));
const addCourseContent = React.lazy(() =>
  import('pages/courses/AddCourseContent'),
);
const editCourse = React.lazy(() => import('pages/courses/EditCourseDetails'));
const editCourseContent = React.lazy(() =>
  import('pages/courses/EditCourseContent'),
);
const enrolledCourseView = React.lazy(() =>
  import('pages/courses/EnrolledCourseView'),
);
const courseContentView = React.lazy(() =>
  import('pages/courses/CourseContentView'),
);

//workshops
const Workshop = React.lazy(() => import('pages/workshop/Workshop'));
const AddWorkshop = React.lazy(() => import('pages/workshop/AddWorkshop'));

//blogs
const Blogs = React.lazy(() => import('pages/blogs/Blogs'));
const AddBlogs = React.lazy(() => import('pages/blogs/AddBlogs'));
const BlogView = React.lazy(() => import('pages/blogs/BlogView'));
const EditView = React.lazy(() => import('pages/blogs/EditBlog'));

//forum

//jobs

const AddJobVaccencies = React.lazy(() =>
  import('pages/jobs/addJobVaccencies'),
);
const ManageJobs = React.lazy(() => import('pages/jobs/ManageJobs'));
const editQuestions = React.lazy(() => import('pages/jobs/editJobQuestions'));
const JobsPro = React.lazy(() => import('pages/jobs/Jobs'));
const JobView = React.lazy(() => import('pages/jobs/Job View'));
const AddJobCV = React.lazy(() => import('pages/jobs/addJobCv'));
const Questionare = React.lazy(() => import('pages/jobs/Questionare'));
const addJobQuestions = React.lazy(() => import('pages/jobs/addJobQuestions'));
const jobApplications = React.lazy(() => import('pages/jobs/JobApplications'));
const sendCV = React.lazy(() => import('pages/jobs/sendCV'));
const editJobVaccencies = React.lazy(() =>
  import('pages/jobs/editJobVaccencies'),
);

//reports
const Reports = React.lazy(() => import('pages/reports/Reports'));

//registration
const MemberVerification = React.lazy(() => import('pages/registration/registrationVerification'));
const MemberApproval = React.lazy(() => import('pages/registration/registrationApproval'));

//profile

//pro
const AlertPagePro = React.lazy(() => import('pages/proffesional/AlertPage'));
const AuthModalPagePro = React.lazy(() =>
  import('pages/proffesional/AuthModalPage'),
);
const BadgePagePro = React.lazy(() => import('pages/proffesional/BadgePage'));
const ButtonGroupPagePro = React.lazy(() =>
  import('pages/proffesional/ButtonGroupPage'),
);
const ButtonPagePro = React.lazy(() => import('pages/proffesional/ButtonPage'));
const CardPagePro = React.lazy(() => import('pages/proffesional/CardPage'));

const ChartPagePro = React.lazy(() => import('pages/proffesional/ChartPage'));
const DropdownPagePro = React.lazy(() =>
  import('pages/proffesional/DropdownPage'),
);
const FormPagePro = React.lazy(() => import('pages/proffesional/FormPage'));
const InputGroupPagePro = React.lazy(() =>
  import('pages/proffesional/InputGroupPage'),
);
const ModalPagePro = React.lazy(() => import('pages/proffesional/ModalPage'));
const ProgressPagePro = React.lazy(() =>
  import('pages/proffesional/ProgressPage'),
);

const TypographyPagePro = React.lazy(() =>
  import('pages/proffesional/TypographyPage'),
);
const WidgetPagePro = React.lazy(() => import('pages/proffesional/WidgetPage'));

//sec

const DashboardPageProSec = React.lazy(() => import('pages/sec/DashboardPage'));

const JobsSec = React.lazy(() => import('pages/sec/Jobs'));

const getBasename = () => {
  return `/${process.env.PUBLIC_URL.split('/').pop()}`;
};
const user = '';

// class App extends React.Component {
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

const AlertPage = React.lazy(() => import('pages/AlertPage'));
const AuthModalPage = React.lazy(() => import('pages/AuthModalPage'));
const BadgePage = React.lazy(() => import('pages/BadgePage'));
const ButtonGroupPage = React.lazy(() => import('pages/ButtonGroupPage'));
const ButtonPage = React.lazy(() => import('pages/ButtonPage'));
const CardPage = React.lazy(() => import('pages/CardPage'));
const ChartPage = React.lazy(() => import('pages/ChartPage'));
const DashboardPage = React.lazy(() => import('pages/DashboardPage'));
const DropdownPage = React.lazy(() => import('pages/DropdownPage'));
const FormPage = React.lazy(() => import('pages/FormPage'));
const InputGroupPage = React.lazy(() => import('pages/InputGroupPage'));
const ModalPage = React.lazy(() => import('pages/ModalPage'));
const ProgressPage = React.lazy(() => import('pages/ProgressPage'));
const TablePage = React.lazy(() => import('pages/TablePage'));
const TypographyPage = React.lazy(() => import('pages/TypographyPage'));
const WidgetPage = React.lazy(() => import('pages/WidgetPage'));

function App(props) {
  const [authState, setAuthState] = useState({
    fname: '',
    lname: '',
    role: '',
    id: 0,
    profileImage: '',
    email: '',
    status: false,
    memberId: '',
  });

  useEffect(() => {
    axios
      .get('http://localhost:3001/auth/auth', {
        headers: {
          accessToken: localStorage.getItem('accessToken'),
        },
      })
      .then(response => {
        if (response.data.error) {
          setAuthState({ ...authState, status: false });
        } else {
          console.log(response.data);
          setAuthState({
            fname: response.data.firstName,
            lname: response.data.lastName,
            role: response.data.role,
            id: response.data.id,
            profileImage: response.data.profileImage,
            email: response.data.email,
            memberId: response.data.memberId,
            status: true,
          });
        }
      });
  }, []);

  return (
    <AuthContext.Provider value={{ authState, setAuthState }}>
      <>
        <BrowserRouter basename={getBasename()}>
          <GAListener>
            <Switch>
              {!authState.status && (
                <>
                  <Route exact path="/" exact component={Login} />
                  <Route path="/registration" component={Registration} />
                  <Route path="/forgotpassword" component={ForgotPassword} />
                  <Route path="/reset/:token" component={ResetPassword} />
                </>
              )}

              {/*Professional Role Related Routes*/}
              {authState.role == 'professional' && (
                <MainLayoutPro breakpoint={props.breakpoint}>
                  <React.Suspense fallback={<PageSpinner />}>
                    {/*Dashboard Route*/}
                    <Route
                      exact
                      path="/dashboard"
                      component={DashboardPagePro}
                    />
                    {/* <Route  path="/" component={DashboardPagePro} /> */}
                    {/*Course Related Routes*/}
                    <Route exact path="/lecCourse" component={lecCourseView} />
                    <Route exact path="/csslcourses" component={csslCourses} />
                    <Route
                      exact
                      path="/csslcourse/addnewcourse"
                      component={AddCourse}
                    />
                    <Route
                      exact
                      path="/courseView/cssl00:id/:title"
                      component={lecturerCourseView}
                    />
                    <Route
                      exact
                      path="/csslcourse/addCourseContent/cssl00:id/:title"
                      component={addCourseContent}
                    />
                    <Route
                      exact
                      path="/csslcourse/editCourse/cssl00:id/:title"
                      component={editCourse}
                    />
                    <Route
                      exact
                      path="/csslcourse/editCourseContent/cssl00:id/:title/:cntId/:cntTitle"
                      component={editCourseContent}
                    />
                    <Route
                      exact
                      path="/csslcourse/enrolledcourse/cssl00:id/:title"
                      component={enrolledCourseView}
                    />
                    <Route
                      exact
                      path="/csslcourse/enrolledcourse/cssl00:id/:title/accesscontent/:cntId/:title"
                      component={courseContentView}
                    />
                    {/*CPD Related Routes*/}
                    <Route
                      exact
                      path="/csslmember/cpdrecords"
                      component={cpdRecords}
                    />
                    <Route
                      exact
                      path="/csslmember/cpdrecords/addcpdrecord"
                      component={AddCPD}
                    />
                    {/*Blog Related Routes*/}
                    <Route exact path="/blogs" component={Blogs} />
                    <Route exact path="/addBlogs" component={AddBlogs} />
                    <Route
                      exact
                      path="/blogview/cssl00:id/:title"
                      component={BlogView}
                    />
                     <Route
                      exact
                      path="/editview/cssl00:id/:title"
                      component={EditView}
                    />
                    <Route
                      exact
                      path="/csslcourses/courseview/cssl00:id/:title"
                      component={courseView}
                    />
                    {/*Workshop Related Routes*/}
                    <Route exact path="/csslworkshops" component={Login} />{' '}
                    {/* need to change component */}
                    {/*Forum Related Routes*/}
                    <Route exact path="/forum" component={Login} />{' '}
                    {/* need to change component */}
                    {/*Job Vacancies Related Routes*/}
                    <Route
                      exact
                      path="/jobadvertisements"
                      component={JobsPro}
                    />
                    <Route
                      exact
                      path="/jobAddvertisment/:id"
                      component={JobView}
                    />
                    <Route
                      exact
                      path="/questionare/:id"
                      component={Questionare}
                    />
                    <Route
                      exact
                      path="/addJobCV/:id:finalMarks"
                      component={AddJobCV}
                    />
                    <Route path="/badges" component={BadgePagePro} />
                    <Route
                      path="/buttongroups"
                      component={ButtonGroupPagePro}
                    />
                    <Route path="/profile" component={Profile} />
                    <Route path="/login-modal" component={AuthModalPagePro} />
                    <Route path="/buttons" component={ButtonPagePro} />
                    <Route path="/cards" component={CardPagePro} />
                    <Route path="/widgets" component={WidgetPagePro} />
                    <Route path="/typography" component={TypographyPagePro} />
                    <Route path="/alerts" component={AlertPagePro} />
                    <Route path="/dropdowns" component={DropdownPagePro} />
                    <Route path="/progress" component={ProgressPagePro} />
                    <Route path="/modals" component={ModalPagePro} />
                    <Route path="/forms" component={FormPagePro} />
                    <Route path="/input-groups" component={InputGroupPagePro} />
                    <Route path="/charts" component={ChartPagePro} />
                  </React.Suspense>
                </MainLayoutPro>
              )}

              {/*Council Role Related Routes*/}
              {authState.role == 'council' && (
                <MainLayoutCouncil breakpoint={props.breakpoint}>
                  <React.Suspense fallback={<PageSpinner />}>
                    <Route path="/profile" component={Profile} />
                    {/*Dashboard Related Route*/}
                    <Route
                      exact
                      path="/dashboard"
                      component={DashboardPageCou}
                    />
                    {/*User Verification Related Routes*/}
                    <Route path="/managemembers" component={MemberApproval} />{' '}
                    <Route path="/memberView/:id" component={approveMemberView} />{' '}
                    {/* need to change component */}
                    <Route
                      path="/managemembers/user00:id"
                      component={Login}
                    />{' '}
                    {/* need to change component */}
                    {/*Course Related Routes*/}
                    <Route
                      path="/courseapproval/csslcourses"
                      component={Login}
                    />{' '}
                    {/* need to change component */}
                    <Route
                      path="/courseapproval/csslcourses/cssl00:id/:title"
                      component={Login}
                    />{' '}
                    {/* need to change component */}
                    <Route
                      path="/courseapproval/csslcourses/cssl00:id/:title/:cntId/:cntTitle"
                      component={Login}
                    />{' '}
                    {/* need to change component */}
                    {/*CPD Related Routes*/}
                    <Route
                      path="/cpdapproval/cpdrecords"
                      component={Login}
                    />{' '}
                    {/* need to change component */}
                    <Route
                      path="/cpdapproval/cpdrecords/record00:id/:title"
                      component={Login}
                    />{' '}
                    {/* need to change component */}
                    {/*Blog Related Routes*/}
                    <Route path="/reviewblogs" component={Login} />{' '}
                    {/* need to change component */}
                    <Route
                      path="/reviewblogs/blog00:id"
                      component={Login}
                    />{' '}
                    {/* need to change component */}
                    {/*Blog Related Routes*/}
                    <Route
                      path="/jobapplications"
                      component={jobApplications}
                    />
                    <Route path="/sendcv/:id" component={sendCV} />
                    <Route
                      path="/csslmember/cpdrecords/addcpdrecord"
                      component={AddCPD}
                    />

<Route path="/workshop" component={Workshop} />
<Route exact path="/addWorkshop" component={AddWorkshop} />
                    <Route path="/jobAddvertisment/:id" component={JobView} />
                    <Route path="/badges" component={BadgePagePro} />
                    <Route
                      path="/buttongroups"
                      component={ButtonGroupPagePro}
                    />
                    <Route path="/login-modal" component={AuthModalPagePro} />
                    <Route path="/buttons" component={ButtonPagePro} />
                    <Route path="/cards" component={CardPagePro} />
                    <Route path="/widgets" component={WidgetPagePro} />
                    <Route path="/typography" component={TypographyPagePro} />
                    <Route path="/alerts" component={AlertPagePro} />
                    <Route path="/dropdowns" component={DropdownPagePro} />
                    <Route path="/progress" component={ProgressPagePro} />
                    <Route path="/modals" component={ModalPagePro} />
                    <Route path="/forms" component={FormPagePro} />
                    <Route path="/input-groups" component={InputGroupPagePro} />
                    <Route path="/charts" component={ChartPagePro} />
                  </React.Suspense>
                </MainLayoutCouncil>
              )}

              {/*Secretariat Role Related Routes*/}
              {authState.role == 'secretariat' && (
                <MainLayoutSec breakpoint={props.breakpoint}>
                  <Route path="/profile" component={Profile} />
                  <React.Suspense fallback={<PageSpinner />}>
                    {/*Dashboard Related Route*/}
                    <Route
                      exact
                      path="/dashboard"
                      component={DashboardPageSec}
                    />
                    {/*User Verification Related Routes*/}
                    <Route path="/verifyuser" component={MemberVerification} />
                    <Route path="/memberView/:id" component={memberView} />{' '}

                    {/* need to change component */}
                    <Route
                      path="/verifyuser/user00:id"
                      component={Login}
                    />{' '}
                    {/* need to change component */}
                    {/*Job Related Routes*/}
                    <Route exact path="/managejobs" component={ManageJobs} />
                    <Route
                      exact
                      path="/addJobVaccencies"
                      component={AddJobVaccencies}
                    />
                    <Route exact path="/job" component={JobsPro} />
                    <Route
                      exact
                      path="/jobAddvertisment/:id"
                      component={JobView}
                    />
                    <Route
                      path="/editQuestions/:id"
                      component={editQuestions}
                    />
                    <Route
                      exact
                      path="/addJobQuestions"
                      component={addJobQuestions}
                    />
                    <Route
                      exact
                      path="/editjobvaccencies/:id"
                      component={editJobVaccencies}
                    />
                    {/*Workshop Related Routes*/}
                    <Route
                      exact
                      path="/manageworksops"
                      component={Login}
                    />{' '}
                    {/* need to change component */}
                    <Route
                      exact
                      path="/reports"
                      component={Reports}
                    />{' '}
                    {/* need to change component */}
                    <Route
                      exact
                      path="/csslworkshops/editworkshop/cssl:id/:name"
                      component={Login}
                    />{' '}
                    {/* need to change component */}
                    <Route path="/badges" component={BadgePagePro} />
                    <Route
                      path="/buttongroups"
                      component={ButtonGroupPagePro}
                    />
                    <Route path="/login-modal" component={AuthModalPagePro} />
                    <Route path="/buttons" component={ButtonPagePro} />
                    <Route path="/cards" component={CardPagePro} />
                    <Route path="/widgets" component={WidgetPagePro} />
                    <Route path="/typography" component={TypographyPagePro} />
                    <Route path="/alerts" component={AlertPagePro} />
                    <Route path="/dropdowns" component={DropdownPagePro} />
                    <Route path="/progress" component={ProgressPagePro} />
                    <Route path="/modals" component={ModalPagePro} />
                    <Route path="/forms" component={FormPagePro} />
                    <Route path="/input-groups" component={InputGroupPagePro} />
                    <Route path="/charts" component={ChartPagePro} />
                  </React.Suspense>
                </MainLayoutSec>
              )}

              {/*Associate Role Related Routes*/}
              {authState.role == 'associate' && (
                <MainLayoutAssosiate breakpoint={props.breakpoint}>
                  <Route path="/profile" component={Profile} />
                  <React.Suspense fallback={<PageSpinner />}>
                    {/*Dashboard Related Route*/}
                    <Route
                      exact
                      path="/dashboard"
                      component={DashboardPageAss}
                    />
                    {/*Course Related Routes*/}
                    <Route exact path="/csslcourses" component={csslCourses} />
                    <Route
                      exact
                      path="/csslcourses/courseview/cssl00:id/:title"
                      component={courseView}
                    />
                    <Route
                      exact
                      path="/csslcourse/enrolledcourse/cssl00:id/:title"
                      component={enrolledCourseView}
                    />
                    <Route
                      exact
                      path="/csslcourse/enrolledcourse/cssl00:id/:title/accesscontent/:cntId/:title"
                      component={courseContentView}
                    />
                    {/*Blog Related Routes*/}
                    <Route exact path="/blogs" component={Blogs} />
                    <Route exact path="/addBlogs" component={AddBlogs} />
                    <Route
                      exact
                      path="/blogview/cssl00:id/:title"
                      component={BlogView}
                    />
                    <Route
                      exact
                      path="/editview/cssl00:id/:title"
                      component={EditView}
                    />
                    {/*Workshop Related Routes*/}
                    <Route exact path="/csslworkshops" component={Login} />{' '}
                    {/* need to change component */}
                    {/*Forum Related Routes*/}
                    <Route exact path="/forum" component={Login} />{' '}
                    {/* need to change component */}
                    {/*Job Vacancies Related Routes*/}
                    <Route
                      exact
                      path="/jobadvertisements"
                      component={JobsPro}
                    />
                    <Route
                      exact
                      path="/jobAddvertisment/:id"
                      component={JobView}
                    />
                    <Route
                      exact
                      path="/questionare/:id"
                      component={Questionare}
                    />
                    <Route
                      exact
                      path="/addJobCV/:id:finalMarks"
                      component={AddJobCV}
                    />
                    <Route path="/badges" component={BadgePagePro} />
                    <Route
                      path="/buttongroups"
                      component={ButtonGroupPagePro}
                    />
                    <Route path="/login-modal" component={AuthModalPagePro} />
                    <Route path="/buttons" component={ButtonPagePro} />
                    <Route path="/cards" component={CardPagePro} />
                    <Route path="/widgets" component={WidgetPagePro} />
                    <Route path="/typography" component={TypographyPagePro} />
                    <Route path="/alerts" component={AlertPagePro} />
                    <Route path="/dropdowns" component={DropdownPagePro} />
                    <Route path="/progress" component={ProgressPagePro} />
                    <Route path="/modals" component={ModalPagePro} />
                    <Route path="/forms" component={FormPagePro} />
                    <Route path="/input-groups" component={InputGroupPagePro} />
                    <Route path="/charts" component={ChartPagePro} />
                  </React.Suspense>
                </MainLayoutAssosiate>
              )}

              {/*Chartered Role Related Routes*/}
              {authState.role == 'chartered' && (
                <MainLayoutChartered breakpoint={props.breakpoint}>
                  <React.Suspense fallback={<PageSpinner />}>
                    {/*Dashboard Related Route*/}
                    <Route
                      exact
                      path="/dashboard"
                      component={DashboardPageCha}
                    />
                    {/*Course Related Routes*/}
                    <Route exact path="/lecCourse" component={lecCourseView} />
                    <Route exact path="/csslcourses" component={csslCourses} />
                    <Route
                      exact
                      path="/csslcourses/courseview/cssl00:id/:title"
                      component={courseView}
                    />
                    <Route
                      exact
                      path="/csslcourse/addnewcourse"
                      component={AddCourse}
                    />
                    <Route
                      exact
                      path="/csslcourse/addCourseContent/cssl00:id/:title"
                      component={addCourseContent}
                    />
                    <Route
                      exact
                      path="/csslcourse/editCourse/cssl00:id/:title"
                      component={editCourse}
                    />
                    <Route
                      exact
                      path="/csslcourse/editCourseContent/cssl00:id/:title/:cntId/:cntTitle"
                      component={editCourseContent}
                    />
                    <Route
                      exact
                      path="/csslcourse/enrolledcourse/cssl00:id/:title"
                      component={enrolledCourseView}
                    />
                    <Route
                      exact
                      path="/csslcourse/enrolledcourse/cssl00:id/:title/accesscontent/:cntId/:title"
                      component={courseContentView}
                    />
                    {/*CPD Related Routes*/}
                    <Route
                      exact
                      path="/csslmember/cpdrecords"
                      component={cpdRecords}
                    />
                    <Route
                      exact
                      path="/csslmember/cpdrecords/addcpdrecord"
                      component={AddCPD}
                    />
                    {/*Blog Related Routes*/}
                    <Route exact path="/blogs" component={Blogs} />
                    <Route exact path="/addBlogs" component={AddBlogs} />
                    <Route
                      exact
                      path="/blogview/cssl00:id/:title"
                      component={BlogView}
                    />
                    <Route
                      exact
                      path="/editview/cssl00:id/:title"
                      component={EditView}
                    />
                    {/*Workshop Related Routes*/}
                    <Route exact path="/csslworkshops" component={Login} />{' '}
                    {/* need to change component */}
                    {/*Forum Related Routes*/}
                    <Route exact path="/forum" component={Login} />{' '}
                    {/* need to change component */}
                    {/*Job Vacancies Related Routes*/}
                    <Route
                      exact
                      path="/jobadvertisements"
                      component={JobsPro}
                    />
                    <Route
                      exact
                      path="/jobAddvertisment/:id"
                      component={JobView}
                    />
                    <Route
                      exact
                      path="/questionare/:id"
                      component={Questionare}
                    />
                    <Route
                      exact
                      path="/addJobCV/:id:finalMarks"
                      component={AddJobCV}
                    />
                    <Route path="/badges" component={BadgePagePro} />
                    <Route
                      path="/buttongroups"
                      component={ButtonGroupPagePro}
                    />
                    <Route path="/login-modal" component={AuthModalPagePro} />
                    <Route path="/buttons" component={ButtonPagePro} />
                    <Route path="/cards" component={CardPagePro} />
                    <Route path="/widgets" component={WidgetPagePro} />
                    <Route path="/typography" component={TypographyPagePro} />
                    <Route path="/alerts" component={AlertPagePro} />
                    <Route path="/dropdowns" component={DropdownPagePro} />
                    <Route path="/progress" component={ProgressPagePro} />
                    <Route path="/modals" component={ModalPagePro} />
                    <Route path="/forms" component={FormPagePro} />
                    <Route path="/input-groups" component={InputGroupPagePro} />
                    <Route path="/charts" component={ChartPagePro} />
                  </React.Suspense>
                </MainLayoutChartered>
              )}

              {/*Student Role Related Routes*/}
              {authState.role == 'student' && (
                <MainLayoutStudent breakpoint={props.breakpoint}>
                  <Route path="/profile" component={Profile} />
                  <React.Suspense fallback={<PageSpinner />}>
                    {/*Dashboard Related Route*/}
                    <Route
                      exact
                      path="/dashboard"
                      component={DashboardPageStu}
                    />
                    {/*Course Related Routes*/}
                    <Route exact path="/csslcourses" component={csslCourses} />
                    <Route
                      exact
                      path="/csslcourses/courseview/cssl00:id/:title"
                      component={courseView}
                    />
                    <Route
                      exact
                      path="/csslcourse/enrolledcourse/cssl00:id/:title"
                      component={enrolledCourseView}
                    />
                    <Route
                      exact
                      path="/csslcourse/enrolledcourse/cssl00:id/:title/accesscontent/:cntId/:title"
                      component={courseContentView}
                    />
                    {/*Blog Related Routes*/}
                    <Route exact path="/blogs" component={Blogs} />
                    <Route exact path="/addBlogs" component={AddBlogs} />
                    <Route
                      exact
                      path="/blogview/cssl00:id/:title"
                      component={BlogView}
                    />
                    <Route
                      exact
                      path="/editview/cssl00:id/:title"
                      component={EditView}
                    />
                    {/*Workshop Related Routes*/}
                    <Route exact path="/csslworkshops" component={Login} />{' '}
                    {/* need to change component */}
                    {/*Forum Related Routes*/}
                    <Route exact path="/forum" component={Login} />{' '}
                    {/* need to change component */}
                    {/*Job Vacancies Related Routes*/}
                    <Route
                      exact
                      path="/jobadvertisements"
                      component={JobsPro}
                    />
                    <Route
                      exact
                      path="/jobAddvertisment/:id"
                      component={JobView}
                    />
                    <Route
                      exact
                      path="/questionare/:id"
                      component={Questionare}
                    />
                    <Route
                      exact
                      path="/addJobCV/:id:finalMarks"
                      component={AddJobCV}
                    />
                    <Route path="/badges" component={BadgePagePro} />
                    <Route
                      path="/buttongroups"
                      component={ButtonGroupPagePro}
                    />
                    <Route path="/login-modal" component={AuthModalPagePro} />
                    <Route path="/buttons" component={ButtonPagePro} />
                    <Route path="/cards" component={CardPagePro} />
                    <Route path="/widgets" component={WidgetPagePro} />
                    <Route path="/typography" component={TypographyPagePro} />
                    <Route path="/alerts" component={AlertPagePro} />
                    <Route path="/dropdowns" component={DropdownPagePro} />
                    <Route path="/progress" component={ProgressPagePro} />
                    <Route path="/modals" component={ModalPagePro} />
                    <Route path="/forms" component={FormPagePro} />
                    <Route path="/input-groups" component={InputGroupPagePro} />
                    <Route path="/charts" component={ChartPagePro} />
                  </React.Suspense>
                </MainLayoutStudent>
              )}

             { authState.role == 'student' && (
                <MainLayoutStudent breakpoint={props.breakpoint}>
                  <React.Suspense fallback={<PageSpinner />}>
                    <Route
                      exact
                      path="/dashboard"
                      component={DashboardPageStu}
                    />
                    
                    <Route path="/lecCourse" component={lecCourseView} />
                    <Route path="/csslcourses" component={csslCourses} />
                    <Route path="/login-modal" component={AuthModalPagePro} />
                    <Route path="/buttons" component={ButtonPagePro} />
                    <Route path="/cards" component={CardPagePro} />
                    <Route path="/blogs" component={Blogs} />
                    <Route path="/widgets" component={WidgetPagePro} />
                    <Route path="/typography" component={TypographyPagePro} />
                    <Route path="/alerts" component={AlertPagePro} />

                    <Route path="/job" component={JobsPro} />
                    <Route path="/csslmember/cpdrecords/addcpdrecord" component={AddCPD} />
                    <Route path="/jobAddvertisment/:id" component={JobView} />

                    <Route path="/badges" component={BadgePagePro} />
                    <Route
                      path="/buttongroups"
                      component={ButtonGroupPagePro}
                    />
                    <Route path="/dropdowns" component={DropdownPagePro} />
                    <Route path="/progress" component={ProgressPagePro} />
                    <Route path="/modals" component={ModalPagePro} />
                    <Route path="/forms" component={FormPagePro} />
                    <Route path="/input-groups" component={InputGroupPagePro} />
                    <Route path="/charts" component={ChartPagePro} />
                  </React.Suspense>
                </MainLayoutStudent>
             )}
              {authState.role == 'ddd' && (
                <MainLayoutDefault breakpoint={props.breakpoint}>
                  <React.Suspense fallback={<PageSpinner />}>
                    <Route exact path="/" component={DashboardPage} />
                    <Route
                      exact
                      path="/login-modal"
                      component={AuthModalPage}
                    />
                    <Route exact path="/buttons" component={ButtonPage} />
                    <Route exact path="/testdash" component={TestDash} />
                    <Route exact path="/cards" component={CardPage} />
                    <Route exact path="/widgets" component={WidgetPage} />
                    <Route
                      exact
                      path="/typography"
                      component={TypographyPage}
                    />
                    <Route exact path="/alerts" component={AlertPage} />
                    <Route exact path="/tables" component={TablePage} />
                    <Route exact path="/badges" component={BadgePage} />
                    <Route
                      exact
                      path="/button-groups"
                      component={ButtonGroupPage}
                    />
                    <Route exact path="/dropdowns" component={DropdownPage} />
                    <Route exact path="/progress" component={ProgressPage} />
                    <Route exact path="/modals" component={ModalPage} />
                    <Route exact path="/forms" component={FormPage} />
                    <Route
                      exact
                      path="/input-groups"
                      component={InputGroupPage}
                    />
                    <Route exact path="/charts" component={ChartPage} />
                  </React.Suspense>
                </MainLayoutDefault>
              )}

              {/* proffesional members data */}
              {/* chartered members data */}

              {/* council members data */}
              {/* sectraty members data */}

              {/* student members data */}
              {/* assosiate members data */}

              {/* admin members data */}

              <Redirect to="/" />
            </Switch>
          </GAListener>
        </BrowserRouter>
      </>
    </AuthContext.Provider>
  );
}

const query = ({ width }) => {
  if (width < 575) {
    return { breakpoint: 'xs' };
  }

  if (576 < width && width < 767) {
    return { breakpoint: 'sm' };
  }

  if (768 < width && width < 991) {
    return { breakpoint: 'md' };
  }

  if (992 < width && width < 1199) {
    return { breakpoint: 'lg' };
  }

  if (width > 1200) {
    return { breakpoint: 'xl' };
  }

  return { breakpoint: 'xs' };
};

export default componentQueries(query)(App);
