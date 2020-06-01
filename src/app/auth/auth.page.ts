import { Component, OnInit } from '@angular/core';
import { AuthService, AuthResponseData } from './auth.service';
import { SegmentChangeEventDetail } from '@ionic/core';
import { Router } from '@angular/router';
import { LoadingController, AlertController, NavController } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {

  isLogin = true;

  constructor(
    private authService: AuthService,
    private router: Router,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController
  ) { }

  ngOnInit() {
    // this.router.navigateByUrl('/tabs/notebook');
  }

  authenticate(email: string, password: string, form: NgForm){

    // this.isLoading = true;
    // I am using a programmatically created component rather then the spinner component
    // In this way I cannot do anything untill the loading is done
    this.loadingCtrl
      .create({keyboardClose: true, message: "Logging in..."})
      .then(loadingEl => {
        loadingEl.present();
        let authObs: Observable<AuthResponseData>;
        if(this.isLogin){
          authObs = this.authService.logIn(email, password);
        } else {
          authObs = this.authService.signUp(email, password);
        }
        authObs.subscribe(resData => {
          // console.log(resData);
          loadingEl.dismiss();
          this.router.navigateByUrl('/tabs/notebook', { skipLocationChange: false });
          form.reset();
        }, errRes => {
          loadingEl.dismiss();
          const code = errRes.error.error.message;
          let message = '';
          switch (code) {
            case 'EMAIL_EXISTS':
              message = 'The email address is already in use by another account.';
              break;
            case 'TOO_MANY_ATTEMPTS_TRY_LATER':
              message = 'We have blocked all requests from this device due to unusual activity. Try again later.';
              break;
            case 'EMAIL_NOT_FOUND':
              message = 'There is no account registered with this email.';
              break;
            case 'INVALID_PASSWORD':
              message = 'The password is not correct.';
              break;
            default:
              message = 'Authentication server failed, please try again.';
              break;
          }
          this.showAlert(message);
        });
      });
  }

  onSwitchAuthMode(event: CustomEvent<SegmentChangeEventDetail>){
    if(event.detail.value === 'login'){
      this.isLogin = true;
    }else{
      this.isLogin = false;
    }
  }

  onSubmit(form: NgForm){
    if(!form.valid){
      console.log("You should not have reached this!");
      return;
    }
    const email = form.value.email;
    const password = form.value.password;
    this.authenticate(email, password, form);
  }

  private showAlert(message: string){
    this.alertCtrl.create({
      header: 'Authentication failed!!!',
      message: message,
      buttons: ['Okay']
    }).then(alertEl =>{
      alertEl.present();
    });
  }
}

