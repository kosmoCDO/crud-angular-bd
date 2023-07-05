import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'usuario',
    children: [
      {
        path: '',
        loadChildren: () => import('./user/user.module').then( module => module.UserModule )
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'usuario'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
