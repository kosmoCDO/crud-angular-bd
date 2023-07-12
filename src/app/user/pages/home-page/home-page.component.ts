import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Data, DataApi, User } from '../../interfaces/user.interface';
import { formatDate } from 'src/app/user/helpers/format-year';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../../components/modal/modal.component';
import { ModalConfirmComponent } from 'src/app/shared/modal-confirm/modal-confirm.component';
import { UserService } from '../../services/user.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import { formatearFecha } from 'src/app/auth/helpers/formatear-fecha';
import { tap } from 'rxjs';

@Component({
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  constructor( 
    private userService: UserService,
    private dialog: MatDialog,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.getUserList();
  }

  public listUsers:User[] = [];
  
  public getUserList():any {
    this.userService.getUserList()
    .pipe( tap( console.log ) )
    .subscribe({
      next: ( resp: DataApi ) => {
      this.listUsers = resp.data;
      },
      error: ({ error }) => {
        this.listUsers = [];
        alert(`Error al obtener lista de usuarios: ${ error.message }`);
        throw new Error('Error al obtener lista de usuarios');
      }
    })
  };

  

  public onDeleteUserById( user: User ):void {
    const dialogRef = this.dialog.open(ModalConfirmComponent,{
      data: user.NOMBRE
    })
    dialogRef.beforeClosed().subscribe( dataModal => {
      if(!dataModal) return;
      this.userService.deleteUserApi( user.EMAIL, dataModal )
      .subscribe({
        next: ({ message }) => {
          alert(`Success: ${message}`);
          this.getUserList();
        },
        error: ({ error }: any ) => {
          alert(` Error: ${error.message}`)
          throw new Error('Error al eliminar usuario');
        }
      });
    });
  };

  
  public onUser( obj: Data ):void {
    const { user, event } = obj;
    const dialogRef = this.dialog.open(ModalComponent, {
      data: {
        user: user, 
        event: event,
      }
    });

    if( event === 'new') {
      dialogRef.beforeClosed().subscribe(( user: User ) => {
        if( !user ) return;

      const newUserData = {
        NOMBRE: user.NOMBRE,
        APELLIDO: user.APELLIDO,
        FECHA_NACIMIENTO: formatearFecha( user.FECHA_NACIMIENTO! ),
        ID_CARGO: user.CARGO?.ID_CARGO,
        EMAIL: user.EMAIL,
        PASSWORD: user.PASSWORD
      }
      this.userService.newUser( newUserData ).subscribe({
          next: ( resp ) => {
              alert(`Success: ${resp.message}`);
              this.getUserList();
          },
          error: ({ error }) => {
              alert(`Error al crear: ${ error.message }`)
          }
        });
      });
    };

    if( event === 'update' ) {
    dialogRef.beforeClosed().subscribe(( user: User ) => {
        if( !user ) return;
              
      const newUserData = {
        NOMBRE: user.NOMBRE,
        APELLIDO: user.APELLIDO,
        FECHA_NACIMIENTO: formatearFecha( user.FECHA_NACIMIENTO! ),
        ID_CARGO: user.CARGO?.ID_CARGO,
        EMAIL: user.EMAIL,
        PASSWORD: user.PASSWORD
        }
              
        this.userService.updateUser( newUserData ).subscribe({
            next: ( resp ) => {
                alert(`Success: ${resp.message}`)
                this.getUserList();
            },
            error: ({ error }) => { 
                alert(`Error al actualizar: ${ error.message }`)
            }
          });
        });
    };

  };


};
