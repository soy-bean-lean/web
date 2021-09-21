import Router from "express";
import connection from "../db.js";
import bcrypt from "bcrypt";
import pkg from "jsonwebtoken";
import validateToken from "../middlewares/AuthMiddleware.js";
import multer from "multer";
import pg from "rand-token";
import { createTransport } from "nodemailer";

const { suid } = pg;
const { sign } = pkg;

const userRouter = Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/profileImages");
  },
  filename: function (req, file, cb) {
    const ext = file.mimetype.split("/")[1];
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({
  storage: storage,
});
//addProfile pic

userRouter
  .route("/updateProfileImage")
  .post(upload.single("image"), (req, res, err) => {
    if (!req.file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG)$/)) {
      res.send({ msg: "Not an Image File." });
    } else {
      const image = req.file.filename;
      const memberId = req.body.memberId;

      connection.query(
        " UPDATE user SET profileImage =" +
          " '" +
          image +
          "'" +
          "  WHERE id = " +
          memberId +
          ";",

        (err, result) => {
          if (err) {
            console.log(err);
          } else {
            res.json("success");
          }
        }
      );
    }
  });

userRouter.post("/updateBasicDetails", async (req, res) => {
  const memberId = req.body.memberId;
  const firstName = req.body.firstName;
  const lastName = req.body.secondName;
  const residentialAddress = req.body.address;
  const contactNumber = req.body.contact;
  const birthDate = req.body.dob;
  const nic = req.body.nic;
  const email = req.body.email;
  connection.query(
    " UPDATE user SET firstName = '" +
      firstName +
      " ' , lastName = '" +
      lastName +
      " ' ,residentialAddress = '" +
      residentialAddress +
      " ' ,contactNumber = '" +
      contactNumber +
      " ' ,birthDate = '" +
      birthDate +
      " ' ,email = '" +
      email +
      " ' ,nic = '" +
      nic +
      " '  WHERE id = " +
      memberId +
      ";",

    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.json("success");
      }
    }
  );
});

//Register

userRouter.post("/", async (req, res) => {
  //member details
  const title = req.body.title;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const nic = req.body.nic;
  const residentialAddress = req.body.residentialAddress;
  const contactNumber = req.body.contactNumber;
  const birthDate = req.body.birthDate;
  const email = req.body.email;
  const password = req.body.password;
  const userType = req.body.category;

  //employment details
  const designation = req.body.designation;
  const companyName = req.body.companyName;
  const businessAddress = req.body.businessAddress;

  connection.query(
    "SELECT * FROM user WHERE email = ?",
    [email],
    (err, result) => {
      if (result.length <= 0) {
        bcrypt.hash(password, 10).then((hash) => {
          connection.query(
            `INSERT INTO user (title,firstName,lastName,nic,residentialAddress,contactNumber,birthDate,email,password,userType) VALUES (?,?,?,?,?,?,?,?,?,?)`,
            [
              title,
              firstName,
              lastName,
              nic,
              residentialAddress,
              contactNumber,
              birthDate,
              email,
              hash,
              userType,
            ],
            (err, row) => {
              if (err) {
                res.json({ error });
              } else {
                connection.query(
                  `INSERT INTO employmentdetails (userID, designation, companyName, businessAddress) VALUES (?,?,?,?)`,
                  [row.insertId, designation, companyName, businessAddress],
                  (err, result) => {
                    if (err) {
                      res.json({ err });
                    } else {
                      connection.query(
                        `INSERT INTO logininfo (un, pw) VALUES (?,?)`,
                        [email, hash],
                        (err, result) => {
                          if (err) {
                            res.json({ error });
                          } else {
                            const frommail = "cssl.system.info@gmail.com";
                            const tomail = email;
                            let smtpTransport = createTransport({
                              service: "Gmail",
                              port: 465,

                              auth: {
                                user: "cssl.system.info@gmail.com",
                                pass: "cssl@123",
                              },
                            });

                            var mailOptions = {
                              from: frommail,
                              to: tomail,
                              subject: "Account Verfication",
                              html: `
                <p>Hi ${firstName}, You details has been sent for the verification</p>               
                `,
                            };

                            smtpTransport.sendMail(
                              mailOptions,
                              (error, info) => {
                                if (error) {
                                  res.json({
                                    msg: "fail",
                                  });
                                } else {
                                  res.json({
                                    msg: "success",
                                  });
                                }
                              }
                            );

                            smtpTransport.close();
                          }
                        }
                      );
                    }
                  }
                );
              }
            }
          );
        });
      } else {
        res.json({ error: "Username already exists" });
      }
    }
  );
});

