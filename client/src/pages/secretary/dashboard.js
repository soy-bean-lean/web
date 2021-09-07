import React, { useState, useEffect } from "react";
import axios from "axios";
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


const state2 = {
  labels: ["2015", "2016", "2017", "2018", "2019", "2020"],
  datasets: [
    {
      label: "Student",
      backgroundColor: "#D5E6F3",
      hoverBackgroundColor: "#060b60",
      data: [100, 200, 300, 230, 170, 300],
    },
    {
      label: "Associate Member",
      backgroundColor: "#94C0E1",
      hoverBackgroundColor: "#060b60",
      data: [200, 340, 450, 560, 780, 123],
    },
    {
      label: "Professional Memeber",
      backgroundColor: "#4C90C3",
      hoverBackgroundColor: "#060b60",
      data: [20, 40, 50, 60, 80, 123],
    },
    {
      label: "Chartered Member",
      backgroundColor: "#4199DC",
      hoverBackgroundColor: "#060b60",
      data: [20, 40, 50, 60, 100, 130],
    },
  ],
};

const options = {
  maintainAspectRatio: false,
};

function Home() {
  const [lengthMember, setLengthMember] = useState(null);
  const [members, setMemebrs] = useState(null);
  const [payments, setPayments] = useState(null);

  var years = [];
  var yearData = [];

  members &&
    members.map(
      (members) => (years.push(members.year), yearData.push(members.members))
    );

  var yearsPayment= [];
  var yearsPaymentData = [];

  payments &&
  payments.map(
      (payments) => (yearsPayment.push(payments.year), yearsPaymentData.push(payments.amount))
    );


  useEffect(() => {
    const data = {
      id: "",
    };
    axios
      .post("http://localhost:3001/Dash/payments", data)

      .then((response) => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          setPayments(response.data);
        }
      })
      .catch((error) => {
        alert(error);
      });

    axios
      .post("http://localhost:3001/Dash/getMemberData", data)

      .then((response) => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          setMemebrs(response.data);
          setLengthMember(response.data.length);
        }
      })
      .catch((error) => {
        alert(error);
      });
  }, []);

  const state = {
    labels: years,
    datasets: [
      {
        label: "Total Members",
        fill: true,
        lineTension: 0.5,
        backgroundColor: " #c5fcd4 ",
        borderColor: "#187d34 ",
        borderWidth: 3,
        data: yearData,
      },
    ],
  };
  const state1 = {
    labels:yearsPayment,
    datasets: [
      {
        label: "Toatal Payments of the Last Years",
        backgroundColor: "#f25050",
        hoverBackgroundColor: "#060b60",
        data: yearsPaymentData,
      },
    ],
  };
  
  const classes = useStyles();
  return (
    <div className="main">
      <div className="OnGoing">
        <center>
          <h2>Members in CSSL</h2>
        </center>
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
