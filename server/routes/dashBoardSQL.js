import Router from "express";
import connection from "../db.js";
import bcrypt from "bcrypt";
import e from "express";

const dashBoardSQL = Router();

dashBoardSQL.post("/getCPDData", (req, res) => {
  const memberId =req.body.memberId;
  const sqlSelect =
  
   // "select extract(MONTH from AdDate) as month,sum(Credits) as credits from test group by month;"
    "select extract(MONTH from recordDate) as month,sum(credit) as credits from cpdrecords where memberId = 'cssl001' group by month ;"
  connection.query(sqlSelect, (err, result) => {
    console.log(result)
    res.send(result);
  });
});

dashBoardSQL.post("/getMemberData", (req, res) => {

  const sqlSelect =
  //member knk add wechcha date eka tygnn ona
    //"select extract(YEAR from AdDate) as year,count(id) as members from test group by year;"
    "select extract(YEAR from registeredDate) as year,count(id) as members from user group by year ;"

  console.log(sqlSelect);
  connection.query(sqlSelect, (err, result) => {
    res.send(result);
  });
});

dashBoardSQL.post("/getCPDDataYear", (req, res) => {
  const memberId =req.body.memberId;
  console.log("member Id is - - YEAR- - -" + memberId);
    const sqlSelect =
  
   // "select extract(Year from AdDate) as Year,sum(Credits) aS Credits, type from TEST group by Year,type; "
    "select extract(Year from recordDate) as Year,sum(credit) aS Credits, recordType as types from cpdrecords where memberId = 'cssl001' group by Year,types "

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
   // "select extract(MONTH from fromDate) as month,count(credit) as workshops from cpdrecords where memberId = 'cssl001' group by month ;"
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

//Professional dashboard announcement
dashBoardSQL.post("/announcement", (req, res) => {
  connection.query(
    "SELECT * FROM `announcements` LIMIT 1;",
    (error, result, feilds) => {
      if (error) {
        res.send(error);
      } else {
        res.send(result);
      }
    }
  );
});


//Professional dashboard recent activities
dashBoardSQL.post("/recent", (req, res) => {

  const id = req.body.id;
  connection.query(
    "SELECT * FROM `recentactivities` WHERE memberID = ? LIMIT 2;",
    [id],
    (error, result, feilds) => {
      if (error) {
        res.send(error);
      } else {
        res.send(result);
      }
    }
  );
});

//Professional dashboard line chart-credits earned this year
dashBoardSQL.post("/creditsearned", (req, res) => {

  const id = req.body.id;
  connection.query(
    "select extract(MONTH from recordDate) as month,sum(credit) as credits from cpdrecords where memberId = 'cssl001' AND extract(YEAR from recordDate)=2021 group by month ",
    [id],
    (error, result, feilds) => {
      if (error) {
        res.send(error);
      } else {
        res.send(result);
      }
    }
  );
});

//Professional dashboard donut chart-activity type this year
dashBoardSQL.post("/activityType", (req, res) => {

  const id = req.body.id;
  connection.query(
    "select recordType,COUNT(recordType) as count from cpdrecords where memberId = 'cssl001' group by recordType;",
    [id],
    (error, result, feilds) => {
      if (error) {
        res.send(error);
      } else {
        res.send(result);
      }
    }
  );
});

dashBoardSQL.post("/categoryType", (req, res) => {

  const id = req.body.id;
  connection.query(
    "select recordCategory,COUNT(recordCategory) as count from cpdrecords where memberId = 'cssl001' group by recordCategory;",
    [id],
    (error, result, feilds) => {
      if (error) {
        res.send(error);
      } else {
        res.send(result);
      }
    }
  );
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