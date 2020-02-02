import { Component, OnInit } from "@angular/core";
import * as firebase from "firebase";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  title = "miseoAngular";

  constructor() {
    const firebaseConfig = {
      apiKey: "****************************",
      authDomain: "miseofirebase.firebaseapp.com",
      databaseURL: "https://miseofirebase.firebaseio.com",
      projectId: "miseofirebase",
      storageBucket: "miseofirebase.appspot.com",
      messagingSenderId: "***********",
      appId: "**************"
    };

    firebase.initializeApp(firebaseConfig);
  }

  ngOnInit() {
    window.addEventListener("beforeunload", function(e) {
      var confirmationMessage = "o/";
      console.log("confgd");
      e.returnValue = confirmationMessage; // Gecko, Trident, Chrome 34+
      return confirmationMessage; // Gecko, WebKit, Chrome <34
    });
  }
}
