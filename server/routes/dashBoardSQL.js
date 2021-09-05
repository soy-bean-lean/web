import Router from "express";
import connection from "../db.js";
import bcrypt from "bcrypt";
import e from "express";

const dashBoardSQL = Router();

dashBoardSQL.post("/getCPDData", (req, res) => {

  const sqlSelect =
  
    "select extract(MONTH from AdDate) as month,sum(Credits) as credits from test group by month;"

  console.log(sqlSelect);
  connection.query(sqlSelect, (err, result) => {
    res.send(result);
  });
});

dashBoardSQL.post("/getCPDDataYear", (req, res) => {

  const sqlSelect =
  
    "select extract(Year from AdDate) as Year,sum(Credits) aS Credits, type from TEST group by Year,type; "

  console.log(sqlSelect);
  connection.query(sqlSelect, (err, result) => {
    console.log(result)

    res.send(result);
    
  });
});

export default dashBoardSQL;
