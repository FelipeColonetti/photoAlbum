import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Alert } from '@photoAlbum/models';
import { Observable, Subject } from 'rxjs';
import { filter } from 'rxjs/operators';


@Injectable({ providedIn: 'root' })
export class AlertService {
  constructor(private _snackBar: MatSnackBar) { }

  private subject = new Subject<Alert>();
  private defaultId = 'default-alert';

  // enable subscribing to alerts observable
  onAlert(id = this.defaultId): Observable<Alert> {
    return this.subject.asObservable().pipe(filter(x => x && x.id === id));
  }
  
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000
    });
  }

  
  success(message: string) {
    this.openSnackBar(message, null);
  }


  error(message: string) {
    this.openSnackBar(message, null);
  }

  info(message: string) {
    this.openSnackBar(message, null);
  }

  warn(message: string) {
    this.openSnackBar(message, null);
  }

  alert(alert: Alert) {
    alert.id = alert.id || this.defaultId;
    this.subject.next(alert);
  }
  
  clear(id = this.defaultId) {
    this.subject.next(new Alert({ id }));
  }
}