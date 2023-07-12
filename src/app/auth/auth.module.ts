import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthService } from './services/auth.service';

import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { RegisterFormComponent } from './components/register-form/register-form.component';

import {  MatCheckboxModule } from '@angular/material/checkbox';
import {  MatCardModule } from '@angular/material/card';
import {  MatFormFieldModule  } from '@angular/material/form-field';
import {  MatInputModule  } from '@angular/material/input';
import {  MatButtonModule } from '@angular/material/button';
import {  RouterModule } from '@angular/router';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatSelectModule} from '@angular/material/select';


@NgModule({
  declarations: [
    LoginPageComponent,
    LoginFormComponent,
    RegisterFormComponent,
    RegisterPageComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule,

    /* Angular Material */
    MatCheckboxModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatAutocompleteModule,
    MatSelectModule
  ],
  providers: [
    AuthService
  ]
})
export class AuthModule { }
