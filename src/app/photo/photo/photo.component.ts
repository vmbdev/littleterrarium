import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Photo } from 'src/app/intefaces';
import { ApiService } from 'src/app/shared/api/api.service';

@Component({
  selector: 'photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.scss']
})
export class PhotoComponent implements OnInit {
  @Input() id!: number;
  isValidId!: boolean;
  photo?: Photo;

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const paramId = this.route.snapshot.paramMap.get('photoId');
    this.id = paramId ? +paramId : NaN;

    if (this.id) {
      this.isValidId = true;

      this.apiService.getPhoto(this.id).subscribe({
        next: (data) => { this.photo = data },
        error: (error) => {
          if (error.msg === 'PLANT_NOT_FOUND') this.isValidId = false;
        }
      });
    }
    else this.isValidId = false;
  }

}
