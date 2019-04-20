import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Category } from './category.model';
import { DataStorageService } from './data.service';
@Injectable({ providedIn: 'root' })
export class CategoryService {

    constructor(private dataService: DataStorageService) { }

    categories: Category[] = []
    private categoryEvent = new Subject<Category[]>();

    getCategories() {
        if (this.categories.length == 0) {
            this.dataService.getCategories().subscribe(
                e => {
                    console.log("Retrieving categories Was A success");
                    console.log(e);
                    if (e != null) {
                        this.categories = e;
                        this.categoryEvent.next(this.categories.slice())

                    }
                    else {
                        console.log("categories Users caused a null reponse ");
                    }

                },
                x => console.log("categories Users caused an error " + x)
            );
        }
        else {
            return this.categories.slice();
        }
    }

    getCategoryEvent() {
        return this.categoryEvent.asObservable();
    }
    updateCategoryCount(category: string) {
        console.log("update the count " + category)
        const index = this.categories.findIndex(x => x.title.trim().toLowerCase() === category.trim().toLowerCase());
        if (index > -1) {
            this.categories[index].postNum++;
            this.categoryEvent.next(this.categories.slice())
        }
    }
    addCategory(category: Category) {
        console.log(this.categories)
        this.categories.push(category);
        this.categoryEvent.next(this.categories.slice())
        this.dataService.addCategories(this.categories.slice()).subscribe(
            e => console.log("Adding Categories Was A success"),
            x => console.log("Adding Categories caused an error " + x)
        );
    }

    delete(cat: Category) {
        const index = this.categories.findIndex(x => x.title === cat.title);
        this.categories.splice(index, 1);
        this.categoryEvent.next(this.categories.slice())
    }

}