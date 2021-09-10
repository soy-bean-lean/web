import Router from "express";
import connection from "../db.js";
import bcrypt from "bcrypt";
import e from "express";

const dashBoardSQL = Router();

dashBoardSQL.post("/getCPDData", (req, res) => {
  const memberId =req.body.memberId;
  console.log("member Id is - - MONTH- - -" + memberId);
  const sqlSelect =
  
    "select extract(MONTH from AdDate) as month,sum(Credits) as credits from test group by month;"
    //"select extract(MONTH from recordDate) as month,sum(credit) as credits from cpdrecords group by month where memberId = "+memberId+";"

  console.log(sqlSelect);
  connection.query(sqlSelect, (err, result) => {
    res.send(result);
  });
});

dashBoardSQL.post("/getMemberData", (req, res) => {

  const sqlSelect =
  //member knk add wechcha date eka tygnn ona
    "select extract(YEAR from AdDate) as year,count(id) as members from test group by year;"
    //"select extract(MONTH from recordDate) as month,sum(credit) as credits from cpdrecords group by month ;"

  console.log(sqlSelect);
  connection.query(sqlSelect, (err, result) => {
    res.send(result);
  });
});

dashBoardSQL.post("/getCPDDataYear", (req, res) => {
  const memberId =req.body.memberId;
  console.log("member Id is - - YEAR- - -" + memberId);
    const sqlSelect =
  
    "select extract(Year from AdDate) as Year,sum(Credits) aS Credits, type from TEST group by Year,type; "
    //"select extract(Year from recordDate) as Year,sum(credit) aS Credits, recordType as type  from cpdrecords group by Year,type where memberId = "+memberId+";"

  console.log(sqlSelect);
  connection.query(sqlSelect, (err, result) => {
    console.log(result)

    res.send(result);
    
  });
});
dashBoardSQL.post("/getWorkshops", (req, res) => {
  const memberId =req.body.memberId;
  console.log("member Id is - - - getWorkshops- -" + memberId);
  const sqlSelect =
  
      "select extract(MONTH from AdDate) as month,count(Credits) as workshops from test group by month;"
   // "select extract(MONTH from fromDate) as month,count(credit) as workshops from cpdrecords group by month where memberId = "+memberId+";"

  console.log(sqlSelect);
  connection.query(sqlSelect, (err, result) => {
    console.log(result)

    res.send(result);
    
  });
});
dashBoardSQL.post("/payments", (req, res) => {
  const memberId =req.body.memberId;
  console.log("member Id is - - payments- - -" + memberId);
  const sqlSelect =
  
      "select SUM(`Credits`) as amount , yearNew as year from test group by yearNew;"
//      "select SUM(amount) as amount , year from payment group by year where memberId = "+memberId+";"

  console.log(sqlSelect);
  connection.query(sqlSelect, (err, result) => {
    console.log(result)

    res.send(result);
    
  });
});


export default dashBoardSQL;


/*

recent Activities 
blog
courseenrollment
cpdrecords
forum,
jobapplication
workshopparticipate
*/