import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { uppercaseValidator } from '../../helpers/uppercase';
import { User } from 'src/app/user/interfaces/user.interface';

@Component({
  selector: 'auth-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {

  @Input()
    public title!: string;

    constructor( private fb: FormBuilder ) {}

    public myForm: FormGroup = this.fb.group({
      EMAIL: ['', [ Validators.required, Validators.email]],
      PASSWORD: ['', [ Validators.required, Validators.minLength(8), /* uppercaseValidator() */ ]],
      checkBox: [false]
    });

    public getTextError( field: string ): string | null {
      if( !this.myForm.controls[field] ) return null;

      if( this.myForm.controls[field].touched ) {
        const errors = this.myForm.controls[field].errors || {};
        for (const key of Object.keys(errors)) {
          switch( key ) {
            case 'required':
              return 'Este campo es requerido.';
            case 'email':
              return 'El formato es incorrecto.';
            case 'minlength':
              return `Minimo ${ errors['minlength'].requiredLength } caracters.`
            case 'uppercase':
              return 'Debe tener una mayúscula.'
          };
        };
  
      };
        return null;
    };

    @Output()
      public event: EventEmitter<User> = new EventEmitter();

      
    public onSubmit():void {
      if( this.myForm.invalid ){
        this.myForm.markAllAsTouched();
        return;
      };

      this.event.emit( this.myForm.value );

    }

}
