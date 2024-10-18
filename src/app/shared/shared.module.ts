import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './components/atoms/button/button.component';
import { InputComponent } from './components/atoms/input/input.component';
import { TextComponent } from './components/atoms/text/text.component';
import { TextAreaComponent } from './components/atoms/text-area/text-area.component';
import { CheckboxFieldComponent } from './components/molecules/checkbox-field/checkbox-field.component';
import { InputFieldComponent } from './components/molecules/input-field/input-field.component';
import { NavLinkComponent } from './components/atoms/nav-link/nav-link.component';
import { NavComponent } from './components/organisims/nav/nav.component';
import { HeaderComponent } from './components/organisims/header/header.component';
import { DividerComponent } from './components/atoms/divider/divider.component';
import { ModalComponent } from './components/organisims/modal/modal.component';
import { TextareaFieldComponent } from './components/molecules/textarea-field/textarea-field.component';
import { TableComponent } from './components/organisims/table/table.component';
import { TableCellComponent } from './components/atoms/table-cell/table-cell.component';
import { TableHeadComponent } from './components/atoms/table-head/table-head.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SelectFieldComponent } from './components/molecules/select-field/select-field.component';
import { SelectComponent } from './components/atoms/select/select.component';
import { MultiSelectFieldComponent } from './components/molecules/multi-select-field/multi-select-field.component';


let components = [
  DividerComponent,
  ButtonComponent,
  InputComponent,
  TextComponent,
  TextAreaComponent,
  SelectComponent,
  CheckboxFieldComponent,
  InputFieldComponent,
  TextareaFieldComponent,
  SelectFieldComponent,
  MultiSelectFieldComponent,
  NavLinkComponent,
  NavComponent,
  HeaderComponent,
  ModalComponent,
  TableCellComponent,
  TableHeadComponent,
  TableComponent
]


@NgModule({
  declarations: components,
  imports: [
    CommonModule,
    FontAwesomeModule
  ],
  exports: components
})
export class SharedModule { }
