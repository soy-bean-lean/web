import Router from "express";
import connection from "../db.js";
import nodemailer from "nodemailer";

const councilRouter = Router();

/*
pending 0
approved 1
rejected 2
verified 3

*/

councilRouter.post("/all", async (req, res) => {
  connection.query(
    "SELECT * FROM `user` WHERE  (`userType` = 'student' OR `userType` = 'associate' OR `userType` = 'professional' OR `userType` = 'chartered') ORDER BY `user`.`registeredDate` DESC;",
    (error, result, feilds) => {
      if (error) {
        res.send(error);
      } else {
        res.send(result);
      }
    }
  );
});

councilRouter.post("/CoursePending", async (req, res) => {
  const sql="SELECT user.title,user.firstName,user.lastName,csslcourse.status,csslcourse.courseId ,csslcourse.name,csslcourse.skillLevel,csslcourse.duration,csslcourse.durationType FROM `csslcourse`  inner join member on member.memberId =csslcourse.conductedBy inner join user on user.id = member.id WHERE csslcourse.status = 'Pending'";

  connection.query(sql,
    (error, result, feilds) => {
      if (error) {
        res.send(error);
      } else {
        res.send(result);
      }
    }
  );
});

councilRouter.post("/CourseApproved", async (req, res) => {

  const sql="SELECT user.title,user.firstName,user.lastName,csslcourse.status,csslcourse.courseId,csslcourse.name,csslcourse.skillLevel,csslcourse.duration,csslcourse.durationType FROM `csslcourse`  inner join member on member.memberId =csslcourse.conductedBy inner join user on user.id = member.id WHERE csslcourse.status = 'Approved' order by approvedDate DESC";
  connection.query(sql  
    ,
    (error, result, feilds) => {
      if (error) {
        res.send(error);
      } else {
        res.send(result);
      }
    }
  );
});
councilRouter.post("/CoursesRejected", async (req, res) => {

  const sql="SELECT user.title,user.firstName,user.lastName,csslcourse.status,csslcourse.courseId,csslcourse.name,csslcourse.skillLevel,csslcourse.duration,csslcourse.durationType FROM `csslcourse`  inner join member on member.memberId =csslcourse.conductedBy inner join user on user.id = member.id WHERE csslcourse.status = 'Rejected'";
  connection.query(sql  
    ,
    (error, result, feilds) => {
      if (error) {
        res.send(error);
      } else {
        res.send(result);
      }
    }
  );
});

// councilRouter.post("/CoursesRejected", async (req, res) => {
//   const sql="SELECT * FROM `csslcourse` WHERE `status` = 'Rejected'";

//   connection.query(sql,
    
//     (error, result, feilds) => {
//       if (error) {
//         res.send(error);
//       } else {
//         res.send(result);
//       }
//     }
//   );
// });

councilRouter.post("/CourseDeleted", async (req, res) => {

  const sql="SELECT user.title,user.firstName,user.lastName,csslcourse.status,csslcourse.courseId ,csslcourse.name,csslcourse.skillLevel,csslcourse.duration,csslcourse.durationType FROM `csslcourse`  inner join member on member.memberId =csslcourse.conductedBy inner join user on user.id = member.id WHERE csslcourse.status = 'Deleted'";
  connection.query(sql,
    
    (error, result, feilds) => {
      if (error) {
        res.send(error);
      } else {
        res.send(result);
      }
    }
  );
});

councilRouter.post("/approve", async (req, res) => {
  const userID = req.body.userID;
  const secID = req.body.councilId;

  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "2018cs071@stu.ucsc.cmb.ac.lk",
      pass: "Chamika@97",

      //cssl.system.info@gmail.com
    },
  });
  connection.query(
    "SELECT * FROM `user` WHERE `id` = ? ;",
    [userID],
    (error, row) => {
      if (error) {
        res.send(error);
      } else {
        connection.query(
          "UPDATE `user` SET `status` = ?, `approvedBy`=? WHERE `id` = ? ;",
          [1, secID, userID],
          (error, result, feilds) => {
            if (error) {
              res.send(error);
            } else {
              const tomail = row[0].email;
              var mailOptions = {
                from: "2018cs071@stu.ucsc.cmb.ac.lk",
                to: tomail,
                subject: "CSSL Registration Approved",
                html: `
                <p>Hi ${row[0].firstName}, Your account have been approved by the CSSL.</p><p> You can log in to your account now.</p>`,
              };

              transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                  res.json({
                    msg: "fail",
                  });
                } else {
                  res.json({
                    msg: "success",
                  });
                }
              });
              res.send(result);
            }
          }
        );
      }
    }
  );
});

