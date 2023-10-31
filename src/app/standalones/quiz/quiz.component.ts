import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { Quiz, keyValue } from 'src/app/models/quiz.iterface';
import { SharedService } from '../../services/shared.service';
import { sharedData } from 'src/app/utils/data';
@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss'],
})
export class QuizComponent implements OnInit {
  private dataServices = inject(SharedService);

  public quizData: Quiz;
  currentQuestionNumber: number = sharedData.currentQuestionNumber;
  currentFormControl: string = sharedData.currentFormControl;
  correctAnswers: number = sharedData.count;
  wrongAnswers: number = sharedData.count;
  totalQuestions: number;
  isResultShown: boolean;
  quizForm: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    console.log('hi');
    this.quizForm = this.buildForm();
    this.getQuestion(this.currentQuestionNumber);
    this.getTotalQuizQuestions();
  }

  getTotalQuizQuestions() {
    this.totalQuestions = this.dataServices.quizData.length;
  }

  /**
   * Retrieves a question by its ID.
   *
   * @param {number} id - The ID of the question to retrieve.
   */
  getQuestion(id: number) {
    this.dataServices.getQuestionById(id).subscribe({
      next: (res: Quiz) => {
        this.quizData = res;
      },
      error: (err: Error) => console.log(err),
    });
  }

  /**
   * Builds a form group.
   */
  buildForm(): FormGroup {
    return this.fb.group({
      answer1: [null, Validators.required],
    });
  }

  /**
   * Loads the next question in the quiz.
   */
  loadNextQuestion() {
    if (this.currentQuestionNumber !== this.totalQuestions) {
      this.currentQuestionNumber++;
      this.currentFormControl = `answer${this.currentQuestionNumber}`;
      this.quizForm.addControl(
        this.currentFormControl,
        new FormControl(null, Validators.required)
      );
      this.getQuestion(this.currentQuestionNumber);
    } else {
      console.log('show result');
      this.getResult();
    }
  }

  /**
   * Retrieves the result of the quiz and displays it.
   */
  getResult() {
    const correctedAnswers: keyValue[] =
      this.dataServices.getAllCorrectAnswers();
    console.log(this.quizForm.value);
    const formValue = this.quizForm.value;
    correctedAnswers.forEach((x: keyValue, i: number) => {
      const userAnswer = formValue[`answer${i + 1}`];
      if (+x.id == userAnswer) {
        this.correctAnswers++;
      } else {
        this.wrongAnswers++;
      }
    });
    this.isResultShown = true;
  }

  /**
   * Loads the previous question.
   */
  loadPreviousQuestion() {
    if (this.currentQuestionNumber !== 1) {
      this.currentQuestionNumber--;
      console.log(this.quizForm.value);
      this.currentFormControl = `answer${this.currentQuestionNumber}`;
      this.getQuestion(this.currentQuestionNumber);
    }
  }

  /**
   * Resets the quiz by resetting the quiz form and all related variables.
   */
  resetQuiz() {
    this.quizForm.reset();
    this.correctAnswers = sharedData.count;
    this.wrongAnswers = sharedData.count;
    this.currentQuestionNumber = sharedData.currentQuestionNumber;
    this.currentFormControl = sharedData.currentFormControl;
    this.isResultShown = false;
    this.getQuestion(this.currentQuestionNumber);
  }
}
