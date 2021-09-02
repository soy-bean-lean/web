import Router from "express";
import connection from "../db.js";

const Record = Router();

//get all cpd records uploaded by the relevant member
Record.post("/", (req, res) => {
  const mid = "cssl001";
  connection.query(
    "SELECT recordId, type, status FROM cpdrecords WHERE memberId = ?;",
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
  const mid = "cssl001";
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
  const mid = "cssl001";
  const courseType = req.body.type;
  if (courseType == "CSSLcourse") {
    connection.query(
      "SELECT name FROM csslcourse;",
      (error, result) => {
        if (error) console.log(error);
        else {
          res.send(result);
        }
      }
    );
  }
  else if(courseType == "others"){
    connection.query(
        "SELECT name FROM othercourse;",
        (error, result) => {
          if (error) console.log(error);
          else {
            res.send(result);
          }
        }
      );
  }
  else{
    const result = "Select Course Type";
    res.send(result);
  }
});

//get workshop
Record.post("/getWorkshop", (req, res) => {
  const mid = "cssl001";
  const workshopType = req.body.type;
  const workshopDate = req.body.wdate;
  console.log(workshopType,workshopDate);
  if (workshopType == "CSSLworkshop") {
    connection.query(
      "SELECT title FROM csslworkshop WHERE fromDate = ?;",
      [workshopDate],
      (error, result) => {
        if (error) console.log(error);
        else {
          res.send(result);
        }
      }
    );
  }
  else if(workshopType == "others"){
    connection.query(
        "SELECT title FROM csslworkshop;",
        (error, result) => {
          if (error) console.log(error);
          else {
            res.send(result);
          }
        }
      );
  }
  else{
    const result = "Select Workshop Type";
    res.send(result);
  }
});

export default Record;
