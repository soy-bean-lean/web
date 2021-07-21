import React from "react";
import "./style/dashboard.css";
import { makeStyles, Paper, Grid } from "@material-ui/core";
import { Line, Pie, Doughnut, Bar } from "react-chartjs-2";
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

const state2 = {
  labels: ["2015", "2016", "2017", "2018", "2019", "2020"],
  datasets: [
    {
      label: "Courses",
      backgroundColor: "#94C0E1",
      hoverBackgroundColor: "#060b60",
      data: [2, 10, 4, 6, 8, 12],
    },
    {
      label: "Workshops",
      backgroundColor: "#4C90C3",
      hoverBackgroundColor: "#060b60",
      data: [2, 8, 10, 1, 4, 15],
    },
    {
      label: "Other",
      backgroundColor: "#4199DC",
      hoverBackgroundColor: "#060b60",
      data: [10, 4, 5, 6, 10, 13],
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
          <div className="recent">
            <p> Uploaded CPD - CSSL Course In Java- 2021 / July /20</p>
          </div>
          <div className="recent">
            {" "}
            <p>
              {" "}
              Start Course - Angular - The Complete Guide - 2021 / July /10
            </p>
          </div>
          <div className="recent">
            {" "}
            <p> Apply a Job -Cambi Software (SE)- 2021 / June /29</p>
          </div>
          <div className="recent">
            {" "}
            <p> Uploaded CPD -Attendt to a Workshop in Microsoft - 2021 / June /25</p>
          </div>
        </div>
      </div>

      <div className="chart3">
        <center>
          <h3>Uploaded CPD Record Types</h3>
        </center>
        <div className="ONG2">
          <Bar
            data={state2}
            width={220}
            height={32}
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
