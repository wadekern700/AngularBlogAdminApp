import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Users } from './users.model';
import { resolve } from 'q';
import { Category } from './category.model';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Posts } from './post.model';
import *  as firebase from 'firebase';
import { promise } from 'protractor';
@Injectable({ providedIn: 'root' })

export class DataStorageService {
    constructor(private http: HttpClient, private authService: AuthService
    ) { }

    storeUsers(User: Users[]) {
        console.log(User);

        const req = new HttpRequest('PUT', 'https://recipe-ae463.firebaseio.com/users.json', User,
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
        return this.http.get<Users[]>('https://recipe-ae463.firebaseio.com/users.json').pipe(
            map((results => { console.log(results); return results; })),
            catchError((err => {
                return throwError(new Error(err));
            })));
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

    getPosts() {
        return this.http.get<Posts[]>('https://recipe-ae463.firebaseio.com/posts.json').pipe(
            map((results => { console.log(results); return results; })),
            catchError((err => {
                return throwError(new Error(err));
            })));
    }
    // getPosts() {
    //     return this.http.get<Posts[]>('http://localhost:8080/legostore/api').pipe(
    //         map((results => { console.log(results); return results; })),
    //         catchError((err => {
    //             return throwError(new Error(err));
    //         })));
    // }

    addPosts(posts: Posts[]) {

        console.log(posts);

        const req = new HttpRequest('PUT', 'https://recipe-ae463.firebaseio.com/posts.json', posts)
        return this.http.request(req).pipe(
            catchError((err => {
                console.log(err);
                return throwError(new Error(err));
            }))
        );
    }
    otherthing(post: Posts) {



        const req = new HttpRequest('PATCH', 'https://recipe-ae463.firebaseio.com/posts/0/.json', post)
        return this.http.request(req).pipe(
            catchError((err => {
                console.log(err);
                return throwError(new Error(err));
            }))
        );
    }
    // curl -X PATCH -d '{"last":"Jones"}' \
    // 'https://[PROJECT_ID].firebaseio.com/users/jack/name/.json'
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