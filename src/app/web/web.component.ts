import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import axios from 'axios';
@Component({
  selector: 'web',
  templateUrl: './web.component.html',
  styleUrls: ['./web.component.css']
})
export class WebComponent implements OnInit {
  cheffLoaded:boolean = false;
  isWait: boolean  = false;
  cheffs: any;
  constructor(private snackBar: MatSnackBar) { }

  onRegister(form) {
    console.log(form.value);

    this.isWait = true;

    let content = {
      email: form.value.email,
      password: form.value.password
    }
    axios.post('https://ichef-14324.firebaseapp.com/api/v1/register', content)
      .then(serverResponse => {
        this.isWait = false;
        this.snackBar.open(serverResponse.data.body.message, "OK", {

        });

      })
      .catch(error => {
        this.isWait = false;
        console.log(error);
        this.snackBar.open('An unexpected error occured', "OK", {

        });

      })


  }
  ngOnInit() {

     axios.get('https://ichef-14324.firebaseapp.com/api/v1/readcheffs')
    .then(serverResponse => {
        this.cheffs = serverResponse.data.body;
        console.log(this.cheffs);
        this.cheffLoaded = true;
    })
    .catch(error => {

       console.log(error);
      

    })
  }

}
