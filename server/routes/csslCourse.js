import Router, { query } from "express";
import multer from "multer";
import connection from "../db.js";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/csslCourses");
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

//insert course details (basicCourseDetails.js)
Course.route("/basicInfo").post(upload.single("image"), (req, res, err) => {
  if (!req.file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG)$/)) {
    res.send({ msg: "Not an Image File." });
  } else {
    const lecturer = req.body.lecturer;
    const title = req.body.title;
    const description = req.body.description;
    const duration = req.body.duration;
    const durationType = req.body.durationType;
    const language = req.body.language;
    const level = req.body.level;
    const image = req.file.filename;
    const mode = req.body.mode;
    const status = "OnGoing";

    connection.query(
      "INSERT INTO csslcourse (name, description, duration, durationType, language, skillLevel, image, mode, conductedBy, status) VALUES (?,?,?,?,?,?,?,?,?);",
      [
        title,
        description,
        duration,
        durationType,
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

//update course details (editCourgetContentListseDetails.js)
Course.route("/editCourseInfo").post(
  upload.single("image"),
  (req, res, err) => {
    if (!req.file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG)$/)) {
      res.send({ msg: "Not an Image File." });
    } else {
      const cid = req.body.id;
      const title = req.body.title;
      const description = req.body.description;
      const duration = req.body.duration;
      const durationType = req.body.durationType;
      const language = req.body.language;
      const level = req.body.level;
      const image = req.file.filename;
      const mode = req.body.mode;
      const status = "OnGoing";

      connection.query(
        "UPDATE csslcourse SET name = ?, description = ?, duration = ?, durationType = ?, language = ?, skillLevel = ?, image = ?, mode = ?, status = ? WHERE courseId = ?;",
        [
          title,
          description,
          duration,
          durationType,
          language,
          level,
          image,
          mode,
          status,
          cid,
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
  }
);

//delete course(it's only update the status to deleted)
Course.post("/deleteCourse", (req, res) => {
  const courseId = req.body.cId;
  const status = "Deleted";
  connection.query(
    "UPDATE csslcourse SET status = ? WHERE courseId = ?;",
    [status, courseId],
    (error, result, feilds) => {
      if (error) console.log(error);
      else {
        res.send(result);
      }
    }
  );
});

//update course status to Pending to get Approval (LecturerCourseView.js)
Course.post("/getApproval", (req, res) => {
  const courseId = req.body.cId;
  const status = "Pending";
  connection.query(
    "UPDATE csslcourse SET status = ? WHERE courseId = ?;",
    [status, courseId],
    (error, result, feilds) => {
      if (error) console.log(error);
      else {
        res.send(result);
      }
    }
  );
});

//when adding/updating/deleting the content, the status of the course update to OnGoing
Course.post("/changeCourseStatus", (req, res) => {
  const courseId = req.body.courseId;
  const status = "OnGoing";
  connection.query(
    "UPDATE csslcourse SET status = ? WHERE courseId = ?;",
    [status, courseId],
    (error, result, feilds) => {
      if (error) console.log(error);
      else {
        res.send(result);
      }
    }
  );
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
  if (type == "File") {
    content = req.file.filename;
  } else {
    content = req.body.vlink;
  }

  connection.query(
    "INSERT INTO coursecontent (contentId, contentNo, title, description, note, contentType, content, courseId) VALUES (?, ?,?,?,?,?,?,?);",
    [contentId, contentNo, title, description, note, type, content, courseId],
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

//update course content details (editCourseContentInfo.js)
Course.route("/editCourseContent").post(
  upload.single("cfile"),
  (req, res, err) => {
    const courseId = req.body.courseId;
    const contentId = req.body.contentId;
    const title = req.body.title;
    const description = req.body.description;
    const note = req.body.note;
    const type = req.body.type;
    //const note = req.body.note;
    var content;
    if (type == "File") {
      content = req.file.filename;
    } else {
      content = req.body.vlink;
    }

    connection.query(
      "UPDATE coursecontent SET title = ?, description = ?, note = ?, contentType = ?, content = ? WHERE contentId = ? AND courseId = ?;",
      [title, description, note, type, content, contentId, courseId],
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

//delete coursecontent(it's only update the status to deleted)
Course.post("/deleteCourseContent", (req, res) => {
  const courseId = req.body.courseId;
  const contentId = req.body.contentId;
  const status = "Deleted";
  connection.query(
    "UPDATE coursecontent SET status = ? WHERE contentId = ? AND courseId = ?;",
    [status, contentId, courseId],
    (error, result, feilds) => {
      if (error) console.log(error);
      else {
        res.send(result);
      }
    }
  );
});

Course.post("/", (req, res) => {
  const mid = req.body.mId;
  const status = "Deleted";
  connection.query(
    "SELECT courseId, name, status FROM csslcourse WHERE conductedBy = ? AND status != ?;",
    [mid, status],
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
        console.log(result);
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
    [cntid, cid],
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
    "SELECT status,image FROM csslcourse WHERE courseId = ?;",
    [cid],
    (error, result, feilds) => {
      if (error) console.log(error);
      else {
        res.send(result);
      }
    }
  );
});

//get course list (Courses.js)
Course.post("/getCourseList", (req, res) => {
  const mid = req.body.mId;
  const status = "Approved";
  connection.query(
    //need to add not equal conductedBy to memeberId and not enrolled by the memberId 
    "SELECT * FROM csslcourse WHERE conductedBy != ? AND status = ?;",
    [mid, status],
    (error, result, feilds) => {
      if (error) console.log(error);
      else {
        res.send(result);
      }
    }
  );
});

//get distinct instructor list (Courses.js)
Course.post("/getInstructorList", (req, res) => {
  const mid = req.body.mId;
  const status = "Approved";
  connection.query(
    "SELECT DISTINCT user.title, user.firstName, user.lastName, csslcourse.conductedBy FROM ((csslcourse INNER JOIN member ON member.memberId = csslcourse.conductedBy) INNER JOIN user ON user.id = member.id) WHERE csslcourse.conductedBy != ? AND csslcourse.status = ?;",
    [mid, status],
    (error, result, feilds) => {
      if (error) console.log(error);
      else {
        res.send(result);
      }
    }
  );
});

//get distinct category list (Courses.js)
Course.post("/getCategoryList", (req, res) => {
  const mid = req.body.mId;
  const status = "Approved";
  connection.query(
    "SELECT DISTINCT category FROM csslcourse WHERE csslcourse.status = ?;",
    [status],
    (error, result, feilds) => {
      if (error) console.log(error);
      else {
        res.send(result);
      }
    }
  );
});

//get filtered course list (Courses.js)
Course.post("/getFilterCourseList", (req, res) => {
  const mid = req.body.mId;
  const level = req.body.level;
  const instructor = req.body.instructor;
  const category = req.body.category;
  const status = "Approved";

  if((level == "" && instructor == "") || (level == "" && category == "") || (category == "" && instructor == "")){
    connection.query(
      "SELECT * FROM csslcourse WHERE (skillLevel = ? OR conductedBy = ? OR category = ?) AND conductedBy != ? AND status = ?;",
      [level, instructor, category, mid, status],
      (error, result, feilds) => {
        if (error) console.log(error);
        else {
          res.send(result);
        }
      }
    );
  }
  else if(level != "" && instructor != "" && category != ""){
    connection.query(
      "SELECT * FROM csslcourse WHERE skillLevel = ? AND conductedBy = ? AND category = ? AND conductedBy != ? AND status = ?;",
      [level, instructor, category, mid, status],
      (error, result, feilds) => {
        if (error) console.log(error);
        else {
          res.send(result);
        }
      }
    );
  }
  else if(level != "" && instructor == "" && category != ""){
    connection.query(
      "SELECT * FROM csslcourse WHERE skillLevel = ? AND category = ? AND conductedBy != ? AND status = ?;",
      [level, category, mid, status],
      (error, result, feilds) => {
        if (error) console.log(error);
        else {
          res.send(result);
        }
      }
    );
  }
  else if(level == "" && instructor != "" && category != ""){
    connection.query(
      "SELECT * FROM csslcourse WHERE conductedBy = ? AND category = ? AND conductedBy != ? AND status = ?;",
      [instructor, category, mid, status],
      (error, result, feilds) => {
        if (error) console.log(error);
        else {
          res.send(result);
        }
      }
    );
  }
  else if(level != "" && instructor != "" && category == ""){
    connection.query(
      "SELECT * FROM csslcourse WHERE skillLevel = ? AND conductedBy = ? AND conductedBy != ? AND status = ?;",
      [level, instructor, mid, status],
      (error, result, feilds) => {
        if (error) console.log(error);
        else {
          res.send(result);
        }
      }
    );
  }
  else{
    connection.query(
      "SELECT * FROM csslcourse WHERE conductedBy != ? AND status = ?;",
      [mid, status],
      (error, result, feilds) => {
        if (error) console.log(error);
        else {
          res.send(result);
        }
      }
    );
  }
});

//get searched course list (Courses.js)
Course.post("/getSearchCourseList", (req, res) => {
  const mid = req.body.mId;
  const sQuery = req.body.sQuery;
  const status = "Approved";
  connection.query(
    "SELECT * FROM csslcourse WHERE (name LIKE ? OR category LIKE ? ) AND conductedBy != ? AND status = ?;",
    ['%'+sQuery+'%', '%'+sQuery+'%', mid, status],
    (error, result, feilds) => {
      if (error) console.log(error);
      else {
        res.send(result);
      }
    }
  );
});

//get sorted course list (Courses.js)
Course.post("/getSortCourseList", (req, res) => {
  const mid = req.body.mId;
  const type = req.body.sortType;
  const status = "Approved";
  if(type == "Rating"){
    connection.query(
      "SELECT * FROM csslcourse WHERE conductedBy != ? AND status = ? ORDER BY avgRate DESC;",
      [mid, status],
      (error, result, feilds) => {
        if (error) console.log(error);
        else {
          res.send(result);
        }
      }
    );

  }
  else if(type == "Interaction"){
    connection.query(
      "SELECT * FROM csslcourse WHERE conductedBy != ? AND status = ? ORDER BY noOfInteraction DESC;",
      [mid, status],
      (error, result, feilds) => {
        if (error) console.log(error);
        else {
          res.send(result);
        }
      }
    );

  }
  else if(type == "Date"){
    connection.query(
      "SELECT * FROM csslcourse WHERE conductedBy != ? AND status = ? ORDER BY approvedDate DESC;",
      [mid, status],
      (error, result, feilds) => {
        if (error) console.log(error);
        else {
          res.send(result);
        }
      }
    );

  }
  else{

  }
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
