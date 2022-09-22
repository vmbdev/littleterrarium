import { Component, Input, OnInit } from '@angular/core';
import { Plant } from 'src/app/intefaces';

@Component({
  selector: 'plant-list',
  templateUrl: './plant-list.component.html',
  styleUrls: ['./plant-list.component.scss']
})
export class PlantListComponent implements OnInit {
  @Input() list!: Plant[];
  @Input() locationId!: number;

  constructor() { }

  ngOnInit(): void {
  }

}
