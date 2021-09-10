import Router from "express";
import connection from "../db.js";
import bcrypt from "bcrypt";
import e from "express";

const reportsSQL = Router();

reportsSQL.post("/getCounts", (req, res) => {
  const memberId =req.body.memberId;
  console.log("member Id is - - getCounts- - -" + memberId);
  const sqlSelect =
  
    "SELECT SUM(Credits) As credits ,type from test GROUP by type         ;    "
   // "SELECT SUM(credit) As credits ,recordType as type from cpdrecords GROUP by type where memberId = "+memberId+"; "
  console.log(sqlSelect);
  connection.query(sqlSelect, (err, result) => {
    res.send(result);
  });
});

reportsSQL.post("/getBlogCount", (req, res) => {
  const memberId =req.body.memberId;
  console.log("member Id is - - getBlogCount- - -" + memberId);
  const sqlSelect =
  
    //"SELECT COUNT(`blogId`) As blogs  FROM blog where memberId = "+memberId+"; "
    "SELECT COUNT(id) As blogs  from test  ;    "

  console.log(sqlSelect);
  connection.query(sqlSelect, (err, result) => {
    res.send(result);
  });
});



export default reportsSQL;
