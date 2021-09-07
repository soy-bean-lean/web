import React, { useState, useEffect } from "react";
import axios from "axios";
import "./style/cpd.css";
import "./style/Ongoingtabs.css";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { Link } from "react-router-dom";
import { makeStyles, Paper, Grid } from "@material-ui/core";
import { Line, Pie, Doughnut, Bar } from "react-chartjs-2";
function Records() {
  const [record, setRecord] = useState(null);
  const [approveCount, setApproveCount] = useState(0);
  const[pendingCount, setPendingCount] = useState(0);
  const [rejectCount, setRejectCount] = useState(0);
  var a=0,b=0,c=0;
  useEffect(() => {
    const formData = {
      id: "",
      type: "",
      status: "",
      description:""
    };
    axios
    .post("http://localhost:3001/cpd/",formData)
  
      .then((response) => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          setRecord(response.data);
          for(var i=0; i<Object.keys(response.data).length;i++)
          {
            if(response.data[i].status=="Approved")
            {
              a++;
              setApproveCount(a);
            }
            else if(response.data[i].status=="Pending")
            {
              b++;
              setPendingCount(b);
            }
            else if(response.data[i].status=="Rejected")
            {
              c++;
              setRejectCount(c);
            }
            else
            {
              console.log("Error:",i);
            }
          }
        }
      })
      .catch((error) => {
        alert(error);
      });
  }, []);

  const allRecords = record &&
  record.map((record,i) => (
    <>
      <div className="recentRec" key={i}>
        <div className="recType">{record.type}</div>
        <div className="recAllign">
          <div className="recDes">{record.description}</div>
          <div data-status={record.status} className="recPending">{record.status}</div>
        </div>
      </div>
    </>
  ));

  const approvedRecords = record &&
  record.map((record,i) =>(
    record.status==="Approved" ?
    <>
      <div className="recentRec" key={i}>
        <div className="recType">{record.type}</div>
        <div className="recAllign">
          <div className="recDes">{record.description}</div>
          <div data-status={record.status} className="recPending">{record.status}</div>
        </div>
      </div>
    </>:
    <></>
  ));

  const pendingRecords = record &&
  record.map((record,i) =>(
    record.status==="Pending" ?
    <>
      <div className="recentRec" key={i}>
        <div className="recType">{record.type}</div>
        <div className="recAllign">
          <div className="recDes">{record.description}</div>
          <div data-status={record.status} className="recPending">{record.status}</div>
        </div>
      </div>
    </>:
    <></>
  ));

  const rejectedRecords = record &&
  record.map((record,i) =>(
    record.status==="Rejected" ?
    <>
      <div className="recentRec" key={i}>
        <div className="recType">{record.type}</div>
        <div className="recAllign">
          <div className="recDes">{record.description}</div>
          <div data-status={record.status} className="recPending">{record.status}</div>
        </div>
      </div>
    </>:
    <></>
  ));

  const state = {
    labels: ["Approved", "Pending", "Rejected"],
    datasets: [
      {
        label: "CPD Uploads",
        fill: false,
        lineTension:5,
        height:300,
        width:300,
        borderRadius:5,
        backgroundColor: ["#0a8010","#8d800a","#ff0404"],
        borderColor: "#fff",
        borderWidth: 8,
        data: [approveCount, pendingCount, rejectCount],
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
          <div className="btn-cpdAdd"></div>
          <div className="recList">{allRecords}</div>
          </TabPanel>
          <TabPanel className="approved">
            <div className="recList">{approvedRecords}</div>
          </TabPanel>
          <TabPanel className="pending">
            <div className="recList">{pendingRecords}</div>
          </TabPanel>
          <TabPanel className="rejected">
            <div className="recList">{rejectedRecords}</div>
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
            width={50}
            height={50}
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

export default Records;

