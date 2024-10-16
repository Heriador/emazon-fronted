import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faX } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  @Input() isVisible: boolean = false;
  @Output() close = new EventEmitter<void>();

  xIcon = faX;

  constructor() { }

  ngOnInit(): void {
  }

  closeModal() {
    this.isVisible = false;
    this.close.emit();
  }

}
