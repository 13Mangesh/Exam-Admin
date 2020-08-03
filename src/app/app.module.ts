import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TeacherComponent } from './teacher/teacher.component';
import { StudentComponent } from './student/student.component';
import { AssistantComponent } from './assistant/assistant.component';
import { FormsModule } from '@angular/forms';
import { QuestionsComponent } from './teacher/questions/questions.component';
import { TestsComponent } from './teacher/tests/tests.component';
import { StudentsComponent } from './teacher/students/students.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { QuestionEditComponent } from './teacher/questions/question-edit/question-edit.component';
import { GiveTestComponent } from './student/give-test/give-test.component';
import { AddStudentComponent } from './teacher/students/add-student/add-student.component';
import { FeedbackStudentComponent } from './teacher/students/feedback-student/feedback-student.component';
import { AuthComponent } from './auth/auth.component';
import { AssistantGuardGuard } from './assistant-guard.guard';
import { CountdownModule } from 'ngx-countdown';
import { StudentGuardGuard } from './student-guard.guard';
import { TeacherGuardGuard } from './teacher-guard.guard';

@NgModule({
  declarations: [
    AppComponent,
    TeacherComponent,
    StudentComponent,
    AssistantComponent,
    QuestionsComponent,
    TestsComponent,
    StudentsComponent,
    QuestionEditComponent,
    GiveTestComponent,
    AddStudentComponent,
    FeedbackStudentComponent,
    AuthComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CountdownModule
  ],
  providers: [
    HttpClientModule,
    AssistantGuardGuard,
    StudentGuardGuard,
    TeacherGuardGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
