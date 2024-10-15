import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../../../services/categories/category.service';
import { NotificationType, TextType } from '../../../../../shared/constants/enums';
import { 
  AbstractControl, 
  FormBuilder, 
  FormGroup, 
  Validators 
} from '@angular/forms';
import { NotificationService } from '../../../../../core/services/notification/notification.service';
import { 
  ERROR_MESSAGES, 
  ERROR_MESSAGES_BY_CODE, 
  FIELD_NAMES, 
  GENERIC_ERROR_MESSAGE, 
  RESPONSE_MESSAGE 
} from '../../../../../shared/constants/category-constant';
import { HttpStatusCode } from '@angular/common/http';
import { CategoryResponse } from 'src/app/interfaces/category.interface';
import { Pagination } from 'src/app/interfaces/paginated.interface';
@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  TextType = TextType;
  isModalOpen: boolean = false;
  headArray = [
    {name: 'Nombre', key: 'name'},
    {name: 'Descripción', key: 'description'}
  ]
  page: number = 0;
  size: number = 5;
  isAsc: boolean = true;
  totalElements: number = 0;
  totalPages: number = 0;
  categories: CategoryResponse[] = [];
  public categoryForm: FormGroup;



  constructor(
    public categoryService: CategoryService,
    private readonly notificationService: NotificationService,
    private readonly formBuilder: FormBuilder

  ) { 
    this.categoryForm = this.formBuilder.group({
      name: [
        '',[
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50)
        ],
      ],
      description: [
        '',[
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(90)
        ],
      ]
    })
  }

  ngOnInit(): void {
    
    this.getCategories(this.page,this.size,this.isAsc);
  }

  getCategories(page: number, size: number, isAsc: boolean){
    this.categoryService.getCategories(page,size,isAsc).subscribe({
      next: (result: Pagination<CategoryResponse>) => {
        this.categories = result.content;
        this.totalElements = result.totalElements;
        this.totalPages = result.totalPages;
      },
      error: (error) => {
        console.error(error.message);
        console.error(error.status);
        const message = ERROR_MESSAGES_BY_CODE[error.status];
        this.notificationService.show(
          {
          message, 
          type: NotificationType.ERROR
      });
      }
    })
  }

  changePage(page: number){
    this.page = page;
    this.getCategories(this.page,this.size,this.isAsc);
  }

  changeSize(size: number){
    this.size = size;
    this.getCategories(this.page,this.size,this.isAsc);
  }

  changeAsc(isAsc: boolean){
    this.isAsc = isAsc;
    this.getCategories(this.page,this.size,this.isAsc);
  }
  

  getErrorMessage(control: AbstractControl | null, fieldName: string) {
    if(control?.touched && control?.errors){

      const firstError = Object.keys(control.errors)[0] as keyof typeof ERROR_MESSAGES;
      const error = control.errors[firstError];
      return ERROR_MESSAGES[firstError](fieldName, error);
    }
    return ''

  }

  get categoryName(){
    return this.categoryForm.get('name');
  }

  get categoryDescription(){
    return this.categoryForm.get('description');
  }

  get categoryNameError(){
    return this.getErrorMessage(this.categoryName, FIELD_NAMES.CATEGORY_NAME);
  }

  get categoryDescriptionError(){
    return this.getErrorMessage(this.categoryDescription, FIELD_NAMES.CATEGORY_DESCRIPTION);
  }

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
    this.categoryForm.reset({
      name: '',
      description: ''
    })
    this.categoryForm.markAsPristine();
    this.categoryForm.markAsUntouched();
  }

  createCategory(){
    console.log(this.categoryForm.value)
    if(this.categoryForm.invalid) {
      this.categoryForm.markAllAsTouched();
      return;
    }

    console.log("calling service")


    this.categoryService
      .createCategory(this.categoryForm.value)
      .subscribe({
        next: (response) => {
          const message =
            response.status === HttpStatusCode.Created
              ? RESPONSE_MESSAGE.CATEGORY_CREATED
              : RESPONSE_MESSAGE.UNEXPECTED_RESPONSE;

          const type = response.status === HttpStatusCode.Created 
            ? NotificationType.SUCCESS 
            : NotificationType.ERROR;

          this.notificationService.show({message, type});

          if (response.status === HttpStatusCode.Created) {
            this.categoryForm.reset({
              name: '',
              description: ''
            })
            this.categoryForm.markAsPristine();
            this.categoryForm.markAsUntouched();
          }
        },
        error: (error) => {
          console.error(error.message);
          const message = ERROR_MESSAGES_BY_CODE[error.status] || GENERIC_ERROR_MESSAGE;
          this.notificationService.show(
            {
            message, 
            type: NotificationType.ERROR
        });
        },
      })

  }

}
