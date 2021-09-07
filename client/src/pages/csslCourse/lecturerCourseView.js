import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

function LecturerCourseView(){
    const {id} = useParams();
    const {title} = useParams();
    return(
        <>
            <div>
                <h2>{title}</h2>
            </div>
        </>
    );

}

export default LecturerCourseView;