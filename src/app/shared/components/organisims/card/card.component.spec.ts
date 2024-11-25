import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardComponent } from './card.component';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should togleShowMore', () => {
    expect(component.showMore).toBe(false);
    component.togleShowMore();
    expect(component.showMore).toBe(true);
  });

  it('should increaseQuantity', () => {
    component.stock = 10;
    component.quantity = 1;
    component.increaseQuantity();
    expect(component.quantity).toBe(2);
  });

  it('should not increaseQuantity', () => {
    component.stock = 1;
    component.quantity = 1;
    component.increaseQuantity();
    expect(component.quantity).toBe(1);
  });

  it('should decreaseQuantity', () => {
    component.quantity = 2;
    component.decreaseQuantity();
    expect(component.quantity).toBe(1);
  });

  it('should not decreaseQuantity', () => {
    component.quantity = 1;
    component.decreaseQuantity();
    expect(component.quantity).toBe(1);
  });

  it('should addProduct', () => {
    component.id = 1;
    component.quantity = 2;
    
    const emitSpy = jest.spyOn(component.clickedAdd, 'emit');

    component.addProduct();

    expect(emitSpy).toHaveBeenCalledWith({itemId: 1, quantity: 2});
  });

});
