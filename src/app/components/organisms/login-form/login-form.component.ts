import { Component, OnInit } from '@angular/core';
import { TextType } from '../../util/enums';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  TextType = TextType;

  constructor() { }

  ngOnInit(): void {
  }

}
