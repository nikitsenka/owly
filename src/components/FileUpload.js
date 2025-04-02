import React, { useState, useRef } from 'react';
import { Button, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';

const FileUpload = ({ onUpload }) => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);

  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) {
      return;
    }

    if (!file.name.endsWith('.json')) {
      setError('Please upload a JSON file only');
      return;
    }

    setLoading(true);
    setError('');

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const parsedData = JSON.parse(e.target.result);
        // Validate data format
        if (!Array.isArray(parsedData)) {
          setError('Invalid format: Expected an array of questions');
          setLoading(false);
          return;
        }
        
        // Validate each question has required fields
        const isValid = parsedData.every(q => q.id && q.text && Array.isArray(q.options) && q.correctOption);
        if (!isValid) {
          setError('Invalid question format: Each question must have id, text, options array, and correctOption');
          setLoading(false);
          return;
        }
        
        // Successs! Pass questions to parent component
        onUpload(parsedData);
      } catch (err) {
        setError('Error parsing JSON file: ' + err.message);
      } finally {
        setLoading(false);
        event.target.value = ''; // Reset file input
      }
    };
    
    reader.onerror = () => {
      setError('Error reading file');
      setLoading(false);
    };

    reader.readAsText(file);
  };

  return (
    <div className="file-upload-container">
      <h3>Welcome to Owly</h3>
      <p>Get started by uploading a JSON file containing your questions.</p>
      <div className="mt-4">
        {error && <Alert variant="danger">{error}</Alert>}
        <input
          type="file"
          ref={inputRef}
          onChange={handleFileChange}
          accept=".json"
          style={{ display: 'none' }}
        />
        <Button
          variant="primary"
          onClick={handleClick}
          disabled={loading}
          size="lg"
        >
          <FontAwesomeIcon icon={faUpload} className="me-2" />
          {loading ? 'Loading...' : 'Upload Questions'}
        </Button>
      </div>
      <div className="mt-3">
        <small>Supported format: JSON file with an array of questions.</small>
        <div><small>Each question must have: id, text, options, and correctOption.</small></div>
      </div>
    </div>
  );
};

export default FileUpload;
