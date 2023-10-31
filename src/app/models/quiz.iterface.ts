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

export interface Result {
  correctAnswers: number;
  wrongAnswers: number;
  totalQuestions: number;
}
