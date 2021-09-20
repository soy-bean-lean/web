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
      "SELECT wId, title,description,image FROM csslworkshop WHERE verifiedBy IS NOT NULL;",
      
      (error, result, feilds) => {
        if (error) console.log(error);
        else {
          res.send(result);
        }
        }
      );
    });





  
 
  
  export default Workshop;

