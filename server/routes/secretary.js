import Router from "express";
import connection from "../db.js";
import nodemailer from "nodemailer";

const secretaryRouter = Router();

/*
pending 0
approved 1
rejected 2
verified 3

*/

secretaryRouter.post("/all", async (req, res) => {
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

secretaryRouter.post("/regPending", async (req, res) => {
  connection.query(
    "SELECT * FROM `user` WHERE `status` = ? AND (`userType` = ? OR `userType` = ? OR `userType` = ? OR `userType` = ?);",
    [0, "student", "associate", "professional", "chartered"],
    (error, result, feilds) => {
      if (error) {
        res.send(error);
      } else {
        res.send(result);
      }
    }
  );
});

secretaryRouter.post("/regApproved", async (req, res) => {
  connection.query(
    "SELECT * FROM `user` WHERE `status` = ? AND (`userType` = ? OR `userType` = ? OR `userType` = ? OR `userType` = ?);",
    [1, "student", "associate", "professional", "chartered"],
    (error, result, feilds) => {
      if (error) {
        res.send(error);
      } else {
        res.send(result);
      }
    }
  );
});

secretaryRouter.post("/regRejected", async (req, res) => {
  connection.query(
    "SELECT * FROM `user` WHERE `status` = ? AND (`userType` = ? OR `userType` = ? OR `userType` = ? OR `userType` = ?);",
    [2, "student", "associate", "professional", "chartered"],
    (error, result, feilds) => {
      if (error) {
        res.send(error);
      } else {
        res.send(result);
      }
    }
  );
});

secretaryRouter.post("/regVerified", async (req, res) => {
  connection.query(
    "SELECT * FROM `user` WHERE `status` = ? AND (`userType` = ? OR `userType` = ? OR `userType` = ? OR `userType` = ?);",
    [3, "student", "associate", "professional", "chartered"],
    (error, result, feilds) => {
      if (error) {
        res.send(error);
      } else {
        res.send(result);
      }
    }
  );
});

secretaryRouter.post("/approve", async (req, res) => {
  const userID = req.body.userID;
  const secID = req.body.councilId;

  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "cssl.system.info@gmail.com",
      pass: "cssl@123",

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
                <p>,${row[0].title}. <b>${row[0].firstName} ${row[0].lastName}</b>, Your account have been approved by the CSSL.</p><p> Now You Can Log In To The System </p>`,
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

secretaryRouter.post("/verify", async (req, res) => {
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

secretaryRouter.post("/reject", async (req, res) => {
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

export default secretaryRouter;
