
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AccountService } from '@photoAlbum/services';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private accountService: AccountService) { }

  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(err => {
      if (err.status === 401) {
        // Desloga caso o retorno for 401 do fakeback
        this.accountService.logout();
      }

      const error = err.error.message || err.statusText;
      return throwError(error);
    }))
  }
}