import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { ApiService } from 'src/app/shared/api/api.service';

@Component({
  selector: 'user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.scss']
})
export class UserRegisterComponent implements OnInit {
  userForm: FormGroup;
  passwordRequirements: any;

  constructor(
    private api: ApiService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.userForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email, Validators.pattern(/^\S+@\S+\.\S+$/i)])],
      password: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    this.api.getPasswordRequirements().subscribe({
      next: (data: any) => {
        this.passwordRequirements = data;
        console.log(this.passwordRequirements);
      },
    );
  }

  submit(): void {
    
  }
}
