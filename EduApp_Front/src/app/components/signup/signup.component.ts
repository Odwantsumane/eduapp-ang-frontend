import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule, RouterLink, CommonModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  email : string = "";
  password : string = "";
  password2 : string = "";
  name : string = "";
  surname : string = "";
  institution : string = "";

  startDetails : boolean = true;
  moreDetails : boolean = false;

  remember_me : boolean = false;

  handleSignUp(): void {
    console.log("Signed up");
  }

  next(): void {
    this.startDetails = false;
    this.moreDetails = true;
  }

  previous(): void {
    this.startDetails = true;
    this.moreDetails = false;
  }

}
