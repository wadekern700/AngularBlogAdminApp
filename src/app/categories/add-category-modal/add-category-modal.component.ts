import { Component, OnInit, ViewChild } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

import { NgForm } from '@angular/forms';
import { Category } from 'src/app/shared/category.model';
import { CategoryService } from 'src/app/shared/category.service';

@Component({
  selector: 'app-add-category-modal',
  templateUrl: './add-category-modal.component.html',
  styleUrls: ['./add-category-modal.component.css']
})
export class AddCategoryModalComponent implements OnInit {

  constructor(public modalRef: BsModalRef, private categoryService: CategoryService) { }
  @ViewChild("AddCategoryForm") form: NgForm;

  ngOnInit() {
    console.log(this.categoryService);
  }

  close() {
    this.modalRef.hide();
  }

  onSub() {
    const cat = new Category(this.form.value.category, 0);
    this.categoryService.addCategory(cat);
    this.modalRef.hide();
  }


}
