import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useHistory, useParams } from 'react-router-dom';

const EditCourseDetails = () => {
  const [courseTitle, setCourseTitle] = useState('');
  const [courseDes, setCourseDes] = useState('');
  const [courseDuration, setCourseDuration] = useState('');
  const [language, setLanguage] = useState('');
  const [level, setLevel] = useState('');
  const [mode, setMode] = useState('');
  const [imgFile, setImgFile] = useState();

  const [uploadStatus, setUploadStatus] = useState('');
  const [page, setPage] = useState('Content');

  const { id } = useParams();
  const { title } = useParams();

  let history = useHistory();

  useEffect(() => {
    const sendData = {
      //id: props.cid,
      cid: id,
    };
    axios
      .post('http://localhost:3001/csslcourse/getCourseInfo', sendData)
      .then(response => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          setComponents(response.data[0]);
        }
      })
      .catch(error => {
        alert(error);
      });
  }, []);

  const UpdateCourseInfo = () => {
    const mId = 'cssl001';
    const formData = new FormData();
    formData.append('id', id);
    formData.append('title', courseTitle);
    formData.append('description', courseDes);
    formData.append('duration', courseDuration);
    formData.append('language', language);
    formData.append('level', level);
    formData.append('mode', mode);
    formData.append('image', imgFile);

    fetch('http://localhost:3001/csslcourse/editCourseInfo', {
      method: 'POST',
      body: formData,
      headers: {
        Accept: 'multipart/form-data',
      },
      credentials: 'include',
    })
      .then(res => res.json())
      .then(res => {
        setUploadStatus(res.msg);
        console.log(res.data);
        alert('Successful');
      })
      .catch(error => {
        console.log(error);
      });
  };

  const setComponents = record => {
    setCourseTitle(record.name);
    setCourseDes(record.description);
    setCourseDuration(record.duration);
    setLanguage(record.language);
    setLevel(record.skillLevel);
    setMode(record.mode);
    setImgFile(record.image);
  };

  const redirectCourse = () => {
    let path = '/courseView/cssl00' + id + '/' + title;
    history.push(path);
  };
};

export default EditCourseDetails;
