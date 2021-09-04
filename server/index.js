import express from "express";
import cors from "cors";
import multer from "multer";
import userRouter from "./routes/User.js";
import Job from "./routes/jobsSQL.js";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import session from "express-session";
import connection from "./db.js";
import Record from "./routes/cpdRecord.js";

const app = express();

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

const storage = multer.diskStorage({
  destination: (req,file,cb) => {
    cb(null, "uploads");
  },
  filename:function (req,file,cb){
    const ext = file.mimetype.split("/")[1];
    cb(null, Date.now() +'-'+ file.originalname);
  }
});

const upload = multer({ 
  storage: storage 
});

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


app.listen(3001, () => {
  console.log("Yey, your server is running on port 3001");
});
