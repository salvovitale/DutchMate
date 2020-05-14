import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { AlertController, LoadingController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {

  constructor(
    private authService: AuthService,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private navCtrl: NavController
    ) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm){
    if(!form.valid){
      console.log("You should not have reached this!");
      return;
    }
    this.loadingCtrl.create(
      {keyboardClose: true, message: "Send reset password email..."}
    ).then(
      loadingEl =>{
        loadingEl.present();
        const email = form.value.email;
        this.authService.sendPasswordResetEmail(email).subscribe(
          resData => {
            loadingEl.dismiss();
            this.showAlert(
              'Password Reset', 
              'An email has been sent to your mail box. ' + 
              'If you did not receive it check you spam box. ' +
              'If you still do not have any email. Try the procedure again.',
              true
             );
            form.reset();
          },
          errRes => {
            loadingEl.dismiss();
            const code = errRes.error.error.message;
            let message = '';
            switch (code) {
              case 'EMAIL_NOT_FOUND':
                message = 'There is no account registered with this email.';
                break;
              default:
                message = 'Reset password server failed, please try again.';
                break;
            }
            this.showAlert('Password Reset failed!', message, false);
          }
        );
      }
    )
    
  }
  
  private showAlert(header: string, message: string, goBack: boolean){
    this.alertCtrl.create({
      header: header,
      message: message,
      buttons: [
        {
          text: 'Ok',
          handler: () => { 
            if(goBack){
              this.navCtrl.back();
            }
          }
        },
      ]
    }).then(alertEl =>{
      alertEl.present();
    });
  }
}
