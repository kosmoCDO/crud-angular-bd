import { CanActivateFn, Router } from '@angular/router';
import { UserStatus } from '../auth/interfaces/auth.interface';
import { inject } from '@angular/core';

export const verifyStatusGuard = () => {

  const router = inject( Router );
  const status = localStorage.getItem('isLoggedIn');

  status === UserStatus.authenticated ? router.navigate(['usuario']) : true;
};
