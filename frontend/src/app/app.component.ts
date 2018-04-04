import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router }    from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material';

import { tokenNotExpired } from 'angular2-jwt';

import { LoginComponent } from './login/login.component';
import { JwtAuthenticationService } from './jwt-authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [JwtAuthenticationService]
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'Primer Suggestion';

  constructor(
    public dialog: MatDialog,
    private _authService: JwtAuthenticationService
  ) {}

  ngOnInit() {

  }

  ngAfterViewInit() {
    if (tokenNotExpired()) {
      this._authService.scheduleRefresh();
    } else {
      setTimeout(() => this.openLoginDialog(), 200);
    }
  }

  openLoginDialog() {
    const config = new MatDialogConfig();
    config.disableClose = true;
    this.dialog.open(LoginComponent, config);
  }

  loggedIn() {
    return tokenNotExpired();
  }

  logout(): void {
    // TODO: This should be handled by the auth service
    localStorage.removeItem('token');
    this.openLoginDialog();
  }

}
