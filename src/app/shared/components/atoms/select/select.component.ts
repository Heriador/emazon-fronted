import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit {

  @Input() id: string = '';
  @Input() placeholder = '';
  @Input() options: any[] = [];
  @Input() name = '';
  @Input() selected: any = '';
  @Input() disabled: boolean = false;
  @Input() error: boolean = false;
  @Input() multiple: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
