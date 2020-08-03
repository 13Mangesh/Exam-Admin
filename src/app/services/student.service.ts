import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Student } from '../shared/student.model';

@Injectable({providedIn: 'root'})

export class StudentService {
  private students: Observable<Student[]>;

  constructor(private http: HttpClient) {
    this.students = this.http.get<Student[]>('http://localhost:3000/api/student');
  }

  getStudents() {
    return this.students;
  }

  getStudent(index: number) {

  }

  updateStudent(newStudent: Student, index: number) {
    this.http.put('http://localhost:3000/api/student', {newStudent, index}).subscribe(data => {
      console.log(data);
    });
  }

  addStudent(student: Student) {
    this.http.post('http://localhost:3000/api/student', student).subscribe(data => {
      console.log(data);
    });
  }
}
