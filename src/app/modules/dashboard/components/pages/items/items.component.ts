import { HttpStatusCode } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { 
  AbstractControl, 
  FormBuilder, 
  FormGroup, 
  Validators 
} from '@angular/forms';
import { NotificationService } from '../../../../../core/services/notification/notification.service';
import { BrandResponse } from '../../../../../interfaces/brand.interface';
import { CategoryResponse } from '../../../../../interfaces/category.interface';
import { BrandService } from '../../../../../services/brand/brand.service';
import { CategoryService } from '../../../../../services/categories/category.service';
import { ItemsService } from '../../../../../services/items/items.service';
import { SelectItem } from '../../../../../shared/components/molecules/multi-select-field/multi-select-field.component';
import { NotificationType, TextType } from '../../../../../shared/constants/enums';
import { 
  ERROR_MESSAGES_BY_CODE, 
  ERROR_MESSAGES,
  FIELD_NAMES, 
  GENERIC_ERROR_MESSAGE, 
  RESPONSE_MESSAGE 
} from '../../../../../shared/constants/item-constants';
import {
  ERROR_MESSAGES_BY_CODE as CATEGORY_ERROR_MESSAGES_BY_CODE,
} from '../../../../../shared/constants/category-constant';
import {
  ERROR_MESSAGES_BY_CODE as BRAND_ERROR_MESSAGES_BY_CODE,
} from '../../../../../shared/constants/brand-constant';
import { arrayMinLengthValidator } from '../../../../../shared/utils/custom-validators';
import { Pagination } from 'src/app/interfaces/paginated.interface';
import { ItemResponse } from 'src/app/interfaces/item.interface';
import { faArrowDownAZ, faArrowUpAZ, faAnglesLeft, faAnglesRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {

  TextType = TextType;
  isModalOpen: boolean = false;
  faArrowDownAZ = faArrowDownAZ;
  faArrowUpAZ = faArrowUpAZ;
  faAnglesLeft = faAnglesLeft;
  faAnglesRight = faAnglesRight;

  public itemForm: FormGroup;
  public brands: BrandResponse[] = [];
  public categories: SelectItem<CategoryResponse>[] = [];
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

  constructor(
    private readonly itemService: ItemsService,
    private readonly brandService: BrandService,
    private readonly categoryService: CategoryService,
    private readonly notificationService: NotificationService,
    private readonly formBuilder: FormBuilder
  ) { 
    this.itemForm = this.formBuilder.group({
      name:[
        '',[
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50)
        ]
      ],
      description: [
        '',[
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(120)
        ]
      ],
      price: [
        0.0,[
          Validators.required,
          Validators.min(1.0)
        ]
      ],
      stock: [
        0,[
          Validators.required,
          Validators.min(1)
        ]
      ],
      brandId: [
        '',[
          Validators.required,
          Validators.min(1)
        ]
      ],
      categories: [
        [],[
          Validators.required,
          arrayMinLengthValidator(1),
        ]
      ]
    });
  }

  ngOnInit(): void {
    this.getItems(this.page, this.size, this.sortParam, this.isAsc);
    this.getBrands();
    this.getCategories();
  }

  createItem(){
    if(this.itemForm.invalid){
      this.itemForm.markAllAsTouched();
      return;
    }

    this.itemService
      .createItem(this.itemForm.value)
      .subscribe({
        next: (response) => {
          if(response.status !== HttpStatusCode.Created){
            return this.notificationService.show({
              message: RESPONSE_MESSAGE.UNEXPECTED_RESPONSE,
              type: NotificationType.ERROR
            })
          }

          this.notificationService.show({
            message: RESPONSE_MESSAGE.ITEM_CREATED,
            type: NotificationType.SUCCESS
          })
          // const newItem: ItemResponse = {
          //   ...this.itemForm.value,
          //   id: null
          // };
          // this.items.content.unshift(newItem);
          // this.items.content.pop();

          this.closeModal();
        },
        error: (error) => {
          this.notificationService.show({
            message: ERROR_MESSAGES_BY_CODE[error.status] || GENERIC_ERROR_MESSAGE,
            type: NotificationType.ERROR
          });
        }
      })

  }

  getItems(page: number, size: number, sortParam: string, isAsc: boolean){
    this.itemService
    .getItems(page, size, sortParam, isAsc)
      .subscribe({
        next: (result) => {
          console.log("items",result);
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

  getBrands(){
    this.brandService.getBrands(0,100,true)
      .subscribe({
        next: (result) => {
          this.brands = result.content;
        },
        error: (error) => {
          this.notificationService.show({
            message: BRAND_ERROR_MESSAGES_BY_CODE[error.status] || GENERIC_ERROR_MESSAGE,
            type: NotificationType.ERROR
          });
        }
      });
  }

  getCategories(){
    this.categoryService.getCategories(0,100,true)
      .subscribe({
        next: (result) => {
          this.categories = result.content.map((category) => ({
            data: category,
            selected: false
          }));
        },
        error: (error) => {
          this.notificationService.show({
            message: CATEGORY_ERROR_MESSAGES_BY_CODE[error.status] || GENERIC_ERROR_MESSAGE,
            type: NotificationType.ERROR
          });
        }
      });
  }

  getErrorMessage(control: AbstractControl | null, fieldName: string): string{

    if(control?.touched && control?.errors){
      const firtError = Object.keys(control.errors)[0] as keyof typeof ERROR_MESSAGES;
      const error = control.errors[firtError];
      return ERROR_MESSAGES[firtError](fieldName,error);
    }

    return '';
  }

  get itemName(){
    return this.itemForm.get(FIELD_NAMES.ITEM_NAME[0]);
  }

  get itemDescription(){
    return this.itemForm.get(FIELD_NAMES.ITEM_DESCRIPTION[0]);
  }

  get itemPrice(){
    return this.itemForm.get(FIELD_NAMES.ITEM_PRICE[0]);
  }

  get itemStock(){
    return this.itemForm.get(FIELD_NAMES.ITEM_STOCK[0]);
  }

  get itemBrand(){
    return this.itemForm.get(FIELD_NAMES.ITEM_BRAND[0]);
  }

  get itemCategories(){
    return this.itemForm.get(FIELD_NAMES.ITEM_CATEGORIES[0]);
  }

  get itemNameErrorMessage(){
    return this.getErrorMessage(this.itemName, FIELD_NAMES.ITEM_NAME[1]);
  }

  get itemDescriptionErrorMessage(){
    return this.getErrorMessage(this.itemDescription, FIELD_NAMES.ITEM_DESCRIPTION[1]);
  }

  get itemPriceErrorMessage(){
    return this.getErrorMessage(this.itemPrice, FIELD_NAMES.ITEM_PRICE[1]);
  }

  get itemStockErrorMessage(){
    return this.getErrorMessage(this.itemStock, FIELD_NAMES.ITEM_STOCK[1]);
  }

  get itemBrandErrorMessage(){
    return this.getErrorMessage(this.itemBrand, FIELD_NAMES.ITEM_BRAND[1]);
  }

  get itemCategoriesErrorMessage(){
    return this.getErrorMessage(this.itemCategories, FIELD_NAMES.ITEM_CATEGORIES[1]);
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
  

  openModal(){
    this.isModalOpen = true;
  }

  closeModal(){
    this.isModalOpen = false;
    this.itemForm.reset({
      name: '',
      description: '',
      price: '',
      stock: '',
      brandId: null,
      categories: []
    });
    this.itemForm.markAsPristine();
    this.itemForm.markAsUntouched();
  }

}
