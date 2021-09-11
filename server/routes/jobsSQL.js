import Router from "express";
import multer from "multer";
import connection from "../db.js";

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
          console.log(err);
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
      " ' ,email = '" +
      email +
      " ' ,description = '" +
      description +
      " '  WHERE jvId=" +
      jvId +
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
      console.log("" + cvFile);
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
            console.log(err);
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
    "%' and activity ='open'";
    console.log(sqlSelect);

  connection.query(sqlSelect, (err, result) => {
    console.log(sqlSelect);
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
