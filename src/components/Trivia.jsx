import "../app.css";
import { useState } from "react";
import { useEffect } from "react";
import useSound from "use-sound";
import wrong from "../assets/wrong.mp3";
// import timeout from "../assets/timeout.mp3";
// import time from "../assets/time.mp3";
import questionpresent from "../assets/questionpresent.mp3";
import correct from "../assets/correct.mp3";

export default function Trivia({
    data,
    setStop,
    setQuestionNumber,
    questionNumber
}) {
    const [question, setQuestion] = useState(null);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [className, setClassName] = useState("answer");

    const [letsPlay] = useSound(questionpresent)
    const [correctAnswer] = useSound(correct)
    const [wrongAnswer] = useSound(wrong)
    // const [timetik] = useSound(time)
    // const [timeOut] = useSound(timeout)

    useEffect(() =>{
        letsPlay();
    },[letsPlay]);

    useEffect(()=>{
        setQuestion(data[questionNumber-1]);
    },[data, questionNumber]);


    const delay = (duration, callback) =>{
        setTimeout(()=>{
            callback();
        },duration);
    }

    const handleClick = (a) => {
        setSelectedAnswer(a);
        setClassName("answer active");
        delay(3000,()=>
        setClassName(a.correct ? "answer correct" : "answer wrong")
        );
        delay(5000,()=>{
            if(a.correct){
                correctAnswer();
                delay(1000,()=>{
                    setQuestionNumber(prev=>prev+1);
                    setSelectedAnswer(null);
                });
            }else{
                wrongAnswer();
                delay(1000,()=>{
                    setStop(true);
                });
            }
        }
        );
    };

    return (
        <div className="trivia">
            <div className="question">{question?.question}</div>
            <div className="answers">
                {question?.answers.map((a) => (
                <div className={selectedAnswer === a ? className : "answer"} onClick={()=>handleClick(a)}>{a.text}</div>
                ))}
            </div>
        </div>
    )
}
