import React, { useState, useEffect } from "react";

import "./style/questionare.css";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

function Questionare() {
  const { id } = useParams();




  const [answer, setAnswer] = useState([id, 0, 0, 0, 0, 0]);
  const [data, setData] = useState(null);
  //const [correctAnswers, setCorrectAnswers] = useState(null);
  const [correction, serCorrection] = useState(null);
  var correctAnswers = 0;
  let history = useHistory();

  useEffect(() => {
    axios
      .post("http://localhost:3001/job/getQuestion", data)

      .then((response) => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          setData(response.data);
        }
      })
      .catch((error) => {
        alert(error);
      });
  }, []);

  function next() {
    console.log(data);
    var finalMarks = 0;

    for (let Qnumber = 1; Qnumber <= 5; Qnumber++) {
      if (answer[Qnumber] === data[Qnumber - 1].Correct) {
        console.log(answer[Qnumber] + "---" + data[Qnumber - 1].Correct);
        console.log(Qnumber + "is Correct");
        finalMarks = finalMarks + 1;
      }
    }
    console.log(finalMarks);
    history.push("/addJobCV/" + id + finalMarks * 15051);
  }
 
  const Questions =
    data &&
    data.map((data) => (
      <>
        {" "}
        <br></br>
        <h2>
          {data.Qnumber}) {data.Question}
        </h2>
        <br></br>
        <input
          className="answerRadio"
          type="radio"
          id="answer"
          name={data.Qnumber}
          value="1"
          onChange={(event) => {
            setAnswer(
              answer.map((element, index) => {
                if (index === data.Qnumber) {
                  return event.target.value * 1;
                } else {
                  return element;
                }
              })
            );
          }}
        ></input>
         {" "}
        <label className="answer" for="html">
          {data.Answer1}
        </label>
         <br></br>
        <input
          className="answerRadio"
          type="radio"
          id="answer"
          name={data.Qnumber}
          value="2"
          onChange={(event) => {
            setAnswer(
              answer.map((element, index) => {
                if (index === data.Qnumber) {
                  return event.target.value * 1;
                } else {
                  return element;
                }
              })
            );
          }}
        ></input>
         {" "}
        <label className="answer" for="html">
          {data.Answer2}
        </label>
         <br></br>
        <input
          className="answerRadio"
          type="radio"
          id="answer"
          name={data.Qnumber}
          value="3"
          onChange={(event) => {
            setAnswer(
              answer.map((element, index) => {
                if (index === data.Qnumber) {
                  return event.target.value * 1;
                } else {
                  return element;
                }
              })
            );
          }}
        ></input>
         {" "}
        <label className="answer" for="html">
          {data.Answer3}
        </label>
         <br></br>
        <input
          className="answerRadio"
          type="radio"
          id="answer"
          name={data.Qnumber}
          value="4"
          onChange={(event) => {
            setAnswer(
              answer.map((element, index) => {
                if (index === data.Qnumber) {
                  return event.target.value * 1;
                } else {
                  return element;
                }
              })
            );
          }}
        ></input>
         {" "}
        <label className="answer" for="html">
          {data.Answer4}
        </label>
           <br></br> 
            
      </>
    ));
  return (
    <div className="questionare" id="divToPrint">
      {Questions}

      <div className="send">
        <Link className="sendQues">
          <a href="#" className="sendData" onClick={next}>
            Submit Answers
          </a>

        </Link>
        {" "}
           <br></br> 
<div></div>
      </div>
    </div>
  );
}
export default Questionare;
