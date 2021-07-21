import { createConnection } from "mysql2";
import { HOST, USER, PASSWORD, DB } from "./dbconfig.js";

// Create a connection to the database
const connection = createConnection({
  host: HOST,
  user: USER,
  password: PASSWORD,
  database: DB
});

connection.connect(error => {
  if (error) throw error;
  console.log("Successfully connected to the database.");
});

// open the MySQL connection


export default connection;