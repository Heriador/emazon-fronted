import { Component, Input, OnInit } from '@angular/core';
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {

  @Input() class: string = '';
  @Input() text: string = '';
  @Input() icon?: IconDefinition;
  @Input() disabled: boolean = false;


  constructor() { }


  ngOnInit() {
  }

}import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

