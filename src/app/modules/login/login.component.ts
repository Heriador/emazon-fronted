import { Component, OnInit } from '@angular/core';
import { TextType } from '../../shared/constants/enums';
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor() { }

  TextType = TextType;
  icon = faRightToBracket;

  ngOnInit(): void {
  }

}
