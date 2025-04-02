import React from 'react';
import { Row, Col, Button, Badge } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGraduationCap } from '@fortawesome/free-solid-svg-icons';
import { faArrowsRotate } from '@fortawesome/free-solid-svg-icons';

const ExamHeader = ({
  isExamMode,
  toggleExamMode,
  questionsCount,
  questionsSubmitted,
  restartExam
}) => {
  return (
    <Row className="exam-header mb-4 pt-3 pb-3">
      {/* Title */}
      <Col xs={12} md={6} className="d-flex align-items-center mb-3 mb-md-0">
        <div className="exam-title">
          <FontAwesomeIcon icon={faGraduationCap} className="me-2" />
          <h1>Owly</h1>
        </div>
      </Col>

      {/* Mode Switch and QWuestion Count */}
      <Col xs={12} md={6} className="d-flex justify-content-md-end align-items-center">
        <div className="mode-controls d-flex flex-wrap align-items-center gap-2">
          {/* Question Count */}
          {questionsCount > 0 && (
            <Badge bg="info" className="me-2">
              Questions: {questionsCount}
            </Badge>
          )}
          
          {/* Restart Button - Show only if questions exist */}
          {questionsCount > 0 && (
            <Button 
              size="sm" 
              variant="outline-secondary"
              className="me-2"
              onClick={restartExam}
              disabled={questionsCount === 0}
            >
              <FontAwesomeIcon icon={faArrowsRotate} className="me-1" />
              Restart
            </Button>
          )}

          {/* Mode Switch */}
          <div className="mode-switch">
            <Button
              variant={isExamMode ? "outline-primary" : "primary"}
              size="sm"
              className="me-1"
              onClick={toggleExamMode}
              disabled={questionsCount === 0}
            >
              Practice Mode
            </Button>
            <Button
              variant={isExamMode ? "primary" : "outline-primary"}
              size="sm"
              onClick={toggleExamMode}
              disabled={questionsCount === 0}
            >
              Exam Mode
            </Button>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default ExamHeader;