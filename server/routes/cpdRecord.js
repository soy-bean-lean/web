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

  export default Record;