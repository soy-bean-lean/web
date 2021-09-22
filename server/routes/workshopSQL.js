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
    const location = req.body.location;
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
      `INSERT INTO csslworkshop (title,description,fromDate,toDate,duration,subject,image,addBy,location) VALUES (?,?,?,?,?,?,?,?,?)`,
      [
        title,
        description,
        fromDate,
        toDate,
        duration,
        subject,
        image,
        memberId,
        location,
      ],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          console.log(result);
          res.send({
            data: result,
            msg: "Successfully Saved.",
          });
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
    "SELECT wId, title,description,image,subject,fromDate,toDate FROM csslworkshop WHERE credit IS NULL AND verifiedBy IS NULL ORDER BY `csslworkshop`.`wId`  DESC;",

    (error, result, feilds) => {
      if (error) console.log(error);
      else {
        res.send(result);
      }
    }
  );
});

Workshop.post("/getConductors", (req, res) => {
  const memberId = req.body.memberId;
  //console.log(mid);
  const sql =
    "select id,title,firstName,lastName,email from user where id != " +
    memberId;
  console.log(sql);

  connection.query(
    sql,

    (error, result, feilds) => {
      if (error) console.log(error);
      else {
        res.send(result);
      }
    }
  );
});

Workshop.post("/getConductorsForCards", (req, res) => {
  const memberId = req.body.memberId;
  //console.log(mid);
  const sql =
    "SELECT workshopconduct.*,member.memberId,user.title As T ,user.firstName,user.lastName,user.userType,user.profileImage FROM `workshopconduct` inner join member on member.memberId=workshopconduct.memberId Inner join user on user.id = member.id ORDER BY `wId` ASC;";
  console.log(sql);

  connection.query(
    sql,

    (error, result, feilds) => {
      if (error) console.log(error);
      else {
        res.send(result);
      }
    }
  );
});

//getApproved workshop details
Workshop.post("/getApprovedWorkshop", (req, res) => {
  console.log("get all workshop line 999");
  const wid = req.body.id;

  connection.query(
    "SELECT   csslworkshop.*,workshopconduct.date as conductData ,user.title AS T,user.firstName,user.lastName,user.email FROM (((csslworkshop INNER JOIN workshopconduct ON workshopconduct.wId=csslworkshop.wId ) INNER JOIN member ON member.memberId=workshopconduct.memberId) INNER JOIN user ON user.id=member.id) WHERE csslworkshop.verifiedBy IS NOT NULL AND csslworkshop.wId= ?;",
    [wid],
    (error, result, feilds) => {
      if (error) console.log(error);
      else {
        res.send(result);
      }
    }
  );
});

//getApproved workshop details
Workshop.post("/getApprovedWorkshopCards", (req, res) => {
  const workshop = req.body.workshop;
  const subject = req.body.subject;
  const location = req.body.location;
console.log(workshop)
console.log(location)
console.log(subject)
  connection.query(
    "SELECT  csslworkshop.* from csslworkshop  WHERE title like '" +
      workshop +
      "%' and subject like '" +
      subject +
      "%' and location like '" +
      location +
      "%' and csslworkshop.verifiedBy IS NOT NULL;",
    (error, result, feilds) => {
      if (error) console.log(error);
      else {
        res.send(result);
      }
    }
  );
});


//display approved workshop
Workshop.post("/getWorkshop", (req, res) => {
  console.log("get all workshop line 700");

  connection.query(
    "SELECT wId, title,description,fromDate,toDate,image,subject FROM csslworkshop WHERE verifiedBy IS NOT NULL;",

    (error, result, feilds) => {
      if (error) console.log(error);
      else {
        res.send(result);
      }
    }
  );
});

Workshop.post("/getWorkshopFromAndTo", (req, res) => {
  const wid = req.body.wid;
  connection.query(
    "SELECT * FROM `csslworkshop` where wid = " + wid + ";",

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

Workshop.route("/addCredit").post((req, res, err) => {
  const wid = req.body.wid;
  const mid = req.body.verifiedBy;

  const credit = req.body.credit;

  console.log(wid);
  console.log(mid);

  connection.query(
    "UPDATE csslworkshop SET credit = ?, verifiedBy = ?  WHERE wId = ?;",
    [credit, mid, wid],
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
});

Workshop.post("/addConducter", async (req, res) => {
  const conducterId = req.body.conducterId;
  const wid = req.body.wid;
  const assignDate = req.body.assignDate;
  console.log("++++++++++++++++++++++++++++");

  console.log(wid);
  console.log(assignDate);
  connection.query(
    `INSERT INTO workshopconduct (wId  , memberId  ,date) VALUES (?,?,?)`,

    [wid, conducterId, assignDate],
    (err, result) => {
      if (err) {
        console.log(err);
        res.send(result);
      } else {
        //  console.log(error);
        res.json("success");
      }
    }
  );
});

//SELECT csslworkshop.* ,user.title,user.firstName,user.lastName,user.email FROM (((csslworkshop INNER JOIN workshopconduct ON workshopconduct.wId=csslworkshop.wId ) INNER JOIN member ON member.memberId=workshopconduct.memberId) INNER JOIN user ON user.id=member.id)

export default Workshop;
