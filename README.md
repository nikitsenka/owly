# Owly - Exam Practice & Assessment Tool

Owly is a web-based exam practice and assessment tool designed to simulate exams by dynamically presenting questions from an external file. It allows users to interact with questions, select answers, and review explanations for correct and incorrect options.

## Key Features

- 🔥 Upload JSON question files
- 🎡 Practice Mode: Answer one question at a time with immediate feedback
- 📨 Exam Mode: Answer all questions before submitting
- 🐺 Detailed feedback and explanations
- 👔 Responsive design for all devices

## Getting Started

### Quick Start

1. Clone the repository:
   ```bash
   git clone https://github.com/nikitsenka/owly.git
   cd owly
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open your browser and visit `http://localhost:3000`

## Using Owly

1. Upload a JSON file containing questions (see format below)
2. Choose between Practice Mode or Exam Mode
3. Answer questions and submit for feedback
4. Review explanations and results 

> Tip: Try the sample questions file `public/sample-questions.json` to get started!

## JSON Question File Format

The JSON file should contain an array of question objects with the following structure:

```json
[{
  "id": "q1",                     # Unique question ID
  "text": "Question text here",    # The question text
  "options": [                    # Array of answer options
    {
      "id": "a",                  # Option ID
      "text": "First option"       # Option text
    },
    {
      "id": "b",
      "text": "Second option"
    },
    ...
  ],
  "correctOption": "a",            # ID of the correct option
  "explanation": "Explanation..."   # Optional explanation
}]
```

## Technologies Used

- React.js
- Bootstrap
- FontAwesome 

## Developing

If you want to contribute to Owly:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes
3. Push to your branch (`git push origin feature/amazing-feature`)
4. Create a new Pull Request
