import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { UserInformationService } from '../user-information.service';
import { IceLoginCredentials } from '../ice-login-credentials'

@Component({
  selector: 'app-ice-login-setter',
  templateUrl: './ice-login-setter.component.html',
  styleUrls: ['./ice-login-setter.component.scss'],
  providers: [UserInformationService]
})
export class IceLoginSetterComponent implements OnInit {
  credentials: IceLoginCredentials;
  credentialsForm: FormGroup;
  showError = false;

  constructor(
    private _userService: UserInformationService,
    private _fb: FormBuilder) { }

  ngOnInit() {
    this._userService.getIceLoginInformation()
      .subscribe(
        data => {
          this.credentialsForm = this._fb.group({
            ice_username: [data.ice_username, Validators.required],
            ice_password: [data.ice_password, Validators.required]
          })
        }
      )
  }

  updateIceCredentials(): void {
    this.credentials = <IceLoginCredentials>this.credentialsForm.value;
    const ret = this._userService.updateIceLoginInformation(this.credentials)
      .subscribe(
        data => console.log(data),
        error => console.log(error));
  }

}
