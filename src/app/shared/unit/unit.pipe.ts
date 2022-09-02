import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'unit'
})
export class UnitPipe implements PipeTransform {

  // val is expected to be in cm
  transform(val: number, unit: string): string {
    if (unit == 'in') return `${Number(val / 2.54).toFixed(2)} in`;
    else return `${val} cm`;
  }

}
