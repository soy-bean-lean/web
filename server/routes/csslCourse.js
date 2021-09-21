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

//insert course content (AddCourseContent.js)
Course.route("/courseContent").post(upload.single("cfile"), (req, res, err) => {
  const courseId = req.body.courseId;
  const contentNo = req.body.contentNo;
  const contentId = req.body.contentId;
  const title = req.body.title;
  const description = req.body.description;
  const type = req.body.type;
  const note = req.body.note;
  const order = req.body.order;
  const status = "Pending";
  var content;
  if (type == "File") {
    content = req.file.filename;
  } else {
    content = req.body.vlink;
  }

  connection.query(
    "INSERT INTO coursecontent (contentId, contentNo, title, description, note, contentType, content, contentOrder, status, courseId) VALUES (?,?,?,?,?,?,?,?,?,?);",
    [contentId, contentNo, title, description, note, type, content, order, status, courseId],
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

//update course content details (EditCourseContent.js)
Course.route("/editCourseContent").post(
  upload.single("cfile"),
  (req, res, err) => {
    const courseId = req.body.courseId;
    const contentId = req.body.contentId;
    const title = req.body.title;
    const description = req.body.description;
    const note = req.body.note;
    const type = req.body.type;
    const order = req.body.order;
    const status = "Pending";
    var content;
    if (type == "File") {
      content = req.file.filename;
    } else {
      content = req.body.vlink;
    }

    connection.query(
      "UPDATE coursecontent SET title = ?, description = ?, note = ?, contentType = ?, content = ?, contentOrder = ?, status = ? WHERE contentId = ? AND courseId = ?;",
      [title, description, note, type, content, order, status, contentId, courseId],
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

//update course content order (AddCourseContent.js)
Course.post("/changeContentOrder", (req, res) => {
  const courseId = req.body.courseId;
  const order = req.body.order;
  connection.query(
    "UPDATE coursecontent SET contentOrder = contentOrder + 1 WHERE courseId = ? AND contentOrder >= ?;",
    [courseId, order],
    (error, result, feilds) => {
      if (error) console.log(error);
      else {
        res.send(result);
      }
    }
  );
});

//update course content order (EdotCourseContent.js)
Course.post("/updateContentOrder", (req, res) => {
  const courseId = req.body.courseId;
  const current = req.body.current;
  const order = req.body.order;

  if(current < order){
    connection.query(
      "UPDATE coursecontent SET contentOrder = contentOrder - 1 WHERE courseId = ? AND contentOrder > ? AND contentOrder <= ?;",
      [courseId,current, order],
      (error, result, feilds) => {
        if (error) console.log(error);
        else {
          res.send(result);
        }
      }
    );
  }
  else if(current > order){
    connection.query(
      "UPDATE coursecontent SET contentOrder = contentOrder + 1 WHERE courseId = ? AND contentOrder < ? AND contentOrder >= ?;",
      [courseId, current, order],
      (error, result, feilds) => {
        if (error) console.log(error);
        else {
          res.send(result);
        }
      }
    );
  }
  
});


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
  const stDel = "Deleted";
  connection.query(
    "SELECT contentId, title, description FROM coursecontent WHERE courseId = ? AND status != ? ORDER BY contentOrder;",
    [cid, stDel],
    (error, result, feilds) => {
      if (error) console.log(error);
      else {
        res.send(result);
      }
    }
  );
});

//get last content no of the relevant course (AddCourseContent.js)
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


//get last content order list of the relevant course (AddCourseContent.js)
Course.post("/getContentOrderList", (req, res) => {
  const cId = req.body.id;
  const stDel = "Deleted";
  //const stRej = "Rejected";
  connection.query(
    "SELECT title, contentOrder FROM coursecontent WHERE courseId = ? AND status != ? ORDER BY contentOrder;",
    [cId, stDel],
    (error, result, feilds) => {
      if (error) console.log(error);
      else {
        res.send(result);
      }
    }
  );
});

//get last content order list of the relevant course (AddCourseContent.js)
Course.post("/getContentOrder", (req, res) => {
  const cId = req.body.cId;
  const cntId = req.body.cntId;
  const stDel = "Deleted";
  //const stRej = "Rejected";
  connection.query(
    "SELECT title, contentOrder FROM coursecontent WHERE courseId = ? AND contentId != ? AND status != ? ORDER BY contentOrder;",
    [cId, cntId, stDel],
    (error, result, feilds) => {
      if (error) console.log(error);
      else {
        res.send(result);
      }
    }
  );
});

//get content info (EditCourseContent.js)
Course.post("/getContentInfo", (req, res) => {
  const cid = req.body.cId;
  const cntid = req.body.cntId;
  connection.query(
    "SELECT title, description, contentType, content, contentOrder FROM coursecontent WHERE contentId = ? AND courseId = ?;",
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
  const status = "Deleted";
  connection.query(
    "SELECT name, description, duration, durationType, language, skillLevel, image, mode FROM csslcourse WHERE courseId = ? AND status != ?;",
    [cid,status],
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
    "SELECT * FROM csslcourse WHERE courseId NOT IN (SELECT courseId FROM courseenroll WHERE memberID = ?) AND conductedBy != ? AND status = ? ORDER BY approvedDate DESC;",
    [mid, mid, status],
    (error, result, feilds) => {
      if (error) console.log(error);
      else {
        res.json(result);
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
      "SELECT * FROM csslcourse WHERE courseId NOT IN (SELECT courseId FROM courseenroll WHERE memberID = ?) AND (skillLevel = ? OR conductedBy = ? OR category = ?) AND conductedBy != ? AND status = ?;",
      [mid, level, instructor, category, mid, status],
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
      "SELECT * FROM csslcourse WHERE courseId NOT IN (SELECT courseId FROM courseenroll WHERE memberID = ?) AND skillLevel = ? AND conductedBy = ? AND category = ? AND conductedBy != ? AND status = ?;",
      [mid, level, instructor, category, mid, status],
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
      "SELECT * FROM csslcourse WHERE courseId NOT IN (SELECT courseId FROM courseenroll WHERE memberID = ?) AND skillLevel = ? AND category = ? AND conductedBy != ? AND status = ?;",
      [mid, level, category, mid, status],
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
      "SELECT * FROM csslcourse WHERE courseId NOT IN (SELECT courseId FROM courseenroll WHERE memberID = ?) AND conductedBy = ? AND category = ? AND conductedBy != ? AND status = ?;",
      [mid, instructor, category, mid, status],
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
      "SELECT * FROM csslcourse WHERE courseId NOT IN (SELECT courseId FROM courseenroll WHERE memberID = ?) AND skillLevel = ? AND conductedBy = ? AND conductedBy != ? AND status = ?;",
      [mid, level, instructor, mid, status],
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
      "SELECT * FROM csslcourse WHERE courseId NOT IN (SELECT courseId FROM courseenroll WHERE memberID = ?) AND conductedBy != ? AND status = ?;",
      [mid, mid, status],
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
    "SELECT * FROM csslcourse WHERE courseId NOT IN (SELECT courseId FROM courseenroll WHERE memberID = ?) AND (name LIKE ? OR category LIKE ? ) AND conductedBy != ? AND status = ?;",
    [mid, '%'+sQuery+'%', '%'+sQuery+'%', mid, status],
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
      "SELECT * FROM csslcourse WHERE courseId NOT IN (SELECT courseId FROM courseenroll WHERE memberID = ?) AND conductedBy != ? AND status = ? ORDER BY avgRate DESC;",
      [mid, mid, status],
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
      "SELECT * FROM csslcourse WHERE courseId NOT IN (SELECT courseId FROM courseenroll WHERE memberID = ?) AND conductedBy != ? AND status = ? ORDER BY noOfInteraction DESC;",
      [mid, mid, status],
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
      "SELECT * FROM csslcourse WHERE courseId NOT IN (SELECT courseId FROM courseenroll WHERE memberID = ?) AND conductedBy != ? AND status = ? ORDER BY approvedDate DESC;",
      [mid, mid, status],
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

//get content for view (CourseContentView.js)
Course.post("/getContent", (req, res) => {
  const cid = req.body.cId;
  const cntid = req.body.cntId;
  connection.query(
    "SELECT title, contentType, content, note FROM coursecontent WHERE contentId = ? AND courseId = ?;",
    [cntid,cid],
    (error, result, feilds) => {
      if (error) console.log(error);
      else {
        res.send(result);
      }
    }
  );
});

//increment noOfInteraction (CourseView.js)
Course.post("/updateInteractionCount", (req, res) => {
  const cid = req.body.cId;
  connection.query(
    "UPDATE csslcourse SET noOfInteraction = noOfInteraction + 1 WHERE courseId = ?;",
    [cid],
    (error, result, feilds) => {
      if (error) console.log(error);
      else {
        res.send(result);
      }
    }
  );
});

//user enroll to a course (CourseView.js)
Course.post("/enrollCourse", (req, res) => {
  const cid = req.body.cId;
  const mid = req.body.mId;
  const stDate = req.body.stDate;
  const lastAccess = req.body.lastAccess;
  const status = "Ongoing";
  connection.query(
    "INSERT INTO courseenroll (courseId, memberId, startDate, lastAccess, status) VALUES (?,?,?,?,?);",
    [cid, mid, stDate, lastAccess, status],
    (error, result, feilds) => {
      if (error) console.log(error);
      else {
        res.send(result);
      }
    }
  );
});

//get course list of enrolled course (CourseView.js)
Course.post("/getEnCourseContent", (req, res) => {
  const cid = req.body.cId;
  const status = "Approved";
  connection.query(
    "SELECT contentId FROM coursecontent WHERE courseId = ? AND status = ? ORDER BY contentOrder;",
    [cid, status],
    (error, result, feilds) => {
      if (error) console.log(error);
      else {
        res.send(result);
      }
    }
  );
});

//insert course list of enrolled course to contentaccess table (CourseView.js)
Course.post("/insertEnCourseContent", (req, res) => {
  const cid = req.body.cId;
  const mid = req.body.mId;
  const cntId = req.body.cntId;
  const status = "Enroll";
  connection.query(
    "INSERT INTO contentaccess (memberId, courseId, contentId, status) VALUES (?,?,?,?);",
    [mid, cid, cntId, status],
    (error, result, feilds) => {
      if (error) console.log(error);
      else {
        res.send(result);
      }
    }
  );
});

export default Course;
