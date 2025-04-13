import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthenticateService } from '../../services/authenticate.service';
import { RefreshService } from '../../services/refresh.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule, RouterLink, CommonModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent { 
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
  isAuthenticated : boolean = false;

  signInDetails = {
    name: "",
    surname: "",
    username: "", 
    password1: "",
    password2: "", 
    selectedSubject: new Array<string>,
    selectedDesignation: "None",
    selectedInstitution: "None",
    selectedCountry: "South Africa",

  } 

  constructor(private authMiddleware: AuthenticateService, private refreshService: RefreshService){}

  async handleSignUp() {
    this.submitted = true;

    // check if password match
    this.passwordMatch = this.signInDetails.password1 === this.signInDetails.password2;
    this.emailValid = this.isValidEmail(this.signInDetails.username);
    this.passwordAllowed = this.isPasswordAllowed(this.signInDetails.password1);

    if(this.passwordMatch && this.emailValid && this.passwordAllowed) {
      // signup
      // this.SignUpAuth

      var finalSignDetails  = {
        name: this.signInDetails.name,
        surname: this.signInDetails.surname,
        username: this.signInDetails.username, 
        password: this.signInDetails.password1, 
        selectedSubject: this.signInDetails.selectedSubject,
        selectedDesignation: this.signInDetails.selectedDesignation,
        selectedInstitution: this.signInDetails.selectedInstitution,
        selectedCountry: this.signInDetails.selectedCountry,
      }
      
      this.isAuthenticated = await this.authMiddleware.SignUpAuth(finalSignDetails);

      // clear the fields and verify
      if (this.isAuthenticated) this.refreshService.triggerRefresh();

      // this.signInDetails.name = ""; this.signInDetails.surname = ""; this.signInDetails.username = ""; this.signInDetails.password1 = ""; this.signInDetails.password2 = "";

      // this.verify();
      // this.passwordMatch = false;
      // this.submitted = false;
      // this.emailValid = false;
      // this.passwordAllowed = false;
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

    if (this.signInDetails.selectedDesignation === "Grade 12 Learner") {
      verify = true;
    } else if (this.signInDetails.selectedDesignation === "Tutor" && this.signInDetails.selectedSubject.findIndex(value => value === "None") === -1 && this.signInDetails.selectedSubject.length > 0) {
      verify = true;
    } else if (this.signInDetails.selectedDesignation === "Student" && this.signInDetails.selectedInstitution !== "None") {
      verify = true
    }

    this.submit_disabled = !(this.signInDetails.name !== "" && this.signInDetails.surname !== "" && this.signInDetails.username !== "" && this.signInDetails.password1 !== "" 
      && this.signInDetails.password2 !== "" && verify);   
  }

  isValidEmail(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    return emailRegex.test(email);
  }

  institutionStatus() : void {
    if(this.signInDetails.selectedDesignation === "Student") {
      this.institutionEnabled = true;
    }
    else {
      this.institutionEnabled = false;
      this.signInDetails.selectedInstitution = "None";
    }

    // access specialized status
    this.specilizeStatus()
    this.verify()
  }

  specilizeStatus() : void {
    if(this.signInDetails.selectedDesignation === "Tutor") {
      this.subjectEnabled = true;
    }
    else {
      this.subjectEnabled = false;
      this.signInDetails.selectedSubject = [];
    }
  }

  isPasswordAllowed(password: string): boolean {
    const passwordRegex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#\$%\^&\*])[a-zA-Z0-9!@#\$%\^&\*]{8,}$/;
    return passwordRegex.test(password);
  }

}
