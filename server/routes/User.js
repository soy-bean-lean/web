import Router from "express";
import connection from "../db.js";
import bcrypt from "bcrypt";

const userRouter = Router();
//------Anushka's Code------

/*userRouter.post("/", async (req, res) => { 
    
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
    
});*/

//--------------------------------

userRouter.post("/", async (req, res) => { 
    const type = req.body.category;
    const title = req.body.title;
    const fname = req.body.firstName;
    const sName = req.body.secondName
    const lname = req.body.lastName;
    const desig = req.body.designation;
    const mail = req.body.email;
    const pw = req.body.password;
    connection.query(
        'SELECT * FROM logininfo WHERE un = ?', 
        [mail], 
        (err, result) => {
            
        if (result.length <= 0){
            bcrypt.hash(pw,10).then((hash) => {
                connection.query(`INSERT INTO user (title,firstName,lastName,email,userType,) VALUES (?, ?,?,?,?)`, 
                [title, fname, lname, mail, type],(err, result)=> {
                    connection.query(`INSERT INTO logininfo (un, pw) VALUES (?, ?)`, 
                    [mail,pw]),
                    res.json("success");
                });
            })
        }else{
            res.json({ error: "Username already exists" });   
        }
    })   
    
});

/*userRouter.post("/login", async (req, res) => { 
        
    const username = req.body.username;
    const password = req.body.password;

    connection.query(
        'SELECT * FROM users WHERE username=?',
        console.log("anushka2") 
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

                                // const id = result[0].id;
                                // const token = jwt.sign({id}, "jwtSecret", {
                                //     expiresIn:1000,
                                    
                                // })

                              //  req.session.user = result;
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

*/

userRouter.post("/login", async (req, res) => { 
        
    const username = req.body.username;
    const password = req.body.password;
    connection.query(
        'SELECT * FROM logininfo WHERE un = ?', 
        [username], 
        (err, result) => {
            
        if (result.length > 0){

            connection.query(
                'SELECT pw FROM users WHERE un = ?', 
                [username], 
                (err, row) => {
                    bcrypt.compare(password, row[0].password).then((match) => {  
                        if (!match) res.json({ error: "Incorrect password" });

                        //GET THE TYPE
                        connection.query(
                            'SELECT userType FROM user WHERE email = ?', 
                            [username], 
                            (err, resType) => {

                                req.session.user = result;
                                res.json({
                                    username: username,
                                    type : resType[0].userType
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