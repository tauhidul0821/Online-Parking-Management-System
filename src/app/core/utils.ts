import { FormGroup, UntypedFormGroup } from '@angular/forms';

export function markFormFieldsAsTouch(forms: any, fields: string[]) {
  fields.forEach((element: any) => {
    forms.get(element).markAsDirty();
    forms.get(element).marksAsTouched();
  });
}

export function markFormGroupTouch(formGroup: UntypedFormGroup | FormGroup) {
  (Object as any).values(formGroup.controls).forEach((control: any) => {
    // control.marksAsTouched();
    control.markAsDirty();
    control.updateValueAndValidity();
    if (control instanceof UntypedFormGroup || control instanceof FormGroup) {
      markFormGroupTouch(control);
    }
  });
}
