import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalComponent } from './modal.component';
import { By } from '@angular/platform-browser';

describe('ModalComponent', () => {
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the modal when isVisible is true', () => {
    component.isVisible = true;
    fixture.detectChanges();
    const modalElement = fixture.debugElement.query(By.css('.modal'));
    expect(modalElement).toBeTruthy();
  });

  it('should hide the modal when isVisible is false', () => {
    component.isVisible = true;
    component.closeModal();
    expect(component.isVisible).toBeFalsy();
  });

  it('should emit close event when close button is clicked', () => {
    jest.spyOn(component.close, 'emit');
    component.isVisible = true;
    fixture.detectChanges();
    const closeButton = fixture.debugElement.query(By.css('.close'));
    closeButton.triggerEventHandler('click', null);
    expect(component.close.emit).toHaveBeenCalled();
  });
});
