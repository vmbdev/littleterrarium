import { Component, Input, OnInit } from '@angular/core';

import { Photo } from 'src/app/intefaces';

@Component({
  selector: 'photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.scss']
})
export class PhotoListComponent implements OnInit {
  @Input() list!: Photo[];
  @Input() plantId!: number;

  constructor() { }

  ngOnInit(): void {
  }

}
