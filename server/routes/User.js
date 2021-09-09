import Router from "express";
import connection from "../db.js";
import bcrypt from "bcrypt";
import pkg from "jsonwebtoken";
import validateToken from "../middlewares/AuthMiddleware.js";

const { sign } = pkg;

const userRouter = Router();

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
              },
              "importantsecret"
            );
            res.json({
              token: accessToken,
              firstName: result[0].firstName,
              lastName: result[0].lastName,
              id: result[0].id,
              role: result[0].userType,
            });
          }
        });
      } else {
        res.json({ errorUser: "Username doesn't exists" });
      }
      console.log(result);
    }
  );
});

userRouter.get("/auth", validateToken, (req, res) => {
  res.json(req.user);
});

export default userRouter;
