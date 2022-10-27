import { Component, OnInit } from '@angular/core';
import { theme } from 'src/config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  theme = theme;

  constructor() {}

  ngOnInit(): void {}
}
