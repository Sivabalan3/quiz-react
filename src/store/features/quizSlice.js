// quizSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  questions: [],
  currentQuestionIndex: 0,
  score: 0,
};

const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    setQuestions(state, action) {
      state.questions = action.payload;
    },
    answerQuestion(state, action) {
      const { questionIndex, answer } = action.payload;
      if (state.questions[questionIndex].answer === answer) {
        state.score += 1;
      }
      state.currentQuestionIndex += 1;
    },
    nextQuestion(state) {
      if (state.currentQuestionIndex < state.questions.length - 1) {
        state.currentQuestionIndex += 1;
      }
    },
    previousQuestion(state) {
      if (state.currentQuestionIndex > 0) {
        state.currentQuestionIndex -= 1;
      }
    },
    resetQuiz(state) {
      state.currentQuestionIndex = 0;
      state.score = 0;
      localStorage.removeItem('userDetails'); 
    },
  },
});

export const { setQuestions, answerQuestion, nextQuestion, previousQuestion, resetQuiz } = quizSlice.actions;

export default quizSlice.reducer;
