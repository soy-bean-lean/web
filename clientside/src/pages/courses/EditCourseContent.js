import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory, useParams } from 'react-router-dom';

const EditCourseContent = () => {
  const [contentTitle, setContentTitle] = useState('');
  const [contentDes, setContentDes] = useState('');
  const [contentType, setContentType] = useState('');
  const [contentFile, setContentFile] = useState();
  const [videoLink, setVideoLink] = useState('');

  const [uploadStatus, setUploadStatus] = useState('');

  //const cId = props.cid;
  const { id } = useParams();
  const { title } = useParams();
  const { cntId } = useParams();
  const { cntTitle } = useParams();
  //setCourseTitle(props.location.state);

  let history = useHistory();

  useEffect(() => {
    const sendData = {
      //id: props.cid,
      cId: id,
      cntId: cntId,
    };
    axios
      .post('http://localhost:3001/csslcourse/getContentInfo', sendData)
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

  const updateCourseContent = () => {
    const formData = new FormData();
    formData.append('courseId', id);
    formData.append('contentId', cntId);
    formData.append('title', contentTitle);
    formData.append('description', contentDes);
    formData.append('type', contentType);

    if (contentType == 'File') {
      formData.append('cfile', contentFile);
    } else {
      formData.append('vlink', videoLink);
    }

    fetch('http://localhost:3001/csslcourse/editCourseContent', {
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
        alert('Successfully Saved Details');
        redirectCourse();
      })
      .catch(error => {
        console.log(error);
      });
  };

  const redirectCourse = () => {
    let path = '/courseView/cssl00' + id + '/' + title;
    history.push(path);
  };

  const setComponents = record => {
    setContentTitle(record.title);
    setContentDes(record.description);
    setContentType(record.contentType);
    if (record.contentType == 'File') {
      setContentFile(record.content);
    } else {
      setVideoLink(record.content);
    }
  };

  const display = val => {
    console.log(val);
  };
};

export default EditCourseContent;
