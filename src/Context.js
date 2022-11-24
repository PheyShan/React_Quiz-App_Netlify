import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';

const categoryTable = {
  'general knowledge': 9,
  history: 23,
  politics: 24
}

const API_ENDPOINT = 'https://opentdb.com/api.php?';

// const tempUrl = "https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple";

export const AppContext = React.createContext();

export const AppProvider = ({ children }) => {
  const [waiting, setWaiting] = useState(true);
  const [loading, setLoading] = useState(false);

  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [correct, setCorrect] = useState(0);

  const [error, setError] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [quiz, setQuiz] = useState({
    amount: 10,
    category: 'general knowledge',
    difficulty: "easy"
  })

  const fetchQuestions = async (url) => {
    setLoading(true);
    setWaiting(false);

    try {
      const response = await axios.get(url);
      console.log('loading', response);
      if (response) {
        const data = response.data.results;
        console.log('loadingdata', data);
        if (data.length > 0) {
          setQuestions(data);
          setLoading(false);
          setWaiting(false);
          setError(false);
        }
        else {
          setWaiting(true);
          setError(true);
        }
      }
      else {
        setWaiting(true);
      }
    }
    catch (e) {
      console.log(e);
    }
  }

  const nextQuestion = () => {
    setIndex((prevIndex) => {
      const index = prevIndex + 1;
      if (index > questions.length - 1) {
        openModal();
        return 0;
      }
      else {
        return index;
      }
    })
  }

  const checkAnswer = value => {
    if (value) {
      setCorrect((prevValue) => {
        const nextValue = prevValue + 1;
        return nextValue;
      })
    }
    nextQuestion();
  }

  const openModal = () => {
    setIsModalOpen(true);
  }

  const closeModal = () => {
    setIsModalOpen(false);
    setWaiting(true);
  }


  // useEffect(() => {
  //   fetchQuestions(tempUrl);
  // }, []);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    // console.log(name, value);
    setQuiz({ ...quiz, [name]: value })
    //"...quiz": get all the values that currently have in the object. 
    // Then get the property "name" (ie.amount, category, difficulty) and value //
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const { amount, category, difficulty } = quiz;
    const url = `${API_ENDPOINT}amount=${amount}&category=${categoryTable[category]}&difficulty=${difficulty}&type=multiple`;
    fetchQuestions(url);
  }

  return (
    //The created context is an object with two properties: Provider and Consumer
    //context provider 
    <AppContext.Provider
      value={{
        waiting,
        loading,
        questions,
        index,
        correct,
        error,
        isModalOpen,
        nextQuestion,
        checkAnswer,
        closeModal,
        quiz,
        handleChange,
        handleSubmit
      }}
    >{children}
    </AppContext.Provider>
  )
}

//context consumer
export const useGlobalContext = () => {
  return useContext(AppContext);
}

// export { AppContext, AppProvider };