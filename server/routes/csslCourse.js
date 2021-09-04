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
        const lecturer = req.body.lecturer;
        const title = req.body.title;
        const description = req.body.description;
        const duration = req.body.duration;
        const language = req.body.language;
        const level = req.body.level;
        const image = req.file.filename;
        const mode = req.body.mode;
        const status = "Pending";

        connection.query(
            "INSERT INTO csslcourse (name, description, duration, language, skillLevel, image, mode, conductedBy, status) VALUES (?,?,?,?,?,?,?,?,?);",
            [title,description,duration,language,level,image,mode,lecturer,status],
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