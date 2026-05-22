import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class commentService {
    
constructor( private http: HttpClient , private router :Router) {}
private readonly apiBaseUrl = environment.apiBaseUrl;
saveComment(auther : string , autherName : string , autherIcone : string , content : string ,articleId:string ){
    const obj={
        auther:auther,
        autherName:autherName,
        autherIcone:autherIcone,
        content:content,
        articleId:articleId
    }
   return this.http.post(`${this.apiBaseUrl}/comment/save` ,obj)
}

getComments(obj :any){

    
    return   this.http.post(`${this.apiBaseUrl}/comment/get`,obj)
  } 
  likeComment(id :string , isLikedByUser :boolean){
    const obj ={
        id :id,
        isLikedByUser :isLikedByUser
      }
    return   this.http.post(`${this.apiBaseUrl}/comment/like`,obj)

  }
}