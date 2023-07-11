import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/user/interfaces/user.interface';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { filter, map, tap } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import { UserStatus } from '../../interfaces/auth.interface';

@Component({
  selector: 'auth-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {
  constructor(private authService: AuthService,
    private router: Router
 ) {}

 public observer = {
  next: (resp: any) => {
  this.authService.insertToken( resp.token );
  localStorage.setItem('isLoggedIn', UserStatus.authenticated);
  this.router.navigate(['usuario']);
  },
  error: ( error:any ) => {
    Swal.fire(
      'Error al iniciar sesión', 
      'Email o contraseña incorrecta', 
      'error')
  },
  complete: () => console.log('Se registro en la bd correctamente.')
}


  public onLogin( user: User):void {
    this.authService.authLogin( user )
    .subscribe( this.observer )
  }

}
