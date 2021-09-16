import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";

const AddCourseContent = () =>{
    const [contentTitle, setContentTitle] = useState("");
  const [contentDes, setContentDes] = useState("");
  const [contentType, setContentType] = useState("");
  const [note, setNote] = useState("");
  const [contentFile, setContentFile] = useState();
  const [videoLink, setVideoLink] = useState("");
  const [contentNum, setContentNum] = useState(0);

  const [uploadStatus, setUploadStatus] = useState("");

  //const cId = props.cid;
  const { id } = useParams();
  const { title } = useParams();
  //setCourseTitle(props.location.state);

  let history = useHistory();

  useEffect(() => {
    const sendData = {
      //id: props.cid,
      id: id,
    };
    axios
      .post("http://localhost:3001/csslcourse/getContentNo", sendData)
      .then((response) => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          console.log("response:", response.data[0].contentNo);

          if (response.data[0].contentNo != null) {
            setContentNum(response.data[0].contentNo + 1);
          } else {
            setContentNum(contentNum + 1);
          }
        }
      })
      .catch((error) => {
        alert(error);
      });
  }, []);

  const InsertCourseContentNext = () => {
    const mId = "cssl001";
    const contentId = "cssl00" + id + "-0" + contentNum;
    console.log("ID:", contentId);

    const formData = new FormData();
    formData.append("courseId", id);
    formData.append("contentNo", contentNum);
    formData.append("contentId", contentId);
    formData.append("title", contentTitle);
    formData.append("description", contentDes);
    formData.append("type", contentType);
    formData.append("note", note);

    if (contentType == "File") {
      formData.append("cfile", contentFile);
    } else {
      formData.append("vlink", videoLink);
    }

    fetch("http://localhost:3001/csslcourse/courseContent", {
      method: "POST",
      body: formData,
      headers: {
        Accept: "multipart/form-data",
      },
      credentials: "include",
    })
      .then((res) => res.json())
      .then((res) => {
        setUploadStatus(res.msg);
        alert("Successfully Saved Details and Next Content");
        redirectCourse();
        redirectContentAdd();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const InsertCourseContentFinish = () => {
    const mId = "cssl001";
    const contentId = "cssl00" + id + "-0" + contentNum;
    console.log("ID:", contentId);

    const formData = new FormData();
    formData.append("courseId", id);
    formData.append("contentNo", contentNum);
    formData.append("contentId", contentId);
    formData.append("title", contentTitle);
    formData.append("description", contentDes);
    formData.append("type", contentType);
    formData.append("note", note);

    if (contentType == "File") {
      formData.append("cfile", contentFile);
    } else {
      formData.append("vlink", videoLink);
    }

    fetch("http://localhost:3001/csslcourse/courseContent", {
      method: "POST",
      body: formData,
      headers: {
        Accept: "multipart/form-data",
      },
      credentials: "include",
    })
      .then((res) => res.json())
      .then((res) => {
        setUploadStatus(res.msg);
        alert("Successfully Saved Details and Finish");
        redirectCourse();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const redirectContentAdd = () => {
    let path = "/csslcourse/addCourseContent/cssl00" + id + "/" + title;
    history.push(path);
  };

  const redirectCourseList = () => {
    let path = "/lecCourse";
    history.push(path);
  };

  const redirectCourse = () => {
    let path = "/courseView/cssl00" + id + "/" + title;
    history.push(path);
  };

  const resetComponents = () => {
    setContentTitle("");
    setContentDes("");
    setContentType("");
    setContentFile();
    setVideoLink("");
    setNote("");
  };
  const setEditorValue = (val) => {
    setNote(val);
  };

  return(
      <div>
          Add Course Content
          {id}-{title}
      </div>
  );

}
export default AddCourseContent;