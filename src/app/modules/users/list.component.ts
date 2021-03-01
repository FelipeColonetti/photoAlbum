import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { AccountService } from '@photoAlbum/services';

@Component({ templateUrl: 'list.component.html' })
export class ListComponent implements OnInit {
  users = null;
  displayedColumns: string[] = ['firstName', 'lastName', 'username', 'action'];

  constructor(private accountService: AccountService) { }

  ngOnInit() {
    this.accountService.getAll()
      .pipe(first())
      .subscribe(users => { this.users = users });
  }

  public deleteUser(id: string) {
    const user = this.users.find(x => x.id === id);
    user.isDeleting = true;
    this.accountService.delete(id)
      .pipe(first())
      .subscribe(() => {
        this.users = this.users.filter(x => x.id !== id)
      });
  }
}