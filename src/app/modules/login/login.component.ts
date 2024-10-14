import { Component, OnInit } from '@angular/core';
import { TextType } from '../../shared/constants/enums';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor() { }

  TextType = TextType;

  ngOnInit(): void {
  }

}
