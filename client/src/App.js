import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
//professional
import dashboardPro from "./pages/professional/dashboard";
import cpdPro from "./pages/professional/cpd";
import cpdAddPro from "./pages/professional/cpdAdd";

import coursePro from "./pages/professional/course";
import coursView from "./pages/professional/coursView";
import coursMyView from "./pages/professional/coursMyView";
import courseEnrollP from "./pages/professional/coursEnrollment";
import courseReviewP from "./pages/professional/coursReviews";

import workshopPro from "./pages/professional/workshops";
import workshopViewPro from "./pages/professional/workshopsView";
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
import dashboardSec from "./pages/secretary/dashboard";
import addJob from "./pages/secretary/addJob";
import manageWorkshop from "./pages/secretary/manageWorkshop";
import paymentsSec from "./pages/secretary/payment";
import regApprove from "./pages/secretary/regApprove";
import regPending from "./pages/secretary/regPending";
import regRejected from "./pages/secretary/regRejected";

//council
import dashboardCou from "./pages/council/dashboard";
import addJobCou from "./pages/council/addJob";
import blogsCou from "./pages/council/blogs";
import verifyWorkshop from "./pages/council/verifyWorkshop";
import paymentCou from "./pages/council/payment";
import reportCou from "./pages/council/report";
import regPendingCou from "./pages/council/regPendingC";
import regApproveCou from "./pages/council/regApproveC";
import regRejectedCou from "./pages/council/regRejectedC";
import cpdCou from "./pages/council/cpd";

import Login from "./components/login/login";

