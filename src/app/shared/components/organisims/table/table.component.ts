import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TextType } from '../../../../shared/constants/enums';
import { faArrowDownAZ, faArrowUpAZ, faAnglesLeft, faAnglesRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  TextType = TextType;
  faArrowDownAZ = faArrowDownAZ;
  faArrowUpAZ = faArrowUpAZ;
  faAnglesLeft = faAnglesLeft;
  faAnglesRight = faAnglesRight;

  @Input() HeadArray: any[] = [];
  @Input() BodyArray: any[] = [];
  @Input() totalElements: number = 0;
  @Input() totalPages: number = 1;
  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();
  @Output() sizeChange: EventEmitter<number> = new EventEmitter<number>();
  @Output() isAscChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  page: number = 0;
  size: number = 5;
  isAsc: boolean = true;
  

  constructor() { }

  ngOnInit(): void {
  }

  changeAsc(){
    this.isAsc = !this.isAsc;
    this.isAscChange.emit(this.isAsc);
  }

  nextPage(){
    if((this.page+1) === this.totalPages ) return;
    this.page +=1;
    this.pageChange.emit(this.page);
  }

  previousPage(){
    if(this.page === 0) return;
    this.page -=1;
    this.pageChange.emit(this.page);
  }

  changeSize(event: Event){
    const selectElement = event.target as HTMLSelectElement;
    const size = parseInt(selectElement.value);
    this.size = size;
    this.sizeChange.emit(size);
  }

}
