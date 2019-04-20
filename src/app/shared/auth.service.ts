import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
@Injectable({
    providedIn: 'root'
})

export class AuthService {

    constructor(private router: Router) { }
    token: string;
    signinUser(email: string, password: string) {

        var promise = new Promise((resolve, reject) => {
            firebase.auth().signInWithEmailAndPassword(email, password)
                .then(
                    response => {

                        firebase.auth().currentUser.getIdToken()
                            .then(
                                (token: string) => {
                                    this.token = token;
                                    resolve();
                                }

                            )
                    }
                )
                .catch((error) => {
                    console.log(error)
                    reject("Login Failed")
                }
                );
        });
        return promise;
    }
    signupUser(email: string, password: string) {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .catch(
                error => console.log(error)
            )
    }

    logout() {
        firebase.auth().signOut();
        this.token = null;
    }
    getToken() {
        firebase.auth().currentUser.getIdToken()
            .then(
                (token: string) => this.token = token
            );
        return this.token;
    }

    isAuthenticated() {
        return this.token != null;
    }

}