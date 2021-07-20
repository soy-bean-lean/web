import React from "react";
import "./style/dashboard.css";
import { makeStyles, Paper, Grid } from "@material-ui/core";
import { Line, Pie, Bar } from "react-chartjs-2";

import { Redirect } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {},
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    height: 200,
  },
}));

const state = {
  labels: ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"],
  datasets: [
    {
      label: "Member Progress",
      fill: false,
      lineTension:0.5,
      backgroundColor: "#136CDC",
      borderColor: "#136CDC",
      borderWidth: 3,
      data: [10, 20, 40, 60, 60, 60, 72, 81, 50, 30, 25, 41],
    },
  ],
};

const state1 = {
  labels: ["2011","2012","2013","2014","2015", "2016", "2017", "2018", "2019", "2020"],
  datasets: [
    {
      label: "Toatal Payments of the Last Years",
      backgroundColor:"#4C90C3",
      hoverBackgroundColor:"#060b60",
      data: [20000,34500,20004,30000,20000, 34000, 45000, 56000, 78000, 123000],
    },
  ],
};


const state2 = {
  labels: ["2015", "2016", "2017", "2018", "2019", "2020"],
  datasets: [
    {
      label: "Student",
      backgroundColor: "#D5E6F3",
      hoverBackgroundColor:"#060b60",
      data: [100,200, 300, 230, 170, 300],
    },
    {
      label: "Associate Member",
      backgroundColor: "#94C0E1",
      hoverBackgroundColor:"#060b60",
      data: [200, 340, 450, 560, 780, 123],
    },
    {
      label: "Professional Memeber",
      backgroundColor: "#4C90C3",
      hoverBackgroundColor:"#060b60",
      data: [20, 40, 50, 60, 80, 123],
    },
    {
      label: "Chartered Member",
      backgroundColor: "#4199DC",
      hoverBackgroundColor:"#060b60",
      data: [20, 40, 50, 60, 100, 130],
    },
  ],
};






const options = {
  maintainAspectRatio: false,
};

function Home() {
  const classes = useStyles();
  return (
    <div className="main">
     

      

      <div className="OnGoing">
        <center><h2>Members in CSSL</h2></center>
        <div className="ONG">
        
        <Bar
            data={state2}
            width={220}
            height={40}
            
            options={
              ({ options },
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
      <div className="Charts">
        <div className="chart1">
          <Line
            data={state}
            width={220}
            height={80}
            options={
              ({ options },
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

        <div className="chart2">
        <Bar
            data={state1}
            width={220}
            height={80}
            options={
              ({ options },
              {
                title: {
                  display: false,
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
    </div>
  );
}

export default Home;
