import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth/auth.service';
import { User } from 'src/app/intefaces';
import { ApiService } from '../../shared/api/api.service';

@Component({
  selector: 'userbox',
  templateUrl: './userbox.component.html',
  styleUrls: ['./userbox.component.scss']
})
export class UserboxComponent implements OnInit {
  user?: User;

  constructor(
    public authService: AuthService,
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.authService.signedIn$.subscribe((signedIn: boolean) => {
      if (signedIn) {
        this.apiService.getCurrentUser().subscribe((user: User) => { this.user = user });
      }
    });
  }

}
