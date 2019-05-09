import { Component, OnInit, ViewChild } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { NgForm } from '@angular/forms';
import { PostService } from 'src/app/shared/posts.service';
import { Posts } from 'src/app/shared/post.model';

import { Category } from 'src/app/shared/category.model';
import { CategoryService } from 'src/app/shared/category.service';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { DataStorageService } from 'src/app/shared/data.service';

@Component({
  selector: 'app-add-post-modal',
  templateUrl: './add-post-modal.component.html',
  styleUrls: ['./add-post-modal.component.css']
})
export class AddPostModalComponent implements OnInit {
  @ViewChild("AddPostForm") form: NgForm;
  categories: Category[];
  selectedImg: File;
  constructor(public modalRef: BsModalRef, public postService: PostService, private categoryService: CategoryService, private httpCLient: HttpClient, private dataService: DataStorageService) { }
  ngOnInit() {
    this.categories = this.categoryService.getCategories();
    this.categoryService.getCategoryEvent().subscribe((data) => this.categories = data);
  }
  close() {
    this.modalRef.hide();
  }

  onSub() {

    // const fd = new FormData();
    // const img = <File>this.selectedImg;
    // fd.append('image', img, img.name);
    // this.httpCLient.post('https://recipe-ae463.firebaseio.com/posters', fd).subscribe(res => console.log(res));
    // // );

    this.dataService.uploadPostPicture(this.selectedImg).then((uploadSnapshot) => {
      console.log("in the post add img")
      console.log(uploadSnapshot)

      const today = new Date(Date.now()).toLocaleDateString();
      var id = 0;

      let postPosts = new Posts(null, this.form.value.title, this.form.value.category, today, uploadSnapshot.toString(), this.form.value.editor1, this.form.value.author);
      postPosts = JSON.parse(JSON.stringify(postPosts));
      this.postService.addPost(postPosts)
      this.modalRef.hide();
    });




  }

  onFileSelected(event) {
    console.log(event)
    this.selectedImg = event.target.files[0];
  }
}
