import express from "express";
import cors from "cors";
import userRouter from "./routes/User.js";
import Job from "./routes/jobsSQL.js"
import secretaryRouter from "./routes/secretary.js";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import session from "express-session";
import connection from "./db.js";

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

//routers
app.use("/auth", userRouter);
app.use("/secretary", secretaryRouter);
app.use("/job", Job);

app.listen(3001, () => {
  console.log("Yey, your server is running on port 3001");
});
