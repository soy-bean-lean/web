import React from "react";
import "./style/cpd.css";
import "./style/Ongoingtabs.css";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { Link } from "react-router-dom";
import { makeStyles, Paper, Grid } from "@material-ui/core";
import { Line, Pie, Doughnut, Bar } from "react-chartjs-2";
function cpd() {
  const record = [
    {
      id: 1,
      type: "CSSL Course",
      description: "Java Programming Beginner Level",
      status: "Approved",
    },
    {
      id: 2,
      type: "CSSL Workshop",
      description: "Machine Learning Workshop",
      status: "Pending",
    }, {
      id: 1,
      type: "CSSL Course",
      description: "Java Programming Beginner Level",
      status: "Approved",
    },
    {
      id: 2,
      type: "CSSL Workshop",
      description: "Machine Learning Workshop",
      status: "Pending",
    }, {
      id: 1,
      type: "CSSL Course",
      description: "Java Programming Beginner Level",
      status: "Approved",
    },
    {
      id: 2,
      type: "CSSL Workshop",
      description: "Machine Learning Workshop",
      status: "Pending",
    }, {
      id: 1,
      type: "CSSL Course",
      description: "Java Programming Beginner Level",
      status: "Approved",
    },
    {
      id: 2,
      type: "CSSL Workshop",
      description: "Machine Learning Workshop",
      status: "Pending",
    }, {
      id: 1,
      type: "CSSL Course",
      description: "Java Programming Beginner Level",
      status: "Approved",
    },
    {
      id: 2,
      type: "CSSL Workshop",
      description: "Machine Learning Workshop",
      status: "Pending",
    }, {
      id: 1,
      type: "CSSL Course",
      description: "Java Programming Beginner Level",
      status: "Approved",
    },
    {
      id: 2,
      type: "CSSL Workshop",
      description: "Machine Learning Workshop",
      status: "Pending",
    },
    {
      id: 3,
      type: "Guest Lecture",
      description: "UCSC - Flutter Tech Talk",
      status: "Pending",
    },
    {
      id: 4,
      type: "Other Cource",
      description: "PHP for Web Development",
      status: "Rejected",
    },
    {
      id: 5,
      type: "Other Cource",
      description: "Java Web Development with Spring Framework",
      status: "Approved",
    },
  ];

  const recordList = record.map(record => (
    <>
      <div className="recentRec">
        <div className="recType">{record.type}</div>
        <div className="recAllign">
          <div className="recDes">{record.description}</div>
          <div data-status={record.status} className="recPending">{record.status}</div>
        </div>
      </div>
    </>
  ));

  const recordApp = [
    {
      id: 1,
      type: "CSSL Course",
      description: "Java Programming Beginner Level",
      status: "Approved",
    },
    {
      id: 2,
      type: "CSSL Workshop",
      description: "Machine Learning Workshop",
      status: "Approved",
    },
    {
      id: 3,
      type: "Guest Lecture",
      description: "UCSC - Flutter Tech Talk",
      status: "Approved",
    },
    {
      id: 4,
      type: "Other Cource",
      description: "PHP for Web Development",
      status: "Approved",
    },
    {
      id: 5,
      type: "Other Cource",
      description: "Java Web Development with Spring Framework",
      status: "Approved",
    },
  ];

  const recordListApp = recordApp.map(recordApp => (
    <>
      <div className="recentRec">
        <div className="recType">{recordApp.type}</div>
        <div className="recAllign">
          <div className="recDes">{recordApp.description}</div>
          <div data-status={recordApp.status} className="recPending">{recordApp.status}</div>
        </div>
      </div>
    </>
  ));

  const recordPen = [
    {
      id: 1,
      type: "CSSL Course",
      description: "Java Programming Beginner Level",
      status: "Pending",
    },
    {
      id: 2,
      type: "CSSL Workshop",
      description: "Machine Learning Workshop",
      status: "Pending",
    },
    {
      id: 3,
      type: "Guest Lecture",
      description: "UCSC - Flutter Tech Talk",
      status: "Pending",
    },
    {
      id: 4,
      type: "Other Cource",
      description: "PHP for Web Development",
      status: "Pending",
    },
    {
      id: 5,
      type: "Other Cource",
      description: "Java Web Development with Spring Framework",
      status: "Pending",
    },
  ];

  const recordListPen = recordPen.map(recordPen => (
    <>
      <div className="recentRec">
        <div className="recType">{recordPen.type}</div>
        <div className="recAllign">
          <div className="recDes">{recordPen.description}</div>
          <div data-status={recordPen.status} className="recPending">{recordPen.status}</div>
        </div>
      </div>
    </>
  ));


  const recordRej = [
    {
      id: 1,
      type: "CSSL Course",
      description: "Java Programming Beginner Level",
      status: "Rejected",
    },
    {
      id: 2,
      type: "CSSL Workshop",
      description: "Machine Learning Workshop",
      status: "Rejected",
    },
    {
      id: 3,
      type: "Guest Lecture",
      description: "UCSC - Flutter Tech Talk",
      status: "Rejected",
    },
    {
      id: 4,
      type: "Other Cource",
      description: "PHP for Web Development",
      status: "Rejected",
    },
    {
      id: 5,
      type: "Other Cource",
      description: "Java Web Development with Spring Framework",
      status: "Rejected",
    },
  ];

  const recordListRej = recordRej.map(recordRej => (
    <>
      <div className="recentRec">
        <div className="recType">{recordRej.type}</div>
        <div className="recAllign">
          <div className="recDes">{recordRej.description}</div>
          <div data-status={recordRej.status} className="recPending">{recordRej.status}</div>
        </div>
      </div>
    </>
  ));

  const state = {
    labels: ["Approved", "Pending", "Rejected"],
    datasets: [
      {
        label: "CPD Uploads",
        fill: false,
        lineTension:5,
        borderRadius:5,
        backgroundColor: ["#0a8010","#8d800a","#ff0404"],
        borderColor: "#fff",
        borderWidth: 8,
        data: [20, 8, 10],
      },
    ],
  };
  const cpd = {
    labels: ["CPD Records"],
    datasets: [
      {
        label: "Approved",
        backgroundColor: "#0a8010",
        hoverBackgroundColor: "#0a8010",
        data: [2],
      },
      {
        label: "Rejected",
        backgroundColor: "#ff0404",
        hoverBackgroundColor: "#ff0404",
        data: [4],
      },
      {
        label: "Pending",
        backgroundColor: "#8d800a",
        hoverBackgroundColor: "#8d800a",
        data: [8],
      },
    ],
  };
  const options = {
    maintainAspectRatio: false,
  };
  
  return (
    <div className="mainCPD">

      <div className="recentCPDRec">
        <Tabs /*style={{ paddingTop: "5px", paddingLeft: "3px" }}*/>
          {" "}
          <TabList>
            <Tab>All</Tab>
            <Tab>Approved</Tab>
            <Tab>Pending</Tab>
            <Tab>Rejected</Tab>
          </TabList>
          <h3 className="titleRecent">Recent CPD Submissions</h3>
          <TabPanel className="all">
          <div className="btn-cpdAdd">
   
      </div>
            <div className="recList">{recordList}</div>
          </TabPanel>
          <TabPanel className="approved">
            <div className="recList">{recordListApp}</div>
          </TabPanel>
          <TabPanel className="pending">
            <div className="recList">{recordListPen}</div>
          </TabPanel>
          <TabPanel className="rejected">
            <div className="recList">{recordListRej}</div>
          </TabPanel>
        </Tabs>
     
     </div>
     <div className="cpdAdd">

     <div className="add-cpd-btn">
          <Link to={"/addCPD/"} className="add-cpd-btn">
            <a href="#" className="add-cpd-btn">
              ADD
            </a>
          </Link>
        </div>
    </div>
    <div className="chartPro">
      
          {" "}
          <Doughnut
            data={state}
            width={100}
            height={100}
            options={
              (
              {
                title: {
                  display: true,
                  text: "Credit Progress Last Year",
                  fontSize: 20,
                },
                legend: {
                  display: true,
                  position: "left",
                },
              })
            }
          />
         
        </div>
    </div>
    
  );
}

export default cpd;

