import { Component, ElementRef, EventEmitter, HostListener, inject, Input, OnInit, Output } from '@angular/core';
import { BrandResponse } from 'src/app/interfaces/brand.interface';
import { CategoryResponse } from 'src/app/interfaces/category.interface';
import { TextType } from 'src/app/shared/constants/enums';

export interface SelectItem<T> { 
  selected: boolean;
  data: T;
}

@Component({
  selector: 'app-multi-select-field',
  templateUrl: './multi-select-field.component.html',
  styleUrls: ['./multi-select-field.component.scss']
})
export class MultiSelectFieldComponent<T> implements OnInit {

  TextType = TextType;

  @Input() label: string = '';
  @Input() id: string = '';
  @Input() errorMessage: string = '';
  @Input() items: SelectItem<CategoryResponse | BrandResponse>[] = [];
  @Input() maxSelection: number = 3;
  @Output() selectionChange = new EventEmitter<SelectItem<CategoryResponse | BrandResponse>[]>();

  private elementRef = inject(ElementRef);
  isDropdownVisible = false;
  selectedItems: SelectItem<CategoryResponse | BrandResponse>[] = [];
  filteredItems: SelectItem<CategoryResponse | BrandResponse>[] = this.items;

  constructor() { }

  ngOnInit(): void {
    this.filteredItems = this.items;
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
    this.selectionChange.emit(this.selectedItems);
  }

  removeItem(item: SelectItem<CategoryResponse | BrandResponse>, event: MouseEvent) {
    event.stopPropagation();
    item.selected = false;
    this.selectedItems = this.selectedItems.filter(selectedItem => selectedItem !== item);
    this.selectionChange.emit(this.selectedItems);
  }

  showDropdown() {
    this.filteredItems = this.items;
    this.isDropdownVisible = true;
  }


}
