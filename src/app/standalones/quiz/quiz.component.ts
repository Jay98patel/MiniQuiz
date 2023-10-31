import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Quiz, Result, keyValue } from 'src/app/models/quiz.iterface';
import { sharedData } from 'src/app/utils/data';
import { SharedService } from '../../services/shared.service';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss'],
  animations: [
    trigger('alertAnimation', [
      state('void', style({ transform: 'translateX(-100%)' })), // Initial state when the element is not in the DOM
      state('*', style({ transform: 'translateX(0)' })), // Final state when the element is in the DOM
      transition('void => *', animate('0.25s ease-in-out')), // Animation when the element enters
      transition('* => void', animate('0.25s ease-in-out')), // Animation when the element leaves
    ]),
  ],
})
export class QuizComponent implements OnInit {
  
  private dataServices = inject(SharedService);

  public quizData: Quiz;
  public currentQuestionNumber: number = sharedData.currentQuestionNumber;
  public currentFormControl: string = sharedData.currentFormControl;
  public correctAnswers: number = sharedData.count;
  public wrongAnswers: number = sharedData.count;
  public progressBar: number = sharedData.count;
  public isValidationMessageShown: boolean = false;
  public totalQuestions: number;
  public quizForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) { }

  ngOnInit() {
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
  async loadNextQuestion() {
    const isFormValid = this.quizForm.controls[this.currentFormControl].valid;
    if (!isFormValid) {
      this.isValidationMessageShown = true;
      return;
    }
    this.isValidationMessageShown = false;
    if (this.currentQuestionNumber !== this.totalQuestions) {
      this.progressBar += 25;
      this.currentQuestionNumber++;
      this.currentFormControl = `answer${this.currentQuestionNumber}`;
      this.quizForm.addControl(
        this.currentFormControl,
        new FormControl(null, Validators.required)
      );
      this.getQuestion(this.currentQuestionNumber);
    } else {
      await this.getResult();
      await this.router.navigate(['/result']);
    }
  }

  /**
   * Retrieves the result of the quiz.
   * -1 will come in the case when the user has not answered the question
   */
  async getResult() {
    const correctedAnswers: keyValue[] =
      this.dataServices.getAllCorrectAnswers();
    const formValue = this.quizForm.value;
    correctedAnswers.forEach((x: keyValue, i: number) => {
      const userAnswer = formValue[`answer${i + 1}`]?.id ?? -1;
      if (+x.id == userAnswer) {
        this.correctAnswers++;
      } else {
        this.wrongAnswers++;
      }
    });

    let result: Result = {
      correctAnswers: this.correctAnswers,
      wrongAnswers: this.wrongAnswers,
      totalQuestions: this.totalQuestions,
      usersAnswers: [],
    };
    for (let i = 0; i < Object.keys(formValue).length; i++) {
      result.usersAnswers.push(formValue[`answer${i + 1}`]);
    }
    this.dataServices.storeResult(result);
  }

  /**
   * Loads the previous question.
   */
  loadPreviousQuestion() {
    this.isValidationMessageShown = false;
    if (this.currentQuestionNumber !== 1) {
      this.currentQuestionNumber--;
      this.progressBar -= 25;
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
    this.getQuestion(this.currentQuestionNumber);
  }
}
