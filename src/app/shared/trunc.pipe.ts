import { Pipe, PipeTransform } from '@angular/core';
@Pipe({ name: 'truncPipe' })
export class TruncPipe implements PipeTransform {
    transform(value: string) {

        return value.substring(0, 400) + '...';
    }

}