import { Component, OnInit } from '@angular/core';
import { Plant } from 'src/app/interfaces';
import { PlantService } from '../plant.service';
import * as relativeTime from 'dayjs/plugin/relativeTime'
import * as isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import * as dayjs from 'dayjs';

@Component({
  selector: 'plant-widget-water',
  templateUrl: './plant-widget-water.component.html'
})
export class PlantWidgetWaterComponent implements OnInit {
  confirmWatering: boolean = false;

  constructor(public plantService: PlantService) {
    dayjs.extend(relativeTime);
    dayjs.extend(isSameOrBefore);
  }

  ngOnInit(): void {
  }

  addWater(): void {
    const { id } = this.plantService.plant$.getValue();
    const updatedPlant = {
      id: id,
      waterLast: new Date()
    } as Plant;

    this.confirmWatering = false;
    this.plantService.update(updatedPlant).subscribe();
  }

  nextWatering(): any {
    const { waterNext } = this.plantService.plant$.getValue();
    return {
      text: dayjs(waterNext).fromNow(),
      due: dayjs(waterNext).isSameOrBefore(dayjs())
    }
  }

}

