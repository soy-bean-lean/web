import React from "react";
// import "../pages/style/dashboard.css";
import "./style/dashboard.css";
import { makeStyles, Paper, Grid } from "@material-ui/core";
import { Line, Pie, Doughnut, Bar } from "react-chartjs-2";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: 30,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    height: 200,
  },
}));

const state = {
  labels: ["2013", "2014", "2015", "2016", "2017", "2018", "2019", "2020"],
  datasets: [
    {
      label: "Members in CSSL",
      fill: false,
      lineTension: 0.5,
      backgroundColor: "rgba(75,192,192,1)",
      borderColor: "rgba(0,0,0,1)",
      borderWidth: 2,
      data: [65, 59, 80, 81, 56, 70, 80, 40],
    },
  ],
};

const state1 = {
  labels: [
    "2012",
    "2013",
    "2014",
    "2015",
    "2016",
    "2017",
    "2018",
    "2019",
    "2020",
  ],
  datasets: [
    {
      label: "Rainfall",
      backgroundColor: [
        "#00A6B4",
        "#00A6B4",
        "#00A6B4",
        "#00A6B4",
        "#00A6B4",
        "#00A6B4",
        "#00A6B4",
        "#00A6B4",
        "#00A6B4",
      ],
      hoverBackgroundColor: [
        "#003350",
        "#003350",
        "#003350",
        "#003350",
        "#003350",
        "#003350",
        "#003350",
        "#003350",
        "#003350",
      ],
      data: [
        40000, 45000, 30000, 20000, 45000, 12345, 2300, 6000, 45000, 23000,
      ],
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

      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12}>
            <Paper className={classes.paper} elevation={3}>
              <div className="chart1">
                <Line
                  data={state}
                  width={200}
                  height={40}
                  options={
                    ({ options },
                    {
                      title: {
                        display: true,
                        text: "Average Rainfall per month",
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
            </Paper>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Paper className={classes.paper} elevation={3}>
              <Bar
                data={state1}
                width={100}
                height={40}
                options={{
                  title: {
                    display: true,
                    text: "Average Rainfall per month",
                    fontSize: 20,
                  },
                  legend: {
                    display: true,
                    position: "left",
                  },
                }}
              />
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper className={classes.paper} elevation={3}>
              <Doughnut
                data={state}
                options={{
                  title: {
                    display: true,
                    text: "Average Rainfall per month",
                    fontSize: 20,
                  },
                  legend: {
                    display: true,
                    position: "left",
                  },
                }}
              />
            </Paper>
          </Grid>
        </Grid>
      </div>
      {/* 
      <div className="Charts">
        <div className="chart1">chart1</div>
        <div className="chart2">chart2</div>
      </div>

      <div className="OnGoing">
        <div className="ONG" >ongoing</div>

      </div> */}
    </div>
  );
}

export default Home;
