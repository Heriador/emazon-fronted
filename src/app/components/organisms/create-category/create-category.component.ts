import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TextType } from '../../util/enums';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Category } from 'src/app/modules/dashboard/interfaces/category.interface';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.scss']
})
export class CreateCategoryComponent implements OnInit {

  TextType = TextType;

  public categoryForm: FormGroup;

  @Input() isModalOpen: boolean = false;
  @Output() close = new EventEmitter<void>();
  @Output() formSubmit = new EventEmitter<Category>();



  

  constructor(
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

  closeModal() {
    this.isModalOpen = false;
    this.close.emit();
  }

  
  onSubmit() {
    console.log('submitting')
    if (this.categoryForm.valid) {
      this.formSubmit.emit(this.categoryForm.value);
    }
  }

}
