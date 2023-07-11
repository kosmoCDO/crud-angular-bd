import { Component } from '@angular/core';
import { User } from 'src/app/user/interfaces/user.interface';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UserStatus } from '../../interfaces/auth.interface';

@Component({
  selector: 'auth-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent {

  constructor( private authService: AuthService, private router: Router ) {}

   public observer = {
    next: (resp: any) => {
      Swal.fire('Se registro correctamente', 'Sera redirigido hacia la pagina principal', 'success');
      localStorage.setItem('isLoggedIn', UserStatus.authenticated);
      setTimeout(() => { 
        this.router.navigate(['usuario']);
       },2000)
    },
    error: ( error:any ) => {
      Swal.fire(
        'Error al crear la cuenta', 
        'No se pudo crear la cuenta, intentelo nuevamente', 
        'error')
    },
    complete: () => console.log('Se registro en la bd correctamente.')
  }

  public onRegister( user: User ):void {
    console.log( user );
    this.authService.newUser( user  )
    .subscribe( this.observer )
  }

}
