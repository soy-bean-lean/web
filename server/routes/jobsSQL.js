import Router from "express";
import multer from "multer";
import connection from "../db.js";
import nodemailer from "nodemailer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/jobvacancy");
  },
  filename: function (req, file, cb) {
    const ext = file.mimetype.split("/")[1];
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({
  storage: storage,
});
const storageCV = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/jobApplicationCVs");
  },
  filename: function (req, file, cb) {
    const ext = file.mimetype.split("/")[1];
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const uploadCV = multer({
  storage: storageCV,
});

const Job = Router();

const getJobs = Router();

Job.route("/").post(upload.single("image"), (req, res, err) => {
  if (!req.file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG)$/)) {
    res.send({ msg: "Not an Image File." });
  } else {
    const companyName = req.body.companyName;
    const location = req.body.location;
    const jobRole = req.body.jobRole;
    const contact = req.body.contact;
    const email = req.body.email;
    const description = req.body.description;
    const addBy = req.body.memberId;
    const questionCount = req.body.count;
    const questionType = req.body.type;
    const image = req.file.filename;

    connection.query(
      `INSERT INTO jobvacancy (companyName,location,designation,email,contact,description,addBy,advertisment,activity,questionCount,questionType) VALUES (?,?,?,?,?,?,?,?,?,?,?)`,
      [
        companyName,
        location,
        jobRole,
        email,
        contact,
        description,
        addBy,
        image,
        "open",
        questionCount,
        questionType,
      ],
      (err, result) => {
        if (err) {
          console.log(err);
          res.send(result);
        } else {
          res.json("success");
        }
      }
    );
  }
});

Job.post("/updateJob", async (req, res) => {
  const companyName = req.body.companyName;
  const location = req.body.location;
  const jobRole = req.body.jobRole;
  const contact = req.body.contact;
  const email = req.body.email;
  const activity = req.body.activity;
  const description = req.body.description;
  const addBy = req.body.addBy;
  const jvId = req.body.jvId;
  const questionType = req.body.questionType;
  const numberOfQuestions = req.body.numberOfQuestions;
  var i = numberOfQuestions;
  const sqlSelect =
    "SELECT count(type) as max , type from jobquestions where type = '" +
    questionType +
    "' GROUP BY type;";

  console.log(activity);
  connection.query(sqlSelect, (err, result1) => {
    if (result1[0].max < numberOfQuestions) {
      i = result1[0].max;

      connection.query(
        " UPDATE jobvacancy SET companyName = '" +
          companyName +
          " ' , location = '" +
          location +
          " ' , activity = '" +
          activity +
          "' ,designation = '" +
          jobRole +
          " ' ,email = '" +
          email +
          " ' ,contact = '" +
          contact +
          " ' ,addBy = '" +
          addBy +
          " ' ,email = '" +
          email +
          " ' ,questionCount = '" +
          i +
          " ' ,questionType = '" +
          questionType +
          " ' ,description = '" +
          description +
          " '  WHERE jvId=" +
          jvId +
          ";",

        (err, result) => {
          if (err) {
            res.send(result);
          } else {
            res.json("success");
          }
        }
      );
    } else {
      i = parseInt(numberOfQuestions);
      console.log("+================");

      console.log(
        " UPDATE jobvacancy SET activity = '" +
          activity +
          " ' , location = '" +
          location +
          " ' ,designation = '" +
          jobRole +
          " ' ,email = '" +
          email +
          " ' ,contact = '" +
          contact +
          " ' ,addBy = '" +
          addBy +
          " ' ,email = '" +
          email +
          " ' ,questionCount = '" +
          i +
          " ' ,questionType = '" +
          questionType +
          " ' ,description = '" +
          description +
          " '  WHERE jvId=" +
          jvId +
          ";"
      );
      connection.query(
        " UPDATE jobvacancy SET companyName = '" +
          companyName +
          " ' , location = '" +
          location +
          " ' , activity ='" +
          activity +
          "' ,designation = '" +
          jobRole +
          " ' ,email = '" +
          email +
          " ' ,contact = '" +
          contact +
          " ' ,addBy = '" +
          addBy +
          " ' ,email = '" +
          email +
          " ' ,questionCount = '" +
          i +
          " ' ,questionType = '" +
          questionType +
          " ' ,description = '" +
          description +
          " '  WHERE jvId=" +
          jvId +
          ";",

        (err, result) => {
          if (err) {
            res.send(result);
          } else {
            res.json("success");
          }
        }
      );
    }
  });
});

