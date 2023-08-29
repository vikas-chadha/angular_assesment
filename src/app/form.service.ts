import {Injectable} from "@angular/core";
import {FormGroup} from "@angular/forms";

@Injectable({
  providedIn: 'root',
})
export class FormService {
  static removeValidators(form: FormGroup, key: string) {
    try {
      form.get(key)?.setErrors(null);
      form.get(key)?.markAsUntouched();
      form.get(key)?.clearValidators();
      form.get(key)?.updateValueAndValidity();
    } catch (e) {
    }
  }
}
