import Router from "express";
import connection from "../db.js";
import { createTransport } from "nodemailer";

const secretaryRouter = Router();

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

secretaryRouter.post("/approve", async (req, res) => {
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
          "UPDATE `user` SET `status` = ?, `approval`=? WHERE `id` = ? ;",
          [1, secID, userID],
          (error, result, feilds) => {
            if (error) {
              res.send(error);
            } else {
              const frommail = "vegemartucsc@gmail.com";
              const tomail = row[0].email;
              const web = "http://localhost:3000/";
              let smtpTransport = createTransport({
                service: "Gmail",
                port: 465,

                auth: {
                  user: "vegemartucsc@gmail.com",
                  pass: "vegemart 123",
                },
              });

              var mailOptions = {
                from: frommail,
                to: tomail,
                subject: "CSSL Registration Approved",
                html: `
                <p>Hi ${row[0].firstName}, Your account have been approved by the CSSL.</p><p> You can log in to your account now.</p>
                ${web}                
                `,
              };

              smtpTransport.sendMail(mailOptions, (error, info) => {
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

              smtpTransport.close();
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

  connection.query(
    "SELECT * FROM `user` WHERE `id` = ? ;",
    [userID],
    (error, row, feilds) => {
      if (error) {
        res.send(error);
      } else {
        connection.query(
          "UPDATE `user` SET `status` = ?, `approval`=? WHERE `id` = ? ;",
          [2, secID, userID],
          (error, result, feilds) => {
            if (error) {
              res.send(error);
            } else {
              const frommail = "vegemartucsc@gmail.com";
              const tomail = row[0].email;
              let smtpTransport = createTransport({
                service: "Gmail",
                port: 465,

                auth: {
                  user: "vegemartucsc@gmail.com",
                  pass: "vegemart 123",
                },
              });

              var mailOptions = {
                from: frommail,
                to: tomail,
                subject: "CSSL Registration Rejected",
                html: `<p>Hi ${row[0].firstName}, Your Registration for CSSL have been rejected by the CSSL.</p><p> Please try to contact 1997 for more details. Thank you.</p>`,
              };

              smtpTransport.sendMail(mailOptions, (error, info) => {
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

              smtpTransport.close();
              res.send(result);
            }
          }
        );
      }
    }
  );
});

export default secretaryRouter;
