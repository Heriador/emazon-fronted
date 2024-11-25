import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiSelectFieldComponent } from './multi-select-field.component';

describe('MultiSelectFieldComponent', () => {
  let component: MultiSelectFieldComponent<any>;
  let fixture: ComponentFixture<MultiSelectFieldComponent<any>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultiSelectFieldComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MultiSelectFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should make dropdown invisible on document click', () => {
    component.isDropdownVisible = true;
    component.onDocumentClick(new MouseEvent('click'));

    expect(component.isDropdownVisible).toBe(false);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should register onChange function', () => {
    const fn = () => {};
    component.registerOnChange(fn);
    expect(component.onChange).toBe(fn);
  });

  it('should register onTouched function', () => {
    const fn = () => {};
    component.registerOnTouched(fn);
    expect(component.onTouched).toBe(fn);
  });


  it('should filter items', () => {
    let inputElement = fixture.nativeElement.querySelector('[data-test=input]') ;
    const testValue = 'New Value';

    component.items = [{ selected: false, data: {id: 1 , name: 'Test Item', description: 'Test Description' }}];

    inputElement.value = testValue;
    inputElement.dispatchEvent(new Event('input'));

    expect(component.filteredItems).toEqual([]);
  });

  it('should toggle item', () => {
    const event = new MouseEvent('click');
    const item = {
      selected: false,
      data: {id: 1 , name: 'Test Item', description: 'Test Description' }
    };

    component.items = [item];
    component.selectedItems = [];
    component.toggleItem(item, event);

    expect(component.selectedItems).toEqual([item]);
  });

  it('should not toggle item if max selection is reached', () => {
    const event = new MouseEvent('click');
    const item = {
      selected: false,
      data: {id: 1 , name: 'Test Item', description: 'Test Description' }
    };

    const item2 = {
      selected: true,
      data: {id: 2 , name: 'Test Item 2', description: 'Test Description 2' }
    }

    component.items = [item];
    component.selectedItems = [item2]
    component.maxSelection = 1;
    component.toggleItem(item, event);

    expect(component.selectedItems).toEqual([item2]);
    expect(item.selected).toBe(false);
  });

  it('should remove item', () => {
    const event = new MouseEvent('click');
    const item = {
      selected: true,
      data: {id: 1 , name: 'Test Item', description: 'Test Description' }
    };

    const item2 = {
      selected: true,
      data: {id: 2 , name: 'Test Item 2', description: 'Test Description 2' }
    }

    component.items = [item, ];
    component.selectedItems = [item, item2];
    component.removeItem(item, event);

    expect(component.selectedItems).toEqual([item2]);
  });

  it('should show dropdown', () => {
    component.filteredItems = [];
    component.showDropdown();

    expect(component.filteredItems).toEqual(component.items);
    expect(component.isDropdownVisible).toBe(true);
  });
});
