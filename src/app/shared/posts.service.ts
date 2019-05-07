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
        console.log(p);
        // const obj = {
        //     "blogPlost": "hey this would be really cool and really really exciting if it really really worked",
        //     "category": { "name": "fucku" },
        //     "date": "2003/09/09",
        //     "id": "5cd0db092fc7451644b280c5",
        //     "imgRef": "https://firebasestorage.googleapis.com/v0/b/recipe-ae463.appspot.com/o/photos%2Ffeatured%2FIMG_1046%20-%20Copy.JPG?alt=media&token=fa1d4550-8e28-4b17-85c2-954ee1adace7",
        //     "title": "Wades First sdasdasdasdasdasdst"
        // }
        this.dataService.updatePost(p, id.toString()).subscribe(e => console.log(e), x => console.log(x));;
    }

    deletePost(id: string) {
        this.dataService.deletePost(id)
        const postIndex = this.posts.findIndex(i => i.id.toString() == id);
        this.posts.splice(postIndex, 1)
        this.postEvent.next(this.posts.slice());
        this.dataService.deletePost(id);
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
        console.log(post);
        // this.categoryService.updateCategoryCount(post.category);
        this.posts.push(post);
        this.postEvent.next(this.posts.slice());
        this.dataService.addPosts(this.posts.slice()).subscribe(e => console.log("Adding Posts Was A success"), x => console.log(x));

    }

}

