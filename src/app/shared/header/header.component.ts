import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'shared-header',
    template: `
        <mat-toolbar color="primary" class="header-container">
            <span>Gestion De Usuarios</span>
        </mat-toolbar>
    `
})

export class HeaderComponent implements OnInit {
    constructor() { }

    ngOnInit() { }
}