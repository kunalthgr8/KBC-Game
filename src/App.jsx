import "./app.css";
import { useMemo, useState } from "react";
import Trivia from "./components/Trivia";
import { useEffect } from "react";
import Timer from "./Timer";
import Start from "./components/Start";

function App() {

  const [questionNumber, setQuestionNumber] = useState(1);
  const [userName, setUserName] = useState(null);
  const [stop, setStop] = useState(false);
  const [earned, setEarned] = useState("$ 0");

  const data = [
    {
      id: 1,
      question: "Which is the capital city Of India??",
      answers: [
        {
          text: "New Delhi",
          correct: true,
        },
        {
          text: "Mumbai",
          correct: false,
        },
        {
          text: "Kolkata",
          correct: false,
        },
        {
          text: "Chennai",
          correct: false,
        }
      ]
    },
    {
      id: 2,
      question: "Which is the capital city Of Japan??",
      answers: [
        {
          text: "New Delhi",
          correct: false,
        },
        {
          text: "Tokoyo",
          correct: true,
        },
        {
          text: "Kolkata",
          correct: false,
        },
        {
          text: "Chennai",
          correct: false,
        }
      ]
    },
    {
      id: 3,
      question: "Which is the capital city Of USA??",
      answers: [
        {
          text: "New York",
          correct: false,
        },
        {
          text: "California",
          correct: false,
        },
        {
          text: "Washington DC",
          correct: true,
        },
        {
          text: "Los Angles",
          correct: false,
        }
      ]
    }
  ]
  const moneyPyramid = useMemo(() =>
    [
      { id: 1, amount: "$ 100" },
      { id: 2, amount: "$ 200" },
      { id: 3, amount: "$ 500" },
      { id: 4, amount: "$ 1000" },
      { id: 5, amount: "$ 2000" },
      { id: 6, amount: "$ 5000" },
      { id: 7, amount: "$ 10000" },
      { id: 8, amount: "$ 20000" },
      { id: 9, amount: "$ 50000" },
      { id: 10, amount: "$ 100000" }
    ].reverse()
    , []);

  useEffect(() => {
    questionNumber > 1 &&
      setEarned(moneyPyramid.find((m) => m.id === questionNumber - 1).amount);
  }, [moneyPyramid, questionNumber]);
  return (
    <div className="app">
      {userName ? (
        <>
        <div className="main">
        {stop ? (<h1 className="endText">You Earned:{earned}</h1>) : (
          <>
            <div className="top">
              <div className="timer"><Timer setStop={setStop} questionNumber={questionNumber} /></div>
            </div>
            <div className="bottom">
              <Trivia data={data} setStop={setStop} setQuestionNumber={setQuestionNumber} questionNumber={questionNumber} />
            </div> </>
        )}
      </div>
      <div className="pyramid">
        <ul className="moneyList">
          {moneyPyramid.map((m) => (
            <li className={questionNumber === m.id ? "moneyListItem active" : "moneyListItem"}>
              <span className="moneyListItemNumber">{m.id}</span>
              <span className="moneyListItemAmount">{m.amount}</span>
            </li>
          ))}
        </ul>
      </div>
        </>
      ): <Start setUserName = { setUserName }/>}
      
    </div>
  );
}

export default App;
