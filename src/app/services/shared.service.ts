import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Quiz } from '../models/quiz.iterface';
import { sharedData } from '../utils/data';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  quizData: Quiz[];

  constructor() {
    this.getData();
  }

  getData() {
    this.quizData = sharedData.quizData;
  }

  getQuestionById(id: number): Observable<Quiz> {
    return of(this.quizData.find((x: Quiz) => x.id == id) as Quiz);
  }
}
