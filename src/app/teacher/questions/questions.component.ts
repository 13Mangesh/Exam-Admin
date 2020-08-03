import { Component, OnInit, OnDestroy } from '@angular/core';
import { Question } from 'src/app/shared/question.model';
import { Subscription, Observable } from 'rxjs';
import { QuestionService } from 'src/app/services/question.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit, OnDestroy {
  questions: Question[];
  i = 0;
  private queChangeSub: Subscription;
  constructor(private questionService: QuestionService,
              private router: Router) { }

  ngOnInit() {
    this.questionService.getQuestions().subscribe(data => {
      this.questions = Object.values(data);
      // console.log(data['data']);
      // console.log(Object.values(data));
      // console.log(this.questions);

    });
    // console.log(this.questions);

    // this.queChangeSub = this.questionService.questionsChanged.subscribe(
    //   (questions: Question[]) => {
    //     this.questions = questions;
    //   }
    // );
  }

  onClick(index: number) {
    this.router.navigate(['/teacher', 'questions', index]);
  }

  goBack() {
    this.router.navigate(['/teacher']);
  }

  ngOnDestroy(): void {
    // this.queChangeSub.unsubscribe();
  }

}
