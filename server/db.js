import { createConnection } from "mysql2";
import { HOST, USER, PASSWORD, DB } from "./dbconfig.js";
import nodemailer from "nodemailer";
// Create a connection to the database
const connection = createConnection({
  host: HOST,
  user: USER,
  password: PASSWORD,
  database: DB,
});

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "2018cs071@stu.ucsc.cmb.ac.lk",
    pass: "Chamika@97",
  },
});

// var mailOptions = {
//   from: "2018cs071@stu.ucsc.cmb.ac.lk",
//   to: "2018is087@stu.ucsc.cmb.ac.lk",
//   subject: "CPDMF",
//   text: `!!!!!!!!!!!!!!!!!!!!!!!!Warning!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//   payment hadpam buruwooooooooooooooo
//   `,
//   attachments: [
//     {
//       filename: "erro.png",
//       path: "http://localhost:3001/uploads/jobvacancy/erro.png",
//       contentType: "application/pdf",
//     },
//   ],
//   // html: '<h1>Hi Smartherd</h1><p>Your Messsage</p>'
// };

// transporter.sendMail(mailOptions, function (error, info) {
//   if (error) {
//     console.log(error);
//   } else {
//     console.log("Email sent: " + info.response);
//   }
// });

connection.connect((error) => {
  if (error) throw error;
  console.log("Successfully connected to the database.");
});

// open the MySQL connection

export default connection;
