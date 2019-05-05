import { Posts } from './post.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { DataStorageService } from './data.service';
import { CategoryService } from './category.service';
@Injectable({ providedIn: 'root' })
export class PostService {
    posts: Posts[] = [];

    postEvent = new Subject<Posts[]>();

    constructor(private dataService: DataStorageService, private categoryService: CategoryService) { }
    getPosts() {
        if (this.posts && this.posts.length == 0) {
            this.dataService.getPosts().subscribe(e => {
                console.log("Retrieving Posts Was A success");


                if (e) {

                    this.posts = e;
                    this.postEvent.next(this.posts.slice());

                }
            }, x => console.log("Retrieving Posts caused an error " + x));;
        }
        else if (this.posts) {
            return this.posts.slice();
        }
    }
    updatePost(p: Posts, id: number) {
        // const postIndex = this.posts.findIndex(i => i.id == id);
        // this.posts[postIndex] = p;
        // this.postEvent.next(this.posts.slice());
        this.dataService.otherthing(p).subscribe(e => console.log(e), x => console.log(x));;
    }

    deletePost(id: number) {
        const postIndex = this.posts.findIndex(i => i.id == id);
        this.posts.splice(postIndex, 1)
        this.postEvent.next(this.posts.slice());
    }
    getPost(id: number): Posts {
        console.log(id);
        const post = this.posts.find(i => i.id == id);
        console.log(post)
        return post;
    }
    getPostEvent() {
        return this.postEvent.asObservable();
    }

    updatePosts(post: Posts) {

        this.categoryService.updateCategoryCount(post.category);
        this.posts.push(post);
        this.postEvent.next(this.posts.slice());
        this.dataService.addPosts(this.posts.slice()).subscribe(e => console.log("Adding Posts Was A success"), x => console.log(x));

    }

}

