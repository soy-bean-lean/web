import express from "express";
import cors from "cors";
import userRouter from "./routes/User.js";
import addJob from "./routes/jobs.js";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import session from "express-session";
import connection from "./db.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true,
  }
));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    key: "userId",
    secret: "csslSecret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 60 * 60 * 24 * 1000,
    },
  })
);
//routers
app.use("/auth",userRouter);
app.use("/job",addJob);

app.get("/job/getJobs", (req, res) => {
  const sqlSelect =
    "SELECT jvId , companyName , location ,designation from jobvacancy";
    connection.query(sqlSelect, (err, result) => {
    res.send(result);
  });
});

app.get("/job/getJobView", (req, res) => {
  const jid = req.query.id;
  console.log(jid);
  connection.query(
    "SELECT jvId , companyName , location ,designation,description ,contact ,email from jobvacancy where jvId = ?;",
    [jid],
    (error, result, feilds) => {
      if (error) console.log(error);
      else {
       // console.log(result);
        res.send(result);
      }
    }
  );
});

app.listen(3001, () => {
    console.log("Yey, your server is running on port 3001");
});


/* const sqlSelect =
    "SELECT jvId , companyName , location ,designation from jobvacancy where jvId = ?;",
    [id];
    connection.query(sqlSelect, (err, result) => {
    res.send(result);
  });
});


app.listen(3001, () => {
    console.log("Yey, your server is running on port 3001");
});
*/