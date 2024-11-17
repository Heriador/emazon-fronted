import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableComponent } from './table.component';

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should change isAsc value and emit value', () => {

    jest.spyOn(component.isAscChange, 'emit');

    expect(component.isAsc).toBe(true);
    component.changeAsc();
    expect(component.isAsc).toBe(false);
    expect(component.isAscChange.emit).toHaveBeenCalledWith(component.isAsc);
  })

  it('should change to next page and emit value', () => {
    jest.spyOn(component.pageChange, 'emit');
    component.totalPages = 2;
    expect(component.page).toBe(0);
    component.nextPage();
    expect(component.page).toBe(1);
    expect(component.pageChange.emit).toHaveBeenCalledWith(component.page);
  })

  it('should not change page if page is last', () => {
    jest.spyOn(component.pageChange, 'emit');
    component.totalPages = 2;
    component.page = 1;
    component.nextPage();
    expect(component.page).toBe(1);
    expect(component.pageChange.emit).not.toHaveBeenCalled();
  });

  it('should change to previous page and emit value', () => {
    jest.spyOn(component.pageChange, 'emit');
    component.totalPages = 2;
    component.page = 1;
    component.previousPage();
    expect(component.page).toBe(0);
    expect(component.pageChange.emit).toHaveBeenCalledWith(component.page);
  });

  it('should not change page if page is first', () => {
    jest.spyOn(component.pageChange, 'emit');
    component.totalPages = 2;
    component.page = 0;
    component.previousPage();
    expect(component.page).toBe(0);
    expect(component.pageChange.emit).not.toHaveBeenCalled();
  });

  it('should change size and emit value', () => {
    const selectElement = document.querySelector('#itemsPerPage') as HTMLSelectElement;
    selectElement.value = '10';

    const event: Event = new Event('change');
    Object.defineProperty(event, 'target', { value: selectElement, writable: false });

    jest.spyOn(component.sizeChange, 'emit');

    component.changeSize(event);

    expect(component.size).toBe(10);
    expect(component.sizeChange.emit).toHaveBeenCalledWith(component.size);

  });

  it('should change sort param and emit value', () => {
    const selectElement = document.querySelector('#orderBy') as HTMLSelectElement;
    selectElement.value = 'name';

    const event: Event = new Event('change');
    Object.defineProperty(event, 'target', { value: selectElement, writable: false });

    jest.spyOn(component.sortParamChange, 'emit');

    component.changeSortParam(event);

    expect(component.sortParamChange.emit).toHaveBeenCalledWith('name');
  });

  it('should do action on click and emit value', () => {
    jest.spyOn(component.actionOnClick, 'emit');
    const data = { id: 1, name: 'test' };
    component.doActionOnClick(data);
    expect(component.actionOnClick.emit).toHaveBeenCalledWith(data);
  });

  it('should return sort options', () => {
    component.HeadArray = [
      { name: 'name', sortable: true },
      { name: 'price', sortable: false }
    ];
    expect(component.sortOptions).toEqual([{ name: 'name', sortable: true }]);
  });

});
