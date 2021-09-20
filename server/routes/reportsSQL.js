import Router from "express";
import connection from "../db.js";
import bcrypt from "bcrypt";
import e from "express";

const reportsSQL = Router();

reportsSQL.post("/getCounts", (req, res) => {
  const memberId = req.body.memberId;
  console.log("member Id is - - getCounts- - -" + memberId);
  const sqlSelect =
    "SELECT SUM(Credits) As credits ,type from test GROUP by type         ;    ";
  // "SELECT SUM(credit) As credits ,recordType as type from cpdrecords GROUP by type where memberId = "+memberId+"; "
  console.log(sqlSelect);
  connection.query(sqlSelect, (err, result) => {
    res.send(result);
  });
});

reportsSQL.post("/getBlogCount", (req, res) => {
  const sqlSelect =
    "SELECT COUNT(`blogId`) As blogs  FROM blog ; "
    //"SELECT COUNT(id) As blogs  from test  ;    ";

  console.log(sqlSelect);
  connection.query(sqlSelect, (err, result) => {
    res.send(result);
  });
});

reportsSQL.post("/getUsers", (req, res) => {
  const sqlSelect =
    "SELECT COUNT(USER.firstName) As users  FROM user; "
    //"SELECT COUNT(id) As blogs  from test  ;    ";

  console.log(sqlSelect);
  connection.query(sqlSelect, (err, result) => {
    res.send(result);
  });
});

reportsSQL.post("/getPaidCount", (req, res) => {
  const year =req.body.year;
  const sqlSelect =
    "SELECT count(year) as paid FROM `payment`  where year='2021'; "
    //"SELECT COUNT(id) As blogs  from test  ;    ";

  console.log(sqlSelect);
  connection.query(sqlSelect, (err, result) => {
    res.send(result);
  });
});

reportsSQL.post("/getRecentUsers", (req, res) => {
  const sqlSelect =
    "SELECT * FROM `user` ORDER BY `user`.`registeredDate` ASC limit 8"
    //"SELECT COUNT(id) As blogs  from test  ;    ";

  console.log(sqlSelect);
  connection.query(sqlSelect, (err, result) => {
    res.send(result);
  });
});

reportsSQL.post("/payments", (req, res) => {
  const firstName = req.body.firstName;
  const type = req.body.type;
  const years = req.body.years;
  // const sqlSelect = "SELECT payment.*, user.id , user.firstName , user.lastName , user.email , member.id from member Inner JOIN user on user.id = member.id RIGHT join payment on payment.memberId = member.memberId;";
  const sqlSelect =
    "SELECT payment.*, user.id , user.firstName , user.lastName , user.email , member.id from member Inner JOIN user on user.id = member.id RIGHT join payment on payment.memberId = member.memberId  where user.firstName like '"+firstName+"%' And payment.type like '"+type+"%' and payment.year like '"+years+"%';";

  console.log(sqlSelect);
  connection.query(sqlSelect, (err, result) => {
    res.send(result);
  });
});

reportsSQL.post("/getYears", (req, res) => {
  const sqlSelect = "SELECT DISTINCT(payment.year) from payment;";
  console.log(sqlSelect);
  connection.query(sqlSelect, (err, result) => {
    res.send(result);
  });
});

export default reportsSQL;
