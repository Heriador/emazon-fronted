import { Component, OnInit } from '@angular/core';
import { TextType } from '../../../../shared/constants/enums';
import { faBars } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  TextType = TextType;
  faBars = faBars;

  menuOpen: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  openMenu(){
    this.menuOpen = !this.menuOpen;
  }

}
