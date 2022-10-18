import { Component, OnInit } from '@angular/core';
import { Plant } from 'src/app/interfaces';
import { PlantService } from '../plant.service';
import * as relativeTime from 'dayjs/plugin/relativeTime'
import * as dayjs from 'dayjs';

@Component({
  selector: 'plant-widget-fertilizer',
  templateUrl: './plant-widget-fertilizer.component.html'
})
export class PlantWidgetFertilizerComponent implements OnInit {
  confirmFertilizing: boolean = false;

  constructor(public plantService: PlantService) { }

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
    let nextFert = null;

    const { fertLast, fertFreq } = this.plantService.plant$.getValue();

    if (fertLast && fertFreq) {
      nextFert = {
        diff: dayjs(fertLast).add(fertFreq, 'day').diff(dayjs(), 'days'),
        text: dayjs(fertLast).add(fertFreq, 'day').fromNow()
      };
    }

    return nextFert;
  }

}