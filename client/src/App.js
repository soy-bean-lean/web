import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import axios from "axios";
import "./App.css";
import Navbar from "./components/Navbar";
import Registration from "./pages/registration/Registration";
import Login from "./pages/login/Login";
import "bootstrap/dist/css/bootstrap.min.css";
import { useLocation } from "react-router";
import { useHistory } from "react-router-dom";



//professional
import Home from "./pages/professional/dashboard";
import CpdPro from "./pages/professional/Cpd";
import coursePro from "./pages/professional/course";
import workshopPro from "./pages/professional/workshop";
import blogsPro from "./pages/professional/blog";
import forumPro from "./pages/professional/forum";
import reportsPro from "./pages/professional/reports";
import jobPro from "./pages/professional/job";
import paymentsPro from "./pages/professional/payments";

//chartered
import dashboardCha from "./pages/chartered/dashboard";
import cpdCha from "./pages/chartered/cpd";
import courseCha from "./pages/chartered/course";
import blogCha from "./pages/chartered/blog";
import forumCha from "./pages/chartered/forum";
import workshopCha from "./pages/chartered/workshop";
import reportsCha from "./pages/chartered/reports";
import jobCha from "./pages/chartered/job";
import paymentsCha from "./pages/chartered/payments";

//Student
import dashboardStu from "./pages/student/dashboard";
import blogStu from "./pages/student/blog";
import courseStu from "./pages/student/course";
import forumStu from "./pages/student/forum";
import paymentsStu from "./pages/student/payments";
import reportsStu from "./pages/student/reports";
import workshopStu from "./pages/student/workshop";

//Associate
import dashboardAss from "./pages/associate/dashboard";
import blogAss from "./pages/associate/blog";
import courseAss from "./pages/associate/course";
import forumAss from "./pages/associate/forum";
import paymentsAss from "./pages/associate/payments";
import reportsAss from "./pages/associate/reports";
import jobAss from "./pages/associate/job";

//Secretary
<script>
    
</script>
function App(props) {
//   const [loginStatus, setLoginStatus] = useState(false);
//   const [role, setRole] = useState("");
  
//   axios.defaults.withCredentials = true;
//   //console.log("role");
//   useEffect(() => {
//     axios.get("http://localhost:3001/auth/login").then(response) => {
      
       
//        //console.log(response);
       
//       if (response.data.loggedIn == true) { 
        
//         setLoginStatus(true);
//         setRole(response.data.user[0].username);
//       // } else {
// //         //alert(response.data.error);
//         }
//     });
//   }, []);

//  // console.log(loginStatus);
//   console.log(role);
//const loginStatus=true;
 // const [loginStatus, setLoginStatus] = useState(false);

  const loginStatus=false;
  const role=false;

  if (loginStatus==false) {
    return (
      <>
        <Router>
          <Switch>
            <Route path="/" exact component={Login} />
            <Route path="/registration" exact component={Registration} />
          </Switch>
        </Router>
      </>
    );

  }else{
    const mname = "anushka";
    const mtype = "pro";
    console.log(role);
    console.log("aasdasd");
    if (mtype == "pro") {
      return (
        <>        
          <Router>
            <Navbar name={mname} type={mtype} />
            <Switch>
              <Route path="/home" exact render={(props) => <Home />}/>
              
              <Route path="/cpdP" component={CpdPro} />
              <Route path="/cpdC" component={cpdCha} />

              <Route path="/courseP" component={coursePro} />
              <Route path="/courseC" component={courseCha} />
              <Route path="/courseS" component={courseStu} />
              <Route path="/courseA" component={courseAss} />

              <Route path="/workshopP" component={workshopPro} />
              <Route path="/workshopS" component={workshopCha} />
              <Route path="/workshopS" component={workshopStu} />

              <Route path="/blogP" component={blogsPro} />
              <Route path="/blogC" component={blogCha} />
              <Route path="/blogS" component={blogStu} />
              <Route path="/blogA" component={blogAss} />

              <Route path="/forumP" component={forumPro} />
              <Route path="/forumC" component={forumCha} />
              <Route path="/forumS" component={forumStu} />
              <Route path="/forumA" component={forumAss} />

              <Route path="/reportsP" component={reportsPro} />
              <Route path="/reportsC" component={reportsCha} />
              <Route path="/reportsS" component={reportsStu} />
              <Route path="/reportsA" component={reportsAss} />

              <Route path="/jobP" component={jobPro} />
              <Route path="/jobC" component={jobCha} />
              <Route path="/jobA" component={jobAss} />

              <Route path="/paymentsP" component={paymentsPro} />
              <Route path="/paymentsC" component={paymentsCha} />
              <Route path="/paymentsS" component={paymentsStu} />
              <Route path="/paymentsA" component={paymentsAss} />
            </Switch>
          </Router>
        </>
      );
    } else if (mtype == "cha") {
      return (
        <>
          <Router>
            <Navbar name={mname} type={mtype} />
            <Switch>
              <Route path="/home" component={dashboardCha} />

              <Route path="/cpdP" component={CpdPro} />
              <Route path="/cpdC" component={cpdCha} />

              <Route path="/courseP" exact component={coursePro} />
              <Route path="/courseC" component={courseCha} />
              <Route path="/courseS" component={courseStu} />
              <Route path="/courseA" component={courseAss} />

              <Route path="/workshopP" component={workshopPro} />
              <Route path="/workshopS" component={workshopCha} />
              <Route path="/workshopS" component={workshopStu} />

              <Route path="/blogP" component={blogsPro} />
              <Route path="/blogC" component={blogCha} />
              <Route path="/blogS" component={blogStu} />
              <Route path="/blogA" component={blogAss} />

              <Route path="/forumP" component={forumPro} />
              <Route path="/forumC" component={forumCha} />
              <Route path="/forumS" component={forumStu} />
              <Route path="/forumA" component={forumAss} />

              <Route path="/reportsP" component={reportsPro} />
              <Route path="/reportsC" component={reportsCha} />
              <Route path="/reportsS" component={reportsStu} />
              <Route path="/reportsA" component={reportsAss} />

              <Route path="/jobP" component={jobPro} />
              <Route path="/jobC" component={jobCha} />
              <Route path="/jobA" component={jobAss} />

              <Route path="/paymentsP" component={paymentsPro} />
              <Route path="/paymentsC" component={paymentsCha} />
              <Route path="/paymentsS" component={paymentsStu} />
              <Route path="/paymentsA" component={paymentsAss} />
            </Switch>
          </Router>
        </>
      );
    }
  }
    
  
}

export default App;
