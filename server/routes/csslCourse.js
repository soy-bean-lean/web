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

const Course = Router();


Course.route("/basicInfo").post(upload.single("image"), (req, res, err) => {
  if (!req.file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG)$/)) {
    res.send({ msg: "Not an Image File." });
  } else {
    const lecturer = req.body.lecturer;
    const title = req.body.title;
    const description = req.body.description;
    const duration = req.body.duration;
    const language = req.body.language;
    const level = req.body.level;
    const image = req.file.filename;
    const mode = req.body.mode;
    const status = "OnGoing";

    connection.query(
      "INSERT INTO csslcourse (name, description, duration, language, skillLevel, image, mode, conductedBy, status) VALUES (?,?,?,?,?,?,?,?,?);",
      [
        title,
        description,
        duration,
        language,
        level,
        image,
        mode,
        lecturer,
        status,
      ],
      (error, result, feilds) => {
        if (error) console.log(error);
        else {
          res.send({
            data: result,
            msg: "Successfully Saved.",
          });
        }
      }
    );
  }
});

Course.route("/courseContent").post(upload.single("cfile"), (req, res, err) => {
  const courseId = req.body.courseId;
  const contentNo = req.body.contentNo;
  const contentId = req.body.contentId;
  const title = req.body.title;
  const description = req.body.description;
  const type = req.body.type;
  var content;
  if(type == "File"){
    content = req.file.filename;
  }
  else{
    content = req.body.vlink;
  }

  connection.query(
    "INSERT INTO coursecontent (contentId, contentNo, title, description, contentType, content, courseId) VALUES (?,?,?,?,?,?,?);",
    [
      contentId,
      contentNo,
      title,
      description,
      type,
      content,
      courseId,
    ],
    (error, result, feilds) => {
      if (error) console.log(error);
      else {
        //console.log(result);
        res.send({
          data: result,
          msg: "Successfully Saved.",
        });
      }
    }
  );
});

Course.post("/", (req, res) => {
  const mid = req.body.mId;
  connection.query(
    "SELECT courseId, name, status FROM csslcourse WHERE conductedBy = ?;",
    [mid],
    (error, result, feilds) => {
      if (error) console.log(error);
      else {
        res.send(result);
      }
    }
  );
});

Course.post("/getContentList", (req, res) => {
  const cid = req.body.cId;
  connection.query(
    "SELECT contentId, title, description FROM coursecontent WHERE courseId = ?;",
    [cid],
    (error, result, feilds) => {
      if (error) console.log(error);
      else {
        res.send(result);
      }
    }
  );
});


Course.post("/getContentNo", (req, res) => {
  const cId = req.body.id;
  connection.query(
    //"SELECT contentNo FROM coursecontent WHERE courseId = ? ORDER BY contentNo DESC LIMIT 1;",
    "SELECT max(contentNo) AS contentNo FROM coursecontent WHERE courseId = ?;",
    [cId],
    (error, result, feilds) => {
      if (error) console.log(error);
      else {
        console.log("Result",result);
        res.send(result);
      }
    }
  );
});

Course.post("/getContentInfo", (req, res) => {
  const cid = req.body.cId;
  const cntid = req.body.cntId;
  connection.query(
    "SELECT title, description, contentType, content FROM coursecontent WHERE contentId = ? AND courseId = ?;",
    [cntid,cid],
    (error, result, feilds) => {
      if (error) console.log(error);
      else {
        res.send(result);
      }
    }
  );
});

Course.post("/getCourseInfo", (req, res) => {
  const cid = req.body.cid;
  connection.query(
    "SELECT name, description, duration, language, skillLevel, image, mode FROM csslcourse WHERE courseId = ?;",
    [cid],
    (error, result, feilds) => {
      if (error) console.log(error);
      else {
        res.send(result);
      }
    }
  );
});

export default Course;
