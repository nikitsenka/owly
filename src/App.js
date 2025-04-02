import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import FileUpload from './components/FileUpload';
import ExamHeader from './components/ExamHeader';
import QuestionList from './components/QuestionList';

function App() {
  const [questions, setQuestions] = useState([]);
  const [isExamMode, setIsExamMode] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submittedAnswers, setSubmittedAnswers] = useState({});
  const [questionsSubmitted, setQuestionsSubmitted] = useState(false);

  // Handle file upload and parsing
  const handleFileUpload = (data) => {
    setQuestions(data);
    setQuestionIndex(0);
    setAnswers({});
    setQuestionsSubmitted(false);
    setSubmittedAnswers({});
  };

  // Toggle between practice and exam mode
  const toggleExamMode = () => {
    setIsExamMode(!isExamMode);
    setQuestionsSubmitted(false);
    setSubmittedAnswers({});
  };

  // Select an answer for a question
  const selectOption = (questionId, optionId) => {
    setAnswers(prevAnswers => ({
      ...prevAnswers,
      [questionId]: optionId
    }));
  };

  // Submit the current question in practice mode or all questions in exam mode
  const handleSubmit = () => {
    if (isExamMode || questionIndex === questions.length - 1) {
      setQuestionsSubmitted(true);
      setSubmittedAnswers(answers);
    } else {
      // Submit just the current question and move to the next question
      const currentQuestionId = questions[questionIndex].id;
      setSubmittedAnswers(prevSubmitted => ({
        ...prevSubmitted,
        [currentQuestionId]: answers[currentQuestionId]
      }));
      setQuestionIndex(questionIndex + 1);
    }
  };

  // Restart the exam
  const restartExam = () => {
    setQuestionIndex(0);
    setAnswers({});
    setQuestionsSubmitted(false);
    setSubmittedAnswers({});
  };

  // Move to a specific question in exam mode
  const goToQuestion = (index) => {
    setQuestionIndex(index);
  };

  return (
    <Container className="owly-container">
      {/* Exam Header with Title and Mode Switch */}
      <ExamHeader 
        isExamMode={isExamMode}
        toggleExamMode={toggleExamMode}
        questionsCount={questions.length}
        questionsSubmitted={questionsSubmitted}
        restartExam={restartExam}
      />

      {/* File Upload Section - show only if no questions are loaded */}
      {questions.length === 0 ? (
        <FileUpload onUpload={handleFileUpload} />
      ) : (
        /* Question Display - show if questions are loaded */
        <QuestionList
          questions={questions}
          currentQuestionIndex={questionIndex}
          isExamMode={isExamMode}
          selectOption={selectOption}
          handleSubmit={handleSubmit}
          goToQuestion={goToQuestion}
          userAnswers={answers}
          submittedAnswers={submittedAnswers}
          questionsSubmitted={questionsSubmitted}
        />
      )}
    </Container>
  );
}

export default App;
