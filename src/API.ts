import { shuffleArray } from './utils'

export enum Difficulty {
    EASY = "easy",
    MEDIUM = 'medium',
    DIFFICULT = 'difficult'
}



export const fetchQuestions = async (amount: number, difficulty: Difficulty) => {
    const endpoint = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}`;
    const data = await(await fetch(endpoint)).json();
    return data.results.map((question: Question) => {
        return {
            ...question,
            answers: shuffleArray([...question.incorrect_answers, question.correct_answer])
        }
    })   
}

export type Question = {
    category: string;
    correct_answer: string;
    difficulty: string;
    incorrect_answers: string[];
    question: string;
    type: string;
}

// this is to store correct answer and wrong answers at one place
export type QuestionState = Question & { answers: string[] };