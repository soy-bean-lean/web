import express from "express";
import cors from "cors";
import userRouter from "./routes/User.js";
import Job from "./routes/jobsSQL.js";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import session from "express-session";
import connection from "./db.js";
import Record from "./routes/cpdRecord.js";
import Course from "./routes/csslCourse.js";

const app = express();

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);
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
app.use("/auth", userRouter);
app.use("/job", Job);
app.use("/cpd", Record);
app.use("/csslcourse", Course);

app.listen(3001, () => {
  console.log("Yey, your server is running on port 3001");
});
