import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from 'src/app/services/student.service';
import { Student } from 'src/app/shared/student.model';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {
  students: Student[] = [];
  constructor(private studentService: StudentService,
              private router: Router) { }

  ngOnInit() {
    this.studentService.getStudents().subscribe(data => {
      this.students = Object.values(data);
    });
  }

  goBack() {
    this.router.navigate(['/teacher']);
  }

  addStudents() {
    this.router.navigate(['/teacher', 'students', 'addstudent']);
  }

  giveFeedback() {
    this.router.navigate(['/teacher', 'students', 'feedback']);
  }

}