//login
//userRouter.post("/login", validateToken, async (req, res) => {
userRouter.post("/login", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  connection.query(
    //temporary sql query for testing
    "SELECT user.*, logininfo.* FROM user INNER JOIN logininfo ON user.email = logininfo.un WHERE user.paymentStatus=1 AND logininfo.un = ?",

    [username],
    (err, result) => {
      if (result.length > 0) {
        bcrypt.compare(password, result[0].pw).then((match) => {
          if (!match) {
            res.json({ errorPass: "Incorrect password" });
          } else {
            const id = result[0].id;
            connection.query(
              //temporary sql query for testing
              "SELECT * FROM member WHERE id=?",
              [id],
              (err, row) => {
                if (row.length > 0) {
                  const accessToken = sign(
                    {
                      firstName: result[0].firstName,
                      lastName: result[0].lastName,
                      id: result[0].id,
                      role: result[0].userType,
                      profileImage: result[0].profileImage,
                      email: username,
                      memberId: row[0].memberId,
                    },
                    "importantsecret"
                  );
                  console.log("_____" + result[0].profileImage);
                  res.json({
                    token: accessToken,
                    firstName: result[0].firstName,
                    lastName: result[0].lastName,
                    id: result[0].id,
                    role: result[0].userType,
                    profileImage: result[0].profileImage,
                    email: username,
                    memberId: row[0].memberId,
                  });
                } else {
                  const accessToken = sign(
                    {
                      firstName: result[0].firstName,
                      lastName: result[0].lastName,
                      id: result[0].id,
                      role: result[0].userType,
                      profileImage: result[0].profileImage,
                      email: username,
                      memberId: "",
                    },
                    "importantsecret"
                  );
                  console.log("_____" + result[0].profileImage);
                  res.json({
                    token: accessToken,
                    firstName: result[0].firstName,
                    lastName: result[0].lastName,
                    id: result[0].id,
                    role: result[0].userType,
                    profileImage: result[0].profileImage,
                    email: username,
                    memberId: "",
                  });
                }
              }
            );
          }
        });
      } else {
        res.json({ errorUser: "Username doesn't exists" });
      }
    }
  );

  // console.log("SELECT user.*, logininfo.* FROM user INNER JOIN logininfo ON user.email = logininfo.un WHERE logininfo.un = "+username);
});

