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
      console.log(list);
      this.posts[0].blogPost = " sit, amet consectetur adipisicing elit. Autem explicabo numquam minima facilis ipsam? Obcaecati nobis mollitia architecto animi undenulla, maiores modi accusantium beatae voluptatum inventore reprehenderit in quas doloribus eius delectus ipsum qui alias hic, rem quam praesentium numquam.Error incidunt fugiat consectetur facere totam dolorem accusamus nihil ? "
    });
  }

}