Job.post("/updateQuestion", async (req, res) => {
  const question = req.body.question;
  const ans1 = req.body.ans1;
  const ans2 = req.body.ans2;
  const ans3 = req.body.ans3;
  const ans4 = req.body.ans4;
  const correct = req.body.correct * 1;
  const qid = req.body.qid;
  const questionType = req.body.questionType;

  const sql =
    " UPDATE jobquestions SET Question = '" +
    question +
    " ' , Answer1 = '" +
    ans1 +
    " ' ,Answer2 = '" +
    ans2 +
    " ' ,Answer3 = '" +
    ans3 +
    " ' ,Answer4 = '" +
    ans4 +
    " ' ,type = '" +
    questionType +
    " ',Correct = " +
    correct +
    "   WHERE Qnumber=" +
    qid +
    ";";

  console.log(sql);
  connection.query(sql, (err, result) => {
    if (err) {
      res.send(result);
    } else {
      res.json("success");
    }
  });
});

Job.post("/sendEmail", async (req, res) => {
  const password = req.body.password;
  const number = req.body.number;
  const jobId = req.body.jobId;

  const from = "cssl.system.info@gmail.com"; //system mail
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "cssl.system.info@gmail.com",
      pass: "cssl@123",
      // user: "cssl.system.info@gmail.com",
      // pass: "cssl@123",
      //cssl.system.info@gmail.com
    },
  });
  const sqlSelect =
    "SELECT jobapplicant.cv , user.firstName ,user.lastName ,user.title ,jobapplicant.jvId,  user.email,jobvacancy.designation ,jobapplicant.date ,jobvacancy.email as companyemail ,jobapplicant.marks, jobapplicant.memberId FROM `jobapplicant` LEFT JOIN user ON user.id=jobapplicant.memberId LEFT JOIN jobvacancy on jobvacancy.jvId = jobapplicant.jvId WHERE jobapplicant.jvId =  " +
    jobId +
    " ORDER BY `jobapplicant`.`marks`  DESC limit "+number;

  connection.query(sqlSelect, (err, result) => {
    var i = 0;

    for (i = 0; i < result.length; i++) {
      const email = result[i].email;
      const date = result[i].date;
      const jvId = result[i].jvId;
      const designation = result[i].designation;
      const firstName = result[i].firstName;
      const lastName = result[i].lastName;
      const title = result[i].title;
      const companyemail = result[i].companyemail;
      const marks = result[i].marks;
      const cv = result[i].cv;
      console.log(
        companyemail + " --- " + email + "---" + firstName + " " + lastName
      );

      var mailOptions = {
        from: "cssl.system.info@gmail.com",
        to: companyemail,
        cc: email,
        subject: "Job Application for " + designation,

        html: `
        <p>Dear HR Manager,This is a CV of Our CSSL Member ${firstName} For The ${designation}</p>               
        `,

        // text:
        //   "Dear HR Manager,"+title+""+ firstName +""+lastName +"CV is attached with this email as " +title+""+firstName+" has applied for a job vaccancy -" +designation +
        //   " on last " +
        //   date +
        //   "",
        attachments: [
          {
            filename: cv,
            path: "http://localhost:3001/uploads/jobApplicationCVs/" + cv,
            contentType: "application/pdf",
          },
        ],
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          res.send(result);
        } else {
          connection.query(
            " UPDATE jobvacancy SET activity = 'close'  WHERE jvId=" +
              jvId +
              ";",

            (err, result) => {
              if (err) {
                res.send(result);
              } else {
              }
            }
          );

          connection.query(
            " UPDATE jobapplicant SET status = 'closed'  WHERE jvId=" +
              jvId +
              ";",

            (err, result) => {
              if (err) {
                res.send(result);
              } else {
                res.json("success");
              }
            }
          );
        }
      });
    }
  });
});

