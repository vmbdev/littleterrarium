import { ChangeDetectorRef, Component, ContentChild, ContentChildren, Input, OnInit, QueryList, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { WizardHeaderComponent } from '../wizard-header/wizard-header.component';
import { PageComponent } from '../page/page.component';

@Component({
  selector: 'wizard',
  templateUrl: './wizard.component.html',
  styleUrls: ['./wizard.component.scss']
})
export class WizardComponent implements OnInit {
  @ContentChildren(PageComponent, { descendants: true }) pageList!: QueryList<PageComponent>;
  @ContentChild(WizardHeaderComponent) wizardHeader?: WizardHeaderComponent;
  // @ContentChild(FormGroup)
  @Input() form?: FormGroup;
  @Input() start?: number = 0;
  currentIndex: number = 0;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
  }

  ngAfterContentInit(): void {
    if (this.start) this.currentIndex = this.start;
  }

  ngAfterViewChecked(): void {
    this.cdr.detectChanges();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['start']) this.currentIndex = changes['start'].currentValue;
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
