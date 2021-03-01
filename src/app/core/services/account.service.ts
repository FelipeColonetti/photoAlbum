import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@photoAlbum/environment';
import { User } from '@photoAlbum/models';

@Injectable({ providedIn: 'root' })
export class AccountService {
  private userSubject: BehaviorSubject<User>;
  public user: Observable<User>;

  constructor(
    private router: Router,
    private http: HttpClient
  ) {
    this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
    this.user = this.userSubject.asObservable();
  }

  public get userValue(): User {
    return this.userSubject.value;
  }

  public login(username, password) {
    return this.http.post<User>(`${environment.apiUrl}/users/authenticate`, { username, password })
      .pipe(map(user => {
        // Armazena os detalhes do usuario com o token jwt no local sotorage
        localStorage.setItem('user', JSON.stringify(user));
        this.userSubject.next(user);
        return user;
      }));
  }

  public logout() {
    // Remove o usuário do local storage e seta como nulo
    localStorage.removeItem('user');
    this.userSubject.next(null);
    this.router.navigate(['/account/login']);
  }

  public register(user: User) {
    return this.http.post(`${environment.apiUrl}/users/register`, user);
  }

  public getAll() {
    return this.http.get<User[]>(`${environment.apiUrl}/users`);
  }

  public getById(id: string) {
    return this.http.get<User>(`${environment.apiUrl}/users/${id}`);
  }

  public update(id, params) {
    return this.http.put(`${environment.apiUrl}/users/${id}`, params)
      .pipe(map(x => {
        // Atualiza o usuario logado com o que está em edicao
        if (id == this.userValue.id) {
          // Atualiza o localstorage
          const user = { ...this.userValue, ...params };
          localStorage.setItem('user', JSON.stringify(user));
          
          this.userSubject.next(user);
        }
        return x;
      }));
  }

  public delete(id: string) {
    return this.http.delete(`${environment.apiUrl}/users/${id}`)
      .pipe(map(x => {
        // Faz o logout caso o usuario logado tenha sido deletado
        if (id == this.userValue.id) {
          this.logout();
        }
        return x;
      }));
  }
}