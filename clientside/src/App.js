import { STATE_LOGIN, STATE_SIGNUP } from 'components/AuthForm';
import GAListener from 'components/GAListener';
import { EmptyLayout, LayoutRoute} from 'components/Layout';
import { MainLayout as MainLayoutPro} from 'components/Layout/pro';
import { MainLayout as MainLayoutSec} from 'components/Layout/sec';
import PageSpinner from 'components/PageSpinner';
// import AuthPage from 'pages/AuthPage';
import React from 'react';
import componentQueries from 'react-component-queries';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import './styles/reduction.scss';
import './main.css';
//pro
const AlertPagePro = React.lazy(() => import('pages/proffesional/AlertPage'));
const AuthModalPagePro  = React.lazy(() => import('pages/proffesional/AuthModalPage'));
const BadgePagePro  = React.lazy(() => import('pages/proffesional/BadgePage'));
const ButtonGroupPagePro  = React.lazy(() => import('pages/proffesional/ButtonGroupPage'));
const ButtonPagePro  = React.lazy(() => import('pages/proffesional/ButtonPage'));
const CardPagePro  = React.lazy(() => import('pages/proffesional/CardPage'));
const CPDPro  = React.lazy(() => import('pages/proffesional/CPD'));
const lecCoursePro  = React.lazy(() => import('pages/proffesional/Lecturing Cources'));
const Blogs  = React.lazy(() => import('pages/proffesional/Blogs'));
const CoursePro  = React.lazy(() => import('pages/proffesional/Courses'));
const ChartPagePro  = React.lazy(() => import('pages/proffesional/ChartPage'));
const DashboardPagePro  = React.lazy(() => import('pages/proffesional/DashboardPage'));
const DropdownPagePro  = React.lazy(() => import('pages/proffesional/DropdownPage'));
const FormPagePro  = React.lazy(() => import('pages/proffesional/FormPage'));
const InputGroupPagePro  = React.lazy(() => import('pages/proffesional/InputGroupPage'));
const ModalPagePro  = React.lazy(() => import('pages/proffesional/ModalPage'));
const ProgressPagePro  = React.lazy(() => import('pages/proffesional/ProgressPage'));
const JobsPro  = React.lazy(() => import('pages/proffesional/Jobs'));
const AddCPD  = React.lazy(() => import('pages/cpd/addCPD'));
const JobView  = React.lazy(() => import('pages/proffesional/Job View'));
const TypographyPagePro  = React.lazy(() => import('pages/proffesional/TypographyPage'));
const WidgetPagePro  = React.lazy(() => import('pages/proffesional/WidgetPage'));


//sec


const DashboardPageProSec = React.lazy(() => import('pages/sec/DashboardPage'));

const JobsSec = React.lazy(() => import('pages/sec/Jobs'));


const getBasename = () => {
  return `/${process.env.PUBLIC_URL.split('/').pop()}`;
};
const user="";
class App extends React.Component {
  render() {
    return (
      <BrowserRouter basename={getBasename()}>
        <GAListener>
          <Switch>
            {/* <LayoutRoute
              exact
              path="/login"
              layout={EmptyLayout}
              component={props => (
                <AuthPage {...props} authState={STATE_LOGIN} />
              )}
            />
            <LayoutRoute
              exact
              path="/signup"
              layout={EmptyLayout}
              component={props => (
                <AuthPage {...props} authState={STATE_SIGNUP} />
              )}
            />
             */}
          <MainLayoutPro breakpoint={this.props.breakpoint}>
              <React.Suspense fallback={<PageSpinner />}>
                <Route exact path="/" component={DashboardPagePro} />
                <Route exact path="/cpdP" component={CPDPro} />
                <Route exact path="/lecCourse" component={lecCoursePro} />
                <Route exact path="/courseP" component={CoursePro} />
                <Route exact path="/login-modal" component={AuthModalPagePro} />
                <Route exact path="/buttons" component={ButtonPagePro} />
                <Route exact path="/cards" component={CardPagePro} />
                <Route exact path="/blogs" component={Blogs} />
                <Route exact path="/widgets" component={WidgetPagePro} />
                <Route exact path="/typography" component={TypographyPagePro} />
                <Route exact path="/alerts" component={AlertPagePro} />
                <Route exact path="/job" component={JobsPro} />
                <Route exact path="/cpdAdd" component={AddCPD} />
                <Route exact   path="/jobAddvertisment/:id" component={JobView} />
                <Route exact path="/badges" component={BadgePagePro} />
                <Route exact path="/buttongroups" component={ButtonGroupPagePro} />
                <Route exact path="/dropdowns" component={DropdownPagePro} />
                <Route exact path="/progress" component={ProgressPagePro} />
                <Route exact path="/modals" component={ModalPagePro} />
                <Route exact path="/forms" component={FormPagePro} />
                <Route exact path="/input-groups" component={InputGroupPagePro} />
                <Route exact path="/charts" component={ChartPagePro} />
              </React.Suspense>
            </MainLayoutPro>
{/*             
            { <MainLayoutSec breakpoint={this.props.breakpoint}>
              <React.Suspense fallback={<PageSpinner />}>
                <Route exact path="/" component={DashboardPagePro} />
                <Route exact path="/cpdP" component={CPD} />
                <Route exact path="/lecCourse" component={lecCourse} />
                <Route exact path="/courseP" component={CourseP} />
                <Route exact path="/login-modal" component={AuthModalPage} />
                <Route exact path="/buttons" component={ButtonPage} />
                <Route exact path="/cards" component={CardPage} />
                <Route exact path="/widgets" component={WidgetPage} />
                <Route exact path="/typography" component={TypographyPage} />
                <Route exact path="/alerts" component={AlertPage} />
                <Route exact path="/job" component={Jobs} />
                <Route exact path="/badges" component={BadgePage} />
                <Route exact path="/buttongroups" component={ButtonGroupPage} />
                <Route exact path="/dropdowns" component={DropdownPage} />
                <Route exact path="/progress" component={ProgressPage} />
                <Route exact path="/modals" component={ModalPage} />
                <Route exact path="/forms" component={FormPage} />
                <Route exact path="/input-groups" component={InputGroupPage} />
                <Route exact path="/charts" component={ChartPage} />
              </React.Suspense>
            </MainLayoutSec> } */}
            <Redirect to="/" />
          </Switch>
        </GAListener>
      </BrowserRouter>
    );
  }
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
