import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { Roles } from './roles';

@Directive({
  selector: '[appRole]'
})
export class RolesDirective {

  private readonly currentRole: Roles | null = null;

  constructor(
    private readonly templateRef: TemplateRef<any>,
    private readonly viewContainerRef: ViewContainerRef,
    private readonly authService: AuthService
  ) {

    this.currentRole = this.authService.getUserRole();
  }

  @Input() set appRole(role: Roles){
    console.log(role,this.currentRole);
    console.log(role === this.currentRole);
    if(this.currentRole === role){
      this.viewContainerRef.createEmbeddedView(this.templateRef);
    }else{
      this.viewContainerRef.clear();
    }
  }

}
