import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class NoteService {


    constructor( private http: HttpClient , private router :Router) {

      }
  private readonly apiBaseUrl = environment.apiBaseUrl;

    sendnotes(obj :any){

        
        return   this.http.post(`${this.apiBaseUrl}/notes/save`,obj)
      }   

      sendLink(obj :any){

        
        return   this.http.post(`${this.apiBaseUrl}/notes/saveLink`,obj)
      }   


      geyNotes(obj :any){

        
        return   this.http.post(`${this.apiBaseUrl}/notes/get`,obj)
      }   
      getLinks(obj :any){

        
        return   this.http.post(`${this.apiBaseUrl}/notes/getLinks`,obj)
      }  
      deleteNote(obj :any){

        
        return   this.http.post(`${this.apiBaseUrl}/notes/delete`,obj)
      }  
      deleteLink(obj :any){

        
        return   this.http.post(`${this.apiBaseUrl}/notes/deleteLink`,obj)
      }  
}