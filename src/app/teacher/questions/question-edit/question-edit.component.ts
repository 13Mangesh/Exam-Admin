import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import { Question } from 'src/app/shared/question.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-question-edit',
  templateUrl: './question-edit.component.html',
  styleUrls: ['./question-edit.component.css']
})
export class QuestionEditComponent implements OnInit {
  index: number;
  isInvalid = false;
  question: Question = new Question('', '', '', '', '', '');
  questions: Question[];
  constructor(private route: ActivatedRoute,
              private router: Router,
              private questionService: QuestionService) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.index = +params['index'];
      }
    );
    this.questionService.getQuestions().subscribe(data => {
      this.questions = Object.values(data);
      this.question = this.questions[this.index - 1];
    // console.log(this.question);


    });
    console.log(this.question);
  }

  onSubmit(form: NgForm) {
    const value =  form.value;
    const question = value.question.trim();
    const option1 = value.option1.trim();
    const option2 = value.option2.trim();
    const option3 = value.option3.trim();
    const option4 = value.option4.trim();
    const rightOption = value.rightOption.trim();


    if (question === '' || option1 === '' || option2 === '' || option3 === '' || option4 === '' || rightOption === '') {
      this.isInvalid = true;
      return;
    }
    if (rightOption === option1 || rightOption === option2 || rightOption === option3 || rightOption === option4) {
      this.isInvalid = false;
      this.question.question = question;
      this.question.option1 = option1;
      this.question.option2 = option2;
      this.question.option3 = option3;
      this.question.option4 = option4;
      this.question.rightOption = rightOption;
      this.questionService.updateQuestion(this.index, this.question);
      this.router.navigate(['/teacher', 'questions']);
    } else {
      this.isInvalid = true;
      return;
    }
  }

}
