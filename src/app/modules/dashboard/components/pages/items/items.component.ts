import { HttpStatusCode } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from 'src/app/core/services/notification/notification.service';
import { BrandResponse } from 'src/app/interfaces/brand.interface';
import { CategoryResponse } from 'src/app/interfaces/category.interface';
import { BrandService } from 'src/app/services/brand/brand.service';
import { CategoryService } from 'src/app/services/categories/category.service';
import { ItemsService } from 'src/app/services/items/items.service';
import { SelectItem } from 'src/app/shared/components/molecules/multi-select-field/multi-select-field.component';
import { ERROR_MESSAGES } from 'src/app/shared/constants/category-constant';
import { NotificationType, TextType } from 'src/app/shared/constants/enums';
import { ERROR_MESSAGES_BY_CODE, FIELD_NAMES, GENERIC_ERROR_MESSAGE, RESPONSE_MESSAGE } from 'src/app/shared/constants/item-constants';
import { arrayMinLengthValidator } from 'src/app/shared/utils/custom-validators';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {

  TextType = TextType;
  isModalOpen: boolean = false;
  public itemForm: FormGroup;
  public brands: BrandResponse[] = [];
  public categories: SelectItem<CategoryResponse>[] = [];

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
      brand: [
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
    })
  }

  ngOnInit(): void {
    this.getBrands();
    this.getCategories();
  }

  createItem(){
    if(this.itemForm.invalid){
      this.itemForm.markAllAsTouched();
      return;
    }

    this.itemService
      .createItem({
        ...this.itemForm.value,
        brandId: this.itemForm.get(FIELD_NAMES.ITEM_BRAND[0])?.value
      })
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

          this.itemForm.reset({
            name: '',
            description: '',
            price: '',
            stock: '',
            brand: '',
            categories: []
          });
          this.itemForm.markAsPristine();
          this.itemForm.markAsUntouched();
          this.isModalOpen = false;
        },
        error: (error) => {
          this.notificationService.show({
            message: ERROR_MESSAGES_BY_CODE[error.status] || GENERIC_ERROR_MESSAGE,
            type: NotificationType.ERROR
          });
        }
      })

  }

  getBrands(){
    this.brandService.getBrands(0,100,true)
      .subscribe({
        next: (result) => {
          this.brands = result.content;
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
        }
      });
  }

  onSelectionChange(categories: SelectItem<CategoryResponse>[]){
    this.itemCategories?.markAsTouched();
    this.itemCategories?.setValue(categories.map(category => category.data.id));
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
      brand: '',
      categories: []
    });
    this.itemForm.markAsPristine();
    this.itemForm.markAsUntouched();
  }

}
