import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router'; 
import { AuthenticateService } from '../../services/authenticate.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
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

  constructor(private authenticator: AuthenticateService){}

  async handleLogin() { 

    if(this.email !== "" && this.isValidEmail(this.email)  && this.password !== "") {
      this.isAuthenticated = await this.authenticator.LoginAuth(this.email, "1234"); //this.password

      // clear fields
      this.email = ""; this.password = "";
      this.verify();
    } else {
      // display failed message
    } 
  }

  verify(): void { 
    this.submit_disabled = !(this.email !== "" && this.password !== "");
  }

  isValidEmail(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    return emailRegex.test(email);
  }

}
