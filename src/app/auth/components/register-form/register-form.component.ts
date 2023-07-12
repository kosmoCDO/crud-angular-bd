import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { uppercaseValidator } from '../../helpers/uppercase';
import { User } from 'src/app/user/interfaces/user.interface';
import { Observable, map, startWith, tap } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { DataCargo } from '../../interfaces/auth.interface';

@Component({
  selector: 'auth-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {

  @Input()
  public title!: string;
  public dataLoaded = false;

  
  constructor( private fb: FormBuilder, private authServ: AuthService ) {}

    public myForm: FormGroup = this.fb.group({
      NOMBRE: ['', [ Validators.required, Validators.minLength(3) ]],
      APELLIDO: ['', [ Validators.required, Validators.minLength(5) ]],
      FECHA_NACIMIENTO: [new Date(), [ Validators.required ]],
      CARGO: ['', [ Validators.required ]],
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
                      return 'Formato debe ser mes-día-año';
                    };
                  };
                  
                };
                return null;
    };

    itemsCargo: DataCargo[] = []
    filtersItemsCargo!: Observable<any>;

    getListItemsCargo():any {
      this.authServ.getPositionList()
      .pipe( tap( console.log ) )
      .subscribe( list => {
        this.itemsCargo = list.data;
        this.dataLoaded = true;
      });
    }

    
    
    ngOnInit(): void {
      this.getListItemsCargo();

      this.filtersItemsCargo = this.myForm.controls['CARGO'].valueChanges
      .pipe(
        startWith(''),
        map( value => {
          const name = typeof value === 'string' ? value : value?.CARGO;
          return name ? this._filter( name as string ) : this.itemsCargo.slice();
        })
      )
    };

    displayFn( cargo: any ): string {
      return cargo && cargo.ID_CARGO ? cargo.CARGO : '';
    }
  
    private _filter(value: string): DataCargo[] {
      const filterValue = value.toLowerCase();
      return this.itemsCargo
      .filter(item => item.CARGO.toLowerCase().includes(filterValue));
    }


    @Output()
      public event: EventEmitter<User> = new EventEmitter();

    public onSubmit():void {

      if( this.myForm.invalid ){
        this.myForm.markAllAsTouched();
        return;
      };
      //Enviar datos al padre.
      this.event.emit( this.myForm.value );
    };

}
