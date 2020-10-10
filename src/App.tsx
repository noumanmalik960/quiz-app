import React, { useState } from 'react'
import { QuestionCard } from './components/QuestionCard'
import { fetchQuestions, QuestionState } from './API'

// Styled components import
import { GlobalStyle, Wrapper } from './App.styles'

const App = () => {

  type AnswerOjbect = {
    question: string;
    answer: string;
    correct: boolean;
    correctAnswer: string;
  }

  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerOjbect[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  // To set difficulty dynamically
  const [difficulty, setDifficulty] = useState('easy')

  const TOTAL_QUESTIONS = 3;





  const startTrivia = async () => {
    setLoading(true);
    setGameOver(false);

    const newQuestions = await fetchQuestions(TOTAL_QUESTIONS, difficulty);
    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);


  }

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      const answer = e.currentTarget.value;

      const correct = questions[number].correct_answer === answer;

      if (correct) {
        setScore(prev => prev + 1)
      }

      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer

      }

      setUserAnswers(prev => [...prev, answerObject])
    }
  }

  const nextQuestion = async () => {
    const nextQuestion = number + 1;
    if (nextQuestion === TOTAL_QUESTIONS) {
      setGameOver(true);
    }
    else {
      setNumber(nextQuestion);
    }
  }

  const selectHandler = (e: React.ChangeEvent<HTMLSelectElement>) => (
    setDifficulty(e.target.value)
  )


  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <h1>React Quiz</h1>
        {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (<div>
          <label style={{ color: "white" }} htmlFor="difficulty">Difficulty</label>
          {' '}
          <select onChange={selectHandler} id="difficulty">
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select></div>) : null
        }



        {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
          <button className='start' onClick={startTrivia}>
            Start
          </button>
        ) : null}

        {!gameOver ? (
          <p className="score">Score: {score}</p>
        ) : null}

        {loading && <p>Loading Questions...</p>}
        {!gameOver && !loading && (
          <QuestionCard
            questionNr={number + 1}
            totalQuestions={TOTAL_QUESTIONS}
            question={questions[number].question}
            answers={questions[number].answers}
            userAnswer={userAnswers ? userAnswers[number] : undefined}
            callback={checkAnswer}
          />
        )}

        {!gameOver && !loading && userAnswers.length === number + 1 && number !== TOTAL_QUESTIONS - 1 ? (
          <button className='next' onClick={nextQuestion} >
            Next Question
          </button>
        ) : null}
      </Wrapper>
    </>
  )
}

export default App;