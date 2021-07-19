import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
//professional
import dashboardPro from './pages/professional/dashboard';
import cpdPro from './pages/professional/cpd';
import coursePro from './pages/professional/course';
import workshopPro from './pages/professional/workshop';
import blogsPro from './pages/professional/blog';
import forumPro from './pages/professional/forum';
import reportsPro from './pages/professional/reports';
import jobPro from './pages/professional/job';
import paymentsPro from './pages/professional/payments';

//chartered
import dashboardCha from './pages/chartered/dashboard';
import cpdCha from './pages/chartered/cpd';
import courseCha from './pages/chartered/course';
import blogCha from './pages/chartered/blog';
import forumCha from './pages/chartered/forum';
import workshopCha from './pages/chartered/workshop';
import reportsCha from './pages/chartered/reports';
import jobCha from './pages/chartered/job';
import paymentsCha from './pages/chartered/payments';

//Student
import dashboardStu from './pages/student/dashboard';
import blogStu from './pages/student/blog';
import courseStu from './pages/student/course';
import forumStu from './pages/student/forum';
import paymentsStu from './pages/student/payments';
import reportsStu from './pages/student/reports';

//Associate
import dashboardAss from './pages/associate/dashboard';
import blogAss from './pages/associate/blog';
import courseAss from './pages/associate/course';
import forumAss from './pages/associate/forum';
import paymentsAss from './pages/associate/payments';
import reportsAss from './pages/associate/reports';


function App() {
  

    return (
      <>
        <Router>
          <Navbar name="jee" type="student"/>
          <Switch>
            
            <Route path='/P'  component={dashboardPro} />
            <Route path='/C'  component={dashboardCha} />
            <Route path='/S'  component={dashboardStu} />
            <Route path='/A'  component={dashboardAss} />

            <Route path='/cpdP' component={cpdPro} />
            <Route path='/cpdC' component={cpdCha} />
            
            <Route path='/courseP' exact component={coursePro} />
            <Route path='/courseC' component={courseCha} />
            <Route path='/courseS' component={courseStu} />

            <Route path='/workshopP'  component={workshopPro} />
            <Route path='/workshopC'  component={workshopCha} />

            <Route path='/blogP' component={blogsPro} />
            <Route path='/blogC' component={blogCha} />
            <Route path='/blogS'  component={blogStu}/>
            
            <Route path='/forumP' component={forumPro} />
            <Route path='/forumC' component={forumCha} />
            <Route path='/forumS' component={forumStu} />
            
            <Route path='/reportsP'  component={reportsPro} />
            <Route path='/reportsC'  component={reportsCha} />
            <Route path='/reportsS'  component={reportsStu} />
            
            <Route path='/jobP' component={jobPro} />
            <Route path='/jobC' component={jobCha} />
            
            <Route path='/paymentsP' component={paymentsPro} />
            <Route path='/paymentsC' component={paymentsCha} />
            <Route path='/paymentsS' component={paymentsStu} />
          
          </Switch>
        </Router>
      </>
    );
  }
  


export default App;