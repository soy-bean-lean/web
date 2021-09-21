import Router from "express";
import connection from "../db.js";
import bcrypt from "bcrypt";
import e from "express";

const dashBoardSQL = Router();

dashBoardSQL.post("/getCPDData", (req, res) => {
  const memberId = req.body.memberId;
  const sqlSelect =
    // "select extract(MONTH from AdDate) as month,sum(Credits) as credits from test group by month;"
    "select extract(MONTH from recordDate) as month,sum(credit) as credits from cpdrecords  group by month ;";
  connection.query(sqlSelect, (err, result) => {
    res.send(result);
  });
});

dashBoardSQL.post("/getMemberData", (req, res) => {
  const sqlSelect =
    //member knk add wechcha date eka tygnn ona
    //"select extract(YEAR from AdDate) as year,count(id) as members from test group by year;"
    "select extract(YEAR from registeredDate) as year,count(id) as members from user group by year ;";

  connection.query(sqlSelect, (err, result) => {
    res.send(result);
  });
});

dashBoardSQL.post("/getApplications", (req, res) => {
  const sqlSelect =
    "SELECT jobapplicant.jvId , jobapplicant.date ,COUNT(jobapplicant.jvId) as numberOfApplicent,jobvacancy.advertisment, jobvacancy.email , jobvacancy.companyName FROM `jobapplicant` INNER JOIN jobvacancy ON jobvacancy.jvId=jobapplicant.jvId  GROUP by jvId    ORDER BY `jobapplicant`.`date`  DESC limit 3";

  console.log(sqlSelect);
  connection.query(sqlSelect, (err, result) => {
    res.send(result);
  });
});

dashBoardSQL.post("/getCPDDataYear", (req, res) => {
  const memberId = req.body.memberId;
  const sqlSelect =
    // "select extract(Year from AdDate) as Year,sum(Credits) aS Credits, type from TEST group by Year,type; "
    "select extract(Year from recordDate) as Year,sum(credit) aS Credits, recordType as types from cpdrecords where memberId = 'cssl001' group by Year,types ";

  connection.query(sqlSelect, (err, result) => {
    res.send(result);
  });
});
dashBoardSQL.post("/getWorkshops", (req, res) => {
  const memberId = req.body.memberId;
  const sqlSelect =
    "select extract(MONTH from AdDate) as month,count(Credits) as workshops from test group by month;";
  // "select extract(MONTH from fromDate) as month,count(credit) as workshops from cpdrecords where memberId = 'cssl001' group by month ;"
  connection.query(sqlSelect, (err, result) => {
    res.send(result);
  });
});
dashBoardSQL.post("/payments", (req, res) => {
  const memberId = req.body.memberId;
  const sqlSelect =
    "select SUM(`Credits`) as amount , yearNew as year from test group by yearNew;";
  //      "select SUM(amount) as amount , year from payment group by year where memberId = "+memberId+";"

  connection.query(sqlSelect, (err, result) => {
    res.send(result);
  });
});
dashBoardSQL.post("/yearPayments", (req, res) => {
  const memberId = req.body.memberId;
  const sqlSelect =
    "select SUM(amount) as amount , year from payment group by year;";
  //      "select SUM(amount) as amount , year from payment group by year where memberId = "+memberId+";"

  connection.query(sqlSelect, (err, result) => {
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
    "SELECT * FROM `recentactivities` WHERE memberID = 2 LIMIT 4;",
    //[id],
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
    "select recordType,sum(credit) as count from cpdrecords where memberId = 'cssl001' group by recordType;",
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

//Professional dashboard pie chart-credits earned according to type this year
dashBoardSQL.post("/activityTypeCredits", (req, res) => {
  const id = req.body.id;
  connection.query(
    "select recordCategory,sum(credit) as credits from cpdrecords where memberId = 'cssl001' group by recordCategory;",
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

//Professional dashboard cpd progress percentage
dashBoardSQL.post("/progressPercentage", (req, res) => {
  const id = req.body.id;
  connection.query(
    "select sum(credit) as credits from cpdrecords where memberId = 'cssl001' AND extract(YEAR from recordDate)=2021;",
    [id],
    (error, result, feilds) => {
      if (error) {
        res.send(error);
      } else {
        const earnedCredits = result[0].credits;
        const percentage = (earnedCredits / 500) * 100;
        res.json(percentage);
      }
    }
  );
});

//Professional dashboard upcoming activities
dashBoardSQL.post("/upcoming", (req, res) => {
  const id = req.body.id;
  const today = new Date();
  const month = today.getMonth();  
  const real = month;

  connection.query(
    "select extract(DAY from recordDate) as day from cpdrecords where memberId = 'cssl001' AND extract(MONTH from recordDate)=? AND extract(YEAR from recordDate)=2021",
    [id,real],
    (error, result, feilds) => {
      if (error) {
        res.send(error);
      } else {
        res.send(result);
      }
    }
  );
});

//credits earned 
dashBoardSQL.post("/earned", (req, res) => {
  const id = req.body.id;
  connection.query(
    "select sum(credit) as credits from cpdrecords where memberId = 'cssl001' AND extract(YEAR from recordDate)=2021;",
    [id],
    (error, result, feilds) => {
      if (error) {
        res.send(error);
      } else {
        res.json(result[0].credits);
      }
    }
  );
});

//credits remaining 
dashBoardSQL.post("/remaining", (req, res) => {
  const id = req.body.id;
  connection.query(
    "select sum(credit) as credits from cpdrecords where memberId = 'cssl001' AND extract(YEAR from recordDate)=2021;",
    [id],
    (error, result, feilds) => {
      if (error) {
        res.send(error);
      } else {
        const earnedCredits = result[0].credits;
        const remaining = 500 - earnedCredits;
        res.json(remaining);
      }
    }
  );
});

//credits remaining percentage
dashBoardSQL.post("/remainingPercentage", (req, res) => {
  const id = req.body.id;
  connection.query(
    "select sum(credit) as credits from cpdrecords where memberId = 'cssl001' AND extract(YEAR from recordDate)=2021;",
    [id],
    (error, result, feilds) => {
      if (error) {
        res.send(error);
      } else {
        const earnedCredits = result[0].credits;
        const remaining = 500 - earnedCredits;
        const remainingPercentage = (remaining / 500) * 100;
        res.json(remainingPercentage);
      }
    }
  );
});

dashBoardSQL.post("/getUserCount", (req, res) => {
  const id = req.body.id;
  connection.query(
    "SELECT COUNT(user.id) as aaa, userType as type FROM `user` where status != 0 GROUP by user.userType ; ",
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

dashBoardSQL.post("/getUserStatus", (req, res) => {
  const id = req.body.id;
  connection.query(
    "SELECT COUNT(user.id) as bbb, status FROM `user` GROUP by user.status; ",
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
