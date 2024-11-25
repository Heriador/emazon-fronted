import { HttpStatusCode } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faAnglesLeft, faAnglesRight, faArrowDownAZ, faArrowUpAZ } from '@fortawesome/free-solid-svg-icons';
import { NotificationService } from '../../services/notification/notification.service';
import { BrandResponse } from 'src/app/shared/interfaces/brand.interface';
import { CategoryResponse } from 'src/app/shared/interfaces/category.interface';
import { ItemResponse, ItemView } from 'src/app/shared/interfaces/item.interface';
import { Pagination } from 'src/app/shared/interfaces/paginated.interface';
import { BrandService } from '../../services/brand/brand.service';
import { CategoryService } from '../../services/categories/category.service';
import { ItemsService } from '../../services/items/items.service';
import { TransactionService } from '../../services/transactions/transaction.service';
import { SelectItem } from 'src/app/shared/components/molecules/multi-select-field/multi-select-field.component';
import { NotificationType, TextType } from '../../shared/constants/enums';
import { 
  ERROR_MESSAGES, 
  ERROR_MESSAGES_BY_CODE, 
  FIELD_NAMES, 
  GENERIC_ERROR_MESSAGE, 
  RESPONSE_MESSAGE 
} from '../../shared/constants/item-constants';
import {
  ERROR_MESSAGES_BY_CODE as CATEGORY_ERROR_MESSAGES_BY_CODE,
} from '../../shared/constants/category-constant';
import {
  ERROR_MESSAGES_BY_CODE as BRAND_ERROR_MESSAGES_BY_CODE,
} from '../../shared/constants/brand-constant';
import { 
  SUPPLY_ERROR_MESSAGES, 
  SUPPLY_ERROR_MESSAGES_BY_CODE, 
  SUPPLY_FIELD_NAMES, 
  SUPPLY_GENERIC_ERROR_MESSAGE, 
  SUPPLY_RESPONSE_MESSAGE 
} from '../../shared/constants/supply-constants';
import { Roles } from '../../shared/constants/roles';
import { arrayMinLengthValidator } from '../../shared/validators/custom-validators';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {

  Roles = Roles;
  TextType = TextType;
  isModalOpen: boolean = false;
  isEditModalOpen: boolean = false;
  faArrowDownAZ = faArrowDownAZ;
  faArrowUpAZ = faArrowUpAZ;
  faAnglesLeft = faAnglesLeft;
  faAnglesRight = faAnglesRight;

  public supplyForm: FormGroup;
  public itemForm: FormGroup;
  public brands: BrandResponse[] = [];
  public categories: SelectItem<CategoryResponse>[] = [];
  public items: ItemView[] = [];

  totalElements: number = 0;
  totalPages: number = 0;
  size: number = 5;
  page: number = 0;
  isAsc: boolean = true;
  sortParam: string = 'name';
  currentItem: ItemResponse | null = null;
  last: boolean = true;

  public headArray = [
    {label: 'Nombre', value: 'name', sortable: true},
    {label: 'Descripción', value: 'description'},
    {label: 'Precio', value: 'price'},
    {label: 'Suministro', value: 'stock'},
    {label: 'Marca', value: 'brand', sortable: true},
    {label: 'Categorías', value: 'categories', sortable: true},
  ]

  constructor(
    private readonly itemService: ItemsService,
    private readonly brandService: BrandService,
    private readonly categoryService: CategoryService,
    private readonly notificationService: NotificationService,
    private readonly supplyService: TransactionService,
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

    this.supplyForm = this.formBuilder.group({
      quantity: [0,[Validators.required,Validators.min(1)]],
      nextSupplyDate: ['',Validators.required]
    })
   }

  ngOnInit(): void {
   this.getItems(this.page,this.size,this.sortParam,this.isAsc);
    this.getBrands();
    this.getCategories();
  }

  addSupply(){
    if(this.supplyForm.invalid){
      this.supplyForm.markAllAsTouched();
      return;
    }

    this.supplyService
      .addSupplyTransaction({
        ...this.supplyForm.value,
        itemId: this.currentItem?.id as number
      })
      .subscribe({
        next: (response) => {
          if(response.status !== HttpStatusCode.Created){
            return this.notificationService.show({
              message: SUPPLY_RESPONSE_MESSAGE.UNEXPECTED_RESPONSE,
              type: NotificationType.ERROR
            })
          }

          this.notificationService.show({
            message: SUPPLY_RESPONSE_MESSAGE.SUPPLY_CREATED,
            type: NotificationType.SUCCESS
          })
          this.items = this.items.map((item) => {
            if(item.id === this.currentItem?.id){
              item.stock += Number(this.supplyForm.value.quantity);
            }

            return item;
          });
          this.supplyForm.reset({
            quantity: 0,
            nextSupplyDate: ''
          })
          this.closeEditModal();
        },
        error: (error) => {
          console.log("error",error);
          this.notificationService.show({
            message: SUPPLY_ERROR_MESSAGES_BY_CODE[error.status] || SUPPLY_GENERIC_ERROR_MESSAGE,
            type: NotificationType.ERROR
          });
      }
    })

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

          

          const newItem: ItemView = {
            ...this.itemForm.value,
            id: this.items.length + 1,
            brand: this.brands.find((brand) => brand.id === Number(this.itemForm.value.brandId))?.name as string,
            categories: this.categories
              .filter((category) => this.itemForm.value.categories.includes(category.data.id))
              .map((category) => category.data.name)
              .join(', ')
          };
          console.log(newItem)
          this.items.unshift(newItem);
          this.items.pop();

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
          this.items = result.content.map(this.toItemView);
          this.totalElements = result.totalElements;
          this.totalPages = result.totalPages;
          this.last = result.last;
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

  getSupplyErrorMessage(control: AbstractControl | null, fieldName: string): string{
    if(control?.touched && control?.errors){
      const firtError = Object.keys(control.errors)[0] as keyof typeof SUPPLY_ERROR_MESSAGES;
      const error = control.errors[firtError];
      return SUPPLY_ERROR_MESSAGES[firtError](fieldName,error);
    }

    return '';
  }

  get supplyQuantityErrorMessage(){
    return this.getSupplyErrorMessage(this.supplyQuantity, SUPPLY_FIELD_NAMES.SUPPLY_QUANTITY[1]);
  }

  get supplyNextSupplyDateErrorMessage(){
    return this.getSupplyErrorMessage(this.supplyNextSupplyDate, SUPPLY_FIELD_NAMES.SUPPLY_NEXT_SUPPLY_DATE[1]);
  }

  get supplyQuantity(){
    return this.supplyForm.get(SUPPLY_FIELD_NAMES.SUPPLY_QUANTITY[0]);
  }

  get supplyNextSupplyDate(){
    return this.supplyForm.get(SUPPLY_FIELD_NAMES.SUPPLY_NEXT_SUPPLY_DATE[0]);
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

  changePage(page: number){
    this.page = page;
    this.getItems(this.page,this.size,this.sortParam,this.isAsc);
  }

  changeSize(size: number){
    this.size = size;
    this.getItems(this.page,this.size,this.sortParam,this.isAsc);
  }

  changeAsc(isAsc: boolean){
    this.isAsc = isAsc;
    this.getItems(this.page,this.size,this.sortParam,this.isAsc);
  }

  changeSortParam(sortParam: string){
    this.sortParam = sortParam;
    this.getItems(this.page,this.size,this.sortParam,this.isAsc);
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

  openEditModal(item: ItemResponse){
    this.currentItem = item;
    this.isEditModalOpen = true;
  }

  closeEditModal(){
    this.isEditModalOpen = false;
    this.currentItem = null;
  }

  private toItemView(item: ItemResponse): ItemView{
    return {
      id: item.id,
      name: item.name,
      description: item.description,
      price: item.price,
      stock: item.stock,
      brand: item.brand.name,
      categories: item.categories.map((category) => category.name).join(', ')
    }
  }

}
