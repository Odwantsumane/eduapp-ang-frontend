import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router'; 
import { AuthenticateService } from '../../services/authenticate.service';
import { VerticalNavBarComponent } from '../vertical-nav-bar/vertical-nav-bar.component';
import { RefreshService } from '../../services/refresh.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers: [RefreshService]
})
export class LoginComponent {

  isAuthenticated : boolean = false;
  incorrectCredentials : boolean = false;
  email : string = "";
  password : string = "";
  remember_me : boolean = false;
  submit_disabled : boolean = true;
  submitted: boolean = false;
  isUserLoggedIn : boolean = false;
  emailVerified: boolean = false; 

  constructor(private authenticator: AuthenticateService, private refreshService: RefreshService){} //private verticalComponentRefresh: VerticalNavBarComponent

  async handleLogin() {  

    if(this.email !== "" && this.isValidEmail(this.email)  && this.password !== "") { 
      try {
        this.isAuthenticated = await this.authenticator.LoginAuth(this.email, this.password);
      } catch (e) {
        console.log(e);
        this.isAuthenticated = false;
      }
      
      // this.emailVerified = this.isValidEmail(this.email);
      // clear fields 
      this.password = "";
      this.verify();
    } else {
      // display failed message
      // this.emailVerified = this.isValidEmail(this.email);
    } 
    this.submitted = true;
    if(this.isAuthenticated) this.refreshService.triggerRefresh();   
  }

  verify(): void {  
    this.submit_disabled = !(this.email !== "" && this.password !== "");
  }

  isValidEmail(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    return emailRegex.test(email);
  }

}
