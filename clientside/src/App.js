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
import Registration from 'pages/login/login';

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

const AddCPD = React.lazy(() => import('pages/cpd/addCPD'));

//courses
// const CoursePro = React.lazy(() => import('pages/courses/Courses'));
const CoursePro = React.lazy(() => import('pages/jobs/ManageJobs'));
const AddCourse = React.lazy(() => import('pages/courses/BasicCourseDetails'));
const lecCoursePro = React.lazy(() =>
  import('pages/courses/Lecturing Cources'),
);

//workshops

//blogs

const Blogs = React.lazy(() => import('pages/blogs/Blogs'));

//forum

//jobs

const AddJobVaccencies = React.lazy(() =>
  import('pages/jobs/addJobVaccencies'),
);
const ManageJobs = React.lazy(() => import('pages/jobs/ManageJobs'));
const JobsPro = React.lazy(() => import('pages/jobs/Jobs'));
const JobView = React.lazy(() => import('pages/jobs/Job View'));
const AddJobCV = React.lazy(() => import('pages/jobs/addJobCv'));
const Questionare = React.lazy(() => import('pages/jobs/Questionare'));

//reports

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

const CPDPro = React.lazy(() => import('pages/cpd/CPD'));

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

function App(props) {
  const [authState, setAuthState] = useState({
    fname: '',
    lname: '',
    role: '',
    id: 0,
    profileImage: '',
    status: false,
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
          setAuthState({
            fname: response.data.firstName,
            lname: response.data.lastName,
            role: response.data.role,
            id: response.data.id,
            profileImage: response.data.profileImage,
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
                  <Route path="/" exact component={Login} />
                  <Route path="/registration" component={Registration} />
                </>
              )}

              {/* proffesional members data */}
              {authState.role == 'professional' && (
                <MainLayoutPro breakpoint={props.breakpoint}>
                  <React.Suspense fallback={<PageSpinner />}>
                    <Route
                      exact
                      path="/dashboard"
                      component={DashboardPagePro}
                    />
                    {/* <Route  path="/" component={DashboardPagePro} /> */}
                    <Route path="/cpdP" component={CPDPro} />

                    <Route path="/lecCourse" component={lecCoursePro} />
                    <Route path="/courseP" component={CoursePro} />
                    <Route
                      path="/csslcourse/addnewcourse"
                      component={AddCourse}
                    />

                    <Route path="/login-modal" component={AuthModalPagePro} />
                    <Route path="/buttons" component={ButtonPagePro} />
                    <Route path="/cards" component={CardPagePro} />
                    <Route path="/blogs" component={Blogs} />
                    <Route path="/widgets" component={WidgetPagePro} />
                    <Route path="/typography" component={TypographyPagePro} />
                    <Route path="/alerts" component={AlertPagePro} />
                    <Route path="/job" component={JobsPro} />

                    <Route path="/cpdAdd" component={AddCPD} />

                    <Route path="/jobAddvertisment/:id" component={JobView} />
                    <Route path="/questionare/:id" component={Questionare} />
                    <Route
                      path="/addJobCV/:id:finalMarks"
                      component={AddJobCV}
                    />

                    <Route
                      path="/addJobVaccencies"
                      component={AddJobVaccencies}
                    />

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
                </MainLayoutPro>
              )}
              {authState.role == 'council' && (
                <MainLayoutCouncil breakpoint={props.breakpoint}>
                  <React.Suspense fallback={<PageSpinner />}>
                    <Route
                      exact
                      path="/dashboard"
                      component={DashboardPageCou}
                    />
                    <Route path="/cpdP" component={CPDPro} />
                    <Route path="/lecCourse" component={lecCoursePro} />
                    <Route path="/courseP" component={CoursePro} />
                    <Route path="/login-modal" component={AuthModalPagePro} />
                    <Route path="/buttons" component={ButtonPagePro} />
                    <Route path="/cards" component={CardPagePro} />
                    <Route path="/blogs" component={Blogs} />
                    <Route path="/widgets" component={WidgetPagePro} />
                    <Route path="/typography" component={TypographyPagePro} />
                    <Route path="/alerts" component={AlertPagePro} />

                    <Route path="/job" component={JobsPro} />
                    <Route path="/cpdAdd" component={AddCPD} />
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
                </MainLayoutCouncil>
              )}

              {authState.role == 'secretariat' && (
                <MainLayoutSec breakpoint={props.breakpoint}>
                  <React.Suspense fallback={<PageSpinner />}>
                    <Route path="/dashboards" component={DashboardPageSec} />
                    <Route path="/cpdP" component={CPDPro} />
                    <Route path="/lecCourse" component={lecCoursePro} />
                    <Route path="/courseP" component={CoursePro} />
                    <Route path="/login-modal" component={AuthModalPagePro} />
                    <Route path="/buttons" component={ButtonPagePro} />
                    <Route path="/cards" component={CardPagePro} />
                    <Route path="/blogs" component={Blogs} />
                    <Route path="/widgets" component={WidgetPagePro} />
                    <Route path="/typography" component={TypographyPagePro} />
                    <Route path="/alerts" component={AlertPagePro} />

                    <Route path="/job" component={JobsPro} />
                    <Route path="/cpdAdd" component={AddCPD} />
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
                </MainLayoutSec>
              )}
              {authState.role == 'associate' && (
                <MainLayoutAssosiate breakpoint={props.breakpoint}>
                  <React.Suspense fallback={<PageSpinner />}>
                    <Route
                      exact
                      path="/dashboard"
                      component={DashboardPageAss}
                    />
                    <Route path="/cpdP" component={CPDPro} />
                    <Route path="/lecCourse" component={lecCoursePro} />
                    <Route path="/courseP" component={CoursePro} />
                    <Route path="/login-modal" component={AuthModalPagePro} />
                    <Route path="/buttons" component={ButtonPagePro} />
                    <Route path="/cards" component={CardPagePro} />
                    <Route path="/blogs" component={Blogs} />
                    <Route path="/widgets" component={WidgetPagePro} />
                    <Route path="/typography" component={TypographyPagePro} />
                    <Route path="/alerts" component={AlertPagePro} />

                    <Route path="/job" component={JobsPro} />
                    <Route path="/cpdAdd" component={AddCPD} />
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
                </MainLayoutAssosiate>
              )}
              {authState.role == 'chartered' && (
                <MainLayoutChartered breakpoint={props.breakpoint}>
                  <React.Suspense fallback={<PageSpinner />}>
                    <Route
                      exact
                      path="/dashboard"
                      component={DashboardPageCha}
                    />
                    <Route path="/cpdP" component={CPDPro} />
                    <Route path="/lecCourse" component={lecCoursePro} />
                    <Route path="/courseP" component={CoursePro} />
                    <Route path="/login-modal" component={AuthModalPagePro} />
                    <Route path="/buttons" component={ButtonPagePro} />
                    <Route path="/cards" component={CardPagePro} />
                    <Route path="/blogs" component={Blogs} />
                    <Route path="/widgets" component={WidgetPagePro} />
                    <Route path="/typography" component={TypographyPagePro} />
                    <Route path="/alerts" component={AlertPagePro} />

                    <Route path="/job" component={JobsPro} />
                    <Route path="/cpdAdd" component={AddCPD} />
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
                </MainLayoutChartered>
              )}

              {authState.role == 'student' && (
                <MainLayoutStudent breakpoint={props.breakpoint}>
                  <React.Suspense fallback={<PageSpinner />}>
                    <Route
                      exact
                      path="/dashboard"
                      component={DashboardPageStu}
                    />
                    <Route path="/cpdP" component={CPDPro} />
                    <Route path="/lecCourse" component={lecCoursePro} />
                    <Route path="/courseP" component={CoursePro} />
                    <Route path="/login-modal" component={AuthModalPagePro} />
                    <Route path="/buttons" component={ButtonPagePro} />
                    <Route path="/cards" component={CardPagePro} />
                    <Route path="/blogs" component={Blogs} />
                    <Route path="/widgets" component={WidgetPagePro} />
                    <Route path="/typography" component={TypographyPagePro} />
                    <Route path="/alerts" component={AlertPagePro} />

                    <Route path="/job" component={JobsPro} />
                    <Route path="/cpdAdd" component={AddCPD} />
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

              {authState.role == 'student' && (
                <MainLayoutStudent breakpoint={props.breakpoint}>
                  <React.Suspense fallback={<PageSpinner />}>
                    <Route
                      exact
                      path="/dashboard"
                      component={DashboardPageStu}
                    />
                    <Route path="/cpdP" component={CPDPro} />
                    <Route path="/lecCourse" component={lecCoursePro} />
                    <Route path="/courseP" component={CoursePro} />
                    <Route path="/login-modal" component={AuthModalPagePro} />
                    <Route path="/buttons" component={ButtonPagePro} />
                    <Route path="/cards" component={CardPagePro} />
                    <Route path="/blogs" component={Blogs} />
                    <Route path="/widgets" component={WidgetPagePro} />
                    <Route path="/typography" component={TypographyPagePro} />
                    <Route path="/alerts" component={AlertPagePro} />

                    <Route path="/job" component={JobsPro} />
                    <Route path="/cpdAdd" component={AddCPD} />
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
