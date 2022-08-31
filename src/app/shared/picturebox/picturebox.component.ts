import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'picturebox',
  templateUrl: './picturebox.component.html',
  styleUrls: ['./picturebox.component.scss']
})
export class PictureboxComponent implements OnInit {
  @Input() image?: string | null;
  @Input() contentBelow?: boolean;

  constructor() { }

  ngOnInit(): void {
  }

}
