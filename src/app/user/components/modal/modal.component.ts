import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Data, User } from '../../interfaces/user.interface';
import { UserService } from '../../services/user.service';

@Component({
    selector: 'user-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.css']
})

export class ModalComponent implements OnInit {
    
    constructor( 
        public dialogRef: MatDialogRef<ModalComponent>,
        @Inject(MAT_DIALOG_DATA )  public data: Data,

        private fb: FormBuilder,
        private userService: UserService
    ) {}

    public onCancel():void {
        this.dialogRef.close( false );
    }


    public myForm: FormGroup = this.fb.group({
        NOMBRE: ['', [ Validators.required, Validators.minLength(3) ]],
        APELLIDO: ['', [ Validators.required, Validators.minLength(3) ]],
        FECHA_NACIMIENTO: ['', 
        [ Validators.required, Validators.pattern(/^\d{4}-\d{2}-\d{2}$/) ]
        ],
        EMAIL: ['', [ Validators.required, Validators.email ]],
        CARGO: ['', [ Validators.required, Validators.minLength(3) ]],
        PASSWORD: ['', [ Validators.required, Validators.minLength(5) ]]
    })


    textErrorField( field: string ): string | null {
        if( !this.myForm.controls[field] ) return null;
        const errors = this.myForm.controls[field].errors || {};
        for (const key of Object.keys(errors) ) {
            switch( key ) {
                case 'required':
                    return 'Este campo es requerido';
                case 'minlength':
                    return `requiere ${ errors['minlength'].requiredLength } caracters min.`;
                case 'email':
                    return 'Formato incorrecto';
                case 'pattern':
                    return 'Formato debe ser año/mes/dia';
            };
        };
        return null;
    };

    public onSubmit():void {
        if( this.myForm.invalid ) {
            this.myForm.markAllAsTouched();
            return;
        };
        
        this.dialogRef.close( this.myForm.value )

    }

    ngOnInit(): void {

        if( this.data.event  === 'new' ) return;
        
        if( this.data.event === 'update' 
        && this.data.user !== null ) {
            
            this.myForm.reset({
                NOMBRE: this.data.user.NOMBRE,
                APELLIDO: this.data.user.APELLIDO,
                FECHA_NACIMIENTO: this.data.user.FECHA_NACIMIENTO,
                EMAIL: this.data.user.EMAIL,
                CARGO: this.data.user.CARGO,
                PASSWORD: this.data.user.PASSWORD
            });
        };
        
    }


}