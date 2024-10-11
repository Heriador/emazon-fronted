import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {

  @Input() class: string = '';
  @Input() text: string = '';
  @Input() icon: boolean = false;
  @Input() disabled: boolean = false;


  constructor() { }


  ngOnInit() {
  }

}
