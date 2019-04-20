import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { ValueTransformer } from "@angular/compiler/src/util";
import { Posts } from '../shared/post.model';
import { PostService } from '../shared/posts.service';

@Injectable()
export class PostResolver implements Resolve<Posts>
{
    constructor(private postService: PostService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Posts> | Promise<Posts> | Posts {

        console.log("in resolver")
        return this.postService.getPost(route.params['id']);

    }
}