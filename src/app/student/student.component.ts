import { Component, OnInit } from '@angular/core';
import { Test } from '../shared/test.model';
import { TestService } from '../services/test.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Student } from '../shared/student.model';
import { StudentService } from '../services/student.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {
  tests: Test[];
  rollNumber: string;
  student: Student = new Student('', '', '', 'None', 0, 'None');
  students: Student[] = [];
  constructor(private testService: TestService,
              private router: Router,
              private route: ActivatedRoute,
              private studentService: StudentService) { }

  ngOnInit() {
    this.testService.getTests().subscribe(data => {
      this.tests = Object.values(data);
      // console.log(this.tests);

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
          console.log(this.student);
        }
      );
    });
  }

  giveTest(index: number) {
    this.router.navigate(['/student', this.rollNumber, index]);
  }

}
