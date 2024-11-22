import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { faAnglesLeft, faAnglesRight, faArrowDownAZ, faArrowUpAZ } from '@fortawesome/free-solid-svg-icons';
import { NotificationService } from '../../services/notification/notification.service';
import { CategoryResponse } from 'src/app/shared/interfaces/category.interface';
import { ItemResponse } from 'src/app/shared/interfaces/item.interface';
import { Pagination } from 'src/app/shared/interfaces/paginated.interface';
import { ItemsService } from '../../services/items/items.service';
import { NotificationType, TextType } from '../../shared/constants/enums';
import { ERROR_MESSAGES_BY_CODE, GENERIC_ERROR_MESSAGE } from '../../shared/constants/item-constants';
import { Roles } from '../../shared/roles';
import { CartService } from '../../services/cart/cart.service';
import { CartRequest } from 'src/app/shared/interfaces/cart.interface';
import { HttpStatusCode } from '@angular/common/http';
import { CART_RESPONSE_MESSAGES } from '../../shared/constants/cart-constants';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  Roles = Roles;
  TextType = TextType;
  isModalOpen: boolean = false;
  isEditModalOpen: boolean = false;
  faArrowDownAZ = faArrowDownAZ;
  faArrowUpAZ = faArrowUpAZ;
  faAnglesLeft = faAnglesLeft;
  faAnglesRight = faAnglesRight;

  public items: Pagination<ItemResponse> = {
    content: [],
    totalElements: 0,
    totalPages: 0,
    pageSize: 0,
    pageNumber: 0,
    last: true,
  };

  size: number = 5;
  page: number = 0;
  isAsc: boolean = true;
  sortParam: string = 'name';
  currentItem: ItemResponse | null = null;

  constructor(
    private readonly itemService: ItemsService,
    private readonly notificationService: NotificationService,
    private readonly formBuilder: FormBuilder,
    private readonly cartService: CartService
  ) { 
  
  }

  ngOnInit(): void {
    this.getItems(this.page, this.size, this.sortParam, this.isAsc);
  }

  getItems(page: number, size: number, sortParam: string, isAsc: boolean){
    this.itemService
    .getItems(page, size, sortParam, isAsc)
      .subscribe({
        next: (result) => {
          this.items = result;
        },
        error: (error) => {
          this.notificationService.show({
            message: ERROR_MESSAGES_BY_CODE[error.status] || GENERIC_ERROR_MESSAGE,
            type: NotificationType.ERROR
          });
        }
      });
  }

  addItemToCart(cartRequest: CartRequest){

    console.log("cartRequest",cartRequest);

    this.cartService
      .addItemToCart(cartRequest)
      .subscribe({
        next: (response) => {

          if(response.status !== HttpStatusCode.Created){
            this.notificationService.show({
              message: CART_RESPONSE_MESSAGES.UNEXPECTED_RESPONSE,
              type: NotificationType.ERROR
            });
          }

          this.notificationService.show({
            message: CART_RESPONSE_MESSAGES.ITEM_ADDED,
            type: NotificationType.SUCCESS
          });
        },
        error: (error) => {
          console.log("error",error);
          this.notificationService.show({
            message: error.error.message || GENERIC_ERROR_MESSAGE,
            type: NotificationType.ERROR
          });
        }
      })

  }

  parsePrice(price: number): string{
    const formattedNumber = price.toLocaleString('es-CO', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })
    return `$${formattedNumber}`;
  }

  getCategoriesNames(categories: CategoryResponse[]): string[]{
    return categories.map((category) => category.name);
  }

  changeSize(event: Event){
    const select = event.target as HTMLSelectElement;
    console.log("new size",select.value);
    this.size = parseInt(select.value);
    this.getItems(this.page, this.size, this.sortParam, this.isAsc);
  }

  changeSortParam(event: Event){
    const select = event.target as HTMLSelectElement;
    console.log("new sort param",select.value);
    this.sortParam = select.value;
    this.getItems(this.page, this.size, this.sortParam, this.isAsc);
  }

  changeAsc(){
    this.isAsc = !this.isAsc;
    this.getItems(this.page, this.size, this.sortParam, this.isAsc);
  }

  previousPage(){
    if(this.page === 0) return;
    this.page -= 1;
    this.getItems(this.page, this.size, this.sortParam, this.isAsc);
  }

  nextPage(){
    if(this.items.last) return;
    this.page += 1;
    this.getItems(this.page, this.size, this.sortParam, this.isAsc);
  }

}
