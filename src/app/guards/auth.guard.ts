import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { RoleService } from '../components/services/role.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

  constructor(private roleService: RoleService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const url = '/' + route.routeConfig?.path;
    if (this.roleService.isAllowedRoute(url)) {
      return true;
    }
    alert('Access Denied');
    this.router.navigate(['/']);
    return false;
  }
}
        