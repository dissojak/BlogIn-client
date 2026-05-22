import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { UserService } from 'src/app/Servecis/userService';
import { BottomSheetOverviewExampleSheetComponent } from '../bottom-sheet-overview-example-sheet/bottom-sheet-overview-example-sheet.component';
import { APP_STANDALONE_IMPORTS } from 'src/app/app-standalone.imports';


@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [...APP_STANDALONE_IMPORTS]
})
export class LoginComponent implements OnInit {
  loginError = '';

  constructor(private _bottomSheetRef: MatBottomSheetRef<BottomSheetOverviewExampleSheetComponent> , private userService : UserService) { }

  ngOnInit(): void {
  }
  onSubmit(myForm:NgForm){
    if (myForm.invalid) {
      return;
    }
    this.loginError = '';
    this.userService.resetSession();
    this._bottomSheetRef.dismiss();
    const user={email:myForm.value.email,password:myForm.value.password}

    this.userService.loginUser(user.email,user.password)
      .subscribe({
        error: err => {
          if (err && err.error && err.error.message === 'user not found') {
            this.loginError = 'User not found.'
            return;
          }
          if (err && err.error && err.error.message === 'faild to connect here!') {
            this.loginError = 'Wrong email or password.'
            return;
          }
          this.loginError = 'Login failed. Please try again.'
        }
      })
    this.userService.userChangedListener.next(Math.random())
    
  }
}
