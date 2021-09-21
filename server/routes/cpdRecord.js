import Router, { query } from "express";
import multer from "multer";
import connection from "../db.js";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/cpdRecords");
  },
  filename: function (req, file, cb) {
    const ext = file.mimetype.split("/")[1];
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({
  storage: storage,
});

const Record = Router();

//get all cpd records uploaded by the relevant member
Record.post("/", (req, res) => {
  const mid = "cssl001";
  connection.query(
    "SELECT recordId, recTitle, type, status FROM cpdrecords WHERE memberId = ? ORDER BY approvedDate DESC;",
    [mid],
    (error, result, feilds) => {
      if (error) console.log(error);
      else {
        const basicRec = result;
        //console.log(result);
        res.send(result);
      }
    }
  );
});

//insert new cpd record
Record.post("/addRecord", (req, res) => {
  const mid = req.body.mId;
  const recType = req.body.type;
  const proof = req.body.proof;
  const note = req.body.note;
  const credit = req.body.credit;
  const recDate = req.body.recDate;
  const status = req.body.status;
  const refId = req.body.refId;
  connection.query(
    "INSERT INTO cpdrecords (memberId,type,proof,note,credit,recordDate,status,refId) VALUES (?,?,?,?,?,?,?,?);",
    [mid, recType, proof, note, credit, recDate, status, refId],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.json("success");
      }
    }
  );
});

//get courses
Record.post("/getCourse", (req, res) => {
  const mid = req.body.mId;
  //const mode = req.body.mode;
  const courseType = req.body.type;
  const statusCssl = "Completed";
  const statusOther = "Approved";
  //need to change the query to get the list of completed courses by the user and not apply for cpd
  /*connection.query("SELECT name FROM csslcourse;", (error, result) => {
    if (error) console.log(error);
    else {
      res.send(result);
    }
  });*/

  if (courseType == "CSSLcourse") {
    connection.query(
      "SELECT csslcourse.* FROM csslcourse INNER JOIN courseenroll ON csslcourse.courseId = courseenroll.courseId WHERE courseenroll.memberId = ? and courseenroll.status = ?;",
      [mid, statusCssl],
      (error, result) => {
        if (error) console.log(error);
        else {
          res.send(result);
        }
      }
    );
  } else if (courseType == "others") {
    connection.query(
      "SELECT * FROM othercourse WHERE status = ?;",
      [statusOther],
      (error, result) => {
        if (error) console.log(error);
        else {
          res.send(result);
        }
      }
    );
  } else {
    const result = "Select Course Type";
    res.send(result);
  }
});

//get distinct platforms in othercourse table
Record.post("/getPlatform", (req, res) => {
  const mode = req.body.mode;
  const status = "Approved";
  connection.query(
    "SELECT DISTINCT platform FROM othercourse WHERE mode = ? AND status = ?;",
    [mode, status],
    (error, result, feilds) => {
      if (error) console.log(error);
      else {
        res.send(result);
      }
    }
  );
});

//get distinct partners in othercourse table according to the course mode
Record.post("/getPartner", (req, res) => {
  const mode = req.body.mode;
  const status = "Approved";
  connection.query(
    "SELECT DISTINCT partner FROM othercourse WHERE mode = ? AND status = ?;",
    [mode, status],
    (error, result, feilds) => {
      if (error) console.log(error);
      else {
        res.send(result);
      }
    }
  );
});

//get workshops
Record.post("/getWorkshop", (req, res) => {
  const mid = req.body.mId;
  const workshopType = req.body.type;
  const status = "Approved";
  const verifyType1 = null;
  const verifyType2 = "";
  if (workshopType == "CSSLworkshop") {
    connection.query(
      "SELECT title, fromDate, toDate FROM csslworkshop WHERE verifiedBy != ? AND verifiedBy != ?;",
      [verifyType1, verifyType2],
      (error, result, feilds) => {
        if (error) console.log(error);
        else {
          res.send(result);
        }
      }
    );
  } else if (workshopType == "others") {
    connection.query(
      "SELECT title, fromDate, toDate, conductedBy FROM otherworkshop WHERE status = ?;",
      [status],
      (error, result, feilds) => {
        if (error) console.log(error);
        else {
          res.send(result);
        }
      }
    );
  } else {
    const result = "Select Workshop Type";
    res.send(result);
  }
});

//get all the guest lectures which are conducted by the relevant member
Record.post("/getGuestLecture", (req, res) => {
  const mid = req.body.mId;
  const g_date = req.body.gDate;
  connection.query(
    "SELECT guestlecture.university, guestlecture.description FROM guestlecture INNER JOIN glselect ON guestlecture.gId = glselect.gId WHERE guestlecture.date = ? AND glselect.memberId = ?;",
    [g_date, mid],
    (error, result, feilds) => {
      if (error) console.log(error);
      else {
        const basicRec = result;
        //console.log(result);
        res.send(result);
      }
    }
  );
});

