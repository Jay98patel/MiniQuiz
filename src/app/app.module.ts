import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { QuizComponent } from './standalones/quiz/quiz.component';
import { WelcomeComponent } from './standalones/welcome/welcome.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, WelcomeComponent, QuizComponent],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
