import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { TextType } from '../../../constants/enums';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-textarea-field',
  templateUrl: './textarea-field.component.html',
  styleUrls: ['./textarea-field.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextareaFieldComponent),
      multi: true
    }
  ]
})
export class TextareaFieldComponent implements OnInit, ControlValueAccessor {

  TextType = TextType;

  @Input() content = '';
  @Input() label = '';
  @Input() name = '';
  @Input() id = '';
  @Input() placeholder = '';
  @Input() inputType = 'text';
  @Input() errorMessage: string = '';
  @Input() class = '';
  @Input() value = '';
  @Input() disabled: boolean = false;

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

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onInput(event: Event): void {
    const textarea = event.target as HTMLTextAreaElement;
    this.value = textarea.value;
    this.onChange(this.value);
    this.onTouched();
  }

}
