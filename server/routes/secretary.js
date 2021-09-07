import Router from "express";
import connection from "../db.js";

const secretaryRouter = Router();

secretaryRouter.post("/regPending", async (req, res) => {
  connection.query(
    "SELECT * FROM `user` WHERE `status` = ? AND (`userType` = ? OR `userType` = ? OR `userType` = ? OR `userType` = ?);",
    [0, "student", "associate", "professional", "chartered"],
    (error, result, feilds) => {
      if (error) {
        console.log(error);
      } else {
        // console.log(result);
        res.send(result);
      }
    }
  );
});

secretaryRouter.post("/regApproved", async (req, res) => {
  connection.query(
    "SELECT * FROM `user` WHERE `status` = ? AND (`userType` = ? OR `userType` = ? OR `userType` = ? OR `userType` = ?);",
    [1, "student", "associate", "professional", "chartered"],
    (error, result, feilds) => {
      if (error) {
        console.log(error);
      } else {
        // console.log(result);
        res.send(result);
      }
    }
  );
});

secretaryRouter.post("/regRejected", async (req, res) => {
  connection.query(
    "SELECT * FROM `user` WHERE `status` = ? AND (`userType` = ? OR `userType` = ? OR `userType` = ? OR `userType` = ?);",
    [2, "student", "associate", "professional", "chartered"],
    (error, result, feilds) => {
      if (error) {
        console.log(error);
      } else {
        // console.log(result);
        res.send(result);
      }
    }
  );
});

secretaryRouter.post("/approve", async (req, res) => {

    const id = req.body.id;
    console.log("Anushka");
    console.log(id);

    connection.query(

      "UPDATE `user` SET `status` = ? WHERE `id` = ? ;",
      [1, id],
      (error, result, feilds) => {
        if (error) {
          console.log(error);
        } else {
          // console.log(result);
          res.send(result);
        }
      }
    );
  });

  secretaryRouter.post("/reject", async (req, res) => {

    const id = req.body.id;
    console.log("Anushka");
    console.log(id);

    connection.query(

      "UPDATE `user` SET `status` = ? WHERE `id` = ? ;",
      [2, id],
      (error, result, feilds) => {
        if (error) {
          console.log(error);
        } else {
          // console.log(result);
          res.send(result);
        }
      }
    );
  });

export default secretaryRouter;
