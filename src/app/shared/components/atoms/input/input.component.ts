import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

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

  @Output() focus = new EventEmitter<FocusEvent>();

  constructor() { }

  ngOnInit(): void {
  }

  onFocus(event: FocusEvent) {
    this.focus.emit(event);
  }

}
