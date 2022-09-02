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

  //On the line -> Holding on to life -> I guess It's fine -> Looking dapper -> Prime example of its specie
  getConditionDesc(condition: Condition): string {
    let val: string;

    switch(condition) {
      case Condition.BAD: {
        val = 'On the line';
        break;
      }
      case Condition.POOR: {
        val = 'Holding on to life';
        break;
      }
      case Condition.GOOD: {
        val = 'I guess it\'s fine';
        break;
      }
      case Condition.VERYGOOD: {
        val = 'Looking dapper';
        break;
      }
      case Condition.EXCELLENT: {
        val = 'Prime example of its specie';
        break;
      }
    }

    return val;
  }

}
