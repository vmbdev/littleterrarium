import { Component, OnInit } from '@angular/core';
import { Plant } from 'src/app/interfaces';
import { PlantService } from '../plant.service';
import * as relativeTime from 'dayjs/plugin/relativeTime'
import * as isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import * as dayjs from 'dayjs';

@Component({
  selector: 'plant-widget-fertilizer',
  templateUrl: './plant-widget-fertilizer.component.html'
})
export class PlantWidgetFertilizerComponent implements OnInit {
  confirmFertilizing: boolean = false;

  constructor(public plantService: PlantService) {
    dayjs.extend(relativeTime);
    dayjs.extend(isSameOrBefore);
  }

  ngOnInit(): void {
  }

  addFertilizer(): void {
    const { id } = this.plantService.plant$.getValue();
    const updatedPlant = {
      id: id,
      fertLast: new Date()
    } as Plant;

    this.confirmFertilizing = false;
    this.plantService.update(updatedPlant).subscribe();
  }

  nextFertilizing(): any {
    const { fertNext } = this.plantService.plant$.getValue();
    return {
      text: dayjs(fertNext).fromNow(),
      due: dayjs(fertNext).isSameOrBefore(dayjs())
    }
  }

}
