import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.css']
})
export class TeacherComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  viewQuestion() {
    this.router.navigate(['/teacher', 'questions']);
  }

  viewStudent() {
    this.router.navigate(['/teacher', 'students']);
  }

  viewTest() {
    this.router.navigate(['/teacher', 'tests']);
  }

}