//forgotPassword
userRouter.post("/forgot", async (req, res) => {
  const username = req.body.username;
  const token = suid(16);

  connection.query(
    //temporary sql query for testing
    "SELECT * FROM user WHERE email = ?",

    [username],
    (err, row) => {
      if (row.length > 0) {
        const id = row[0].id;
        connection.query(
          `INSERT INTO token (userID, token) VALUES (?,?)`,
          [id, token],
          (err, result) => {
            if (err) {
              res.json({ error });
            } else {
              const frommail = "cssl.system.info@gmail.com";
              const tomail = row[0].email;
              const web = `http://localhost:3000/reset/${token}`;
              let smtpTransport = createTransport({
                service: "Gmail",
                port: 465,

                auth: {
                  user: "cssl.system.info@gmail.com",
                  pass: "cssl@123",
                },
              });

              var mailOptions = {
                from: frommail,
                to: tomail,
                subject: "Reset Password",
                html: `
                <p>Hi ${row[0].firstName}, You can reset your account by clicking the link below</p>
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
              res.json({
                id: id,
              });
            }
          }
        );
      } else {
        res.json({ errorUser: "Username doesn't exists" });
      }
    }
  );
});

//resetPassword
userRouter.post("/reset", async (req, res) => {
  const password = req.body.password;
  const token = req.body.token;

  connection.query(
    "SELECT userID FROM `token` WHERE `token` = ?",
    [token],
    (err, row) => {
      const userID = row[0].userID;
      bcrypt.hash(password, 10).then((hash) => {
        connection.query(
          "UPDATE `user` SET `password` = ? WHERE `id` = ? ;",
          [hash, userID],
          (error, result, feilds) => {
            if (error) {
              res.send(error);
            } else {
              connection.query(
                "SELECT * FROM `user` WHERE `id` = ?",
                [userID],
                (err, emailResult) => {
                  connection.query(
                    "UPDATE `logininfo` SET `pw` = ? WHERE `un` = ? ;",
                    [hash, emailResult[0].email],
                    (error, result, feilds) => {
                      if (err) {
                        res.json({ error });
                      } else {
                        res.json("successfully updated database");
                      }
                    }
                  );

                  connection.query(
                    "DELETE FROM `token` WHERE `userID` = ?",
                    [userID],
                    (err, row) => {
                      const frommail = "cssl.system.info@gmail.com";
                      const tomail = emailResult[0].email;
                      const web = "http://localhost:3000/";
                      let smtpTransport = createTransport({
                        service: "Gmail",
                        port: 465,

                        auth: {
                          user: "cssl.system.info@gmail.com",
                          pass: "cssl@123",
                        },
                      });

                      var mailOptions = {
                        from: frommail,
                        to: tomail,
                        subject: "Password Reseted",
                        html: `
                      <p>Hi ${emailResult[0].firstName}, Your password have been reseted. You can login from the link below</p>
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
                  );
                }
              );
            }
          }
        );
      });
    }
  );

  //     if (row.length > 0) {
  //       const id = row[0].id;

  //       connection.query(
  //         `INSERT INTO token (userID, token) VALUES (?,?)`,
  //         [id, token],
  //         (err, result) => {
  //           if (err) {
  //             res.json({ error });
  //           } else {
  //             const frommail = "vegemartucsc@gmail.com";
  //             const tomail = row[0].email;
  //             const web = `http://localhost:3000/reset/${token}`;
  //             let smtpTransport = createTransport({
  //               service: "Gmail",
  //               port: 465,

  //               auth: {
  //                 user: "vegemartucsc@gmail.com",
  //                 pass: "vegemart 123",
  //               },
  //             });

  //             var mailOptions = {
  //               from: frommail,
  //               to: tomail,
  //               subject: "Reset Password",
  //               html: `
  //               <p>Hi ${row[0].firstName}, You can reset your account by clicking the link below</p>
  //               ${web}
  //               `,
  //             };

  //             smtpTransport.sendMail(mailOptions, (error, info) => {
  //               if (error) {
  //                 res.json({
  //                   msg: "fail",
  //                 });
  //               } else {
  //                 res.json({
  //                   msg: "success",
  //                 });
  //               }
  //             });

  //             smtpTransport.close();
  //             res.json({
  //               id: id
  //             });
  //           }
  //         }
  //       );
  //     } else {
  //       res.json({ errorUser: "Username doesn't exists" });
  //     }
  //   }
  // );
});