//insert course details (basicCourseDetails.js)
Record.route("/submitCsslCourse").post(
  upload.single("proof"),
  (req, res, err) => {
    const mId = req.body.mId;
    const recTitle = req.body.recTitle;
    const recordType = req.body.recordType;
    const type = req.body.type;
    const note = req.body.note;
    const credit = req.body.credit;
    const refId = req.body.refId;
    const proof = req.file.filename;
    const recDate = req.body.recDate;
    const status = "Pending";
    //console.log(mId);
    connection.query(
      "INSERT INTO cpdrecords (memberId, recTitle, recordType, type, proof, note, credit, recordDate, status, refId) VALUES (?,?,?,?,?,?,?,?,?,?);",
      [
        mId,
        recTitle,
        recordType,
        type,
        proof,
        note,
        credit,
        recDate,
        status,
        refId,
      ],
      (error, result, feilds) => {
        if (error) console.log(error);
        else {
          //console.log(res);
          res.send({
            data: result,
            msg: "Successfully Saved.",
          });
        }
      }
    );
  }
);

Record.post("/cpdApproval", async (req, res) => {
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

Record.post("/all", async (req, res) => {
  console.log("(*&^$%");

  const sql =
    "select cpdrecords.type ,cpdrecords.recordId, cpdrecords.memberId , cpdrecords.credit, cpdrecords.status,user.title,user.firstName,user.lastName, cpdrecords.`recTitle` from cpdrecords inner join member on member.memberId = cpdrecords.memberId left join user on user.id =member.id ORDER BY `cpdrecords`.`recordId` DESC ;";

  connection.query(sql, (error, result, feilds) => {
    if (error) {
      console.log(error);
      console.log("(*&^456454554546$%");

      res.send(error);
    } else {
      console.log("(*&^$%====================");

      res.send(result);
    }
  });
});

Record.post("/getcpdData", async (req, res) => {
  const recordId = req.body.cpdId;

  const sql =
    "select recordId ,type,refId from cpdrecords where recordId =" +
    recordId +
    ";";
  connection.query(sql, (error, result, feilds) => {
    if (error) {
      res.send(error);
    } else {
      var sqlQ;

      if (result[0].type == "CSSL COURSE") {
        const slqQ =
          "select csslcourse.*, cpdrecords.* from cpdrecords inner join csslcourse on cpdrecords.refId=csslcourse.courseId where cpdrecords.recordId =" +
          result[0].recordId +
          ";";

        connection.query(slqQ, (err, r, feilds) => {
          if (err) {
            res.send(err);
          } else {
            console.log(
              "--------------------------1-----------------------------------------"
            );
            res.send(r);
            console.log(r);
          }
        });
      } else if (result[0].type == "OTHER COURSE") {
        const slqQ =
          "select othercourse.*, cpdrecords.* from cpdrecords inner join csslcourse on cpdrecords.refId=othercourse.courseId where cpdrecords.recordId =" +
          result[0].recordId +
          ";";

        connection.query(slqQ, (err, result, feilds) => {
          if (err) {
            res.send(err);
          } else {
            console.log(
              "--------------------------2-------------------------------------------"
            );
            
          }
        });
      } else if (result[0].type == "CSSL GUEST LECTURES") {
        const slqQ =
          "select guestlecture.*, cpdrecords.* from cpdrecords inner join csslcourse on cpdrecords.refId=guestlecture.gId where cpdrecords.recordId =" +
          result[0].recordId +
          ";";

        connection.query(slqQ, (err, result, feilds) => {
          if (err) {
            res.send(err);
          } else {
            res.send(result);
          }
        });
      } else if (result[0].type == "OTHER WORKSHOP") {
        const slqQ =
          "select csslworkshop.*, cpdrecords.* from cpdrecords inner join csslworkshop on cpdrecords.refId=csslworkshop.wId  where cpdrecords.recordId =" +
          result[0].recordId +
          ";";

        connection.query(slqQ, (err, result, feilds) => {
          if (err) {
            res.send(err);
          } else {
            res.send(result);
          }
        });
      } else if (result[0].type == "CSSL WORKSHOP") {
        const slqQ =
          "select csslworkshop.*, cpdrecords.* from cpdrecords inner join csslworkshop on cpdrecords.refId=csslworkshop.wId  where cpdrecords.recordId =" +
          result[0].recordId +
          ";";

        connection.query(slqQ, (err, result, feilds) => {
          if (err) {
            res.send(err);
          } else {
            res.send(result);
          }
        });
      }
      console.log(
        "--------------------------5-----------------------------------------"
      );

     
      console.log(
        "--------------------------6-----------------------------------------"
      );
    }
  });
});
export default Record;
