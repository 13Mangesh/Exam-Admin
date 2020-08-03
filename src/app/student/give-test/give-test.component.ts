import { Component, OnInit } from '@angular/core';
import { Test } from 'src/app/shared/test.model';
import { Question } from 'src/app/shared/question.model';
import { Student } from 'src/app/shared/student.model';
import { TestService } from 'src/app/services/test.service';
import { StudentService } from 'src/app/services/student.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-give-test',
  templateUrl: './give-test.component.html',
  styleUrls: ['./give-test.component.css']
})
export class GiveTestComponent implements OnInit {
  tests: Test[] = [];
  isSubmitted = false;
  score = 0;
  counter: number;
  questions: Question[] = [];
  student: Student = new Student('', '', '', 'None', 0, 'None');
  students: Student[] = [];
  rollNumber: string;
  index: number;
  constructor(private testService: TestService,
              private studentService: StudentService,
              private questionService: QuestionService,
              private route: ActivatedRoute,
              private router: Router) {}

  ngOnInit() {
    this.score = 0;
    this.testService.getTests().subscribe(data => {
      this.tests = Object.values(data);
      this.route.params.subscribe(
        (params: Params) => {
          this.index = +params['index'];
        }
      );
    });
    this.questionService.getQuestions().subscribe(data => {
      this.questions = Object.values(data);
    });
    this.studentService.getStudents().subscribe(data => {
      this.students = Object.values(data);
      // console.log(this.students);
      this.route.params.subscribe(
        (params: Params) => {
          this.rollNumber = params['rollNumber'];
          this.students.forEach(element => {
            if (this.rollNumber === element.rollNumber) {
              this.student = element;
            }
          });
          // console.log(this.student);
        }
      );
    });
  }

  onSubmit(form: NgForm) {
    console.log(form.value);
    const value = form.value;
    if (value.question1 === this.questions[this.tests[this.index].question1].rightOption) { this.score++; }
    if (value.question2 === this.questions[this.tests[this.index].question2].rightOption) { this.score++; }
    if (value.question3 === this.questions[this.tests[this.index].question3].rightOption) { this.score++; }
    if (value.question4 === this.questions[this.tests[this.index].question4].rightOption) { this.score++; }
    if (value.question5 === this.questions[this.tests[this.index].question5].rightOption) { this.score++; }
    if (value.question6 === this.questions[this.tests[this.index].question6].rightOption) { this.score++; }
    if (value.question7 === this.questions[this.tests[this.index].question7].rightOption) { this.score++; }
    if (value.question8 === this.questions[this.tests[this.index].question8].rightOption) { this.score++; }
    if (value.question9 === this.questions[this.tests[this.index].question9].rightOption) { this.score++; }
    if (value.question10 === this.questions[this.tests[this.index].question10].rightOption) { this.score++; }
    this.student.lastTestScore = this.score;
    this.student.lastTestName = this.tests[this.index].name;
    this.studentService.updateStudent(this.student, this.students.indexOf(this.student) + 1);
    form.resetForm();
    this.router.navigate(['/student', this.rollNumber]);
  }

  handleEvent(event, form) {
    if (event.action === "done") {
      this.onSubmit(form);
    }

  }

}
