import React from "react";
import "./style/dashboard.css";
import { makeStyles, Paper, Grid } from "@material-ui/core";
import { Line, Pie, Doughnut, Bar } from "react-chartjs-2";
import { Redirect } from "react-router-dom";
import Tabs from "./tabs";


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
  labels: [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
  ],
  datasets: [
    {
      label: "Credit Progress",
      fill: false,
      lineTension: 0.5,
      backgroundColor: "#136CDC",
      borderColor: "#136CDC",
      borderWidth: 3,
      data: [10, 20, 40, 60, 60, 60, 72, 81, 90, 88, 90, 99],
    },
  ],
};

const options = {
  maintainAspectRatio: false,
};

function Home() {
  const classes = useStyles();
  return (
    <div className="mainDash">
      <div className="progress">
        <div className="progressBar">
          <div className="progressColour"></div>
        </div>
        <div>
          <h3>75 %</h3>
        </div>
      </div>

      <div className="Charts">
        <div className="chart1">
          {" "}
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

        <div className="recentAct">
          <h3>Recent Activities</h3>
          <div className="recent"></div>
          <div className="recent"></div>
          <div className="recent"></div>
          <div className="recent"></div>
        </div>
      </div>
   

      <div className="OnGoing">
        <div className="ONG">
             <Tabs></Tabs>
        </div>
      </div>
    </div>



  );
}

export default Home;
