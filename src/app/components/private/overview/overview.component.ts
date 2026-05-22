import { Component, OnInit } from '@angular/core';
import { APP_STANDALONE_IMPORTS } from 'src/app/app-standalone.imports';


@Component({
  standalone: true,
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css'],
  imports: [...APP_STANDALONE_IMPORTS]
})
export class OverviewComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
