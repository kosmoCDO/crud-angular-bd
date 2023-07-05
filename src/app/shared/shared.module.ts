import { NgModule } from '@angular/core';
import { HeaderComponent } from './header/header.component';

import {MatToolbarModule} from '@angular/material/toolbar';
import { MatDialogModule } from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';


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
    ],
    providers: [],
})
export class SharedModule { }
