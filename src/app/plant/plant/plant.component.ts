import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BreadcrumbService } from 'src/app/breadcrumb/breadcrumb.service';
import { Plant, Condition, potChoices } from 'src/app/interfaces';
import { ApiService } from 'src/app/shared/api/api.service';
import { PlantService } from '../plant.service';

@Component({
  selector: 'plant',
  templateUrl: './plant.component.html',
  styleUrls: ['./plant.component.scss']
})
export class PlantComponent implements OnInit {
  id!: number;
  valid: boolean = false;

  plantTitle?: string;
  plantSubtitle?: string;
  plantCondition = Condition;
  potName?: string;

  // Quick modals
  enableWaterEditing: boolean = false;
  enableFertilizerEditing: boolean = false;
  enableEditing: boolean = false;

  // Confirm modals
  confirmWatering: boolean = false;
  confirmFertilizing: boolean = false;
  confirmDelete: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
    private router: Router,
    private breadcrumb: BreadcrumbService,
    public plantService: PlantService
  ) { }

  ngOnInit(): void {
    const paramId = this.route.snapshot.paramMap.get('plantId');
    this.id = paramId ? +paramId : NaN;

    if (this.id) this.fetchPlantData();
    else this.valid = false;
  }

  fetchPlantData(): void {
    this.plantService.get(this.id).subscribe({
      next: (plant: Plant) => {
        if (plant.customName) {
          this.plantTitle = plant.customName;

          if (plant.specie) this.plantSubtitle = plant.specie.name;
        }
        else if (plant.specie) this.plantTitle = plant.specie.name
        else this.plantTitle = 'Unidentified plant';

        if (plant.potType) {
          if (potChoices.hasOwnProperty(plant.potType)) this.potName = potChoices[plant.potType].name;
          else this.potName = plant.potType;
        }

        this.breadcrumb.setNavigation([
          { id: 'plant', name: this.plantTitle, link: ['/plant', this.id] }
        ], { attachTo: 'location' });

        this.valid = true;
      },
      error: (error) => {
        if (error.msg === 'PLANT_NOT_VALID') this.valid = false;
      }
    })
  }

  editSoil(): void {
    this.router.navigate(['/plant/edit', this.id, 'soil']);
  }

  toggleEditing(modal: string): void {
    switch (modal) {
      case 'water':
        this.enableWaterEditing = !this.enableWaterEditing;
        break;
      case 'fertilizer':
        this.enableFertilizerEditing = !this.enableFertilizerEditing;
        break;
      case 'all':
        this.enableEditing = !this.enableEditing;
        break;
    }
  }

  addWater(): void {
    const updatedPlant = {
      id: this.id,
      waterLast: new Date()
    } as Plant;

    this.confirmWatering = false;
    this.plantService.update(updatedPlant).subscribe();
  }

  addFertilizer(): void {
    const updatedPlant = {
      id: this.id,
      fertLast: new Date()
    } as Plant;

    this.confirmFertilizing = false;
    this.plantService.update(updatedPlant).subscribe();
  }

  delete(): void {
    this.api.deletePlant(this.id).subscribe(() => {
      const { locationId } = this.plantService.plant$.getValue();
      this.router.navigate(['/location', locationId])
    })
  }

}
