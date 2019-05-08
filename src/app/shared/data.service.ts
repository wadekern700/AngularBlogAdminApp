import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Users } from './users.model';
import { Category } from './category.model';
import { retry, catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Posts } from './post.model';
import *  as firebase from 'firebase';
@Injectable({ providedIn: 'root' })

export class DataStorageService {

    constructor(private http: HttpClient, private authService: AuthService
    ) { }

    storeUsers(User: Users) {
        console.log(User);

        const req = new HttpRequest('POST', "http://localhost:8080/api/authors", User,
            {
                reportProgress: true
            });
        return this.http.request(req).pipe(
            catchError((err => {
                return throwError(new Error(err));
            }))
        );
    }

    getUsers() {
        return this.http.get<Users[]>('http://localhost:8080/api/authors').pipe(
            map((results => { console.log(results); return results; })),
            catchError((err => {
                return throwError(new Error(err));
            })));
    }

    deleteUsers(id: String) {
        this.http.delete("http://localhost:8080/api/authors/delete/" + id).subscribe();
    }

    updateUsers(user: Users) {
        console.log(user);
        const req = new HttpRequest('PUT', "http://localhost:8080/api/authors", user)
        return this.http.request(req).pipe(
            catchError((err => {
                console.log(err);
                return throwError(new Error(err));
            }))
        );
    }
    addCategories(categories: Category[]) {

        console.log(categories);

        const req = new HttpRequest('PUT', 'https://recipe-ae463.firebaseio.com/categories.json', categories)
        return this.http.request(req).pipe(
            catchError((err => {
                return throwError(new Error(err));
            }))
        );
    }


    getCategories() {
        return this.http.get<Category[]>('https://recipe-ae463.firebaseio.com/categories.json').pipe(
            map((results => {
                console.log(results);

                return results;

            })),
            catchError((err => {
                return throwError(new Error(err));
            })));
    }

    // updatePosts(p: any, id: string) {
    //     return this.http.patch('http://localhost:8080/posts/api/update', p, { params: new HttpParams().set('id', id) }).pipe(
    //         map((results => {
    //             console.log(results);
    //             results.map((ps: any) => {

    //                 ps.category = ps.category.name;

    //                 return ps;
    //             })
    //             console.log(results);
    //             return results;
    //         })),
    //         catchError((err => {
    //             return throwError(new Error(err));
    //         })));
    // }

    getPosts() {
        return this.http.get<Posts[]>('http://localhost:8080/posts/api').pipe(
            map((results => { console.log(results); return results; })),
            catchError((err => {
                return throwError(new Error(err));
            })));
    }
    addPosts(posts: Posts) {

        console.log(posts);

        const req = new HttpRequest('POST', 'http://localhost:8080/posts/api/addPost', posts);
        console.log(req);

        return this.http.request(req).pipe(
            catchError((err => {
                console.log(err);
                return throwError(new Error(err));
            }))
        );
    }
    updatePost(post: any, id: string) {
        console.log(post);
        const req = new HttpRequest('POST', "http://localhost:8080/posts/api/update", post)
        return this.http.request(req).pipe(
            catchError((err => {
                console.log(err);
                return throwError(new Error(err));
            }))
        );
    }
    deletePost(id: string) {
        console.log("in delete post");
        console.log(id);
        this.http.delete("http://localhost:8080/posts/api/delete/" + id).subscribe();
    }
    uploadPostPicture(file: File): any {

        const metaData = { 'contentType': file.type };

        const storageRef = firebase.storage().ref().child('photos/featured/' + file.name);

        const promise = new Promise((resolve, reject) => {
            storageRef.put(file, metaData).then((snapshot) => {
                resolve(storageRef.getDownloadURL())
            });

        });


        return promise;

    }
}