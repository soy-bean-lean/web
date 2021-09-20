import React, { useCallback, Component, useState } from 'react';
//import { useDropzone } from 'react-dropzone';
import Dropzone from 'react-dropzone'
import './FileUpload.css'

function FileUpload(props) {
  /*const onDrop = useCallback(acceptedFiles => {
    console.log(acceptedFiles);
  }, []);*/
  //const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const [fileSt, setFileSt] = useState(0);
  const [fileData, setFileData] = useState('');
  const getFile = (acceptedFiles) => {
    //console.log(acceptedFiles);
    props.onUploadFile(acceptedFiles);
    setFileSt(1);
    setFileData(acceptedFiles[0].name);
  };

  const errorMsg = () => {
    //console.log(acceptedFiles);
    alert("Unaccepted File Type")
  };

  const removeFile = (acceptedFiles) =>{
    acceptedFiles = [];
    props.onUploadFile(acceptedFiles);
    setFileSt(0);
  }
  return (
    <Dropzone onDropAccepted={getFile} onDropRejected={errorMsg} onFileDialogCancel={removeFile} accept = "image/*, application/pdf, .zip, .rar">
      {({ getRootProps, getInputProps }) => (
        <section>
          <div {...getRootProps()} className="dropzone">
            <input {...getInputProps()} />
            {fileSt == 0 &&(
            <p className="dropzone-text-para">Drag and Drop File Here, or Click to Select Files</p>
            )}
            {fileSt == 1 &&(
            <p className="dropzone-text-para">Uploaded File <br/> <p className="dropzone-text-file"><strong>{fileData}</strong></p></p>
            )}
          </div>
        </section>
      )}
    </Dropzone>
  );
}

export default FileUpload;
