import { TestBed, async, inject } from '@angular/core/testing';

import { AssistantGuardGuard } from './assistant-guard.guard';

describe('AssistantGuardGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AssistantGuardGuard]
    });
  });

  it('should ...', inject([AssistantGuardGuard], (guard: AssistantGuardGuard) => {
    expect(guard).toBeTruthy();
  }));
});
