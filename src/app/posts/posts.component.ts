import { Component, OnInit, OnDestroy } from '@angular/core';
import { PostService } from '../shared/posts.service';
import { Subscription } from 'rxjs';
import { Posts } from '../shared/post.model';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit, OnDestroy {

  constructor(private postService: PostService) { }
  posts: Posts[];
  private sub: Subscription;
  ngOnInit() {
    this.posts = this.postService.getPosts();
    this.sub = this.postService.getPostEvent().subscribe((list: Posts[]) => this.posts = list);
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
