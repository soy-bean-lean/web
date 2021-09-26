import React, { useState,useContext, useEffect } from "react";
import axios from "axios";

import "./style/dashboard.css";
import { makeStyles, Paper, Grid } from "@material-ui/core";
import { Line, Pie, Bar } from "react-chartjs-2";
import { AuthContext } from "../../helpers/AuthContext";
import { Redirect } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {},
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    height: 200,
    width: 100,
  },
}));



const options = {
  maintainAspectRatio: false,
};
function Home() {
  const { authState, setAuthState } = useContext(AuthContext);

  const [dataCPD, setData] = useState(null);
  const [members, setMemebrs] = useState(null);
  const [workshops, setWorkshops] = useState(null);
  const [length, setLength] = useState(null);
  const [lengthMember, setLengthMember] = useState(null);
  const [workshopsLength, setLengthWorkshops] = useState(null);
  const [lengthYear, setLengthYear] = useState(null);

  var months = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  for (var i = 0; i < length; i++) {
    months[dataCPD[i].month] = dataCPD[i].credits;
  }

  var monthsWorkshops = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  for (var i = 0; i < workshopsLength; i++) {
    monthsWorkshops[workshops[i].month] = workshops[i].workshops;
  }
  
  var years = [];
  var yearData = [];

  members &&
    members.map(
      (members) => (years.push(members.year), yearData.push(members.members))
    );
  const state2 = {
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
        label: "Total Activity",
        fill: true,
        lineTension: 0.5,
        backgroundColor: " #ffccd0 ",
        borderColor: "#ff6370",
        borderWidth: 1,
        data: months,
      },
    ],
  };
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
        label: "Toatal Workshop",
        fill: true,
        backgroundColor: "#defff9",
        borderColor:"#8ee6d6",
        hoverBackgroundColor: "#9ff5e5",
        borderWidth: 2,
        
        data: monthsWorkshops,
      },
    ],
  };
  
  useEffect(() => {
    const data = {
      memberId:authState.id,
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
    axios
      .post("http://localhost:3001/Dash/getWorkshops", data)

      .then((response) => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          console.log(response.data)

          setWorkshops(response.data);
          setLengthWorkshops(response.data.length);
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
  const classes = useStyles();
  return (
    <div className="main">
      <div className="Charts">
        <div className="chart1">
          <center>
            <h3>Workshop Count</h3>
          </center>
          <Bar
            data={state1}
            width={150}
            height={50}
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
            <h3>CPD Activity Progree</h3>
          </center>
          <Line data={state2} width={220} height={70} options={{ options }} />
        </div>
      </div>

      <div className="OnGoing">
        <center>
          <h2>Members in CSSL</h2>
        </center>
        <div className="ONG">
          <Line
            data={state}
            width={220}
            height={45}
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
