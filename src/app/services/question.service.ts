import { Injectable } from '@angular/core';
import { Question } from '../shared/question.model';
import { Subject, Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({providedIn: 'root'})

export class QuestionService {
  questionsChanged = new Subject<Question[]>();

  private questions: Observable<Question[]>;

  constructor(private http: HttpClient) {
    this.questions = this.http.get<Question[]>('http://localhost:3000/api/question');
  }

  setQuestions(questions: Question[]) {
   // this.questions = questions;
    // this.questionsChanged.next(this.questions.slice());
  }


  getQuestions(): Observable<Question[]> {
    return this.questions;
  }

  getQuestion(index: number) {
    return this.questions[index];
  }

  addQuestion(question: Question) {
    this.http.post('http://localhost:3000/api/question', question).subscribe(data => {
      console.log(data);
    });
  }

  updateQuestion(index: number, newQuestion: Question) {
    this.http.put('http://localhost:3000/api/question', {newQuestion, index}).subscribe(data => {
      console.log(data);
    });
  }

  // deleteQuestion(index: number) {
  //   this.questions.splice(index, 1);
  //   this.questionsChanged.next(this.questions.slice());
  // }

}
