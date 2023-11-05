import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, of } from 'rxjs';
import { Quiz, Result } from '../models/quiz.iterface';
import { sharedData } from '../utils/data';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  result: BehaviorSubject<Result> = new BehaviorSubject<Result>(
    sharedData.initialResult
  );
  quizData: Quiz[];

  constructor() {
    this.getData();
    //ha
  }

  getData() {
    this.quizData = sharedData.quizData;
  }

  getQuestionById(id: number): Observable<Quiz> {
    return of(this.quizData.find((x: Quiz) => x.id == id) as Quiz);
  }

  getAllCorrectAnswers() {
    return this.quizData.map((x: Quiz) => x.answer);
  }

  storeResult(result: Result) {
    this.result.next(result);
  }

  getResult(): Observable<Result> {
    return this.result.asObservable();
  }
}
