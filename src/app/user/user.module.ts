import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { HomePageComponent } from './pages/home-page/home-page.component';
import { ListUsersComponent } from './components/list-users/list-users.component';
import { ModalComponent } from './components/modal/modal.component';

import { SharedModule } from '../shared/shared.module';
import { UserRoutingModule } from './user-routing.module';

import { UserService } from './services/user.service';

import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatNativeDateModule} from '@angular/material/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';


@NgModule({
    declarations: [
    HomePageComponent,
    ListUsersComponent,
    ModalComponent,
  ],
    imports: [
        UserRoutingModule,
        HttpClientModule,
        
        SharedModule,

        MatTableModule,
        MatButtonModule,
        MatPaginatorModule,
        MatFormFieldModule,
        MatInputModule,
        MatDialogModule,
        FormsModule,
        ReactiveFormsModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatIconModule
    ],
    exports: [],
    providers: [
      UserService
    ],
})
export class UserModule { }
