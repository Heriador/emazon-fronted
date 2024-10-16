import { Component, OnInit } from '@angular/core';
import { TextType } from '../../../constants/enums';
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  TextType = TextType;
  icon = faRightToBracket;

  constructor() { }

  ngOnInit(): void {
  }

}
