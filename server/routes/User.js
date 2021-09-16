import Router from "express";
import connection from "../db.js";
import bcrypt from "bcrypt";
import pkg from "jsonwebtoken";
import validateToken from "../middlewares/AuthMiddleware.js";
import multer from "multer";

const { sign } = pkg;

const userRouter = Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/profileImages");
  },
  filename: function (req, file, cb) {
    const ext = file.mimetype.split("/")[1];
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({
  storage: storage,
});
//addProfile pic

userRouter
  .route("/updateProfileImage")
  .post(upload.single("image"), (req, res, err) => {
    if (!req.file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG)$/)) {
      res.send({ msg: "Not an Image File." });
    } else {
      const image = req.file.filename;
      const memberId = req.body.memberId;

      connection.query(
        " UPDATE user SET profileImage =" +
          " '" +
          image +
          "'" +
          "  WHERE id = " +
          memberId +
          ";",

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

userRouter.post("/updateBasicDetails", async (req, res) => {
  const memberId = req.body.memberId;
  const firstName = req.body.firstName;
  const lastName = req.body.secondName;
  const residentialAddress = req.body.address;
  const contactNumber = req.body.contact;
  const birthDate = req.body.dob;
  const nic = req.body.nic;
  const email = req.body.email;
  connection.query(
    " UPDATE user SET firstName = '" +
      firstName +
      " ' , lastName = '" +
      lastName +
      " ' ,residentialAddress = '" +
      residentialAddress +
      " ' ,contactNumber = '" +
      contactNumber +
      " ' ,birthDate = '" +
      birthDate +
      " ' ,email = '" +
      email +
      " ' ,nic = '" +
      nic +
      " '  WHERE id = " +
      memberId +
      ";",

    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.json("success");
      }
    }
  );

});

//Register

userRouter.post("/", async (req, res) => {
  //member details
  const title = req.body.title;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const residentialAddress = req.body.residentialAddress;
  const contactNumber = req.body.contactNumber;
  const birthDate = req.body.birthDate;
  const email = req.body.email;
  const password = req.body.password;
  const userType = req.body.category;

  //employment details
  const designation = req.body.designation;
  const companyName = req.body.companyName;
  const businessAddress = req.body.businessAddress;

  connection.query(
    "SELECT * FROM user WHERE email = ?",
    [email],
    (err, result) => {
      if (result.length <= 0) {
        bcrypt.hash(password, 10).then((hash) => {
          connection.query(
            `INSERT INTO user (title,firstName,lastName,residentialAddress,contactNumber,birthDate,email,password,userType) VALUES (?,?,?,?,?,?,?,?,?)`,
            [
              title,
              firstName,
              lastName,
              residentialAddress,
              contactNumber,
              birthDate,
              email,
              hash,
              userType,
            ],
            (err, row) => {
              if (err) {
                res.json({ error });
              } else {
                connection.query(
                  `INSERT INTO employmentdetails (memberID, designation, companyName, businessAddress) VALUES (?,?,?,?)`,
                  [row.insertId, designation, companyName, businessAddress],
                  (err, result) => {
                    if (err) {
                      res.json({ error });
                    } else {
                      res.json("successfully added to database");
                    }
                  }
                );
              }
            }
          );
        });
      } else {
        res.json({ error: "Username already exists" });
      }
    }
  );
});

//login
//userRouter.post("/login", validateToken, async (req, res) => {
userRouter.post("/login", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  connection.query(
    //temporary sql query for testing
    "SELECT user.*, logininfo.* FROM user INNER JOIN logininfo ON user.email = logininfo.un WHERE logininfo.un = ?",

    [username],
    (err, result) => {
      if (result.length > 0) {
        bcrypt.compare(password, result[0].pw).then((match) => {
          if (!match) {
            res.json({ errorPass: "Incorrect password" });
          } else {
            const accessToken = sign(
              {
                firstName: result[0].firstName,
                lastName: result[0].lastName,
                id: result[0].id,
                role: result[0].userType,
                profileImage: result[0].profileImage,
                email: username,
              },
              "importantsecret"
            );
            console.log("_____" + result[0].profileImage);
            res.json({
              token: accessToken,
              firstName: result[0].firstName,
              lastName: result[0].lastName,
              id: result[0].id,
              role: result[0].userType,
              profileImage: result[0].profileImage,
              email: username,
            });
          }
        });
      } else {
        res.json({ errorUser: "Username doesn't exists" });
      }
    }
  );
});

userRouter.post("/updatePassword", async (req, res) => {
  const currentPassword = req.body.currentPassword;
  const newPassword = req.body.newPassword;
  const memberId = req.body.memberId;

  connection.query(
    //temporary sql query for testing
    "SELECT password,email from user  WHERE id = ?",

    [memberId],
    (err, result) => {
      if (result.length > 0) {
        bcrypt.compare(currentPassword, result[0].password).then((match) => {
          if (!match) {
            res.json({ errorPass: "errorCurrent" });
          } else {
            /*   bcrypt.hash(newPassword, 10).then((hash) => {
              connection.query("UPDATE user SET password = '"+hash+" where id="+memberId+";",  
                (err, result) => {
                  if (err) {
                    res.json({ errorPass: "error" });
                  } else {
                    res.json("success");
                  }
                }
              );
            });
            bcrypt.hash(newPassword, 10).then((hash) => {
              connection.query("UPDATE user SET pw = '"+hash+" where un="+result[0].email+";",  
                (err, result) => {
                  if (err) {
                    res.json({ errorPass: "error" });
                  } else {
                    res.json("success");
                  }
                }
              );
            });*/
          }
        });
      } else {
        res.json({ errorPass: "error" });
      }
    }
  );
});
userRouter.post("/getProfileData", (req, res) => {
  const memberId = req.body.memberId;

  const sqlSelect =
    "select firstName ,lastName ,residentialAddress ,email,nic,contactNumber, birthDate from user where id = " +
    memberId +
    ";";

  connection.query(sqlSelect, (err, result) => {
    res.send(result);
  });
});

userRouter.get("/auth", validateToken, (req, res) => {
  res.json(req.user);
});

export default userRouter;
