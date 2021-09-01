import React, { useState, useEffect } from "react";
import axios from "axios";
import "./style/cpd.css";
import "./style/Ongoingtabs.css";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { Link } from "react-router-dom";
import { makeStyles, Paper, Grid } from "@material-ui/core";
import { Line, Pie, Doughnut, Bar } from "react-chartjs-2";
function Records() {
  const [data, setData] = useState(null);

  const [appRecCount, setAppRecCount] = useState(0);

  const [type, setType] = useState("");
  const[description, setDescription] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    const data = {
      id: "",
      type: "",
      status: "",
      description:""

    };
    axios
    .post("http://localhost:3001/cpdP/",data)
  
      .then((response) => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          setData(response.data);
        }
      })
      .catch((error) => {
        alert(error);
      });
  }, []);


  const allRecords = data &&
  data.map((data) => (
    <>
      <div className="recentRec" key={data.id}>
        <div className="recType">{data.type}</div>
        <div className="recAllign">
          <div className="recDes">{data.description}</div>
          <div data-status={data.status} className="recPending">{data.status}</div>
        </div>
      </div>
    </>
  ));

  const approvedRecords = data &&
  data.map((data) =>(
    data.status==="Approved" ?
    <>
      <div className="recentRec">
        <div className="recType">{data.type}</div>
        <div className="recAllign">
          <div className="recDes">{data.description}</div>
          <div data-status={data.status} className="recPending">{data.status}</div>
        </div>
      </div>
    </>:
    <></>
  ));

  const pendingRecords = data &&
  data.map((data) =>(
    data.status==="Pending" ?
    <>
      <div className="recentRec">
        <div className="recType">{data.type}</div>
        <div className="recAllign">
          <div className="recDes">{data.description}</div>
          <div data-status={data.status} className="recPending">{data.status}</div>
        </div>
      </div>
    </>:
    <></>
  ));

  const rejectedRecords = data &&
  data.map((data) =>(
    data.status==="Rejected" ?
    <>
      <div className="recentRec">
        <div className="recType">{data.type}</div>
        <div className="recAllign">
          <div className="recDes">{data.description}</div>
          <div data-status={data.status} className="recPending">{data.status}</div>
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
        borderRadius:5,
        backgroundColor: ["#0a8010","#8d800a","#ff0404"],
        borderColor: "#fff",
        borderWidth: 8,
        data: [5, 2, 2],
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

export default Records;

