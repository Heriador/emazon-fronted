import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectFieldComponent } from './select-field.component';

describe('SelectFieldComponent', () => {
  let component: SelectFieldComponent;
  let fixture: ComponentFixture<SelectFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectFieldComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should write value', () => {
    component.writeValue('Test Value');
    expect(component.selected).toBe('Test Value');
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

  it('should set disabled state', () => {
    component.setDisabledState(true);
    expect(component.disabled).toBe(true);
  });


  it('should select item', () => {
    const select = fixture.nativeElement.querySelector('[data-test=select]') as HTMLSelectElement;
    select.value = '1';
    select.dispatchEvent(new Event('change'));

    expect(component.selected).toBe('1');
  });
});
