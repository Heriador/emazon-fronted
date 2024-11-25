import { TemplateRef, ViewContainerRef } from '@angular/core';
import { RolesDirective } from './roles.directive';
import { AuthService } from '../../services/auth/auth.service';
import { Roles } from '../constants/roles';

describe('RolesDirective', () => {
  let directive: RolesDirective;
  let templateRef: TemplateRef<any>;
  let viewContainerRef: ViewContainerRef;
  let authService: AuthService;

  beforeEach(() => {
    templateRef = {} as TemplateRef<any>;
    viewContainerRef = {
      createEmbeddedView: jest.fn(),
      clear: jest.fn()
    } as unknown as ViewContainerRef;
    authService = {
      getUserRole: jest.fn()
    } as unknown as AuthService;

    directive = new RolesDirective(templateRef, viewContainerRef, authService);
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('should display the template if the role matches', () => {
    (authService.getUserRole as jest.Mock).mockReturnValue(Roles.ADMIN);
    directive = new RolesDirective(templateRef, viewContainerRef, authService);

    directive.appRole = Roles.ADMIN;

    expect(viewContainerRef.createEmbeddedView).toHaveBeenCalledWith(templateRef);
    expect(viewContainerRef.clear).not.toHaveBeenCalled();
  });

  it('should clear the view container if the role does not match', () => {
    (authService.getUserRole as jest.Mock).mockReturnValue(Roles.CLIENT);
    directive = new RolesDirective(templateRef, viewContainerRef, authService);

    directive.appRole = Roles.ADMIN;

    expect(viewContainerRef.clear).toHaveBeenCalled();
    expect(viewContainerRef.createEmbeddedView).not.toHaveBeenCalled();
  });

  it('should clear the view container if the role is null', () => {
    (authService.getUserRole as jest.Mock).mockReturnValue(null);
    directive = new RolesDirective(templateRef, viewContainerRef, authService);

    directive.appRole = Roles.ADMIN;

    expect(viewContainerRef.clear).toHaveBeenCalled();
    expect(viewContainerRef.createEmbeddedView).not.toHaveBeenCalled();
  });
});