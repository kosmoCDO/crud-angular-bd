import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { uppercaseValidator } from '../../helpers/uppercase';
import { User } from 'src/app/user/interfaces/user.interface';

@Component({
  selector: 'auth-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent {

  @Input()
    public title!: string;

    constructor( private fb: FormBuilder ) {}

    public myForm: FormGroup = this.fb.group({
      NOMBRE: ['', [ Validators.required, Validators.minLength(3) ]],
      APELLIDO: ['', [ Validators.required, Validators.minLength(5) ]],
      FECHA_NACIMIENTO: ['', [ Validators.required, Validators.pattern(/^\d{4}-\d{2}-\d{2}$/) ]],
      CARGO: ['', [ Validators.required, Validators.minLength(3) ]],
      EMAIL: ['', [ Validators.required, Validators.email] ],
      PASSWORD: ['', [ Validators.required, Validators.minLength(8), uppercaseValidator() ]],
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
            case 'pattern':
              return 'Formato debe ser año-mes-dia';
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

      //Enviar datos al padre.
      this.event.emit( this.myForm.value );

    }

}
