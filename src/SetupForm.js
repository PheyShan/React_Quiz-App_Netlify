import React from 'react'
import { useGlobalContext } from './Context';

const SetupForm = () => {
  const { quiz, handleChange, handleSubmit, error } = useGlobalContext();

  return (
    <main>
      <section className="quiz quiz-small">
        <form className="setup-form">
          <h2>Setup Quiz</h2>

          {/* Amount */}
          <div className='form-control'>
            <label htmlFor='amount'>Number of questions</label>
            {/* The "htmlFor" attribute of the <label> tag should be equal to the "id" attribute of the <input> element to bind them together.  */}
            <input
              type="number"
              name="amount"
              id="amount"
              value={quiz.amount}
              onChange={handleChange}
              className="form-input"
              min={1}
              max={50}
            ></input>
            {/* "name" attribute in the <input> has to be exactly the same as property key in the quiz useState in Context.js  */}
          </div>

          {/* Category */}
          <div className="form-control">
            <label htmlFor="category">Category</label>
            <select
              name="category"
              id="category"
              className="form-input"
              value={quiz.category}
              onChange={handleChange}
            >
              <option value="general knowledge">General Knowledge</option>
              <option value="history">History</option>
              <option value="politics">Politics</option>
            </select>
          </div>

          {/* Difficulty */}
          <div className="form-control">
            <label htmlFor="difficulty">Difficulty Level</label>
            <select
              name="difficulty"
              id="difficulty"
              className="form-input"
              value={quiz.difficulty}
              onChange={handleChange}
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>
          {error && <p className='error'>Can't generate questions, please try different options</p>}
          <button type="submit" onClick={handleSubmit} className="submit-btn">Start</button>
        </form>
      </section>
    </main>
  )
}

export default SetupForm