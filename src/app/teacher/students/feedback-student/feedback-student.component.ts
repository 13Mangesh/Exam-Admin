import { Component, OnInit } from '@angular/core';
import { Student } from 'src/app/shared/student.model';
import { StudentService } from 'src/app/services/student.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-feedback-student',
  templateUrl: './feedback-student.component.html',
  styleUrls: ['./feedback-student.component.css']
})
export class FeedbackStudentComponent implements OnInit {
  students: Student[] = [];
  constructor(private studentService: StudentService,
              private router: Router) { }
  isInvalid = false;

  ngOnInit() {
    this.studentService.getStudents().subscribe(data => {
      this.students = Object.values(data);
    });
  }

  onSubmit(form: NgForm, index: number) {
    const value = form.value;
    const feedback = value.feedback.trim();

    if (feedback === '') {
      this.isInvalid = true;
      return;
    }
    this.isInvalid = false;
    this.students[index].lastTestFeedback = feedback;
    this.studentService.updateStudent(this.students[index], index + 1);
    form.resetForm();
  }

  goBack() {
    this.router.navigate(['/teacher', 'students']);
  }
}
