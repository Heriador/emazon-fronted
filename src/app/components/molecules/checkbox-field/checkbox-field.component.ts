import { Component, OnInit } from '@angular/core';
import { TextType } from '../../util/enums';

@Component({
  selector: 'app-checkbox-field',
  templateUrl: './checkbox-field.component.html',
  styleUrls: ['./checkbox-field.component.scss']
})
export class CheckboxFieldComponent implements OnInit {

  textType = TextType;

  constructor() { }

  ngOnInit(): void {
  }

}
