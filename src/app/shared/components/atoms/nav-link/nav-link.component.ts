import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-link',
  templateUrl: './nav-link.component.html',
  styleUrls: ['./nav-link.component.scss']
})
export class NavLinkComponent implements OnInit {

  @Input() linkText: string = '';
  @Input() linkUrl: string = '';

  constructor() { }

  ngOnInit(): void {
  }

}
