import React, { useState, useEffect } from "react";
import "./style/addQuestion.css";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import axios from "axios";

function AddQuestion() {
  const [question, setQuestion] = useState("");
  const [ans1, setAnswer1] = useState("");
  const [ans2, setAnswer2] = useState("");
  const [ans3, setAnswer3] = useState("");
  const [ans4, setAnswer4] = useState("");
  const [correct, setCorrectAnswer] = useState("");

  //  const [image, setImage] = useState("");

  let history = useHistory();

  const addJob = () => {
    const data = {
      question: question,
      ans1: ans1,
      ans2: ans2,
      ans3: ans3,
      ans4: ans4,
      correct: correct,
    };
    axios.post("http://localhost:3001/job/addQuestion", data).then((response) => {
      if (response.data.error) {
      
        alert(response.data.error);
      } else {
        history.push("/");
      }
    });
  };
  return (
    <>
      <div className="jobQuestion-basic-info">
        <h1 className="jobQuestion-basic-info-title">Add Job Questions</h1>
        <hr></hr>
        <div className="jobQuestion-basic-info-form">
          <div className="jobQuestion-basic-info-block">
            <div className="jobQuestion-field-block">
              <textarea
                className="note"
                placeholder="--Enter the Question--"
                onChange={(event) => {
                  setQuestion(event.target.value);
                }}
              ></textarea>
            </div>
            <div className="jobQuestion-field-block">
              <input
                className="input"
                placeholder="--Answer 1--"
                onChange={(event) => {
                  setAnswer1(event.target.value);
                }}
              ></input>
            </div>
            <div className="jobQuestion-field-block">
              <input
                className="input"
                placeholder="--Answer 2--"
                onChange={(event) => {
                  setAnswer2(event.target.value);
                }}
              ></input>
            </div>
            <div className="jobQuestion-field-block">
              <input
                className="input"
                placeholder="--Answer 3--"
                onChange={(event) => {
                  setAnswer3(event.target.value);
                }}
              ></input>
            </div>
            <div className="jobQuestion-field-block">
              <input
                className="input"
                placeholder="--Answer 4--"
                onChange={(event) => {
                  setAnswer4(event.target.value);
                }}
              ></input>
            </div>
            <h4 className="jobQuestion-info-title">The Correct Answer...</h4>

            <div className="jobQuestion-answer">
              <input
                type="radio"
                id="answer"
                name="answer"
                value="1"
                onChange={(event) => {
                  setCorrectAnswer(event.target.value);
                }}
              ></input>
              <label className="answer">Answer 1</label>
              <input
                type="radio"
                id="answer"
                name="answer"
                value="2"
                onChange={(event) => {
                  setCorrectAnswer(event.target.value);
                }}
              ></input>
              <label className="answer">Answer 2</label>
              <input
                type="radio"
                id="answer"
                name="answer"
                value="3"
                onChange={(event) => {
                  setCorrectAnswer(event.target.value);
                }}
              ></input>
              <label className="answer">Answer 3</label>
              <input
                type="radio"
                id="answer"
                name="answer"
                value="4"
                onChange={(event) => {
                  setCorrectAnswer(event.target.value);
                }}
              ></input>
              <label className="answer">Answer 4</label>
            </div>
          </div>
          <button className="jobQuestion-btn-submit" onClick={addJob}>
            {" "}
            Add{" "}
          </button>
        </div>
      </div>
    </>
  );
}

export default AddQuestion;
