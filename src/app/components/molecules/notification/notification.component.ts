import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {

  @Input() message: string = '';
  @Input() type: 'success' | 'error' | 'info' | 'warning' = 'info';
  isVisible: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

  show(message: string, type: 'success' | 'error' | 'info' | 'warning' = 'info') {
    this.message = message;
    this.type = type;
    this.isVisible = true;
    setTimeout(() => this.isVisible = false, 3000); // Ocultar después de 3 segundos
  }

}
