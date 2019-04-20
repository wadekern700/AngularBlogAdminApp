import { Component, OnInit, ViewChild } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { NgForm } from '@angular/forms';
import { PostService } from 'src/app/shared/posts.service';
import { Posts } from 'src/app/shared/post.model';

import { Category } from 'src/app/shared/category.model';
import { CategoryService } from 'src/app/shared/category.service';
import { fbind } from 'q';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
@Component({
  selector: 'app-add-post-modal',
  templateUrl: './add-post-modal.component.html',
  styleUrls: ['./add-post-modal.component.css']
})
export class AddPostModalComponent implements OnInit {
  @ViewChild("AddPostForm") form: NgForm;
  categories: Category[];
  selectedImg;
  constructor(public modalRef: BsModalRef, public postService: PostService, private categoryService: CategoryService, private httpCLient: HttpClient) { }
  ngOnInit() {
    this.categories = this.categoryService.getCategories();
    this.categoryService.getCategoryEvent().subscribe((data) => this.categories = data);
  }
  close() {
    this.modalRef.hide();
  }

  onSub() {

    const fd = new FormData();
    const img = <File>this.selectedImg;
    fd.append('image', img, img.name);
    this.httpCLient.post('https://recipe-ae463.firebaseio.com/posters', fd).subscribe(res => console.log(res));
    // );


    // const id = this.postService.getPosts().length + 1;
    // const today = new Date(Date.now()).toLocaleDateString();
    // console.log(this.form);

    // const post = new Posts(id, this.form.value.title, this.form.value.category, today, img, this.form.value.editor1);
    // this.postService.updatePosts(post)
    // this.modalRef.hide();
  }
  onFileSelected(event) {
    console.log(event)
    this.selectedImg = event.target.files[0];
  }
}
