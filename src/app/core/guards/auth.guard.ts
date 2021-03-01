import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AccountService } from '@photoAlbum/services';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private accountService: AccountService
  ) { }

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const user = this.accountService.userValue;
    if (user) {
      // Retorna true se estiver autorizado
      return true;
    }
    
    // Retorna pra pagina de login caso nao esteja mais logado
    this.router.navigate(['/account/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}