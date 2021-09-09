import React, { useState, useContext, useEffect } from "react";
import "./style/dashboard.css";
import { makeStyles, Paper, Grid, alpha } from "@material-ui/core";
import { Line, Pie, Doughnut, Bar } from "react-chartjs-2";
import { Redirect } from "react-router-dom";
import Tabs from "./tabs";
import axios from "axios";
import { AuthContext } from "../../helpers/AuthContext";

const useStyles = makeStyles((theme) => ({
  root: {},
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    height: 200,
  },
}));


const options = {
  maintainAspectRatio: false,
};
function Home() {
  const { authState, setAuthState } = useContext(AuthContext);

  const [dataCPD, setData] = useState(null);
  const [dataCPDYear, setDataYear] = useState(null);
  const [length, setLength] = useState(null);
  const [lengthYear, setLengthYear] = useState(null);
  var months = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  for (var i = 0; i < length; i++) {
    months[dataCPD[i].month] = dataCPD[i].credits;
  }
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
        fill: true,
        lineTension: 0.5,
        backgroundColor: "#bdc8ff",
        borderColor: "#136CDC",
        borderWidth: 3,
        data: months,
      },
    ],
  };

  var courseData = [0, 0, 0];
  var workshopData = [0, 0, 0];
  var otherData = [0, 0, 0];
  var guestLect = [0, 0, 0];
  var yearData = [];
  var year, type, credit;
  var l;

  dataCPDYear &&
    dataCPDYear.map(
      (dataCPDYear) => (
        (year = dataCPDYear.Year),
        (type = dataCPDYear.type),
        (credit = dataCPDYear.Credits),
        (l = yearData.length),
        console.log(
          "year is -" +
            year +
            "------" +
            yearData.length +
            "-----" +
            yearData[l - 1]
        ),
        yearData.length !== 0
          ? yearData[l - 1] == year
            ? (l = yearData.length - 1)
            : yearData.push(year)
          : yearData.push(year),
        type === "C"
          ? (courseData[l] = credit)
          : console.log("-->" + l + "---------"),
        type === "W"
          ? (workshopData[l] = credit)
          : console.log("-->" + l + "---------"),
        type === "G"
          ? (guestLect[l] = credit)
          : console.log("-->" + l + "---------"),
        type === "O"
          ? (otherData[l] = credit)
          : console.log("-->" + l + "---------"),
        console.log(yearData),
        console.log(courseData + "-->" + l + "---------"),
        console.log(workshopData + "-->" + l + "---------"),
        console.log(otherData + "-->" + l + "---------"),
        console.log(year + "===========" + type + "============" + credit)
      )
    );

  const state2 = {
    labels: yearData,
    datasets: [
      {
        label: "Courses",
        backgroundColor: "#f5e9ae",
        borderColor: "#e6ca40",
        borderWidth: 2,
        data: courseData,
      },
      {
        label: "Workshops",
        backgroundColor: "#bdffc1",
        borderColor: "#43ba4a",
        borderWidth: 2,
        data: workshopData,
      },
      {
        label: "Guest Lecture",
        backgroundColor: "#a0b0f2",
        borderColor: "#4d6ceb",
        borderWidth: 2,
        data: guestLect,
      },
      {
        label: "Other",
        backgroundColor: "#f5a4a7",
        borderColor: "#de3e43",
        borderWidth: 2,
        data: otherData,
      },
    ],
  };

  useEffect(() => {
    const data = {
      memberId: authState.id,
    };
    console.log(data.memberId);
    axios
      .post("http://localhost:3001/Dash/getCPDData", data)

      .then((response) => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          setData(response.data);
          setLength(response.data.length);
        }
      })
      .catch((error) => {
        alert(error);
      });

    axios
      .post("http://localhost:3001/Dash/getCPDDataYear", data)

      .then((response) => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          console.log(response.data);

          setLengthYear(response.data.length);

          setDataYear(response.data);
        }
      })
      .catch((error) => {
        alert(error);
      });
  }, []);

  const classes = useStyles();

  return (
    <div className="mainDashPro">
      <div className="progress">
        <div className="progressBar">
          <div className="progressColour"></div>
        </div>
        <div>
          <h3>75 %</h3>
        </div>
      </div>

      <div className="chartPro">
        <center>
          <h3>Year wise Credits</h3>
        </center>{" "}
        <Bar
          data={state2}
          width={80}
          height={14}
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
          <p> Start Course - Angular - The Complete Guide - 2021 / July /10</p>
        </div>
        <div className="recent">
          {" "}
          <p> Apply a Job -Cambi Software (SE)- 2021 / June /29</p>
        </div>
        <div className="recent">
          {" "}
          <p>
            {" "}
            Uploaded CPD -Attendt to a Workshop in Microsoft - 2021 / June /25
          </p>
        </div>
      </div>

      <div className="chart3">
        <center>
          <h3>Monthly Credits</h3>
        </center>
        <div className="ONG2">
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
      </div>
    </div>
  );
}

export default Home;
