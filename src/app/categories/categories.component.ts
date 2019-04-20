import { Component, OnInit } from '@angular/core';
import { CategoryService } from "../shared/category.service"
import { Category } from '../shared/category.model';


@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  categories: Category[];
  showDeleteAlert = true;
  searchTitle = "title"
  constructor(private categoryService: CategoryService) { }
  ngOnInit() {
    this.categories = this.categoryService.getCategories();
    this.categoryService.getCategoryEvent().subscribe((data) => this.categories = data);
  }

  delete(cate: Category) {

    if (cate.postNum > 0) {
      this.showDeleteAlert = false;
    }
    else {
      this.categoryService.delete(cate);
    }
  }


}
