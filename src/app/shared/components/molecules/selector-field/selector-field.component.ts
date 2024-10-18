import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { TextType } from 'src/app/shared/constants/enums';

@Component({
  selector: 'app-selector-field',
  templateUrl: './selector-field.component.html',
  styleUrls: ['./selector-field.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectorFieldComponent),
      multi: true
    }
  ]
})
export class SelectorFieldComponent implements ControlValueAccessor {

  TextType = TextType;
  selected: any = '';
  @Input() label: string = '';
  @Input() name: string = '';
  @Input() options: any[] = [];
  @Input() id: string = '';
  @Input() errorMessage: string = '';
  @Input() disabled: boolean = false;
  @Input() class: string = '';
  @Input() multiple: boolean = false;

  onChange: any = () => {};
  onTouched: any = () => {};

  constructor() { }


  writeValue(value: any): void {
    this.selected = value;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }


  onSelected(event: Event){
    const select = event.target as HTMLSelectElement;
    this.selected = select.value;
    this.onChange(this.selected);
    this.onTouched();
  }

}
