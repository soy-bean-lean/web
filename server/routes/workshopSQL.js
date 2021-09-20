import Router from "express";
import multer from "multer";
import connection from "../db.js";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/workshop");
  },
  filename: function (req, file, cb) {
    const ext = file.mimetype.split("/")[1];
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({
  storage: storage,
});

const Workshop = Router();

Workshop.route("/addWorkshop").post(upload.single("image"), (req, res, err) => {
  if (!req.file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG)$/)) {
    res.send({ msg: "Not an Image File." });
  } else {
    const title = req.body.title;
    const description = req.body.description;
    //const workshopId = req.body.workshopId;
    const fromDate = req.body.fromDate;
    const toDate = req.body.toDate;
    const duration = req.body.duration;
    //const credit = req.body.credit;
    const subject = req.body.subject;
    const memberId = req.body.memberId;

    const image = req.file.filename;
    console.log(image);

    connection.query(
      `INSERT INTO csslworkshop (title,description,fromDate,toDate,duration,subject,image,addBy) VALUES (?,?,?,?,?,?,?,?)`,
      [title,description,fromDate,toDate,duration,subject,image,memberId],
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

Workshop.post("/getSendWorkshop", (req, res) => {
  console.log("get all workshop line -700");
  //const mid = req.body.mId;
  //console.log(mid);
  connection.query(
    "SELECT wId, title,description,image FROM csslworkshop WHERE credit IS NULL AND verifiedBy IS NULL;",
    
    (error, result, feilds) => {
      if (error) console.log(error);
      else {
        res.send(result);
      }
      }
    );
  });


  Workshop.post("/getWorkshop", (req, res) => {
    console.log("get all workshop line 700");
    //const mid = req.body.mId;
    //console.log(mid);
    connection.query(
      "SELECT wId, title,description,fromDate,toDate,image FROM csslworkshop WHERE verifiedBy IS NOT NULL;",
      
      (error, result, feilds) => {
        if (error) console.log(error);
        else {
          res.send(result);
        }
        }
      );
    });


    Workshop.post("/deleteItem", (req, res) => {
      const tableName = req.body.tableName;
      const wid = req.body.wid;
      const coloum = req.body.coloum;
    console.log(wid);
      const sqlSelect =
        "delete from " + tableName + " where " + coloum + "  =" + wid;
    
      connection.query(sqlSelect, (err, result) => {
        res.send(result);
      });
    });

//to update show workshop details

Workshop.post("/getWorkshopView", (req, res) => {
  const wid = req.body.id;
  console.log(wid);
  connection.query(
    "SELECT csslworkshop.* from csslworkshop where wId= ?;",
    [wid],
    (error, result, feilds) => {
      if (error) console.log(error);
      else {
        res.send(result);
      }
    }
  );
});


Workshop.route("/addCredit").post(
  upload.single("image"),
  (req, res, err) => {
    // if (!req.file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG)$/)) {
    //   res.send({ msg: "Not an Image File." });
    // } else {
      const wid = req.body.wId;
      const mid=req.body.verifiedBy;

      const credit = req.body.credit;
      //const about = req.body.description;

     // const desc = req.body.content;
      // const memberID = req.body.memberId;
     // const image = req.file.filename;

     console.log(wid);

      
      

      connection.query(
        "UPDATE csslworkshop SET credit = ?, verifiedBy = ?  WHERE wId = ?;",
        [
          credit,
          mid,
          wid
        ],
        (error, result, feilds) => {
          if (error) console.log(error);
          else {
            res.send({
              data: result,
              msg: "Successfully Updated.",
            });
          }
        }
      );
    
  }
);





  
 
  
  export default Workshop;