userRouter.post("/updatePassword", async (req, res) => {
  const currentPassword = req.body.currentPassword;
  const newPassword = req.body.newPassword;
  const memberId = req.body.memberId;

  connection.query(
    //temporary sql query for testing
    "SELECT password,email from user  WHERE id = ?",

    [memberId],
    (err, result) => {
      if (result.length > 0) {
        bcrypt.compare(currentPassword, result[0].password).then((match) => {
          if (!match) {
            res.json({ errorPass: "errorCurrent" });
          } else {
            /*   bcrypt.hash(newPassword, 10).then((hash) => {
              connection.query("UPDATE user SET password = '"+hash+" where id="+memberId+";",  
                (err, result) => {
                  if (err) {
                    res.json({ errorPass: "error" });
                  } else {
                    res.json("success");
                  }
                }
              );
            });
            bcrypt.hash(newPassword, 10).then((hash) => {
              connection.query("UPDATE user SET pw = '"+hash+" where un="+result[0].email+";",  
                (err, result) => {
                  if (err) {
                    res.json({ errorPass: "error" });
                  } else {
                    res.json("success");
                  }
                }
              );
            });*/
          }
        });
      } else {
        res.json({ errorPass: "error" });
      }
    }
  );
});
userRouter.post("/getProfileData", (req, res) => {
  const memberId = req.body.memberId;

  const sqlSelect = "select  * from user where id = " + memberId + ";";

  connection.query(sqlSelect, (err, result) => {
    res.send(result);
  });
});

//payment
userRouter.post("/payment", (req, res) => {
  const userID = req.body.id;

  connection.query(
    "SELECT * FROM `user` WHERE `id` = ?;",
    [userID],
    (error, result, feilds) => {
      if (error) {
        res.send(error);
      } else {
        res.json(result);
      }
    }
  );

  //paid
  userRouter.post("/paid", (req, res) => {
    const userID = req.body.id;
    const role = req.body.role;
    const amount = req.body.amount;
    const email = req.body.email;
    const fName = req.body.fName;
    const today = new Date();
    const year = today.getFullYear();

    if (req.body.amount != 0) {
      connection.query(
        "UPDATE `user` SET `paymentStatus` = ? WHERE `id` = ? ;",
        [1, userID],
        (error, result, feilds) => {
          if (error) {
            res.send(error);
          } else {
            connection.query(
              `INSERT INTO payment (year, amount, type, memberId) VALUES (?,?,?,?)`,
              [year, amount, role, userID],
              (err, result) => {
                if (err) {
                  res.json({ error });
                } else {
                  connection.query(`SELECT * FROM member;`, (err, result) => {
                    if (err) {
                      res.json({ error });
                    } else {
                      const rows = result.length + 1;
                      const memberID = "CSSL00" + rows;
                      console.log(memberID);
                      connection.query(
                        `INSERT INTO member (id, memberId, memberType) VALUES (?,?,?)`,
                        [userID, memberID, role],
                        (err, result) => {
                          if (err) {
                            res.json({ error });
                          } else {
                            const frommail = "cssl.system.info@gmail.com";
                            const tomail = email;
                            const web = `http://localhost:3000`;
                            let smtpTransport = createTransport({
                              service: "Gmail",
                              port: 465,

                              auth: {
                                user: "cssl.system.info@gmail.com",
                                pass: "cssl@123",
                              },
                            });

                            var mailOptions = {
                              from: frommail,
                              to: email,
                              subject: "CSSL account has been created",
                              html: `
                <p>Hi ${fName}, Now you can log into the system</p>
                ${web}                
                `,
                            };

                            smtpTransport.sendMail(
                              mailOptions,
                              (error, info) => {
                                if (error) {
                                  res.json({
                                    msg: "fail",
                                  });
                                } else {
                                  res.json({
                                    msg: "success",
                                  });
                                }
                              }
                            );
                            smtpTransport.close();
                          }
                        }
                      );
                    }
                  });
                }
              }
            );
          }
        }
      );
    } else {
    }
    // connection.query(
    //   "SELECT * FROM `user` WHERE `id` = ?;",
    //   [userID],
    //   (error, result, feilds) => {
    //     if (error) {
    //       res.send(error);
    //     } else {
    //       res.json(result);
    //     }
  });
  // const sqlSelect = "select  * from user where id = " + memberId + ";";

  // connection.query(sqlSelect, (err, result) => {
  //   res.send(result);
  // });
});

userRouter.get("/auth", validateToken, (req, res) => {
  res.json(req.user);
});

export default userRouter;
