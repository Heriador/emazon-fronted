import { Component, ElementRef, HostListener, inject, Input, OnInit } from '@angular/core';
import { BrandResponse } from 'src/app/shared/interfaces/brand.interface';
import { CategoryResponse } from 'src/app/shared/interfaces/category.interface';
import { TextType } from '../../../../shared/constants/enums';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export interface SelectItem<T> { 
  selected: boolean;
  data: T;
}

@Component({
  selector: 'app-multi-select-field',
  templateUrl: './multi-select-field.component.html',
  styleUrls: ['./multi-select-field.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: MultiSelectFieldComponent,
      multi: true
    }
  ]
})
export class MultiSelectFieldComponent<T> implements OnInit, ControlValueAccessor {

  TextType = TextType;

  @Input() label: string = '';
  @Input() id: string = '';
  @Input() errorMessage: string = '';
  @Input() items: SelectItem<CategoryResponse | BrandResponse>[] = [];
  @Input() maxSelection: number = 3;

  private readonly elementRef = inject(ElementRef);
  isDropdownVisible = false;
  selectedItems: SelectItem<CategoryResponse | BrandResponse>[] = [];
  filteredItems: SelectItem<CategoryResponse | BrandResponse>[] = this.items;

  onChange: any = (value: any) => {};
  onTouched: any = () => {};

  constructor() { }

  ngOnInit(): void {
    this.filteredItems = this.items;
  }

  writeValue(value: SelectItem<CategoryResponse | BrandResponse>[]): void {
    this.selectedItems = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isDropdownVisible = false;
    }
  }

  filterItems(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.filteredItems = this.items.filter(item => item.data.name.toLowerCase().includes(value.toLowerCase()));
  }

  toggleItem(item: SelectItem<CategoryResponse | BrandResponse>, event: MouseEvent) {
    event.stopPropagation();
    if (this.selectedItems.length === this.maxSelection && !item.selected) {
      return;
    }
    item.selected = !item.selected;
    this.selectedItems = this.items.filter(item => item.selected);
    this.onChange(this.selectedItems.map(item => item.data.id));
    this.onTouched();
  }

  removeItem(item: SelectItem<CategoryResponse | BrandResponse>, event: MouseEvent) {
    event.stopPropagation();
    item.selected = false;
    this.selectedItems = this.selectedItems.filter(selectedItem => selectedItem !== item);
    this.onChange(this.selectedItems.map(item => item.data.id));
  }

  showDropdown() {
    this.filteredItems = this.items;
    this.isDropdownVisible = true;
  }


}
