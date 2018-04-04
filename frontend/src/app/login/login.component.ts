import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { MatDialogRef } from '@angular/material';

import { LoginCredentials } from '../login-credentials';
import { JwtAuthenticationService } from '../jwt-authentication.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [JwtAuthenticationService]
})
export class LoginComponent implements OnInit {
  credentials: LoginCredentials;
  credentialsForm: FormGroup;
  showError = false;

  constructor(
    private _authService: JwtAuthenticationService,
    private _fb: FormBuilder,
    public dialogRef: MatDialogRef<LoginComponent>
  ) { }

  ngOnInit() {
    this.credentialsForm = this._fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  login(): void {
    this.credentials = <LoginCredentials>this.credentialsForm.value;
    const ret = this._authService.login(this.credentials)
      .subscribe(
        // We're assuming the response will be an object
        // with the JWT on an token key
        data => {
          localStorage.setItem('token', data['token']);
          localStorage.setItem('ice_token', data['ice_token']);
          this.dialogRef.close();
          this._authService.scheduleRefresh();
        },
        error => {
          console.log(error);
          this.showError = true;
        }
      );
  }
}
