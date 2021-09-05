import React, {useState} from 'react';
import { useParams } from 'react-router';

function AddCourseContent(props){
    console.log("Rendering Course Content");
    const {id} = useParams();
    //console.log(props.location.state);
    const [courseTitle, setCourseTitle] = useState("");
    //setCourseTitle(props.location.state);
 return(
     <h1 style={{padding:"100px"}}>Course Name:{id}</h1>
 );
}

export default AddCourseContent;