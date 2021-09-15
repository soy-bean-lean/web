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
    const image = req.file.filename;
    connection.query(
      `INSERT INTO jobvacancy (companyName,location,designation,email,contact,description,addBy,advertisment,activity) VALUES (?,?,?,?,?,?,?,?,?)`,
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
      ],
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

Job.post("/updateJob", async (req, res) => {
  const companyName = req.body.companyName;
  const location = req.body.location;
  const jobRole = req.body.jobRole;
  const contact = req.body.contact;
  const email = req.body.email;
  const description = req.body.description;
  const addBy = req.body.memberId;
  const jvId = req.body.jvId;
  connection.query(
    " UPDATE jobvacancy SET companyName = '" +
      companyName +
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
});

Job.post("/sendEmail", async (req, res) => {
  const password = req.body.password;
  const jobId = req.body.jobId;
  const from = "2018cs071@stu.ucsc.cmb.ac.lk";
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "2018cs071@stu.ucsc.cmb.ac.lk",
      pass: "Chamika@97",
    },
  });
  const sqlSelect =
    "SELECT jobapplicant.cv , user.firstName ,jobapplicant.jvId,  user.email,jobvacancy.designation ,jobapplicant.date ,jobvacancy.email as companyemail ,jobapplicant.marks, jobapplicant.memberId FROM `jobapplicant` LEFT JOIN user ON user.id=jobapplicant.memberId LEFT JOIN jobvacancy on jobvacancy.jvId = jobapplicant.jvId WHERE jobapplicant.jvId =  " +
    jobId +
    " ORDER BY `jobapplicant`.`marks`  DESC;";

  connection.query(sqlSelect, (err, result) => {
    console.log(result.length);

    var i = 0;

    for (i = 0; i < result.length; i++) {
      const email = result[i].email;
      const date = result[i].date;
      const designation = result[i].designation;
      const firstName = result[i].firstName;
      const companyemail = result[i].companyemail;
      const marks = result[i].marks;
      const cv = result[i].cv;

      var mailOptions = {
        from: { from },
        to: companyemail,
        subject: "Job Application",
        text:
          `Our Member ` +
          firstName +
          " has requested " +
          designation +
          " role from your company,who has scored " +
          marks +
          "% from the Basic Exam, so please be kind and contact " +
          firstName +
          "  --  " +
          email +
          " ",
        // attachments: [
        //   {
        //     filename: cv,
        //     path: "http://localhost:3001/uploads/jobApplicationCVs/"+cv+"",
        //     contentType: "application/pdf",
        //   },
        // ],
        // html: '<h1>Hi Smartherd</h1><p>Your Messsage</p>'
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
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
            res.json("success");
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

  connection.query(
    `INSERT INTO jobquestions ( Question , Answer1 ,Answer2,Answer3,Answer4,Correct) VALUES (?,?,?,?,?,?)`,

    [question, ans1, ans2, ans3, ans4, correct],
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

  const sqlSelect =
    "SELECT jvId , companyName , location ,designation from jobvacancy where companyName like '" +
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

Job.post("/getApplicents", (req, res) => {
  const sqlSelect =
    "SELECT jobapplicant.jvId , COUNT(jobapplicant.jvId) as numberOfApplicent, jobvacancy.email , jobvacancy.companyName FROM `jobapplicant` INNER JOIN jobvacancy ON jobvacancy.jvId=jobapplicant.jvId GROUP by jvId; ";

  connection.query(sqlSelect, (err, result) => {
    res.send(result);
  });
});

Job.post("/getJobsApplications", (req, res) => {
  const name = req.body.companyName;
  const location = req.body.location;
  const role = req.body.jobRole;

  const sqlSelect =
    " SELECT jobvacancy.designation ,jobapplicant.date ,jobapplicant.marks, jobapplicant.memberId ,jobvacancy.companyName FROM `jobapplicant` INNER JOIN jobvacancy ON jobvacancy.jvId=jobapplicant.jvId ORDER BY `jobapplicant`.`marks` DESC ,jobapplicant.date DESC;";
  connection.query(sqlSelect, (err, result) => {
    res.send(result);
  });
});

Job.get("/getCVtoSend", (req, res) => {
  const jid = req.query.id;
  const sqlSelect =
    "SELECT user.firstName ,user.lastName,user.email ,jobapplicant.date ,jobapplicant.marks, jobapplicant.memberId FROM `jobapplicant` LEFT JOIN user ON user.id=jobapplicant.memberId  WHERE jobapplicant.jvId =  " +
    jid +
    "   ORDER BY `jobapplicant`.`marks`  DESC;";

  connection.query(sqlSelect, (err, result) => {
    res.send(result);
  });
});

Job.get("/getJobView", (req, res) => {
  const jid = req.query.id;
  connection.query(
    "SELECT jvId , companyName , location ,designation,description ,contact ,email,advertisment from jobvacancy where jvId = ?;",
    [jid],
    (error, result, feilds) => {
      if (error) console.log(error);
      else {
        console.log(
          "SELECT jvId , companyName , location ,designation,description ,contact ,email,advertisment from jobvacancy where jvId = " +
            jid +
            ";"
        );

        res.send(result);
      }
    }
  );
});

Job.post("/getQuestion", (req, res) => {

  const sqlSelect =
    "SELECT Qnumber  , Question , Answer1 ,Answer2,Answer3,Answer4,Correct from jobquestions ORDER by rand() Limit 5";

  connection.query(sqlSelect, (err, result) => {
    res.send(result);
  });
});

Job.post("/getQuestiontoUpdate", (req, res) => {
  console.log("455554545666666666666666666666")

  const qid = req.query.id;
  const sqlSelect =
    "SELECT Qnumber  , Question , Answer1 ,Answer2,Answer3,Answer4,Correct from jobquestions where Qnumber = " +
    qid;

  connection.query(sqlSelect, (err, result) => {
    console.log(result);
    res.send(result);
  });
});

export default Job;
