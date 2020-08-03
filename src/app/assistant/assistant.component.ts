import { Component, OnInit } from '@angular/core';
import { Question } from '../shared/question.model';
import { Form, NgForm } from '@angular/forms';
import { QuestionService } from '../services/question.service';

@Component({
  selector: 'app-assistant',
  templateUrl: './assistant.component.html',
  styleUrls: ['./assistant.component.css']
})
export class AssistantComponent implements OnInit {

  isInvalid = false;

  constructor(private questionService: QuestionService) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    const value =  form.value;
    const newQuestion: Question = new Question('', '', '', '', '', '');
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
      console.log(rightOption);
      this.isInvalid = false;
      newQuestion.question = question;
      newQuestion.option1 = option1;
      newQuestion.option2 = option2;
      newQuestion.option3 = option3;
      newQuestion.option4 = option4;
      newQuestion.rightOption = rightOption;
      this.questionService.addQuestion(newQuestion);
      form.reset();
    } else {
      this.isInvalid = true;
      return;
    }
  }

}
