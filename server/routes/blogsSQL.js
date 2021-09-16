import Router from "express";
import multer from "multer";
import connection from "../db.js";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/blog");
  },
  filename: function (req, file, cb) {
    const ext = file.mimetype.split("/")[1];
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({
  storage: storage,
});

const Blog = Router();

Blog.route("/addBlog").post(upload.single("image"), (req, res, err) => {
    if (!req.file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG)$/)) {
      res.send({ msg: "Not an Image File." });
    } else {
      const title = req.body.title;
      const desc = req.body.desc;
      const memberID = req.body.memberId;
      const date = req.body.date;
      
      const image = req.file.filename;
  console.log(image);

  connection.query(
        `INSERT INTO blog (memberId,title,content,publishedDate,image) VALUES (?,?,?,?,?)`,
        [
            memberID,
            title,
            desc,
            date,
            image,

        ],
        (err, result) => {
          if (err) {
            console.log(err);
          } else {

            res.json("success");
          }
        }
      );
    }
  });

  Blog.post("/getAllBloggers", (req, res) => {
    
   // console.log("get all blogs line - 58");
      const mid = req.body.memberId;
      const sqlSelect =
      
      "SELECT DISTINCT user.firstName,user.lastName, user.profileImage,member.memberId FROM ((user INNER JOIN member ON user.id=member.id ) INNER JOIN blog ON member.memberId=blog.memberId ) ORDER BY publishedDate DESC;"
        connection.query(sqlSelect, (err, result) => {
          res.send(result);
        });
    });


  Blog.post("/getAllBlogs", (req, res) => {
    
  console.log("get all blogs line - 58");
    const mid = req.body.memberId;
    const sqlSelect =
      "SELECT blogId, title, image, publishedDate FROM blog";
    //"SELECT DISTINCT user.firstName,user.lastName FROM ((user INNER JOIN member ON user.id=member.id ) INNER JOIN blog ON member.memberId=blog.memberId )"
      connection.query(sqlSelect, (err, result) => {
        res.send(result);
      });
  });

  Blog.post("/getMyBlogs", (req, res) => {
    
  console.log("get all blogs line -700");
    const mid = req.body.mId;
    connection.query(
      "SELECT blogId, title,image, content FROM blog WHERE memberId = ?;",
      [mid],
      (error, result, feilds) => {
        if (error) console.log(error);
        else {
          res.send(result);
        }
      }
    );
  });
  
 
  
  export default Blog;

