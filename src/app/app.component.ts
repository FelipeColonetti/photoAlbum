import { Component } from '@angular/core';
import { AccountService } from '@photoAlbum/services';
import { User } from '@photoAlbum/models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public user: User;

  constructor(private accountService: AccountService) {
    this.accountService.user.subscribe(x => this.user = x);
  }
}
