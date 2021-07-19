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


function App() {
  

    return (
      <>
        <Router>
          <Navbar name="jee" type="pro"/>
          <Switch>
            
            <Route path='/P'  component={dashboardPro} />
            <Route path='/C'  component={dashboardCha} />
            <Route path='/A'  component={dashboardCha} />

            <Route path='/cpdP' component={cpdPro} />
            <Route path='/cpdC' component={cpdCha} />
            
            <Route path='/courseP' exact component={coursePro} />
            <Route path='/courseC' component={courseCha} />

            <Route path='/workshopP'  component={workshopPro} />
            <Route path='/workshopC'  component={workshopCha} />

            <Route path='/blogP' component={blogsPro} />
            <Route path='/blogC' component={blogCha} />
            
            <Route path='/forumP' component={forumPro} />
            <Route path='/forumC' component={forumCha} />
            
            <Route path='/reportsP'  component={reportsPro} />
            <Route path='/reportsC'  component={reportsCha} />
            
            <Route path='/jobP' component={jobPro} />
            <Route path='/jobC' component={jobCha} />
            
            <Route path='/paymentsP' component={paymentsPro} />
            <Route path='/paymentsC' component={paymentsCha} />
          
          </Switch>
        </Router>
      </>
    );
  }
  


export default App;