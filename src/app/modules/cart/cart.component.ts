import { HttpResponse, HttpStatusCode } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { faAnglesLeft, faAnglesRight, faArrowDownAZ, faArrowUpAZ, faTrash } from '@fortawesome/free-solid-svg-icons';
import { CartService } from '../../services/cart/cart.service';
import { NotificationService } from '../../services/notification/notification.service';
import { NotificationType, TextType } from '../../shared/constants/enums';
import { CartItem, CartResponse } from 'src/app/shared/interfaces/cart.interface';
import { CategoryResponse } from 'src/app/shared/interfaces/category.interface';
import { CART_ERROR_MESSAGES_BY_CODE, CART_RESPONSE_MESSAGES } from '../../shared/constants/cart-constants';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  TextType = TextType;
  faTrash = faTrash
  faAnglesLeft = faAnglesLeft;
  faAnglesRight = faAnglesRight;
  faArrowDownAZ = faArrowDownAZ;
  faArrowUpAZ = faArrowUpAZ;

  page: number = 0;
  size: number = 5;
  isAsc: boolean = true;
  categoryName: string = '';
  brandName: string = '';

  totalElements: number = 0;
  totalPages: number = 0;
  
  cartItems: CartItem[] = [];
  totalPrice: number = 0;

  filterForm: FormGroup;


  constructor(
    private readonly cartService: CartService,
    private readonly notificationService: NotificationService,
    private readonly formBuilder: FormBuilder
  ) { 
    this.filterForm = this.formBuilder.group({
      filterBy: ['',Validators.required],
      filterString: ['']
    })
  }

  ngOnInit(): void {
    this.getCartItems();
  }

  getCartItems(){
    this.cartService
      .getCartItems(this.page, this.size, this.isAsc, this.categoryName, this.brandName)
      .subscribe({
        next: (response) => {
          if(response.status !== HttpStatusCode.Ok || !response.body){
            this.notificationService.show({
              message: CART_RESPONSE_MESSAGES.UNEXPECTED_RESPONSE,
              type: NotificationType.ERROR
            })
          }
          console.log(response.body);

          const cartResponse: CartResponse = response.body as CartResponse;

          this.cartItems = cartResponse.content;
          this.totalElements = cartResponse.totalElements;
          this.totalPages = cartResponse.totalPages;
          this.totalPrice = cartResponse.totalPrice;
        },
        error: error => {
          console.error(error);
          this.notificationService.show({
            message: CART_ERROR_MESSAGES_BY_CODE[error.status],
            type: NotificationType.ERROR
          })
        }
      })
  }

  deleteItem(itemId: number){
    this.cartService
      .deleteItemFromCart(itemId)
      .subscribe({
        next: (response) => {
          if(response.status === HttpStatusCode.Ok){
            this.getCartItems();
          }
        },
        error: error => {
          console.error(error);
          this.notificationService.show({
            message: CART_ERROR_MESSAGES_BY_CODE[error.status],
            type: NotificationType.ERROR
          })
        }
      })
  }

  changeSize(event: Event){
    const select = event.target as HTMLSelectElement;
    console.log("new size",select.value);
    this.size = parseInt(select.value);
    this.getCartItems();
  }

  changeAsc(){
    this.isAsc = !this.isAsc;
    this.getCartItems();
  }

  nextPage(){
    if((this.page+1) === this.totalPages) return;
    this.page += 1;
    this.getCartItems();
  }

  previousPage(){
    if(this.page === 0) return;
    this.page -= 1;
    this.getCartItems();
  }

  changeFilter(){
    const filterBy = this.filterForm.get('filterBy') as FormControl;
    const filterString = this.filterForm.get('filterString') as FormControl;
    if(filterBy.value === 'category'){
      this.categoryName = filterString.value;
      this.brandName = '';
    }else if(filterBy.value === 'brand'){
      this.brandName = filterString.value;
      this.categoryName = '';
    }else{
      this.categoryName = '';
      this.brandName = '';
    }
    this.getCartItems();
  }

  getCategoriesNames(categories: CategoryResponse[]): string{
    return categories.map((category) => category.name).join(', ');
  }

  getNextSupplyDate(supplyDate: string): string{
    const date = new Date(supplyDate);

    if(isNaN(date.getTime())) return 'Sin proxima fecha de entega';

    return new Intl.DateTimeFormat('es-ES').format(date);
  }
}
