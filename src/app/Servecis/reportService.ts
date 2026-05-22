import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class reportService {
    
constructor( private http: HttpClient , private router :Router) {}
private readonly apiBaseUrl = environment.apiBaseUrl;
saveReport(obj:any ){

   return this.http.post(`${this.apiBaseUrl}/report/save` ,obj)
}

getArticlesReported(){
    
    
    return   this.http.get(`${this.apiBaseUrl}/report/get`)
  } 
  getReports(id:string){
    const obj={
        id:id
    }
    
    return   this.http.post(`${this.apiBaseUrl}/report/getReports`,obj)
  } 
}