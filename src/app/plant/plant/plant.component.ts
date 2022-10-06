import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BreadcrumbService } from 'src/app/breadcrumb/breadcrumb.service';
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
  enableWaterEditing: boolean = false;
  enableFertilizerEditing: boolean = false;
  enableEditing: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private router: Router,
    private breadcrumb: BreadcrumbService
  ) { }

  ngOnInit(): void {
    const paramId = this.route.snapshot.paramMap.get('plantId');
    this.id = paramId ? +paramId : NaN;

    if (this.id) {
      this.apiService.getPlant(this.id).subscribe({
        next: (plant: Plant) => {
          this.plant = plant;
          this.breadcrumb.setNavigation([
            { id: 'plant', name: this.plant.customName, link: ['/plant', this.id] }
          ], { attachTo: 'location' });

          this.isValidId = true;
        },
        error: (error) => {
          if (error.msg === 'PLANT_NOT_VALID') this.isValidId = false;
        }
      })
    }
    else this.isValidId = false;
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

}
