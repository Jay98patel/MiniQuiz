import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { DetailedResult, Result, keyValue } from 'src/app/models/quiz.iterface';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-result',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss'],
})
export class ResultComponent implements OnInit {

  private dataServices = inject(SharedService);
  result: Result;
  correctedAnswers: keyValue[];
  detailedResult: DetailedResult[];

  constructor(private router: Router) {
    this.result = {} as Result;
  }

  ngOnInit() {
    this.correctedAnswers = this.dataServices.getAllCorrectAnswers();
    console.log(this.correctedAnswers);
    this.dataServices.getResult().subscribe({
      next: (res: Result) => {
        this.result = { ...res };
        this.detailedResult = this.result.usersAnswers.map(
          (x: keyValue, i: number) => {
            const detailed: DetailedResult = {
              id: i + 1,
              correctedAnswers: this.correctedAnswers[i],
              usersAnswers: x,
            };
            return detailed;
          }
        );
      },
      error: (err: Error) => console.log(err),
    });
  }

  retakeTest() {
    this.router.navigate(['/welcome']);
  }
}
