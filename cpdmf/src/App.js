import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import dashboard from './pages/dashboard';
import cpd from './pages/cpd';
import course from './pages/course';
import workshop from './pages/workshop';
import blogs from './pages/blog';
import forum from './pages/forum';
import reports from './pages/reports';
import job from './pages/job';
import payments from './pages/payments';


function App() {
  

    return (
      <>
        <Router>
          <Navbar name="a2323" type="pro"/>
          <Switch>
            <Route path='/' exact component={dashboard} />
            <Route path='/cpd' component={cpd} />
            <Route path='/course' component={course} />
            <Route path='/workshop' exact component={workshop} />
            <Route path='/blog' component={blogs} />
            <Route path='/forum' component={forum} />
            <Route path='/reports' exact component={reports} />
            <Route path='/job' component={job} />
            <Route path='/payments' component={payments} />
          </Switch>
        </Router>
      </>
    );
  }
  


export default App;