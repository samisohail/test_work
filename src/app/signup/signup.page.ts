import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  LoadingController,
  NavController,
  ToastController
} from '@ionic/angular';

import { ApiResponse } from '../models/api-response';
import { ICreateUserModel } from '../models/create-user.model';
import { UserServices } from '../services/user-services.service';
import { LocalStorageKeys } from '../shared/local-storage-keys';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss']
})
export class SignupPage implements OnInit {
  private registerForm: FormGroup;
  private userKeyInStorage: boolean;
  private model: ICreateUserModel;
  private isLoading: any;
  private localStorageKeys: LocalStorageKeys;
  submitted = false;
  private invalidPIN = false;

  constructor(
    public navCtrl: NavController,
    public fb: FormBuilder,
    private toastController: ToastController,
    private userServices: UserServices,
    private loadingController: LoadingController
  ) {
    this.registerForm = this.fb.group(
      {
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        passKey: [
          '',
          [
            Validators.required,
            Validators.maxLength(4),
            Validators.minLength(4),
            Validators.pattern('^[0-9]*$'),
          ]
        ],
        confirmPassKey: [
          '',
          [
            Validators.required,
            Validators.minLength(4),
            Validators.maxLength(4),
            Validators.pattern('^[0-9]*$'),
          ]
        ]
      }
      // , {
      //    validator: MustMatch('passKey', 'confirmPassKey')
      //  }
    );

    this.localStorageKeys = new LocalStorageKeys();
  }

  ngOnInit() {}

  get f() {
    return this.registerForm.controls;
  }

  register() {
    this.isLoading = true;
    this.submitted = true;
    console.log('form: ', this.registerForm.value);

    if ( this.registerForm.get('passKey').value !==  this.registerForm.get('confirmPassKey').value) {
      this.invalidPIN = true;
      return false;
    } else {
      this.invalidPIN = false;
    }
    this.model = {
      address: '',
      firstName: this.registerForm.get('name').value,
      lastName: '', // this.registerForm.get('lastName').value,
      comments: '',
      email: this.registerForm.get('email').value,
      gender: 'm',
      orgId: '',
      password: this.registerForm.get('passKey').value,
      phone: ''
    };

    this.loadingController
      .create({
        animated: true,
        message: 'Please wait...',
        duration: 3000
      })
      .then(loader => {
        loader.present().then(() => {
          if (!this.isLoading) {
            loader.dismiss();
          }
        });
      });

    this.userServices.signup(this.model).subscribe(
      (response: ApiResponse) => {
        this.isLoading = false;

        if (response.status === true) {
          localStorage.clear();
          localStorage.setItem(
            `${this.localStorageKeys.KEY_PREFIX}_${this.localStorageKeys.TOKEN}`,
            response.data.token
          );

          localStorage.setItem(
            `${this.localStorageKeys.KEY_PREFIX}_${this.localStorageKeys.USER_ID}`,
            response.data.userId
          );

          localStorage.setItem(
            `${this.localStorageKeys.KEY_PREFIX}_${this.localStorageKeys.NAME}`,
            this.model.firstName + ' ' + this.model.lastName
          );

          this.showToaster('Thank you for creating account.');
        } else {
          this.showToaster(response.message);
        }
      },
      error => {
        this.isLoading = false;
        this.showToaster(error);
      }
    );
    this.submitted = false;
  }

  redirectToLogin() {
    this.navCtrl.navigateRoot(['signin']);
  }

  showToaster(message: string) {
    this.toastController
      .create({
        // tslint:disable-next-line:object-literal-shorthand
        message: message,
        duration: 4000,
        position: 'bottom',
        showCloseButton: true,
        closeButtonText: 'Close'
      })
      .then(toaster => toaster.present());
  }

}
