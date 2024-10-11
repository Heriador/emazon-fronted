import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss']
})
export class IconComponent implements OnInit {

  @Input() class: string = 'fa-solid fa-right-to-bracket'

  constructor() { }



  ngOnInit(): void {
  }

}
