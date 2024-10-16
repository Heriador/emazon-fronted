import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-textarea',
  templateUrl: './text-area.component.html',
  styleUrls: ['./text-area.component.scss']
})
export class TextAreaComponent implements OnInit {

  constructor() { }

  @Input() placeholder: string = '';
  @Input() id: string = '';
  @Input() name:string = '';
  @Input() class: string = '';
  @Input() disabled: boolean = false;
  @Input() error: boolean = false;
  @Input() value: string = '';

  ngOnInit(): void {
  }

}
