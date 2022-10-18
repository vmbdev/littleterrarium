import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth/auth.service';
import { User } from 'src/app/interfaces';
import { ApiService } from '../../shared/api/api.service';

@Component({
  selector: 'userbox',
  templateUrl: './userbox.component.html',
  styleUrls: ['./userbox.component.scss']
})
export class UserboxComponent implements OnInit {
  user?: User;
  menuVisible: boolean = false;

  constructor(
    public auth: AuthService,
    private api: ApiService
  ) { }

  ngOnInit(): void {
    this.auth.signedIn$.subscribe((signedIn: boolean) => {
      if (signedIn) {
        this.api.getCurrentUser().subscribe((user: User) => { this.user = user });
      }
    });
  }

  enableMenu(): void {
    this.menuVisible = true;
  }

  disableMenu(): void {
    this.menuVisible = false;
  }

}
