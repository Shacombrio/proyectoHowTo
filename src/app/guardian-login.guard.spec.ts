import { TestBed } from '@angular/core/testing';

import { GuardianLoginGuard } from './guardian-login.guard';

describe('GuardianLoginGuard', () => {
  let guard: GuardianLoginGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(GuardianLoginGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
