import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { TextType } from '../../util/enums';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-input-field',
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputFieldComponent),
      multi: true
    }
  ]
})
export class InputFieldComponent implements OnInit, ControlValueAccessor {

  TextType = TextType;

  @Input() content = '';
  @Input() label = '';
  @Input() name = '';
  @Input() id = '';
  @Input() placeholder = '';
  @Input() inputType = 'text';
  @Input() class = '';
  @Input() value = '';
  @Input() disabled: boolean = false;
  @Input() errorMessage: string = '';

  onChange: any = () => {};
  onTouched: any = () => {};

  constructor() { }
  ngOnInit(): void {
  }

  writeValue(value: any): void {
    this.value = value;
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

  

  onInput(event: Event){
    const input = event.target as HTMLInputElement;
    this.value = input.value;
    this.onChange(this.value);
    this.onTouched();
  }

}
