import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Plant } from 'src/app/intefaces';
import { ApiService } from 'src/app/shared/api/api.service';

@Component({
  selector: 'plant',
  templateUrl: './plant.component.html',
  styleUrls: ['./plant.component.scss']
})
export class PlantComponent implements OnInit {
  id!: number;
  isValidId: boolean = false;
  plant!: Plant;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    const paramId = this.route.snapshot.paramMap.get('plantId');
    this.id = paramId ? +paramId : NaN;

    if (this.id) {
      this.apiService.getPlant(this.id).subscribe({
        next: (plant: Plant) => {
          this.plant = plant;
          this.isValidId = true;
        },
        error: (error) => {
          if (error.msg === 'PLANT_NOT_VALID') this.isValidId = false;
        }
      })
    }
    else this.isValidId = false;
  }

}
