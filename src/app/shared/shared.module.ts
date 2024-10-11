import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../components/atoms/button/button.component';
import { IconComponent } from '../components/atoms/icon/icon.component';
import { InputComponent } from '../components/atoms/input/input.component';
import { TextComponent } from '../components/atoms/text/text.component';
import { TextAreaComponent } from '../components/atoms/text-area/text-area.component';
import { CheckboxFieldComponent } from '../components/molecules/checkbox-field/checkbox-field.component';
import { InputFieldComponent } from '../components/molecules/input-field/input-field.component';
import { NavLinkComponent } from '../components/atoms/nav-link/nav-link.component';
import { NavComponent } from '../components/organisms/nav/nav.component';
import { HeaderComponent } from '../components/organisms/header/header.component';
import { DividerComponent } from '../components/atoms/divider/divider.component';
import { ModalComponent } from '../components/organisms/modal/modal.component';
import { TextareaFieldComponent } from '../components/molecules/textarea-field/textarea-field.component';
import { NotificationComponent } from '../components/molecules/notification/notification.component';


let components = [
  DividerComponent,
  ButtonComponent,
  IconComponent,
  InputComponent,
  TextComponent,
  TextAreaComponent,
  CheckboxFieldComponent,
  InputFieldComponent,
  TextareaFieldComponent,
  NavLinkComponent,
  NavComponent,
  HeaderComponent,
  ModalComponent,
  NotificationComponent
]


@NgModule({
  declarations: components,
  imports: [
    CommonModule
  ],
  exports: components
})
export class SharedModule { }
