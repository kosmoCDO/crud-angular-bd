import { AbstractControl, ValidatorFn } from "@angular/forms";

export function uppercaseValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const value: string = control.value;
      if (value && !/[A-Z]/.test(value)) {
        return { uppercase: true };
      }
      return null;
    };
  }