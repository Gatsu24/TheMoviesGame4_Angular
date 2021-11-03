import { TMDBService } from './../../Services/tmdb.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  public myUser : FormGroup

  constructor(private _fb : FormBuilder, private _service : TMDBService) { }

  ngOnInit(): void {
    this.myUser = this._fb.group({
      usernameControl : [null, Validators.compose([Validators.required,Validators.minLength(2), Validators.maxLength(50)])],
      emailControl : [null, Validators.compose([Validators.required,Validators.minLength(2), Validators.maxLength(50), Validators.email])],
      passwordControl : [null, Validators.compose([Validators.required,Validators.minLength(2), Validators.maxLength(50)])],
      birthdayControl : [null, Validators.compose([Validators.required,Validators.minLength(10)])]
    })
  }


  onSubmit(){
    if(!this.myUser.valid) console.error("Formulaire invalide...");
    else {
      console.log(this.myUser);
      let user = {
        UserName : this.myUser.value["usernameControl"],
        Email : this.myUser.value["emailControl"],
        Password : this.myUser.value["passwordControl"],
        Birthday : this.myUser.value["birthdayControl"]
      };
      this._service.postUser(user).subscribe(
        data => {if(data[0]>0) console.log('saved');
      }
      )
    }
  }
}
