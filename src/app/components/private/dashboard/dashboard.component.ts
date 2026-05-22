import { Component, OnInit } from '@angular/core';
import { APP_STANDALONE_IMPORTS } from 'src/app/app-standalone.imports';


@Component({
  standalone: true,
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  imports: [...APP_STANDALONE_IMPORTS]
})
export class DashboardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  old :string ='1'
  markId(id : string){
  

   const oldelm = document.getElementById(`a${this.old}`)
  oldelm?.classList.remove('active')
  const elm = document.getElementById(`a${id}`)
  elm?.classList.add('active')

   this.old =id
  } 
}
