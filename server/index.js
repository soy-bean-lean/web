import express from "express";
import cors from "cors";
import path from "path";
import userRouter from "./routes/User.js";
import secretaryRouter from "./routes/secretary.js";
import blogs from "./routes/blogsSQL.js";
import Job from "./routes/jobsSQL.js";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import session from "express-session";
import Record from "./routes/cpdRecord.js";
import dashBoardSQL from "./routes/dashBoardSQL.js";
import reportSQL from "./routes/reportsSQL.js";
import Course from "./routes/csslCourse.js";

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

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
    key: "accessToken",
    secret: "importantsecret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 60,
    },
  })
)

//var __dirname = path.resolve();


//routers
app.use("/auth", userRouter);
app.use("/job", Job);
app.use("/blog", blogs);
app.use("/Dash", dashBoardSQL);
app.use("/cpdP", Record);
app.use("/reports", reportSQL);

app.use("/cpd", Record);
app.use("/csslcourse", Course);

app.use("/secretary", secretaryRouter);

app.use('/uploads', express.static(path.resolve(__dirname, './uploads')));

app.listen(3001, () => {
  console.log("Yey, your server is running on port 3001");
});
