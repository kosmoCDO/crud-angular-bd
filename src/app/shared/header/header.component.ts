import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserStatus } from 'src/app/auth/interfaces/auth.interface';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
    selector: 'shared-header',
    template: `
        <mat-toolbar color="primary" class="header-container">
            <span>Gestion De Usuarios</span>
            <button mat-flat-button color="warn" (click)="onLogout()">Cerrar sesión</button>
        </mat-toolbar>
    `,
    styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
    constructor( 
        private authService: AuthService,
        private router: Router
        ) { }


    public onLogout():void {
        localStorage.setItem('isLoggedIn', UserStatus.notAuthenticated);
        this.authService.userLogout()
        .subscribe(( resp: any ) => {
            this.router.navigate(['auth']);
        })
    }

    ngOnInit() { }
}