function App() {
  const st = true;

  if (st == false) {
    return <Login />;
  } else {
    const mname = "Jihani";
    const mtype = "Council";
    
    //const mname = "Supun";
    //const mtype = "Council";
    
   // const mname = "Chamika";
   // const mtype = "Professional";

    //const mname = "Anushka";
   // const mtype = "Chartered";
   
   // const mname = "Chamika";
   // const mtype = "Professional";

    //const mname = "Anushka";
   // const mtype = "Chartered";

    if (mtype == "Professional") {
      return (
        <>
          <Router>
            <Navbar name={mname} type={mtype} />
            <Switch>
              <Route path="/" exact component={dashboardPro} />
              <Route path="/cpdP" component={cpdPro} />
              <Route path="/addCPD" component={cpdAddPro} />
              <Route path="/courseP" component={coursePro} />
              <Route path="/coursViewP/:id" component={coursView} />
              <Route path="/coursMyViewP/:id" component={coursMyView} />
              <Route path="/coursEnrollsP/:id" component={courseEnrollP} />
              <Route path="/courseReviewP/:id" component={courseReviewP} />

              <Route path="/workshopP" component={workshopPro} />
              <Route path="/workshopViewP" component={workshopViewPro} />

              <Route path="/blogP" component={blogsPro} />
              <Route path="/forumP" component={forumPro} />
              <Route path="/reportsP" component={reportsPro} />
              <Route path="/jobP" component={jobPro} />
              <Route path="/paymentsP" component={paymentsPro} />

              <Route path="/courseP" component={coursePro} />
              <Route path="/workshopP" component={workshopPro} />
              <Route path="/blogP" component={blogsPro} />
              <Route path="/forumP" component={forumPro} />
              <Route path="/reportsP" component={reportsPro} />
              <Route path="/jobP" component={jobPro} />
              <Route path="/paymentsP" component={paymentsPro} />
            </Switch>
          </Router>
        </>
      );
    } else if (mtype == "Chartered") {
      return (
        <>
          <Router>
            <Navbar name={mname} type={mtype} />
            <Switch>
              <Route path="/" exact component={dashboardCha} />
              <Route path="/cpdP" component={cpdPro} />
              <Route path="/addCPD" component={cpdAddPro} />
              <Route path="/courseP" component={coursePro} />
              <Route path="/coursViewP/:id" component={coursView} />
              <Route path="/coursMyViewP/:id" component={coursMyView} />
              <Route path="/coursEnrollsP/:id" component={courseEnrollP} />
              <Route path="/courseReviewP/:id" component={courseReviewP} />

              <Route path="/workshopP" component={workshopPro} />
              <Route path="/workshopViewP" component={workshopViewPro} />

              <Route path="/blogP" component={blogsPro} />
              <Route path="/forumP" component={forumPro} />
              <Route path="/reportsP" component={reportsPro} />
              <Route path="/jobP" component={jobPro} />
              <Route path="/paymentsP" component={paymentsPro} />

              <Route path="/courseP" component={coursePro} />
              <Route path="/workshopP" component={workshopPro} />
              <Route path="/blogP" component={blogsPro} />
              <Route path="/forumP" component={forumPro} />
              <Route path="/reportsP" component={reportsPro} />
              <Route path="/jobP" component={jobPro} />
              <Route path="/paymentsP" component={paymentsPro} />
              {/*<Route path="/cpdC" component={cpdCha} />
              <Route path="/courseC" component={courseCha} />
              <Route path="/workshopS" component={workshopCha} />
              <Route path="/blogC" component={blogCha} />
              <Route path="/forumC" component={forumCha} />
              <Route path="/reportsC" component={reportsCha} />
              <Route path="/jobC" component={jobCha} />
              <Route path="/paymentsC" component={paymentsCha} />
              */}
            </Switch>
          </Router>
        </>
      );
    } else if (mtype == "Secretariat") {
      return (
        <>
          <Router>
            <Navbar name={mname} type={mtype} />
            <Switch>
              <Route path="/" exact component={dashboardSec} />
              <Route path="/addJob" component={addJob} />
              <Route path="/manWorkshop" component={manageWorkshop} />
              <Route path="/regApprove" component={regApprove} />
              <Route path="/regPending" component={regPending} />
              <Route path="/regRejected" component={regRejected} />
              <Route path="/paymentsSec" component={paymentsSec} />
            </Switch>
          </Router>
        </>
      );
    } else if (mtype == "Associate") {
      return (
        <>
          <Router>
            <Navbar name={mname} type={mtype} />
            <Switch>
              <Route path="/" exact component={dashboardAss} />
              <Route path="/courseA" component={courseAss} />
              <Route path="/blogA" component={blogAss} />
              <Route path="/forumA" component={forumAss} />
              <Route path="/reportsA" component={reportsAss} />
              <Route path="/jobA" component={jobAss} />
              <Route path="/paymentsA" component={paymentsAss} />
            </Switch>
          </Router>
        </>
      );
    } else if (mtype == "Council") {
      return (
        <>
          <Router>
            <Navbar name={mname} type={mtype} />
            <Switch>
              <Route path="/" exact component={dashboardCou} />
              <Route path="/jobCou" component={addJobCou} />
              <Route path="/blogCou" component={blogsCou} />
              <Route path="/workshopCou" component={verifyWorkshop} />
              <Route path="/reportsCou" component={reportCou} />
              <Route path="/regPendingC" component={regPendingCou} />
              <Route path="/regRejectedC" component={regRejectedCou} />
              <Route path="/regApproveC" component={regApproveCou} />
              <Route path="/paymentCou" component={paymentCou} />
              <Route path="/cpdCou" component={cpdCou} />
            </Switch>
          </Router>
        </>
      );
    } else if (mtype == "Student") {
      return (
        <>
          <Router>
            <Navbar name={mname} type={mtype} />
            <Switch>
              <Route path="/" exact component={dashboardCha} />
              <Route path="/courseS" component={courseStu} />
              <Route path="/workshopS" component={workshopStu} />
              <Route path="/blogS" component={blogStu} />
              <Route path="/forumS" component={forumStu} />
              <Route path="/reportsS" component={reportsStu} />
              <Route path="/paymentsS" component={paymentsStu} />
            </Switch>
          </Router>
        </>
      );
    }
  }
}

export default App;
