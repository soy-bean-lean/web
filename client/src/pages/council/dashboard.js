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
    width:100,
  },
}));

const state = {
  labels: ["2012","2013","2014","2015","2016","2017","2018","2019","2020"],
  datasets: [
    {
     label:"Total Members",
      fill: false,
      lineTension:0.5,
      backgroundColor: " #5DADE2 ",
      borderColor: "#5DADE2 ",
      borderWidth: 3,
      data: [100, 200, 400, 450, 120, 290, 360, 281,345],
    },
  ],
};

const state1 = {
  labels: ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG"],
  datasets: [
    {
      label: "Toatal Workshop",
      backgroundColor:"#85C1E9",
      hoverBackgroundColor:"#5499C7",
      data: [10, 20, 9, 8, 10, 9, 6, 11],
    },
  ],
};

const state2 = {
  labels: ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG"],
  datasets: [
    {
     label:"Total Activity",
      fill: true,
      lineTension:0.5,
      backgroundColor: " #D4E6F1 ",
      borderColor: "#7FB3D5",
      borderWidth: 1,
      data: [10, 20, 40, 20, 40, 50, 66, 41],
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
      <div className="Charts">
        <div className="chart1">
          <Bar
            data={state1}
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

        <center><h3>CPD Activity Progree</h3></center>
           <Line
            data={state2}
            width={220}
            height={70}
            options={
              ({ options }
              )
            }
          />
        
        </div>
      </div>

      <div className="OnGoing">
        <center><h2>Members in CSSL</h2></center>
        <div className="ONG">
        
        <Line
            data={state}
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
    </div>
  );
}

export default Home;
