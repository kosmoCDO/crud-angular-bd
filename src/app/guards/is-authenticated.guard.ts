import { AuthService } from '../auth/services/auth.service';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, CanActivate } from '@angular/router';
import { Inject, inject } from '@angular/core';
import { take, tap, map } from 'rxjs';
import { UserStatus } from '../auth/interfaces/auth.interface';

export const isAuthenticatedGuard = () => {

  const authService: AuthService = inject( AuthService );
  const router: Router = inject( Router );

  const status = localStorage.getItem('isLoggedIn');
  if( status === UserStatus.authenticated ) true;
  else router.navigate(['auth']);

  

};