Job.route("/addJobApplicaation").post(
  uploadCV.single("image"),
  (req, res, err) => {
    if (
      !req.file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|pdf|PDF|png|PNG)$/)
    ) {
      res.send({ msg: "Not an Image File." });
    } else {
      const Currentdate = req.body.Currentdate;
      const memberId = req.body.memberId;
      const jobId = req.body.jobId;
      const marks = req.body.marks;

      const description = req.body.description;
      const cvFile = req.file.filename;

      const answerSheet = "req.file.answerSheet;";
      connection.query(
        `INSERT INTO jobapplicant (jvId ,memberId,description,cv,sheet,date,marks,status) VALUES (?,?,?,?,?,?,?,?)`,
        [
          jobId,
          memberId,
          description,
          cvFile,
          answerSheet,
          Currentdate,
          marks,
          "pending",
        ],
        (err, result) => {
          if (err) {
            res.send(result);
          } else {
            const sqlSelect =
              "SELECT jobvacancy.companyName , designation FROM `jobvacancy` where jvId  = " +
              jobId +
              "; ";

            connection.query(sqlSelect, (err, result) => {
              if (err) {
                console.log(err);
              } else {
                //const memberId = mid;

                console.log(result[0].companyName);
                const recentUpdates =
                  "insert into recentactivities  ( memberId,title,description) values ('cssl00" +
                  memberId +
                  "','Apply To a Job','Apply a Job From  " +
                  result[0].companyName +
                  " for " +
                  result[0].designation +
                  "  on " +
                  Currentdate +
                  "')";
                console.log(recentUpdates);
                connection.query(recentUpdates, (err, result) => {
                  if (err) {
                    console.log(err);
                  } else {
                    res.json("success");
                  }
                });
              }
            });
          }
        }
      );
    }
  }
);

Job.post("/addQuestion", async (req, res) => {
  const question = req.body.question;
  const ans1 = req.body.ans1;
  const ans2 = req.body.ans2;
  const ans3 = req.body.ans3;
  const ans4 = req.body.ans4;
  const correct = req.body.correct;
  const type = req.body.type;

  connection.query(
    `INSERT INTO jobquestions (Question  , Answer1 ,Answer2,Answer3,Answer4,Correct,type) VALUES (?,?,?,?,?,?,?)`,

    [question, ans1, ans2, ans3, ans4, correct, type],
    (err, result) => {
      if (err) {
        res.send(result);
      } else {
        res.json("success");
      }
    }
  );
});

Job.post("/getJobs", (req, res) => {
  const name = req.body.companyName;
  const location = req.body.location;
  const role = req.body.jobRole;
  console.log(name);
  console.log(location);
  console.log(role);
  const sqlSelect =
    "SELECT jvId , companyName , location ,designation,questionType from jobvacancy where companyName like '" +
    name +
    "%' and location like '" +
    location +
    "%' and designation like '" +
    role +
    "%' and activity ='open'";

  connection.query(sqlSelect, (err, result) => {
    res.send(result);
  });
});

Job.post("/getJobsSec", (req, res) => {
  const name = req.body.companyName;
  const location = req.body.location;
  const role = req.body.jobRole;
  console.log(name);
  console.log(location);
  console.log(role);
  const sqlSelect =
    "SELECT jvId , companyName , location ,designation,questionType,activity from jobvacancy where companyName like '" +
    name +
    "%' and location like '" +
    location +
    "%' and designation like '" +
    role +
    "%' and activity ='open' OR activity ='close'";

  connection.query(sqlSelect, (err, result) => {
    res.send(result);
  });
});

Job.post("/deleteItem", (req, res) => {
  const tableName = req.body.tableName;
  const qid = req.body.qid;
  const coloum = req.body.coloum;

  const sqlSelect =
    "delete from " + tableName + " where " + coloum + "  =" + qid;

  connection.query(sqlSelect, (err, result) => {
    res.send(result);
  });
});

