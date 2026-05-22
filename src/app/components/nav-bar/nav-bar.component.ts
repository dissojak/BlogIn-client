import { FF_EQUALS, H, O } from '@angular/cdk/keycodes';
import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NotificationService } from 'src/app/Servecis/notificationService';
import { UserService } from 'src/app/Servecis/userService';
import {io} from 'socket.io-client' ;
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AccessDashboardComponent } from '../dialog/access-dashboard/access-dashboard.component';
import { APP_STANDALONE_IMPORTS } from 'src/app/app-standalone.imports';
import { environment } from 'src/environments/environment';

@Component({
  standalone: true,
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
  imports: [...APP_STANDALONE_IMPORTS]
})
export class NavBarComponent implements OnInit {

  constructor(public dialog : MatDialog,private userService : UserService , private notificationService :NotificationService , private route : Router) { }

isConnected = false
img ! :string
nbNotifications!: number
socket : any ;
showSettings:boolean =false
user:any
readonly uri : string = environment.apiBaseUrl
  ngOnInit(): void {
    this.notificationService.deleteAllNotifications.subscribe(res=>{
      this.nbNotifications =0
    })
    
    // Allow polling fallback (some hosts / proxies block native WebSockets)
    // If your API is deployed on Vercel (serverless) it does not support
    // long-lived WebSocket connections — consider deploying the Socket.IO
    // server to a host that supports WebSockets (Render, Railway, Fly, etc.)
    this.socket = io(this.uri, {
      transports: ['polling', 'websocket'],
      // reconnection options
      reconnection: true,
      reconnectionAttempts: 10,
      reconnectionDelay: 1000
    })
    this.notificationService.socket =this.socket
    this.socket.on('aa', () => {})
    
    this.notificationService.socket?.on('getNotification', (obj  :string)=>{
      this.nbNotifications++ ;
    })
    this.notificationService.socket?.on('getFollowNotification', (obj  :string)=>{
      this.nbNotifications++ ;
    })

    
    this.notificationService.showNotificationListener2.subscribe(next=>{
      this.nbNotifications =next
    })
    this.isConnected = this.userService.islogednow
    this.userService.profilIconListner.subscribe(next=>{
      this.img= `../../../assets/images/${next}`
    })
    this.userService.authListner.subscribe(next=>{
      if(next) {
        this.isConnected = true
        this.loadUser()
      } else {
        this.isConnected = false
        this.user = null
        this.nbNotifications = 0
        this.img = '../../../assets/images/user.png'
      }
    })

    if(this.isConnected){
     this.loadUser()
    }
  }
loadUser(){
  this.userService.getUser().subscribe(res=>{
    this.user=res
    this.socket.emit('newUser', res._id);
    this.img = `../../../assets/images/${res.image}`
    this.notificationService.getNotification().subscribe(note=>{
     this.nbNotifications = note.filter(v=>{ return v.isRead== false}).length
    })
  }) 
}

logout(){ 
  this.showSettings=false
this.userService.logout()

}
profile(){
  this.showSettings=false
  this.route.navigate(["profil"])
  
}
settings(){
  this.showSettings=false
  this.route.navigate(["settings"])
  
}
stat(){
  this.showSettings=false
  this.route.navigate(["stats"])
  
}
saves(){
  this.showSettings=false
  this.route.navigate(["saves"])
  
}
history(){
  this.showSettings=false
  this.route.navigate(["history"])
  
}
// dashboard(){
//   this.showSettings=false
//   this.route.navigate(["dashboard"])
  
// }
accessDashboard( ) {
  this.showSettings=false
  this.dialog.open(AccessDashboardComponent)
} 


func(){
  if(this.showSettings)
  this.showSettings=false
 
}
}
