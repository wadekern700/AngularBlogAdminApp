import { Component, OnInit } from '@angular/core';
import { PostService } from '../shared/posts.service';
import { Posts } from '../shared/post.model';



@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  constructor(private postService: PostService) { }
  posts: Posts[];
  ngOnInit() {
    this.posts = this.postService.getPosts();
    this.postService.getPostEvent().subscribe((list: Posts[]) => {
      this.posts = list;
      console.log(this.posts)

    });
  }

}