Job.post("/getApplicents", (req, res) => {
  const sqlSelect =
    "SELECT jobapplicant.jvId , jobapplicant.cv,COUNT(jobapplicant.jvId) as numberOfApplicent, jobvacancy.email , jobvacancy.companyName FROM `jobapplicant` INNER JOIN jobvacancy ON jobvacancy.jvId=jobapplicant.jvId Where jobapplicant.status = 'pending'  GROUP by jvId  ORDER BY `numberOfApplicent` DESC; ";

  connection.query(sqlSelect, (err, result) => {
    res.send(result);
  });
});

Job.post("/getJobsApplications", (req, res) => {
  const name = req.body.companyName;
  const location = req.body.location;
  const role = req.body.jobRole;

  const sqlSelect =
    " SELECT jobvacancy.designation,jobapplicant.cv ,jobapplicant.date ,jobapplicant.marks, jobapplicant.memberId,jobapplicant.status ,jobvacancy.companyName FROM `jobapplicant` INNER JOIN jobvacancy ON jobvacancy.jvId=jobapplicant.jvId ORDER BY `jobapplicant`.`marks` DESC ,jobapplicant.date DESC;";
  connection.query(sqlSelect, (err, result) => {
    res.send(result);
  });
});

Job.get("/getCVtoSend", (req, res) => {
  const jid = req.query.id;
  const sqlSelect =
    "SELECT user.firstName ,user.lastName,user.email,jobapplicant.cv ,jobapplicant.date ,jobapplicant.marks, jobapplicant.memberId FROM `jobapplicant` LEFT JOIN user ON user.id=jobapplicant.memberId  WHERE jobapplicant.jvId =  " +
    jid +
    "   ORDER BY `jobapplicant`.`marks`  DESC;";

  connection.query(sqlSelect, (err, result) => {
    res.send(result);
  });
});

Job.get("/getJobView", (req, res) => {
  const jid = req.query.id;
  connection.query(
    "SELECT jvId , companyName ,activity, location ,designation,description,questionCount,questionType ,contact ,email,advertisment from jobvacancy where jvId = ?;",
    [jid],
    (error, result, feilds) => {
      if (error) console.log(error);
      else {
        res.send(result);
      }
    }
  );
});

Job.get("/getQuestion", (req, res) => {
  const jid = req.query.id;

  const numberOfQuestions =
    "select `questionCount` ,questionType from jobvacancy WHERE jvId = " + jid;

  connection.query(numberOfQuestions, (err, result3) => {
    console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
    console.log(numberOfQuestions);

    const sqlSelect =
      "SELECT Qnumber  , Question , Answer1 ,Answer2,Answer3,Answer4,Correct from jobquestions where type = '" +
      result3[0].questionType +
      "' Limit " +
      result3[0].questionCount;
    console.log(sqlSelect);

    connection.query(sqlSelect, (err, result) => {
      res.send(result);
    });
  });
});

Job.post("/getQuestionType", (req, res) => {
  const sqlSelect = "SELECT DISTINCT type fROM jobquestions";
  console.log(sqlSelect);
  connection.query(sqlSelect, (err, result) => {
    res.send(result);
  });
});

Job.post("/getMaximumQuestions", (req, res) => {
  const questionType = req.body.max;

  const sqlSelect =
    "SELECT count(type) as max , type from jobquestions where type = '" +
    questionType +
    "' GROUP BY type;";
  console.log(sqlSelect);
  connection.query(sqlSelect, (err, result) => {
    res.send(result);
  });
});

Job.post("/getAllQuestion", (req, res) => {
  const sqlSelect =
    "SELECT Qnumber  , Question , Answer1 ,Answer2,Answer3,Answer4,Correct,type from jobquestions";

  connection.query(sqlSelect, (err, result) => {
    res.send(result);
  });
});

Job.get("/aaa", (req, res) => {
  const jid = req.query.id;
  connection.query(
    "SELECT Qnumber  , Question , Answer1 ,Answer2,Answer3,Answer4,Correct,type from jobquestions where Qnumber = ?;",
    [jid],
    (error, result, feilds) => {
      if (error) console.log(error);
      else {
        res.send(result);
      }
    }
  );
});

export default Job;
