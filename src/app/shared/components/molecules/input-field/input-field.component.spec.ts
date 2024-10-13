import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { InputFieldComponent } from './input-field.component';
import { By } from '@angular/platform-browser';

describe('InputFieldComponent', () => {
  let component: InputFieldComponent;
  let fixture: ComponentFixture<InputFieldComponent>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputFieldComponent ],
      imports: [ FormsModule ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should write value', () => {
    component.writeValue('Test Value');
    expect(component.value).toBe('Test Value');
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

  it('should update value and call onChange and onTouched on input event', () => {
    const inputElement = compiled.querySelector('[data-test=input]') as HTMLInputElement;
    const testValue = 'New Value';

    jest.spyOn(component, 'onChange');
    jest.spyOn(component, 'onTouched');

    inputElement.value = testValue;
    inputElement.dispatchEvent(new Event('input'));

    expect(component.value).toBe(testValue);
    expect(component.onChange).toHaveBeenCalledWith(testValue);
    expect(component.onTouched).toHaveBeenCalled();

  });

  
  
});
