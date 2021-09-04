import Router from "express";
import multer from "multer";
import connection from "../db.js";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads");
    },
    filename: function (req, file, cb) {
      const ext = file.mimetype.split("/")[1];
      cb(null, Date.now() + "-" + file.originalname);
    },
  });
  
  const upload = multer({
    storage: storage,
  });

const Course = Router();

Course.route("/basicInfo")
    .post(upload.single('image'), (req,res,err) => {

    if(!req.file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG)$/)){
        res.send({msg:'Not an Image File.'})
    }
    else{
        const image = req.file.filename;
        connection.query(
            "INSERT INTO test (image) VALUES (?);",
            [image],
            (error, result, feilds) => {
              if (error) console.log(error);
              else {
                //console.log(result);
                res.send({
                    data: result,
                    msg: "Successfully Saved."
                });
              }
            }
          );
    }
})

export default Course;