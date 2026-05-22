import { Component, HostListener, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { Router } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';
import { BottomSheetOverviewExampleSheetComponent } from '../bottom-sheet-overview-example-sheet/bottom-sheet-overview-example-sheet.component';
import { APP_STANDALONE_IMPORTS } from 'src/app/app-standalone.imports';
import { UserService } from 'src/app/Servecis/userService';

@Component({
  standalone: true,
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
  imports: [FooterComponent, ...APP_STANDALONE_IMPORTS]
})
export class LandingPageComponent implements OnInit {
  scroll=false
  panelOpenState = false;
  fields=['sport' , 'helth' ,'developement' , 'food' , 'music']
  questions=['sport' , 'helth' ,'developement' , 'food' , 'music']
  caption = 'where you share  experience.'
  isLoggedIn = false;
  constructor(private _bottomSheet: MatBottomSheet, private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.isLoggedIn = this.userService.islogednow;
    if (this.isLoggedIn) {
      this.router.navigate(['home']);
      return;
    }

    this.userService.authListner.subscribe(isAuth => {
      this.isLoggedIn = isAuth;
      if (isAuth) {
        this.router.navigate(['home']);
      }
    });
  }
  openBottomSheet(): void {
    if (this.isLoggedIn) {
      this.router.navigate(['home']);
      return;
    }
    this._bottomSheet.open(BottomSheetOverviewExampleSheetComponent);
  }
  


  @HostListener("document : scroll")
  scrollTop(){
    // if(document.documentElement.scrollTop>0)
    // this.authservice.scroll.next( true)
    // else
    // this.authservice.scroll.next( false)
  
    if(document.documentElement.scrollTop>170){
      this.scroll=true
  
  
    }
    else{
     
      
      this.scroll=false
  
    }
  
  
  
  
  }
}
 



