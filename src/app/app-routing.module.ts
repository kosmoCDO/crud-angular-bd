import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { isAuthenticatedGuard } from './guards/is-authenticated.guard';
import { verifyStatusGuard } from './guards/verify-status.guard';

const routes: Routes = [
  {
    canActivate: [ isAuthenticatedGuard ],
    path: 'usuario',
    children: [
      { path: '', loadChildren: () => import('./user/user.module').then( m => m.UserModule ) },
    ],
  },
  {
    path: 'auth',
    canActivate: [ verifyStatusGuard ],
    children: [
      { path: '', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
    ]
  },
  // {
  //   path: '**',
  //   redirectTo: 'auth'
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
