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

//insert course content (courseContentInfo.js)
Course.route("/courseContent").post(upload.single("cfile"), (req, res, err) => {
  const courseId = req.body.courseId;
  const contentNo = req.body.contentNo;
  const contentId = req.body.contentId;
  const title = req.body.title;
  const description = req.body.description;
  const type = req.body.type;
  const note = req.body.note;
  var content;
  if(type == "File"){
    content = req.file.filename;
  }
  else{
    content = req.body.vlink;
  }

  connection.query(
    "INSERT INTO coursecontent (contentId, contentNo, title, description, note, contentType, content, courseId) VALUES (?, ?,?,?,?,?,?,?);",
    [
      contentId,
      contentNo,
      title,
      description,
      note,
      type,
      content,
      courseId,
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

//get last content no of the relevant course (courseContentInfo.js)
Course.post("/getContentNo", (req, res) => {
  const cId = req.body.id;
  connection.query(
    //"SELECT contentNo FROM coursecontent WHERE courseId = ? ORDER BY contentNo DESC LIMIT 1;",
    "SELECT max(contentNo) AS contentNo FROM coursecontent WHERE courseId = ?;",
    [cId],
    (error, result, feilds) => {
      if (error) console.log(error);
      else {
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
    "SELECT name, description, duration, durationType, language, skillLevel, image, mode FROM csslcourse WHERE courseId = ?;",
    [cid],
    (error, result, feilds) => {
      if (error) console.log(error);
      else {
        res.send(result);
      }
    }
  );
});


Course.post("/getCourseImg", (req, res) => {
  const cid = req.body.cId;
  connection.query(
    "SELECT image FROM csslcourse WHERE courseId = ?;",
    [cid],
    (error, result, feilds) => {
      if (error) console.log(error);
      else {
        res.send(result);
      }
    }
  );
});

Course.post("/getCourseList", (req, res) => {
  const mid = req.body.mId;
  const status = "Approved";
  connection.query(
    "SELECT * FROM csslcourse WHERE status = ?;",
    [status],
    (error, result, feilds) => {
      if (error) console.log(error);
      else {
        res.send(result);
      }
    }
  );
});

Course.post("/getEnrollCourseList", (req, res) => {
  const mid = req.body.mId;
  connection.query(
    "SELECT csslcourse.*, courseenroll.status FROM csslcourse INNER JOIN courseenroll ON csslcourse.courseId = courseenroll.courseId WHERE courseenroll.memberId = ?;",
    [mid],
    (error, result, feilds) => {
      if (error) console.log(error);
      else {
        res.send(result);
      }
    }
  );
});

//get CSSL Course details to display on the courseView.js
Course.post("/getCourse", (req, res) => {
  const cid = req.body.cId;
  connection.query(
    "SELECT csslcourse.name, csslcourse.description, csslcourse.duration, csslcourse.durationType, csslcourse.language, csslcourse.skillLevel, csslcourse.image, csslcourse.mode, user.title, user.firstName, user.lastName, user.profileImage FROM ((csslcourse INNER JOIN member ON member.memberId = csslcourse.conductedBy) INNER JOIN user ON user.id = member.id) WHERE courseId = ?;",
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
