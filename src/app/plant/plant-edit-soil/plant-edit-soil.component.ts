import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Plant } from 'src/app/intefaces';
import { ApiService } from 'src/app/shared/api/api.service';

@Component({
  selector: 'plant-edit-soil',
  templateUrl: './plant-edit-soil.component.html',
  styleUrls: ['./plant-edit-soil.component.scss']
})
export class PlantEditSoilComponent implements OnInit {
  plantId!: number;
  plant?: Plant;
  potForm: FormGroup;
  potChoices = [
    { id: 'LT_POT_TERRACOTTA', name: 'Terracotta', image: '/assets/pot-terracotta.jpg' },
    { id: 'LT_POT_PLASTIC', name: 'Plastic', image: '/assets/pot-plastic.jpg' },
    { id: 'LT_POT_CERAMIC', name: 'Ceramic', image: '/assets/pot-ceramic.jpg' },
    { id: 'LT_POT_METAL', name: 'Metal', image: '/assets/pot-metal.jpg' },
    { id: 'LT_POT_GLASS', name: 'Glass', image: '/assets/pot-glass.jpg' },
    { id: 'LT_POT_WOOD', name: 'Wood', image: '/assets/pot-wood.jpg' },
    { id: 'LT_POT_CONCRETE', name: 'Concrete', image: '/assets/pot-concrete.jpg' },
    { id: 'LT_POT_OTHER', name: 'Other', image: '/assets/pot-other.jpg' },
  ];
  selectedChoice: string | null = null;

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.potForm = this.fb.group({
      potSize: [],
      potSizeUnits: ['cm', Validators.required],
      potType: [],
      soil: [],
    })
  }

  ngOnInit(): void {
    this.plantId = +this.route.snapshot.params['plantId'];

    if (this.plantId) {
      this.api.getPlant(this.plantId).subscribe({
        next: (data: Plant) => {
          this.plant = data;
          this.selectPot(data.potType);

          this.potForm.patchValue({
            potSize: data.potSize,
            soil: data.soil
          });
        }
      })
    }
  }

  selectPot(id: any): void {
    // deselect 
    if (id === this.selectedChoice) this.selectedChoice = null;
    else this.selectedChoice = id;

    this.potForm.patchValue({
      potType: this.selectedChoice
    });
  }

  submit(): void {
    const plant: Plant = this.potForm.value;
    plant.id = this.plantId;

    if (plant.potSize) {
      plant.potSize = this.potForm.value.potSizeUnits === 'in' ? plant.potSize * 2.54 : plant.potSize;
    }
    
    this.api.updatePlant(plant).subscribe({
      next: (data: any) => {
        if (data.msg === 'PLANT_UPDATED') {
          console.log(data)
          this.router.navigate(['/plant', this.plantId]);
        }
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
}
