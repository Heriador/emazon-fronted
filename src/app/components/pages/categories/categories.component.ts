import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/modules/dashboard/services/category.service';
import { TextType } from '../../util/enums';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  TextType = TextType;
  isModalOpen: boolean = false;
  categoryNameErrorMessage: string = 'error';
  categoryDescriptionErrorMessage: string = 'error';
  public categoryForm: FormGroup;



  constructor(
    public categoryService: CategoryService,
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
    

  }

  

  getErrorMessage(control: AbstractControl | null, fieldName: string) {
    if(control?.touched && control?.errors){
      if(control?.hasError('required')){
        return `${fieldName} es requerido`;
      }
      if(control?.hasError('minlength')){
        return `${fieldName} must be at least ${control.errors['minlength'].requiredLength} characters`;
      }
      if(control?.hasError('maxlength')){
        return `${fieldName} must be at most ${control.errors['maxlength'].requiredLength} characters`;
      }

      return ''
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
    return this.getErrorMessage(this.categoryName, 'name');
  }

  get categoryDescriptionError(){
    return this.getErrorMessage(this.categoryDescription, 'description');
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
            response.status === 201
              ? 'Category created successfully'
              : 'An error occurred while creating the category';
          if (response.status === 201) {
            this.categoryForm.reset({
              name: '',
              description: ''
            })
          }
        },
        error: (error) => {
          console.error(error.message);
        },
      })

  }

}
