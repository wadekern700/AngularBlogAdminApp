import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/shared/posts.service';
import { ActivatedRoute, Router } from '@angular/router';
import { map, take, first } from 'rxjs/operators'
import { Posts } from 'src/app/shared/post.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { routerNgProbeToken } from '@angular/router/src/router_module';
@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit {

  constructor(private postService: PostService, private route: ActivatedRoute, private router: Router) { }
  post: Posts;
  EditPostForm: FormGroup;
  ngOnInit() {
    console.log("in init")
    this.route.data.subscribe((val) => {
      console.log(val)
      this.post = val["posts"];
      this.initForm();
    });
  }
  initForm() {
    console.log("init form")

    this.EditPostForm = new FormGroup({
      'title': new FormControl(this.post.title, Validators.required),
      'category': new FormControl(this.post.category, Validators.required),
      'editor1': new FormControl(this.post.blogPost, Validators.required)
    });
  }
  onSub() {
    console.log(this.post)
    this.postService.updatePost(this.EditPostForm.value, this.post.id)
    this.router.navigate(['/']);
  }
  onDelete() {
    this.postService.deletePost(this.post.id)
    this.router.navigate(['/']);
  }
}
