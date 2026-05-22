import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { Router } from '@angular/router';
import {Subject} from "rxjs";
import { tap } from "rxjs/operators";
import { userModel } from '../Models/UserModel';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class UserService {
    
constructor( private http: HttpClient , private router :Router) {}
 private readonly apiBaseUrl = environment.apiBaseUrl;
 islogednow =false ;
 private userToken ! : string
 authListner=new Subject<boolean>();
 userChangedListener=new Subject();
 profilIconListner=new Subject<string>();
 userRole  ! : string 
createUser(email:string,password:string,name : string){
    const d = new Date()
    let day = d.getDate()
    let month = d.getMonth()+1
    let year = d.getFullYear()
    const fulldate=day+'-'+month+'-'+year
  const user={email:email,password:password,name:name ,formatDate :fulldate}

    return this.http.post<{history : Array<string>, followings : Array<string>,followers :Array<string>,  profession : string,bio:string ,age :number,token:string, _id:string , role:string , isnew :boolean ,name : string , email : string ,image : string}>(`${this.apiBaseUrl}/user/signUp`,user)
      .pipe(
        tap(result => {
          const currentuser : userModel = result
          this.saveAuthData(currentuser.token )
          this.islogednow =true ;
          this.userToken = currentuser.token
          this.userRole = currentuser.role
          this.authListner.next(true);
          this.router.navigate(['profil'])
        })
      )
  }
    //------------------------login---------------------------------
  loginUser(email:string,password:string){
    
        const auth={
            email:email,
            password:password
        }
        
         return this.http.post<{history : Array<string>, followings : Array<string>,followers :Array<string>,  profession : string,bio:string ,age :number,token:string, _id:string , role:string  ,isnew : boolean ,name : string , email : string,image : string}>(`${this.apiBaseUrl}/user/login`,auth)
         .pipe(
           tap(result => {
            if(result.token){
              const user : userModel = result
              this.saveAuthData(user.token )
              this.islogednow =true ;
              this.userToken = user.token
              this.userRole = user.role
              this.authListner.next(true);
              this.router.navigate(['home'])
            }
           })
         )

          }


          accessDashbord(email:string,password:string){
            const auth={
                email:email,
                password:password
            }
             return this.http.post<{token :String}>(`${this.apiBaseUrl}/user/login`,auth)
              }         
// --------------------------------saving data in local storage ----------------------------
private saveAuthData(token :string  ){
localStorage.setItem("token" ,token)
  }   
  
  private getAuthToken(){
    const token = localStorage.getItem("token")
    return token
  }

  autoAuthUser(){
    const authInformation = this.getAuthToken()

    if(authInformation){
      this.userToken = authInformation
      this.getUser().subscribe({
        next: _ => {
          this.islogednow = true
          this.authListner.next(true)
        },
        error: _ => {
          this.resetSession()
        }
      })
    }
  }

  // ------------------------------------removing data from local storage---------------------------------
  private clearAuthData(){
    localStorage.removeItem("token")
  }


  logout(){
    this.clearAuthData()
    this.islogednow=false
    this.authListner.next(false);
    this.router.navigate(["/"])
  }

  resetSession(){
    this.clearAuthData()
    this.userToken = ''
    this.userRole = ''
    this.islogednow = false
    this.authListner.next(false)
  }

  public  getToken(){
    return this.userToken;
  }


  getUser(){

    return this.http.get<{history: Array<string>,readLater: Array<string>, followings : Array<string>,followers :Array<string>, profession : string,interest :Array<{name :string}>, bio:string ,age :number, role:string , image : string , _id :string , token : string , isnew  :boolean ,name :string , email :string }>(`${this.apiBaseUrl}/user`)

  }
  
  getPopularUser(){

    return this.http.get(`${this.apiBaseUrl}/user/popular`)

  }
  
  submitIcon(icon : string){
    const obj ={
      icon :icon
    }
    this.profilIconListner.next(icon)
    return this.http.post(`${this.apiBaseUrl}/user/changeIcon` ,obj)

  }

 searchUser(name :string){
  const obj ={
    name :name
  }
  return this.http.post(`${this.apiBaseUrl}/user/searchUser` ,obj)

}

searchFreind(name :string){
  const obj ={
    name :name
  }
  return this.http.post(`${this.apiBaseUrl}/user/searchFreind` ,obj)

}
 getUserById( id : string){
  const obj ={
    id :id
  }
  return this.http.post(`${this.apiBaseUrl}/user/userById` ,obj)

 }

 upgradeProfile(user :any){
  return this.http.post(`${this.apiBaseUrl}/user/upgrade` ,user)
 }
 followUser(id : string){
  const obj ={
    id :id
  }
  return this.http.post(`${this.apiBaseUrl}/user/followUser` ,obj)
 }

 unfollowUser(id : string){
  const obj ={
    id :id
  }
  return this.http.post(`${this.apiBaseUrl}/user/unfollowUser` ,obj)
 }
 getFollowings(followers : string[] , nb? :number){
  const obj ={
    followers :followers
  }
  if(nb){
    const query = `?nbFreinds=${3*nb}`
  return this.http.post(`${this.apiBaseUrl}/user/followings`+query ,obj)
  }else{
      const query = `?nbFreinds=${3}`
      return this.http.post(`${this.apiBaseUrl}/user/followings`+query ,obj)

  }

 }

 getFollowersOrFollowings(array :string){
  const obj ={
    array :array
  }
  return this.http.post(`${this.apiBaseUrl}/user/getFollowersOrFollowings` ,obj)

}
setUserHistory(id:string , allRadyExist :boolean ){
  const obj ={
    id:id,
    allRadyExist:allRadyExist,
  }
return   this.http.post(`${this.apiBaseUrl}/user/setUserHistory`,obj)
}  

orderUsersByPoints(){
  return this.http.get<{resul:any[] , index : number}>(`${this.apiBaseUrl}/user/orderUsersByPoints`)
}
}
