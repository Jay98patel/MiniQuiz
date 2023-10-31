import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedService } from 'src/app/services/shared.service';
import { Result } from 'src/app/models/quiz.iterface';

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
  constructor() {
    this.result = {} as Result;
  }

  ngOnInit() {
    this.dataServices.getResult().subscribe({
      next: (res: Result) => {
        this.result = { ...res };
        console.log(this.result);
      },
      error: (err: Error) => console.log(err),
    });
  }
}
