import { TestBed, async, inject } from '@angular/core/testing';

import { StudentGuardGuard } from './student-guard.guard';

describe('StudentGuardGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StudentGuardGuard]
    });
  });

  it('should ...', inject([StudentGuardGuard], (guard: StudentGuardGuard) => {
    expect(guard).toBeTruthy();
  }));
});
