import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'AdminApp';

  ngOnInit() {
    firebase.initializeApp({
      apiKey: "AIzaSyDeLMDEk_eZw-hUPBkBvxYkqmSndgxCHow",
      authDomain: "recipe-ae463.firebaseapp.com",
      databaseURL: "https://recipe-ae463.firebaseio.com",
      projectId: "recipe-ae463",
      storageBucket: "recipe-ae463.appspot.com",
      messagingSenderId: "585832535673"
    });
  }



  constructor(

  ) { }

}

