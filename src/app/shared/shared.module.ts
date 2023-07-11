import { NgModule } from '@angular/core';
import { HeaderComponent } from './header/header.component';

import {MatToolbarModule} from '@angular/material/toolbar';
import { MatDialogModule } from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
    declarations: [ 
        HeaderComponent
    ],
    exports: [
        HeaderComponent
    ],
    imports: [
        MatToolbarModule,
        MatDialogModule,
        MatButtonModule,
        MatDividerModule,
        HttpClientModule
    ],
    providers: [],
})
export class SharedModule { }
