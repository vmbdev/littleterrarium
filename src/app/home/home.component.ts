import { Component, OnInit } from '@angular/core';

import { User, Location } from '@prisma/client';
import { AuthService } from '../auth/auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  signedIn: boolean = false;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.isSignedIn().subscribe((signedIn) => { this.signedIn = signedIn });
  }
}
