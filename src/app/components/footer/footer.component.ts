import { Component, OnInit } from '@angular/core';
import { APP_STANDALONE_IMPORTS } from 'src/app/app-standalone.imports';


@Component({
  standalone: true,
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
  imports: [...APP_STANDALONE_IMPORTS]
})
export class FooterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
