import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Plant, Condition } from 'src/app/intefaces';
import { ApiService } from 'src/app/shared/api/api.service';
import { __values } from 'tslib';

@Component({
  selector: 'plant',
  templateUrl: './plant.component.html',
  styleUrls: ['./plant.component.scss']
})
export class PlantComponent implements OnInit {
  id!: number;
  isValidId: boolean = false;
  plant!: Plant;
  plantCondition = Condition;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    const paramId = this.route.snapshot.paramMap.get('plantId');
    console.log(paramId);
    this.id = paramId ? +paramId : NaN;

    if (this.id) {
      this.apiService.getPlant(this.id).subscribe({
        next: (plant: Plant) => {
          console.log(plant);
          this.plant = plant;
          this.isValidId = true;
        },
        error: (error) => {
          console.log(error);
          if (error.msg === 'PLANT_NOT_VALID') this.isValidId = false;
        }
      })
    }
    else this.isValidId = false;
  }

}
