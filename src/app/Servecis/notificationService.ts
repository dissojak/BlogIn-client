import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class NotificationService {
    socket :any
    notificationId!:string
    notificationTitle!:string
    exist ! : boolean
    auther !  :string
    collabs! : string[]
constructor( private http: HttpClient , private router :Router) {

  this.showNotificationListener.subscribe(next=>{
    this.showNotificationListener2.next(next)
  })
}
private readonly apiBaseUrl = environment.apiBaseUrl;
showNotificationListener = new Subject<number>()
showNotificationListener2 = new Subject<number>()
deleteAllNotifications = new Subject()
sendNotification(obj :any){

  return   this.http.post(`${this.apiBaseUrl}/notification/send`,obj)
}
getNotification(){

  return   this.http.get<[{isRead :boolean}]>(`${this.apiBaseUrl}/notification`)
}
changeNotificationsReadStateTotrue(){
  return   this.http.get(`${this.apiBaseUrl}/notification/changeState`)
}

changeAcceptedState(id:string){
  const obj={
    id:id
  }
  return   this.http.post(`${this.apiBaseUrl}/notification/changeAcceptedState`,obj)
}
deleteNotification(){
  return   this.http.get(`${this.apiBaseUrl}/notification/deleteNotification`)
}
sendShareNotification(obj :any){
  return   this.http.post(`${this.apiBaseUrl}/notification/sendShareNotification`,obj)
}
}