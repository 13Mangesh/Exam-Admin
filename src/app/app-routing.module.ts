import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AssistantComponent } from './assistant/assistant.component';
import { TeacherComponent } from './teacher/teacher.component';
import { TestsComponent } from './teacher/tests/tests.component';
import { QuestionsComponent } from './teacher/questions/questions.component';
import { StudentsComponent } from './teacher/students/students.component';
import { StudentComponent } from './student/student.component';
import { QuestionEditComponent } from './teacher/questions/question-edit/question-edit.component';
import { AddStudentComponent } from './teacher/students/add-student/add-student.component';
import { GiveTestComponent } from './student/give-test/give-test.component';
import { FeedbackStudentComponent } from './teacher/students/feedback-student/feedback-student.component';
import { AuthComponent } from './auth/auth.component';
import { AssistantGuardGuard } from './assistant-guard.guard';
import { TeacherGuardGuard } from './teacher-guard.guard';
import { StudentGuardGuard } from './student-guard.guard';

const routes: Routes = [
  { path: '', redirectTo: '/auth', pathMatch: 'full'},
  { path: 'auth', component: AuthComponent },
  { path: 'student/:rollNumber', component: StudentComponent, canActivate: [StudentGuardGuard] },
  { path: 'student/:rollNumber/:index', component: GiveTestComponent, canActivate: [StudentGuardGuard] },
  { path: 'assistant', component: AssistantComponent, canActivate: [AssistantGuardGuard] },
  { path: 'teacher', component: TeacherComponent, canActivate: [TeacherGuardGuard] },
  { path: 'teacher/tests', component: TestsComponent, canActivate: [TeacherGuardGuard] },
  { path: 'teacher/questions', component: QuestionsComponent, canActivate: [TeacherGuardGuard] },
  { path: 'teacher/students', component: StudentsComponent, canActivate: [TeacherGuardGuard] },
  { path: 'teacher/students/addstudent', component: AddStudentComponent, canActivate: [TeacherGuardGuard] },
  { path: 'teacher/students/feedback', component: FeedbackStudentComponent, canActivate: [TeacherGuardGuard] },
  { path: 'teacher/questions/:index', component: QuestionEditComponent, canActivate: [TeacherGuardGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
