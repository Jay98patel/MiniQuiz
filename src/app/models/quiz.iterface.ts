export interface Quiz {
  id: number;
  question: string;
  options: keyValue[];
  answer: keyValue;
}

export interface keyValue {
  id: number;
  name: string;
}

export interface Answer {
  answer1: number;
  answer2: number;
  answer3: number;
  answer4: number;
  answer5: number;
}

export interface Result {
  correctAnswers: number;
  wrongAnswers: number;
  totalQuestions: number;
  usersAnswers: keyValue[];
}

export type DetailedResult = {
  id: number;
  usersAnswers: keyValue;
  correctedAnswers: keyValue;
};
