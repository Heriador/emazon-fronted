import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'emazon-frontend';

  changeTitle(){
    this.title = 'changed title';
  }

  
}
