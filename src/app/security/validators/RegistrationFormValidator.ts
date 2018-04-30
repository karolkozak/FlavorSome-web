import {FormGroup, ValidationErrors} from '@angular/forms';

export class RegistrationFormValidator {
  static equalPasswordsRequired(group: FormGroup): ValidationErrors {
    if (!group.value.password || group.value.password !== group.value.repeatedPassword) {
      return {
        equalPasswordsRequired: true
      };
    }
    return null;
  }
}
