import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { StudentService } from '../services/student.service';
import { Student } from '../shared/student.model';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  isInvalid = false;
  students: Student[] = [];
  constructor(
              private studentService: StudentService) { }

  ngOnInit() {
    this.studentService.getStudents().subscribe(data => {
      this.students = Object.values(data);
    });
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const username = value.username.trim();
    const password = value.password.trim();

    if (username === '' || password === '') {
      this.isInvalid = true;
      return;
    }
    this.isInvalid = false;
    // localStorage.setItem('user', 'student');
    if (username === 'teacher' && password === 'teacher') {
      localStorage.clear();
      localStorage.setItem('user', 'teacher');
      this.router.navigate(['/teacher']);
    }

    if (username === 'assistant' && password === 'assistant') {
      localStorage.clear();
      localStorage.setItem('user', 'assistant');
      this.router.navigate(['/assistant']);
    }

    this.students.forEach(element => {
      if (element.rollNumber === username && element.rollNumber === password) {
        localStorage.clear();
        localStorage.setItem('user', 'student');
        console.log(username);

        this.router.navigate(['/student', username]);
      }
    });

    this.isInvalid = true;
    form.resetForm();
  }

}
