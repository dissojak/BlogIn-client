import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { articleService } from 'src/app/Servecis/articleService';
import { NotificationService } from 'src/app/Servecis/notificationService';
import { UserService } from 'src/app/Servecis/userService';
import { APP_STANDALONE_IMPORTS } from 'src/app/app-standalone.imports';


@Component({
  standalone: true,
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css'],
  imports: [...APP_STANDALONE_IMPORTS]
})
export class NotificationsComponent implements OnInit {
  notifications! :any
  name!:string
  userId! :string
  constructor(private userService : UserService, private notificationService :NotificationService  , private articleService : articleService , private router : Router) { }

  ngOnInit(): void {
    this.notificationService.deleteAllNotifications.next(Math.random())
    this.userService.getUser().subscribe(res=>{
      this.name = res.name
     this.userId =res._id
    }) 
    this.notificationService.getNotification().subscribe(res=>{
      this.notifications =res
     this.notificationService.changeNotificationsReadStateTotrue().subscribe(res=>{      
     })
      
    })
  }
  addCollaborator(articleId :string , notifId:string , others: string[]){
    this.articleService.addCollaborator(articleId).subscribe(res=>{
      this.notificationService.changeAcceptedState(notifId).subscribe(resu=>{
        // this.notificationService.socket.emit('join' ,{name : this.name , collab :others })
        this.router.navigate([`edite/${articleId}`])
      })
 
      
    })
  }
  visitProfil(id :string){
    this.router.navigate([`/visit/${id}`])
  }

  deleteNotification(){
    this.notificationService.deleteNotification().subscribe(res=>{

      
    })
 
  }
  readArticle(id :string){
    this.router.navigate([`article/${id}`])
  }
}
