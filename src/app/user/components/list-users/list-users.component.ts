import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { Data, User } from '../../interfaces/user.interface';

@Component({
    selector: 'user-list-users',
    templateUrl: './list-users.component.html',
    styleUrls: ['./list-users.component.css']
})

export class ListUsersComponent {

    @Input()
    public listUsers: User[] = [];

    @Output()
    public eventDelete: EventEmitter< User  > = new EventEmitter();
    
    @Output()
    public eventUpdate: EventEmitter< Data > = new EventEmitter();

    public onEdit( user: User, event: string ):void {

        const data:Data = {
            user: user,
            event: event
        }
        this.eventUpdate.emit(data);
    }
    
    public onDelete( user: User ):void {
        this.eventDelete.emit( user );
    }

}