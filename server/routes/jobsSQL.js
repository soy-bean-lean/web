import Router from "express";
import multer from "multer";
import connection from "../db.js";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    const ext = file.mimetype.split("/")[1];
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({
  storage: storage,
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
    const addBy = 1000;
    const image = req.file.filename;
    

    connection.query(
      `INSERT INTO jobvacancy (companyName,location,designation,email,contact,description,addBy,advertisment) VALUES (?,?,?,?,?,?,?,?)`,
      [companyName, location, jobRole, email, contact, description, addBy,image],
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
/*
Job.post("/", async (req, res) => {
  const companyName = req.body.companyName;
  const jobRole = req.body.jobRole;
  const location = req.body.location;
  const contact = req.body.contact;
  const email = req.body.email;
  const description = req.body.description;
  const addBy = 100;

  connection.query(
    `INSERT INTO jobvacancy (companyName,location,designation,email,contact,description,addBy) VALUES (?,?,?,?,?,?,?)`,
    [companyName, location, jobRole, email, contact, description, addBy],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.json("success");
      }
    }
  );
});*/
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
        console.log(err);
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
    "SELECT jvId , companyName , location ,designation from jobvacancy where companyName like '" +
    name +
    "%' and location like '" +
    location +
    "%' and designation like '" +
    role +
    "%'";
  console.log(sqlSelect);
  connection.query(sqlSelect, (err, result) => {
    res.send(result);
  });
});

Job.post("/sendAnswers", (req, res) => {
  const numberOfQuestion = req.body.length * 1 - 1;
  var marks = 0;
  var memberId = "1001";
  var jobId = req.body[0];
  var finalMarks = 0;
  /* connection.query(
    `INSERT INTO jobapplicant ( jvId  , memberId  ,date ,status) VALUES (?,?,?,?)`,
    [question, ans1, ans2, ""],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.json("success");
      }
    }
  );*/
  console.log(numberOfQuestion);
  for (let Qnumber = 1; Qnumber <= numberOfQuestion; Qnumber++) {
    console.log(
      "_____________________" + Qnumber + "__________________________________"
    );
    const sqlSelect =
      "SELECT Correct from jobquestions where Qnumber =" + Qnumber + "";
    connection.query(sqlSelect, (err, result) => {
      const answer = result[0].Correct;
      console.log(answer);
      if (answer == req.body[Qnumber]) {
        marks = marks + 1;
      }
      finalMarks = (marks / numberOfQuestion) * 100;

      console.log("marks _> " + Qnumber + "================= " + finalMarks);
    });
  }
  console.log("finalMarks -> " + finalMarks);
});

Job.get("/getJobView", (req, res) => {
  const jid = req.query.id;
  console.log(jid);
  connection.query(
    "SELECT jvId , companyName , location ,designation,description ,contact ,email,advertisment from jobvacancy where jvId = ?;",
    [jid],
    (error, result, feilds) => {
      if (error) console.log(error);
      else {
        res.send(result);
      }
    }
  );
});

Job.post("/getQuestion", (req, res) => {
  const sqlSelect =
    "SELECT Qnumber  , Question , Answer1 ,Answer2,Answer3,Answer4,Correct from jobquestions Limit 5";

  connection.query(sqlSelect, (err, result) => {
    res.send(result);
  });
});

export default Job;
