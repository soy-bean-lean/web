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
  labels: ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"],
  datasets: [
    {
      label: "Credit Progress Last Year",
      fill: false,
      lineTension:0.5,
      backgroundColor: "#FFF",
      borderColor: "#00A645",
      borderWidth: 3,
      data: [1, 2, 4, 6, 6, 6, 7, 8, 10, 10, 11, 11],
    },
  ],
};

const state1 = {
  labels: ["2015", "2016", "2017", "2018", "2019", "2020"],
  datasets: [
    {
      label: "Member Payments",
      backgroundColor: [
        "#00A645",
        "#00A645",
        "#00A645",
        "#00A645",
        "#00A645",
        "#00A645",
        "#00A645",
        "#00A645",
        "#00A645",
        "#00A645",
      ],
      hoverBackgroundColor: [
        "#060b60",
        "#060b60",
        "#060b60",
        "#060b60",
        "#060b60",
        "#060b60",
        "#060b60",
      ],
      data: [20000, 34000, 45000, 56000, 78000, 123000],
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
      <div className="progress">
        <div className="progressBar">
          <div className="progressColour"></div>
        </div>
      </div>

      <div className="Charts">
        <div className="chart1">
          <Line
            data={state}
            width={220}
            height={60}
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
          
      
        </div>
      </div>

      <div className="OnGoing">
        <div className="ONG"></div>
      </div>
    </div>
  );
}

export default Home;
