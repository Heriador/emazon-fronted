import { Component, Input, OnInit } from '@angular/core';
import { TextType } from '../../util/enums';

@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss']
})
export class TextComponent implements OnInit {

  TextType = TextType;
  @Input() type: TextType = TextType.P;
  @Input() content = '';
  @Input() class = '';
  @Input() for?: string = '';

  constructor() { }

  ngOnInit(): void {
  }

}

