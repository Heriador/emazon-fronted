import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../services/auth/auth.service';
import { TextType } from '../../../constants/enums';
import { Roles } from '../../../constants/roles';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  Roles = Roles;
  TextType = TextType;

  constructor(
    private readonly authService: AuthService,
  ) { }

  ngOnInit(): void {
  }

  logout(){
    this.authService.logout();
  }
}
