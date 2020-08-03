import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Student } from 'src/app/shared/student.model';
import { StudentService } from 'src/app/services/student.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent implements OnInit {
  isInvalid = false;
  constructor(public studentService: StudentService,
              private router: Router) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newStudent: Student = new Student('', '', '', 'None', 0, 'None');
    const name = value.name.trim();
    const rollNumber = value.rollNumber.trim();
    const year = value.year.trim();

    if (name === '' || rollNumber === '' || year === '') {
      this.isInvalid = true;
      return;
    }
    this.isInvalid = false;
    newStudent.name = name;
    newStudent.rollNumber = rollNumber;
    newStudent.year = year;
    this.studentService.addStudent(newStudent);
    form.resetForm();
  }

  goBack() {
    this.router.navigate(['/teacher', 'students']);
  }

}
