import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-link',
  templateUrl: './nav-link.component.html',
  styleUrls: ['./nav-link.component.scss']
})
export class NavLinkComponent implements OnInit {

  @Input() linkText: string = '';
  @Input() linkUrl: string = '';

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  navigate(){
    this.router.navigate([this.linkUrl]);
  }


}
