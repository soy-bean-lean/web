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
  const [correction, serCorrection] = useState(null);

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

  const submit = () => {
    console.log(answer);
    axios
      .post("http://localhost:3001/job/sendAnswers", answer)
      .then((response) => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          serCorrection(response.data);

          //history.push("/");
        }
      });
  };
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
                if (index === data.Qnumber ) {
                  return event.target.value * 1;
                } else {
                  return element;
                }
              })
            );
          }} /*
          onChange={(event) => {
            setAnswer([event.target.value]);
          }}*/
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
           <br></br> <br></br> <hr></hr>
      </>
    ));
  return (
    <div className="questionare">
      {Questions}

      <div className="send">
        <Link className="sendQues">
          <a href="#" className="sendData" onClick={submit}>
            Submit Answers
          </a>
        </Link>
      </div>
    </div>
  );
}
export default Questionare;
