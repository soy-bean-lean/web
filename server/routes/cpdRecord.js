import Router from "express";
import connection from "../db.js";

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
  const courseType = req.body.type;
  //need to change the query to get the list of completed courses by the user and not apply for cpd
  /*connection.query("SELECT name FROM csslcourse;", (error, result) => {
    if (error) console.log(error);
    else {
      res.send(result);
    }
  });*/

  if (courseType == "CSSLcourse") {
    connection.query("SELECT courseId, name FROM csslcourse;", (error, result) => {
      if (error) console.log(error);
      else {
        res.send(result);
      }
    });
  } else if (courseType == "others") {
    connection.query("SELECT * FROM othercourse WHERE status = ? AND mode = ?;", (error, result) => {
      if (error) console.log(error);
      else {
        res.send(result);
      }
    });
  } else {
    const result = "Select Course Type";
    res.send(result);
  }
});

//get distinct platforms in othercourse table 
Record.post("/getPlatform", (req, res) => {
  const mode = req.body.mode;
  const status = 'Approved';
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
  const status = 'Approved';
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
  const status = 'Approved';
  const verifyType1 = null;
  const verifyType2 = '';
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

export default Record;
