import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AccountService } from '@photoAlbum/services';

@Component({ templateUrl: 'layout.component.html' })
export class LayoutComponent {
  constructor(
    private router: Router,
    private accountService: AccountService
  ) {
    // Redireciona para o home caso esteja logado
    if (this.accountService.userValue) {
      this.router.navigate(['/']);
    }
  }
}