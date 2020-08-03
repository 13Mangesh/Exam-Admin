import { Component, OnInit } from '@angular/core';
import { TestService } from 'src/app/services/test.service';
import { Question } from 'src/app/shared/question.model';
import { QuestionService } from 'src/app/services/question.service';
import { NgForm } from '@angular/forms';
import { Test } from 'src/app/shared/test.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tests',
  templateUrl: './tests.component.html',
  styleUrls: ['./tests.component.css']
})
export class TestsComponent implements OnInit {
  questions: Question[];
  isInvalid = false;
  isClicked: boolean[] = [];
  counter = 0;
  selectedQuestions: number[] = [];

  constructor(private testService: TestService,
              private questionService: QuestionService,
              private router: Router) { }

  ngOnInit() {
    this.questionService.getQuestions().subscribe(data => {
      this.questions = Object.values(data);
      for (let i = 0; i < this.questions.length; i++) {
        this.isClicked[i] = false;
      }
    });
    this.counter = 0;
  }

  onSubmit(f: NgForm) {
    console.log(f.value);
    const testName = f.value.testName.trim();
    console.log(this.counter);
    if (testName === '' || this.counter !== 10) {
      this.isInvalid = true;
      return;
    }
    console.log(this.selectedQuestions.length);
    this.isInvalid = false;
    const newTest: Test = new Test(
      testName,
      this.selectedQuestions[0],
      this.selectedQuestions[1],
      this.selectedQuestions[2],
      this.selectedQuestions[3],
      this.selectedQuestions[4],
      this.selectedQuestions[5],
      this.selectedQuestions[6],
      this.selectedQuestions[7],
      this.selectedQuestions[8],
      this.selectedQuestions[9],
    );
    console.log(newTest);
    this.testService.addTest(newTest);
    this.cancelTest(f);
  }

  cancelTest(f: NgForm) {
    f.resetForm();
    for (let i = 0; i < this.questions.length; i++) {
      this.isClicked[i] = false;
    }
    this.counter = 0;
    this.isInvalid = false;
    this.selectedQuestions = [];
    // console.log(this.selectedQuestions);
  }

  clicked(index: number) {
    this.isClicked[index] = true;
    this.selectedQuestions.push(index);
    this.counter++;
    // console.log(this.selectedQuestions);
  }

  cancelClicked(index: number) {
    this.isClicked[index] = false;
    const i = this.selectedQuestions.indexOf(index);
    if (index > -1) {
      this.selectedQuestions.splice(i, 1);
    }
    this.counter--;
    // console.log(this.selectedQuestions);
  }

  goBack() {
    this.router.navigate(['/teacher']);
  }
}
