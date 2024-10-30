import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TextType } from '../../../../shared/constants/enums';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  TextType = TextType;
  faPlus = faPlus;
  faMinus = faMinus;

  @Input() title: string = '';
  @Input() description: string = '';
  @Input() brand: string = '';
  @Input() price: string = '';
  @Input() stock: number = 0;
  @Input() categories: string[] = [];
  @Output() selectedQuantity: EventEmitter<number> = new EventEmitter<number>();

  quantity: number = 1;
  showMore: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  togleShowMore(){
    this.showMore = !this.showMore;
  }

  increaseQuantity(){
    if(this.quantity === this.stock) return;
    this.quantity++;
  }

  decreaseQuantity(){
    if(this.quantity > 1){
      this.quantity--;
    }
  }


}
