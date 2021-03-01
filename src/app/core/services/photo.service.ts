import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Album } from '../models/album';
import { Photo } from '../models/photo';

@Injectable({ providedIn: 'root' })
export class PhotoService {

  private resourceAlbum = 'albums';
  private resourcePhoto = 'photos';
  private apiURL = 'https://jsonplaceholder.typicode.com';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient) { }

  public getAlbuns(): Observable<Album[]> {
    const url = this.buildURL(this.resourceAlbum);
    return this.http.get<Album[]>(url)
      .pipe(
        catchError(this.handleError<Album[]>('getAlbuns', []))
      );
  }

  public getPhotos(): Observable<Photo[]> {
    const url = this.buildURL(this.resourcePhoto);
    return this.http.get<Photo[]>(url)
      .pipe(
        catchError(this.handleError<Photo[]>('getPhotos', []))
      );
  }

  private buildURL(resource: string) {
    return `${this.apiURL}/${resource}`
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}