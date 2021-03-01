import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '@photoAlbum/environment';
import { AccountService } from '@photoAlbum/services';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private accountService: AccountService) { }

  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Adiciona o cabeçalho de autenticação com jwt se o usuário estiver conectado e a solicitação for para o URL da fakeback
    const user = this.accountService.userValue;
    const isLoggedIn = user && user.token;
    const isApiUrl = request.url.startsWith(environment.apiUrl);
    if (isLoggedIn && isApiUrl) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${user.token}`
        }
      });
    }

    return next.handle(request);
  }
}