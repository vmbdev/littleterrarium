import { ChangeDetectorRef, Component, ContentChildren, Input, OnInit, QueryList } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { PageComponent } from '../page/page.component';

@Component({
  selector: 'multiform',
  templateUrl: './multiform.component.html',
  styleUrls: ['./multiform.component.scss']
})
export class MultiFormComponent implements OnInit {
  @ContentChildren(PageComponent) pageList!: QueryList<PageComponent>;
  @Input() form?: FormGroup;
  currentIndex: number = 0;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
  }

  ngAfterViewChecked(): void {
    this.cdr.detectChanges();
  }

  navigateBack(): void {
    if (this.currentIndex > 0) this.currentIndex--;
  }

  navigateNext(): void {
    let validationErrors = false;

    if (this.form) {
      const page = this.pageList.get(this.currentIndex);

      if (page?.control) {
        const control = this.form.controls[page.control];
        this.form.updateValueAndValidity();

        if (control.errors) {
          control.markAsDirty();
          validationErrors = true;
        }
      }
    }
    if (!validationErrors && (this.currentIndex < (this.pageList.toArray().length - 1))) this.currentIndex++;
  }
}
