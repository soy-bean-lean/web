import Router from "express";
import connection from "../db.js";
import bcrypt from "bcrypt";

const userRouter = Router();

userRouter.post("/", async (req, res) => { 
    
    connection.query(
        'SELECT * FROM users WHERE username=?', 
        [req.body.email], 
        (err, result) => {
            
        if (result.length <= 0){
            const password = req.body.password;
            bcrypt.hash(password,10).then((hash) => {
                connection.query(`INSERT INTO users (username, password) VALUES (?, ?)`, 
                [req.body.email, hash],(err, result)=> {
                    connection.query(`INSERT INTO posts (title, postText) VALUES (?, ?)`, 
                    [result.insertId, req.body.email])
                    res.json("success");
                });
            })
        }else{
            res.json({ error: "Username already exists" });   
        }
    })   
    
});

userRouter.post("/login", async (req, res) => { 
        
    const username = req.body.username;
    const password = req.body.password;

    connection.query(
        'SELECT * FROM users WHERE username=?', 
        [username], 
        (err, result) => {
            
        if (result.length > 0){

            connection.query(
                'SELECT password FROM users WHERE username=?', 
                [username], 
                (err, row) => {
                    bcrypt.compare(password, row[0].password).then((match) => {  
                        if (!match) res.json({ error: "Incorrect password" });

                        //GET THE TYPE
                        connection.query(
                            'SELECT id FROM users WHERE username=?', 
                            [username], 
                            (err, id_res) => {

                                req.session.user = result;
                                res.json({
                                    id: id_res[0].id,
                                    username: username
                                });  
                            })                                            
                    });                
                })            
        }
        else
            res.json({ error: "Username doesn't exists" });            
    })
});


userRouter.get("/login", (req, res) => {
    if (req.session.user) {
      res.json({ loggedIn: true, user: req.session.user });
    } else {
      res.json({ loggedIn: false, error: "You have to be logged in"});
     // console.log("darshana");
    }
});


// userRouter.get("/auth", validateToken, (req, res) => {
//     // const username = req.body.username;
//     // const password = req.body.password;
    
//     // console.log(username);
//    // res.json(req.body.username);
// });

export default userRouter;