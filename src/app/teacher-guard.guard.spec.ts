import { TestBed, async, inject } from '@angular/core/testing';

import { TeacherGuardGuard } from './teacher-guard.guard';

describe('TeacherGuardGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TeacherGuardGuard]
    });
  });

  it('should ...', inject([TeacherGuardGuard], (guard: TeacherGuardGuard) => {
    expect(guard).toBeTruthy();
  }));
});
