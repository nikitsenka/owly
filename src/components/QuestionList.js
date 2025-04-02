import React from 'react';
import { Button, Row, Col, Badge, Pagination } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import Question from './Question';

const QuestionList = ({
  questions,
  currentQuestionIndex,
  isExamMode,
  selectOption,
  handleSubmit,
  goToQuestion,
  userAnswers,
  submittedAnswers,
  questionsSubmitted
}) => {
  // Filter questions to show based on mode (
  // In practice mode, show only the current question
  // In exam mode, show all questions
  const questionsToShow = isExamMode
    ? questions // All questions in exam mode
    : [questions[currentQuestionIndex]]; // Only current question in practice mode

  // Calculate progress info
  const totalAnswered = Object.keys(userAnswers).length;
  const progressPercent = questions.length > 0 
    ? Math.round((totalAnswered / questions.length) * 100) 
    : 0;

  // Calculate results if exam is submitted
  const getScore = () => {
    if (!questionsSubmitted) return { correct: 0, total: questions.length, percentage: 0 };
    
    let correctCount = 0;
    for (const question of questions) {
      const submittedAnswer = submittedAnswers[question.id];
      if (submittedAnswer && submittedAnswer === question.correctOption) {
        correctCount++;
      }
    }
    
    return {
      correct: correctCount,
      total: questions.length,
      percentage: Math.round((correctCount / questions.length) * 100)
    };
  };

  const score = getScore();
  
  // Create pagination items
  const renderPagination = () => {
    const pageItems = [];
    
    for (let i = 0; i < questions.length; i++) {
      const question = questions[i];
      const isAnswered = !!(userAnswers[question.id]);
      const isCorrect = submittedAnswers[question.id] === question.correctOption;
      const isSelected = i === currentQuestionIndex;
      
      // Choose variant based on state
      let variant = 'outline-secondary';
      if (isSelected) variant = 'primary';
      else if (questionsSubmitted && isAnswered) {
        variant = isCorrect ? 'outline-success' : 'outline-danger';
      }
      else if (isAnswered) variant = 'outline-info';
      
      pageItems.push(
        <Pagination.Item 
          key={i} 
          active={isSelected}
          onClick={() => goToQuestion(i)}
          variant={variant}
        >
          {i + 1}
        </Pagination.Item>
      );
    }
    
    return <Pagination size="sm" className="mt-3 justify-content-center">{pageItems}</Pagination>;
  };

  return (
    <div className="question-list-container">
      {/* Exam Progress Statistics */}
      <div className="progress-stats mb-3">
        <Row>
          <Col>
            {isExamMode ? (
              <Badge bg="info">
                {totalAnswered} / {questions.length} Questions Answered
              </Badge>
            ) : (
              <Badge bg="info">
                Question {currentQuestionIndex + 1} of {questions.length}
              </Badge>
            )}
          </Col>
          
          {/* Results if questions are submitted */}
          {questionsSubmitted && (
            <Col className="text-end">
              <Badge bg="success">
                {score.correct} / {score.total} Correct ({score.percentage}%)
              </Badge>
            </Col>
          )}
        </Row>
      </div>

      {/* Pagination for exam mode */}
      {isExamMode && renderPagination()}
      
      {/* Questions */}
      {questionsToShow.map((question, idx) => {
        const questionIndex = isExamMode 
          ? questions.findIndex(q => q.id === question.id)
          : currentQuestionIndex;
            
        return (
          <Question
            key={question.id}
            question={question}
            onSelectOption={selectOption}
            selectedOption={userAnswers[question.id]}
            submittedAnswer={submittedAnswers[question.id]}
            questionNumber={questionIndex}
            totalQuestions={questions.length}
          />
        );
      })}
      
      {/* Navigation and Submit Buttons */}
      <div className="navigation-controls mt-4 d-flex justify-content-center flex-wrap gap-2">
        {!isExamMode && !questionsSubmitted && currentQuestionIndex < questions.length - 1 && (
          <Button
            variant="primary"
            onClick={handleSubmit}
            disabled={!userAnswers[questionsToShow[0]?.id]}
          >
            Next <FontAwesomeIcon icon={faArrowRight} />
          </Button>
        )}
          
        {(!isExamMode && currentQuestionIndex === questions.length - 1 && !questionsSubmitted) || 
         (isExamMode && !questionsSubmitted) ? (
          <Button
            variant="success"
            onClick={handleSubmit}
            disabled={isExamMode && totalAnswered === 0 || isExamMode || userAnswers[questionsToShow[0]?.id] === undefined}
          >
            Submit All Answers
          </Button>
        ) : null}
      </div>
    </div>
  );
};

export default QuestionList;