councilRouter.post("/verify", async (req, res) => {
  const userID = req.body.userID;
  const secID = req.body.secID;

  connection.query(
    "SELECT * FROM `user` WHERE `id` = ? ;",
    [userID],
    (error, row) => {
      if (error) {
        res.send(error);
      } else {
        connection.query(
          "UPDATE `user` SET `status` = ?, `veryfiedBy`=? WHERE `id` = ? ;",
          [3, secID, userID],
          (error, result, feilds) => {
            if (error) {
              res.send(error);
            } else {
              res.send(result);
            }
          }
        );
      }
    }
  );
});

councilRouter.post("/reject", async (req, res) => {
  const userID = req.body.userID;
  const secID = req.body.secID;
  console.log(userID);
  console.log(secID);
  connection.query(
    "SELECT * FROM `user` WHERE `id` = ? ;",
    [userID],
    (error, row, feilds) => {
      if (error) {
        res.send(error);
      } else {
        connection.query(
          "UPDATE `user` SET `status` = ?, `approvedBy`=? WHERE `id` = ? ;",
          [2, secID, userID],
          (error, result, feilds) => {
            if (error) {
              res.send(error);
            } else {
              res.send(result);
            }
          }
        );
      }
    }
  );
});

//approve content (CourseContentApprovalView.js)
councilRouter.post("/approveContent", (req, res) => {
  const cid = req.body.cId;
  const cntid = req.body.cntId;
  const status = 'Approved';
  connection.query(
    "UPDATE coursecontent SET status = ? WHERE courseId = ? AND contentId = ?;",
    [status, cid, cntid],
    (error, result, feilds) => {
      if (error) console.log(error);
      else {
        res.send(result);
      }
    }
  );
});

//reject content (CourseContentApprovalView.js)
councilRouter.post("/rejectContent", (req, res) => {
  const cid = req.body.cId;
  const cntid = req.body.cntId;
  const status = 'Rejected';
  connection.query(
    "UPDATE coursecontent SET status = ? WHERE courseId = ? AND contentId = ?;",
    [status, cid, cntid],
    (error, result, feilds) => {
      if (error) console.log(error);
      else {
        res.send(result);
      }
    }
  );
});

//approve course (CourseApprovalView.js)
councilRouter.post("/approveCourse", (req, res) => {
  const mid = req.body.mId;
  const cid = req.body.cId;
  const credit = req.body.credit;
  const appDate = req.body.appDate;
  const status = 'Approved';
  connection.query(
    "UPDATE csslcourse SET status = ?, credit = ?, approvedBy = ?, approvedDate = ? WHERE courseId = ?;",
    [status, credit, mid, appDate, cid],
    (error, result, feilds) => {
      if (error) console.log(error);
      else {
        res.send(result);
      }
    }
  );
});

//reject course (CourseApprovalView.js)
councilRouter.post("/rejectCourse", (req, res) => {
  const mid = req.body.mId;
  const cid = req.body.cId;
  const appDate = req.body.appDate;
  const status = 'Rejected';
  connection.query(
    "UPDATE csslcourse SET status = ?, approvedBy = ?, approvedDate = ? WHERE courseId = ?;",
    [status, mid, appDate, cid],
    (error, result, feilds) => {
      if (error) console.log(error);
      else {
        res.send(result);
      }
    }
  );
});

//change status of the course contents of a relevant course according to a course status (CourseApprovalView.js)
councilRouter.post("/changeAllContentStatus", (req, res) => {
  const cid = req.body.cId;
  const status = req.body.status;
  connection.query(
    "UPDATE coursecontent SET status = ? WHERE courseId = ?;",
    [status, cid],
    (error, result, feilds) => {
      if (error) console.log(error);
      else {
        res.send(result);
      }
    }
  );
});

export default councilRouter;
