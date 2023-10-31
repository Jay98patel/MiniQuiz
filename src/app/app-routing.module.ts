import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'welcome',
    pathMatch: 'full',
  },
  {
    path: 'welcome',
    loadComponent: () =>
      import('./standalones/welcome/welcome.component').then(
        (m) => m.WelcomeComponent
      ),
  },
  {
    path: 'quiz',
    loadComponent: () =>
      import('./standalones/quiz/quiz.component').then((m) => m.QuizComponent),
  },
  {
    path: 'result',
    loadComponent: () =>
      import('./standalones/result/result.component').then(
        (m) => m.ResultComponent
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
