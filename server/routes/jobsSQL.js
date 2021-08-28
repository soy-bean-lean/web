import Router from "express";
import connection from "../db.js";
import bcrypt from "bcrypt";
import e from "express";

const Job = Router();

const getJobs = Router();

Job.post("/", async (req, res) => {
  const companyName = req.body.companyName;

  const jobRole = req.body.jobRole;
  const location = req.body.location;
  const contact = req.body.contact;
  const email = req.body.email;
  const description = req.body.description;
  const addBy = 100;

  connection.query(
    `INSERT INTO jobvacancy (companyName,location,designation,email,contact,description,addBy) VALUES (?,?,?,?,?,?,?)`,
    [companyName, location, jobRole, email, contact, description, addBy],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.json("success");
      }
    }
  );
});

Job.post("/getJobs", (req, res) => {
  const name = req.body.companyName;
  const location = req.body.location;
  const role = req.body.jobRole;
  console.log(name);
  console.log(location);
  console.log(role);
  const sqlSelect =
    "SELECT jvId , companyName , location ,designation from jobvacancy where companyName like '" +
    name +
    "%' and location like '" +
    location +
    "%' and designation like '" +
    role +
    "%'";
  console.log(sqlSelect);
  connection.query(sqlSelect, (err, result) => {
    res.send(result);
  });
});

Job.post("/sendAnswers", (req, res) => {
  const numberOfQuestion = req.body.length * 1 - 1;
  var marks = 0;
  var memberId = "1001";
  var jobId = req.body[0];
  var finalMarks;

  for (let Qnumber = 1; Qnumber <= numberOfQuestion - 1; Qnumber++) {
    console.log(
      "_____________________" + Qnumber + "__________________________________"
    );
    const sqlSelect =
      "SELECT Correct from jobquestions where Qnumber =" + Qnumber + "";
    connection.query(sqlSelect, (err, result) => {
      const answer = result[0].Correct;
      console.log(answer);
      if (answer == req.body[Qnumber]) {
        marks = marks + 1;
      }
      finalMarks = (marks / numberOfQuestion) * 100;

      console.log("marks================= " + finalMarks);
    });
    //console.log("finalMarks -> " + finalMarks);
  }
});

Job.get("/getJobView", (req, res) => {
  const jid = req.query.id;
  console.log(jid);
  connection.query(
    "SELECT jvId , companyName , location ,designation,description ,contact ,email from jobvacancy where jvId = ?;",
    [jid],
    (error, result, feilds) => {
      if (error) console.log(error);
      else {
        // console.log(result);
        res.send(result);
      }
    }
  );
});

Job.post("/getQuestion", (req, res) => {
  const sqlSelect =
    "SELECT Qnumber  , Question , Answer1 ,Answer2,Answer3,Answer4,Correct from jobquestions ";

  connection.query(sqlSelect, (err, result) => {
    res.send(result);
  });
});

export default Job;
