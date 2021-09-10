import React, { useState, useContext, useEffect } from "react";
// import jsPDF from "jspdf";
// import html2canvas from "html2canvas";
import "./style/reports.css";
import { makeStyles, Paper, Grid, alpha } from "@material-ui/core";
import { Line, Pie, Doughnut, Bar } from "react-chartjs-2";
import { Redirect } from "react-router-dom";
import Tabs from "./tabs";
import axios from "axios";
import CountUp from "react-countup";
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
function Reports() {
  // function printDocument() {
  //   const input = document.getElementById("divToPrint");
  //   html2canvas(input).then((canvas) => {
  //     const imgData = canvas.toDataURL("image/png");
  //     const pdf = new jsPDF({
  //       orientation: "landscape",
  //       unit: "in",
  //       format: [10, 9],
  //     });
  //     pdf.addImage(imgData, "JPEG", 0, 0);
  //     // pdf.output('dataurlnewwindow');
  //     pdf.save("download.pdf");
  //   });
  // }
  const { authState, setAuthState } = useContext(AuthContext);

  const [dataCPD, setData] = useState(null);
  const [dataCPDYear, setDataYear] = useState(null);
  const [length, setLength] = useState(null);
  const [lengthYear, setLengthYear] = useState(null);
  const [cpdDataCounts, setcpdDataCounts] = useState(null);
  const [blogCount, setBlogCount] = useState(null);

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
        backgroundColor: "#cfb874",
        borderColor: "#cfb874",
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
        console.log(),
        yearData.length !== 0
          ? yearData[l - 1] == year
            ? (l = yearData.length - 1)
            : yearData.push(year)
          : yearData.push(year),
        type === "C" ? (courseData[l] = credit) : console.log(),
        type === "W" ? (workshopData[l] = credit) : console.log(),
        type === "G" ? (guestLect[l] = credit) : console.log(),
        type === "O" ? (otherData[l] = credit) : console.log()
      )
    );

  const state2 = {
    labels: yearData,
    datasets: [
      {
        label: "Courses",
        backgroundColor: "#ffebb0",
        hoverBackgroundColor: "#ffebb0",
        data: courseData,
      },
      {
        label: "Workshops",
        backgroundColor: "#cfb874",
        hoverBackgroundColor: "#cfb874",
        data: workshopData,
      },
      {
        label: "Guest Lecture",
        backgroundColor: "#a1873b",
        hoverBackgroundColor: "#a1873b",
        data: guestLect,
      },
      {
        label: "Other",
        backgroundColor: "#695210",
        hoverBackgroundColor: "#695210",
        data: otherData,
      },
    ],
  };

  useEffect(() => {
    const data = {
      month: "",
      credit: "",
      memberId: authState.id,
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
      memberId: authState.id,
    };
    axios
      .post("http://localhost:3001/Dash/getCPDDataYear", dataY)

      .then((response) => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          setLengthYear(response.data.length);

          setDataYear(response.data);
        }
      })
      .catch((error) => {
        alert(error);
      });

    const dataCounts = {
      memberId: authState.id,
    };
    axios
      .post("http://localhost:3001/reports/getCounts", dataCounts)

      .then((response) => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          //console.log(response.data);
          setcpdDataCounts(response.data);
        }
      })
      .catch((error) => {
        alert(error);
      });

    axios
      .post("http://localhost:3001/reports/getBlogCount", dataCounts)

      .then((response) => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          setBlogCount(response.data);
        }
      })
      .catch((error) => {
        alert(error);
      });
  }, []);
  var all = 0;
  var type;
  var W;

  var C;
  cpdDataCounts &&
    cpdDataCounts.map(
      (cpdDataCounts) => (
        (all = all + cpdDataCounts.credits * 1),
        (type = cpdDataCounts.type),
        type === "C" ? (C = cpdDataCounts.credits * 1) : console.log(),
        type === "O" ? (W = cpdDataCounts.credits * 1) : console.log()
      )
    );
  var blogsCount;
  blogCount && blogCount.map((blogCount) => (blogsCount = blogCount.blogs * 1));

  const classes = useStyles();
  return (
    <div className="reports" id="divToPrint">
      <div className="PieChart">
      <div className="send">
          <a href="#" className="sendData" >
            Submit Answers
          </a>
        </div>

      </div>
      <div className="LineChart">
        <center>
          <h3 className="heading">Monthly Credits</h3>
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
      <div className="CPDCount">
        <h2 className="des">CPD Count</h2>
        <CountUp className="count" start={0} end={all} duration={3}></CountUp>
      </div>
      <div className="BlogCount">
        <h2 className="des">Your Blogs</h2>
        <CountUp
          className="count"
          start={0}
          end={blogsCount}
          duration={3}
        ></CountUp>
      </div>
      <div className="CourseCount">
        <h2 className="des">Courses CPD's</h2>
        <CountUp className="count" start={0} end={C} duration={3}></CountUp>
      </div>
      <div className="WorkshopCount">
        <h2 className="des">Workshop CPD's</h2>
        <CountUp className="count" start={0} end={W} duration={3}></CountUp>
      </div>
      <div className="BarChart">
        <center>
          <h3 className="heading">Year Wise Credits</h3>
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
