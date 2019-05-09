import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/shared/posts.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Posts } from 'src/app/shared/post.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Category } from 'src/app/shared/category.model';
import { CategoryService } from 'src/app/shared/category.service';
@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit {

  constructor(private postService: PostService, private route: ActivatedRoute, private router: Router, private categoryService: CategoryService) { }
  post: Posts;
  categories: Category[];
  EditPostForm: FormGroup;
  ngOnInit() {
    this.route.data.subscribe((val) => {
      this.post = val["posts"];
      this.initForm();
    });
    this.categories = this.categoryService.getCategories();
  }
  initForm() {
    console.log(this.post);
    this.EditPostForm = new FormGroup({
      'title': new FormControl(this.post.title, Validators.required),
      'author': new FormControl(this.post.author, Validators.required),
      'category': new FormControl(this.post.category, Validators.required),
      'blogPost': new FormControl(this.post.blogPost, Validators.required)
    });
  }
  onSub() {
    console.log(this.post)
    console.log(this.EditPostForm);
    this.post.blogPost = this.EditPostForm.value.blogPost;
    this.post.category = this.EditPostForm.value.category;
    this.post.title = this.EditPostForm.value.title;
    this.post.author = this.EditPostForm.value.author;
    this.postService.updatePost(this.post, this.post.id)
    this.router.navigate(['/dashboard']);
  }
  onDelete() {
    this.postService.deletePost(this.post.id.toString())
    this.router.navigate(['/dashboard']);
  }
}
