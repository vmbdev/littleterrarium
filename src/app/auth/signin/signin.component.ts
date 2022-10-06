import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  authInvalid: boolean = false;
  controls = {
    usernameEmpty: false,
    passwordEmpty: false,
  }

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.authService.signedIn$.subscribe((val: boolean) => {
      if (val) this.router.navigate(['/']);
    })
  }

  resetControls() {
    this.controls.usernameEmpty = false;
    this.controls.passwordEmpty = false;
    this.authInvalid = false;
  }

  onSubmit(signinForm: any) {
    this.resetControls();

    if (!signinForm.valid) {
      if (!signinForm.value.username) this.controls.usernameEmpty = true;
      if (!signinForm.value.password) this.controls.passwordEmpty = true;
    }

    else {

      this.authService.signIn(signinForm.value.username, signinForm.value.password).subscribe({
        next: () => {
          this.router.navigate(['/']);
        },
        error: (err: any) => {
          if (err.msg && (err.msg === 'USER_DATA_INCORRECT')) this.authInvalid = true;
        }
      });
    }
  }
}
