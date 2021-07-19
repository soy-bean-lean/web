import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import dashboard from './pages/professional/dashboard';
import cpd from './pages/professional/course';
import course from './pages/professional/course';
import workshop from './pages/professional/workshop';
import blogs from './pages/professional/blog';
import forum from './pages/professional/forum';
import reports from './pages/professional/reports';
import job from './pages/professional/job';
import payments from './pages/professional/payments';


function App() {
  

    return (
      <>
        <Router>
          <Navbar name="jee" type="pro"/>
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