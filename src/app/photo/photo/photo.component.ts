import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbService } from 'src/app/breadcrumb/breadcrumb.service';
import { Photo } from 'src/app/interfaces';
import { ApiService } from 'src/app/shared/api/api.service';
import * as dayjs from 'dayjs';
import * as LocalizedFormat from 'dayjs/plugin/localizedFormat';


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
    private route: ActivatedRoute,
    private breadcrumb: BreadcrumbService
  ) { }

  ngOnInit(): void {
    const paramId = this.route.snapshot.paramMap.get('photoId');
    this.id = paramId ? +paramId : NaN;

    if (this.id) {
      this.isValidId = true;

      this.apiService.getPhoto(this.id).subscribe({
        next: (data) => {
          this.photo = data;

          dayjs.extend(LocalizedFormat);
          this.breadcrumb.setNavigation([
            { id: 'photo', name: dayjs(this.photo.takenAt).format('LL'), link: ['/photo', this.id] }
          ], { attachTo: 'plant' })

        },
        error: (error) => {
          if (error.msg === 'PLANT_NOT_FOUND') this.isValidId = false;
        }
      });
    }
    else this.isValidId = false;
  }

}
