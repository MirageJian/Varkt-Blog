import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fileSize'
})
export class FileSizePipe implements PipeTransform {
  private readonly fileSizeUnits = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

  transform(value: number, ...args: unknown[]): string {
    let unitIndex = 0;
    while (value > 1000 && unitIndex < this.fileSizeUnits.length - 1) {
      value /= 1000;
      unitIndex += 1;
    }
    // Round the value and choose a unit from unit list
    return value.toFixed(2) + ' ' + this.fileSizeUnits[unitIndex];
  }

}
