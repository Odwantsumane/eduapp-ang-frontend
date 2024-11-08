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
  submit_disabled : boolean = true;
  passwordMatch : boolean = false;
  submitted : boolean = false;
  emailValid : boolean = false;
  passwordAllowed : boolean = false;
  institutionEnabled : boolean = false;
  subjectEnabled : boolean = false;
  selectedSubject : string = "None";
  selectedDesignation : string =  "None";
  selectedInstitution : string =  "None";
  selectedCountry : string = "South Africa";

  handleSignUp(): void {
    this.submitted = true;

    // check if password match
    this.passwordMatch = this.password === this.password2;
    this.emailValid = this.isValidEmail(this.email);
    this.passwordAllowed = this.isPasswordAllowed(this.password);

    if(this.passwordMatch && this.emailValid && this.passwordAllowed) {
      // clear the fields and verify
      this.name = ""; this.surname = ""; this.email = ""; this.password = ""; this.password2 = "";

      this.verify();
      this.passwordMatch = false;
      this.submitted = false;
      this.emailValid = false;
      this.passwordAllowed = false;
    }
    
  }

  next(): void {
    this.startDetails = false;
    this.moreDetails = true;
  }

  previous(): void {
    this.startDetails = true;
    this.moreDetails = false;
  }

  verify(): void { 

    var verify = false;

    if (this.selectedDesignation === "Grade 12 Learner") {
      verify = true;
    } else if (this.selectedDesignation === "Tutor" && this.selectedSubject !== "None") {
      verify = true;
    } else if (this.selectedDesignation === "Student" && this.selectedInstitution !== "None") {
      verify = true
    }

    this.submit_disabled = !(this.name !== "" && this.surname !== "" && this.email !== "" && this.password !== "" 
      && this.password2 !== "" && verify);   
  }

  isValidEmail(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    return emailRegex.test(email);
  }

  institutionStatus() : void {
    if(this.selectedDesignation === "Student") {
      this.institutionEnabled = true;
    }
    else {
      this.institutionEnabled = false;
      this.selectedInstitution = "None";
    }

    // access specialized status
    this.specilizeStatus()
    this.verify()
  }

  specilizeStatus() : void {
    if(this.selectedDesignation === "Tutor") {
      this.subjectEnabled = true;
    }
    else {
      this.subjectEnabled = false;
      this.selectedSubject = "None";
    }
  }

  isPasswordAllowed(password: string): boolean {
    const passwordRegex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#\$%\^&\*])[a-zA-Z0-9!@#\$%\^&\*]{8,}$/;
    return passwordRegex.test(password);
  }

}
