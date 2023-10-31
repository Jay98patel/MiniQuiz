import { Quiz, Result } from '../models/quiz.iterface';

class SharedData {
  currentFormControl: string = 'answer1';
  currentQuestionNumber: number = 1;
  count: number = 0;
  initialResult: Result = {
    correctAnswers: 0,
    totalQuestions: 0,
    wrongAnswers: 0,
    usersAnswers: [{ id: 0, name: '' }],
  };
  quizData: Quiz[] = [
    {
      id: 1,
      question: 'What is the largest mammal on Earth?',
      options: [
        { id: 1, name: 'Elephant' },
        { id: 2, name: 'Blue Whale' },
        { id: 3, name: 'Giraffe' },
        { id: 4, name: 'Polar Bear' },
      ],
      answer: { id: 2, name: 'Blue Whale' },
    },
    {
      id: 2,
      question:
        'Which gas do plants absorb from the atmosphere during photosynthesis?',
      options: [
        { id: 1, name: 'Oxygen' },
        { id: 2, name: 'Carbon Dioxide' },
        { id: 3, name: 'Nitrogen' },
        { id: 4, name: 'Hydrogen' },
      ],
      answer: { id: 2, name: 'Carbon Dioxide' },
    },
    {
      id: 3,
      question: 'What is the chemical symbol for gold?',
      options: [
        { id: 1, name: 'Go' },
        { id: 2, name: 'Ag' },
        { id: 3, name: 'Au' },
        { id: 4, name: 'Ge' },
      ],
      answer: { id: 3, name: 'Au' },
    },
    {
      id: 4,
      question:
        "Which planet is known as the 'Morning Star' or 'Evening Star' due to its brightness?",
      options: [
        { id: 1, name: 'Mars' },
        { id: 2, name: 'Venus' },
        { id: 3, name: 'Jupiter' },
        { id: 4, name: 'Mercury' },
      ],
      answer: { id: 2, name: 'Venus' },
    },
    {
      id: 5,
      question: 'What is the largest organ in the human body?',
      options: [
        { id: 1, name: 'Heart' },
        { id: 2, name: 'Skin' },
        { id: 3, name: 'Liver' },
        { id: 4, name: 'Lungs' },
      ],
      answer: { id: 2, name: 'Skin' },
    },
  ];
}

export const sharedData = new SharedData();
