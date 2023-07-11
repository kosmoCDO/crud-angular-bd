import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';

export const routes: Routes = [
    {
        path: '',
        // canActivate: [isAuthenticatedGuard],
        component: LoginPageComponent
    },
    {
        path: 'register',
        component: RegisterPageComponent
    },
    {
        path: '**',
        redirectTo: ''
    }
]

@NgModule({
    imports:[ RouterModule.forChild( routes ) ],
    exports: [ RouterModule ]
})

export class AuthRoutingModule {}

