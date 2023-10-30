export interface Quiz {
  id: number;
  question: string;
  options: keyValue[];
  answer: keyValue;
}

interface keyValue {
  id: number;
  name: string;
}
