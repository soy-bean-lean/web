import Router from "express";
import connection from "../db.js";
import bcrypt from "bcrypt";
import e from "express";

const addJob = Router();
const getJobs = Router();

  
console.log("*********************server 7");

addJob.post("/", async (req, res) => { 
    const companyName = req.body.companyName;

    const jobRole= req.body.jobRole;
    const location= req.body.location;
    const contact= req.body.contact;
    const email= req.body.email;
    const description= req.body.description;
    const addBy=100;
    
    connection.query(`INSERT INTO jobvacancy (companyName,location,designation,email,contact,description,addBy) VALUES (?,?,?,?,?,?,?)`, 
                [companyName,location,jobRole,email,contact,description,addBy],(err, result)=> {
                    console.log("server 22");

                    if(err)
                    {
                        console.log(err);
                    } else
                    {    console.log("server 28");

                        res.json("success");
                }
                });
            
            });
export default addJob;