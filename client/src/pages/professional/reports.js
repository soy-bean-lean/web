import React, { useState, useEffect } from "react";
import "./style/reports.css";
import { makeStyles, Paper, Grid, alpha } from "@material-ui/core";
import { Line, Pie, Doughnut, Bar } from "react-chartjs-2";
import { Redirect } from "react-router-dom";
import Tabs from "./tabs";
import axios from "axios";

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
function Reports() {
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
        fill: false,
        lineTension: 0.5,
        backgroundColor: "#662bad",
        borderColor: "#662bad",
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
  console.log(
    "__________________" +
      courseData +
      "==" +
      workshopData +
      "==" +
      otherData +
      "___________________________"
  );
  //const  year = dataCPDYear[i].Year;
  /*var type = dataCPDYear[i].type;
    var credit = dataCPDYear[i].Credits;
    var l = yearData.length;
    if (yearData[l] === year) {
    } else {
      yearData.push(year);
    }
    if (type === "C") {
      courseData[l] = credit;
    }
    console.log(dataCPDYear[i]);*/

  const state2 = {
    labels: yearData,
    datasets: [
      {
        label: "Courses",
        backgroundColor: "#95e381",
        hoverBackgroundColor: "#060b60",
        data: courseData,
      },
      {
        label: "Workshops",
        backgroundColor: "#5a9e47",
        hoverBackgroundColor: "#060b60",
        data: workshopData,
      },
      {
        label: "Guest Lecture",
        backgroundColor: "#3c752b",
        hoverBackgroundColor: "#060b60",
        data: guestLect,
      },
      {
        label: "Other",
        backgroundColor: "#245217",
        hoverBackgroundColor: "#060b60",
        data: otherData,
      },
    ],
  };

  useEffect(() => {
    const data = {
      month: "",
      credit: "",
    };
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
    const dataY = {
      Year: "",
      credit: "",
      type: "",
    };
    axios
      .post("http://localhost:3001/Dash/getCPDDataYear", dataY)

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
    <div className="reports">
         <div className = "PieChart">

         </div>
         <div className = "LineChart">
         <center>
          <h3>Last Year Credit Progress</h3>
        </center>
        <div>
          <Line
            data={state}
            width={50}
            height={25}
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
         <div className = "CPDCount">
         
         </div>
         <div className = "BlogCount">

         </div>
         <div className = "BarChart">
         <center>
          <h3>Last 3 Year Credit Progress</h3>
        </center>{" "}
        <Bar
          data={state2}
          width={100}
          height={22}
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
         <div className = "Donut">

         </div>
    </div>
  );
}

export default Reports;

/*
 <div className="chart1">
        <center>
          <h3>Last 3 Year Credit Progress</h3>
        </center>{" "}
        <Bar
          data={state2}
          width={100}
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
      <div className="chart2">
        <center>
          <h3>Last Year Credit Progress</h3>
        </center>
        <div>
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
      <div className="chart3">
        <center>
          <h3>Last Year Credit Progress</h3>
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
  
*/