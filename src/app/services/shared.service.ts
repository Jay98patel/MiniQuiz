import { Injectable } from '@angular/core';
import { Quiz } from '../models/quiz.iterface';
import { sharedData } from '../sharedData/data';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  quizData: Quiz[];

  constructor() {}

  getData() {
    this.quizData = sharedData.quizData;
  }
}
