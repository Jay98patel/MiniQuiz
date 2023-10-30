import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Quiz } from 'src/app/models/quiz.iterface';
import { SharedService } from '../../services/shared.service';
@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss'],
  // providers: [SharedService],
})
export class QuizComponent implements OnInit {
  private dataServices = inject(SharedService);

  public quizData: Quiz;

  currentQuestionNumber: number = 1;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    console.log('hi');
    this.getQuestion(this.currentQuestionNumber);
  }

  /**
   * Retrieves a question by its ID.
   *
   * @param {number} id - The ID of the question to retrieve.
   * @return {void} This function does not return a value.
   */
  getQuestion(id: number) {
    this.dataServices.getQuestionById(id).subscribe({
      next: (res: Quiz) => {
        this.quizData = res;
        console.log(res);
      },
      error: (err: Error) => console.log(err),
    });
  }

  buildForm(): FormGroup {
    return this.fb.group({
      answer: [null, Validators.required],
    });
  }
}
