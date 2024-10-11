import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {


  @Input() placeholder = '';
  @Input() type = 'text';
  @Input() id = '';
  @Input() name = '';
  @Input() value = '';
  @Input() disabled: boolean = false;
  @Input() error: boolean = false;
  @Output() inputValue = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  onInputChange(event: Event): void {
    this.inputValue.emit((event.target as HTMLInputElement).value);
  }

}
