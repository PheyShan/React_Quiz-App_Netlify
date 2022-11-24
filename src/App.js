import React from 'react';

import SetupForm from "./SetupForm";
import Loading from "./Loading";
import Modal from "./Modal";
import { useGlobalContext } from "./Context";

const App = () => {
  const { waiting, loading, questions, index, correct, nextQuestion, checkAnswer } = useGlobalContext();

  if (waiting) {
    return <SetupForm />
  }
  if (loading) {
    return <Loading />
  }

  // console.log('questions', questions);
  const { question, incorrect_answers, correct_answer } = questions[index];
  // const answers = [...incorrect_answers, correct_answer];

  //randomise answers 
  let answers = [...incorrect_answers]; //array of three incorrect answers, eventually will become four (3 incorrect answers & 1 correct answer)
  const tempIndex = Math.floor(Math.random() * 4); //random number 0,1,2,3 (total 4 options - 3 incorrect answers & 1 correct answer)
  // console.log(tempIndex);
  if(tempIndex === 3){
    answers.push(correct_answer); //if 4 options is true, add 1 correct ans to 3 incorrect ans
  }
  else {
    answers.push(answers[tempIndex]); //adding the incorrect answers to the end of the array
    answers[tempIndex] = correct_answer; //while adding incorrect answers, in that spot place the correct answer
  }
  //
  
  return (
    <main>
      <Modal />
      <section className='quiz'>
        <p className='correct-answers'>
          Correct answers : {correct}/{index}
        </p>
        <div className='container'>
          <h2 dangerouslySetInnerHTML={{ __html: question }} />
          {/* change the html code &#039 within the question coz it does not come in string */}
          <div className='btn-container'>
            {answers.map((answer, index) => {
              return <button key={index} className="answer-btn" onClick={()=>checkAnswer(answer===correct_answer)} dangerouslySetInnerHTML={{ __html: answer }} />
            })}
          </div>
        </div>
        <button className="next-question" onClick={nextQuestion}>Next Question</button>
      </section>
    </main>
  );
}

export default App;