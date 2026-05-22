import { Component, OnInit } from '@angular/core';


import { APP_STANDALONE_IMPORTS } from 'src/app/app-standalone.imports';

@Component({
  standalone: true,
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css'],
  imports: [...APP_STANDALONE_IMPORTS]
})
export class ProfilComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

  }

}
