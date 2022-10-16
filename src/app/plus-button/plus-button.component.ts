import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'plus-button',
  templateUrl: './plus-button.component.html',
  styleUrls: ['./plus-button.component.scss']
})
export class PlusButtonComponent implements OnInit {
  @Output() click: EventEmitter<null> = new EventEmitter<null>();
  @Input() title?: string;
  @Input() type?: string;

  constructor() { }

  ngOnInit(): void {
  }

  getSymbol(): string {
    let symbol;

    switch(this.type) {
      case 'update': {
        symbol = '&#8635;';
        break;
      }
      case 'add':
      default:
        symbol = '+';
    }

    return symbol;
  }

  clickEvent(): void {
    this.click.emit();
  }

}
