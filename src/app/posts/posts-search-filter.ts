import { Pipe, PipeTransform } from '@angular/core'
import { Posts } from '../shared/post.model';

@Pipe({
    name: 'searchPipe',
    pure: false

})

export class SearchPipe implements PipeTransform {
    transform(value: Posts[], searchProp: string, searchValue: string) {
        console.log(searchProp + " " + searchValue);
        console.log("in filter")
        if (value.length === 0 || searchProp == null || searchValue == null) {
            return value;
        }

        const resultArray = [];
        for (const item of value) {

            if (typeof item[searchProp] == 'number') {
                if (item[searchProp] == searchValue) {
                    resultArray.push(item);

                }
                continue;
            }

            if (item[searchProp].toLowerCase().includes(searchValue.toLowerCase())) {
                resultArray.push(item);
            }

        }
        return resultArray;

    }

}