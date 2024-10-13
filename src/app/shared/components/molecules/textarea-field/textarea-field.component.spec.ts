import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextareaFieldComponent } from './textarea-field.component';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('TextareaFieldComponent', () => {
  let component: TextareaFieldComponent;
  let fixture: ComponentFixture<TextareaFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TextareaFieldComponent ],
      imports: [FormsModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TextareaFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
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
    const textareaElement = fixture.nativeElement.querySelector('[data-test=textarea]');
    const testValue = 'New Value';

    jest.spyOn(component, 'onChange');
    jest.spyOn(component, 'onTouched');

    textareaElement.value = testValue;
    textareaElement.dispatchEvent(new Event('input'));

    expect(component.value).toBe(testValue);
    expect(component.onChange).toHaveBeenCalled();
    expect(component.onTouched).toHaveBeenCalled();
  });
  
});
