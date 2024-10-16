import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ERROR_MESSAGES } from 'src/app/shared/constants/category-constant';
import { TextType } from 'src/app/shared/constants/enums';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {

  TextType = TextType;
  isModalOpen: boolean = false;
  public itemForm: FormGroup;

  constructor(
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
        '',[
          Validators.required,
          Validators.min(1)
        ]
      ],
      stock: [
        '',[
          Validators.required,
          Validators.min(1)
        ]
      ],
      brand: [
        '',[
          Validators.required
        ]
      ],
      categories: [
        '',[
          Validators.required
        ]
      ]
    })
  }

  ngOnInit(): void {
  }

  createItem(){

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
    return this.itemForm.get('name');
  }

  get itemDescription(){
    return this.itemForm.get('description');
  }

  get itemPrice(){
    return this.itemForm.get('price');
  }

  get itemStock(){
    return this.itemForm.get('stock');
  }

  get itemBrand(){
    return this.itemForm.get('brand');
  }

  get itemCategories(){
    return this.itemForm.get('categories');
  }

  get itemNameErrorMessage(){
    return this.getErrorMessage(this.itemName, 'Name');
  }

  get itemDescriptionErrorMessage(){
    return this.getErrorMessage(this.itemDescription, 'Description');
  }

  get itemPriceErrorMessage(){
    return this.getErrorMessage(this.itemPrice, 'Price');
  }

  get itemStockErrorMessage(){
    return this.getErrorMessage(this.itemStock, 'Stock');
  }

  get itemBrandErrorMessage(){
    return this.getErrorMessage(this.itemBrand, 'Brand');
  }

  get itemCategoriesErrorMessage(){
    return this.getErrorMessage(this.itemCategories, 'Categories');
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
      categories: ''
    });
    this.itemForm.markAsPristine();
    this.itemForm.markAsUntouched();
  }

}
