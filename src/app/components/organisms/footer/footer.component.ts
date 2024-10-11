import { Component, OnInit } from '@angular/core';
import { TextType } from '../../util/enums';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  TextType = TextType;

  constructor() { }

  ngOnInit(): void {
  }

}
