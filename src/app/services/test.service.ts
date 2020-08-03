import { Injectable } from '@angular/core';
import { Test } from '../shared/test.model';
import { Subject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({providedIn: 'root'})

export class TestService {
  testschanged = new Subject<Test[]>();
  private tests: Observable<Test[]>;

  constructor(private http: HttpClient) {
    this.tests = this.http.get<Test[]>('http://localhost:3000/api/test');
  }

  // setTests(tests: Test[]) {
  //   this.tests = tests;
  //   this.testschanged.next(this.tests.slice());
  // }

  getTests() {
    return this.tests;
  }

  getTest(index: number) {
    return this.tests[index];
  }

  addTest(test: Test) {
    console.log(test);
    this.http.post('http://localhost:3000/api/test', test).subscribe(data => {
      console.log(data);
    });
  }

}
