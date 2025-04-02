import React from 'react';
import { Card, Form, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

const Question = ({
  question,
  onSelectOption,
  selectedOption,
  submittedAnswer,
  questionNumber,
  totalQuestions
}) => {
  const isSubmitted = submittedAnswer !== undefined;
  const isCorrect = isSubmitted && submittedAnswer === question.correctOption;

  // Render an option with appropriate styling based on selection and submission
  const renderOption = (option) => {
    const isSelected = selectedOption === option.id;
    const isCorrectOption = option.id === question.correctOption;
    
    // Determine the appropriate classes for option styling
    let optionClass = 'option';
    
    if (isSubmitted) {
      if (isCorrectOption) {
        optionClass += ' correct-option';
      } else if (isSelected) {
        optionClass += ' incorrect-option';
      }
    } else if (isSelected) {
      optionClass += ' selected-option';
    }

    return (
      <Form.Check
        key={option.id}
        id={`option-${question.id}-${option.id}`}
        className={optionClass}
        type="radio"
        label={

          <div className="d-flex justify-content-between align-items-center w-100">
            <span>{option.text}</span>
            {isSubmitted && isCorrectOption && (
              <FontAwesomeIcon icon={faCheckCircle} className="text-success ms-2" />
            )}
            {isSubmitted && isSelected && !isCorrectOption && (
              <FontAwesomeIcon icon={faTimesCircle} className="text-danger ms-2" />
            )}
          </div>
        }
        name={`question-${question.id}`}
        value={option.id}
        onChange={() => !isSubmitted && onSelectOption(question.id, option.id)}
        checked={isSelected}
        disabled={isSubmitted}
      />
    );
  };

  return (
    <Card className="question-card mb-4">
      <Card.Header className="question-header">
        Question {questionNumber + 1} of {totalQuestions}
      </Card.Header>
      <Card.Body>
        <Card.Title className="mb-4">{question.text}</Card.Title>
        <Form>
          {question.options.map(option => renderOption(option))}
        </Form>

        {isSubmitted && (
          <div className="mt-4">
            <Alert variant={isCorrect ? "success" : "danger"}>
              {isCorrect ? 'Correct!' : 'Incorrect'}
            </Alert>

            {question.explanation && (
              <div className="explanation mt-3">
                <h6>Explanation:</h6>
                <p>{question.explanation}</p>
              </div>
            )}
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

export default Question;