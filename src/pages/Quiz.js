
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { answerQuestion, resetQuiz, nextQuestion, previousQuestion } from '../store/features/quizSlice';

const Quiz = ({ userDetails }) => {
  const dispatch = useDispatch();
  const questions = useSelector((state) => state.quiz.questions);
  const currentQuestionIndex = useSelector((state) => state.quiz.currentQuestionIndex);
  const score = useSelector((state) => state.quiz.score);

  if (currentQuestionIndex >= questions.length) {
    return (
     
      <section className="vh-100" style={{backgroundColor: "#f4f5f7"}}>
  <div className="container py-5 h-100">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col col-lg-6 mb-4 mb-lg-0">
        <div className="card mb-3" style={{borderRadius: ".5rem"}}>
          <div className="row g-0">
            <div className="col-md-4 gradient-custom text-center text-white"
              style={{borderTopLeftRadius: ".5rem" ,borderBottomLeftRadius: ".5rem"}}>
              <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                alt="Avatar" className="img-fluid my-5" style={{width: "80px"}} />
              
              <i className="far fa-edit mb-5"></i>
            </div>
            <div className="col-md-8">
              <div className="card-body p-4">
              <h2 className='text-warning'>Your score: {score}</h2>
                <hr className="mt-0 mb-4"/>
                <div className="row pt-1">
                  <div className="col-6 mb-3">
                    <h4>Name</h4>
                    <h6 className="text-muted">{userDetails.name}</h6>
                  </div>
                  <div className="col-6 mb-3">
                    <h4>Age</h4>
                    <h6 className="text-muted">{userDetails.age}</h6>
                  </div>
                </div>
                <h6>Other - Details</h6>
                <hr className="mt-0 mb-4"/>
                <div className="row pt-1">
                  <div className="col-6 mb-3">
                    <h6>Attend Date</h6>
                    <p className="text-muted">{userDetails.date}</p>
                  </div>
                  <div className="col-6 mb-3">
                   
                  
                  <button onClick={() => dispatch(resetQuiz())} type="button" className="btn btn-warning">Try again</button>
                  </div>
                </div>
               
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
    );
  }

  const question = questions[currentQuestionIndex];

  return (

    <div className="container">
    <h1>{question.question}</h1>

    <div className="options">
    {Object.entries(question.choices).map(([key, text]) => (
      <button className='choicebutton' key={key} onClick={() => dispatch(answerQuestion({ questionIndex: currentQuestionIndex, answer: key }))}>{text}</button>
      
      ))}
    </div>
    <div className="navigation">
    <button className='nextbutton' onClick={() => dispatch(previousQuestion())} disabled={currentQuestionIndex === 0}>Previous</button>
    <button className='prevtbutton' onClick={() => dispatch(nextQuestion())} disabled={currentQuestionIndex === questions.length - 1}>Next</button>
    </div>
  </div>
  );
};

export default Quiz;
