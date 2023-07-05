import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Data, DataApi, User } from '../../interfaces/user.interface';
import { formatDate } from 'src/app/user/helpers/format-year';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../../components/modal/modal.component';
import { ModalConfirmComponent } from 'src/app/shared/modal-confirm/modal-confirm.component';
import { UserService } from '../../services/user.service';

@Component({
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  constructor( 
    private userService: UserService,
    private dialog: MatDialog,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getUserList();
  }

  public listUsers:User[] = [];
  
  public getUserList():any {
    this.userService.getUserList()
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
            this.userService.newUser( user ).subscribe({
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
              this.userService.updateUser( user ).subscribe({
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
