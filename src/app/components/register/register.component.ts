import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { UserService } from 'src/app/Servecis/userService';
import { BottomSheetOverviewExampleSheetComponent } from '../bottom-sheet-overview-example-sheet/bottom-sheet-overview-example-sheet.component';
import { APP_STANDALONE_IMPORTS } from 'src/app/app-standalone.imports';


@Component({
  standalone: true,
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  imports: [...APP_STANDALONE_IMPORTS]
})
export class RegisterComponent implements OnInit {
  registerError = '';

  constructor(private userService : UserService ,private _bottomSheetRef: MatBottomSheetRef<BottomSheetOverviewExampleSheetComponent>) { }

  ngOnInit(): void {
  }
  onSubmit(myForm:NgForm){
    if (myForm.invalid) {
      return;
    }
    this.registerError = '';
    this._bottomSheetRef.dismiss();
    const user={
      email:myForm.value.email,
      name:myForm.value.name,
      password:myForm.value.password,
                }

    this.userService.createUser(user.email ,user.password , user.name)
      .subscribe({
        error: err => {
          if (err && err.status === 409) {
            this.registerError = 'Email already exists. Try another one.'
            return;
          }
          this.registerError = 'Signup failed. Please try again.'
        }
      })
  }
  // openLink(event: MouseEvent): void {
  //   this._bottomSheetRef.dismiss();
  //   event.preventDefault();
  // }
}
