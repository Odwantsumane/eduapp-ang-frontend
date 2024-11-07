import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  email : string = "";
  password : string = "";
  remember_me : boolean = false;

  constructor(){}

  handleLogin(): void {
    console.log(`email: ${this.email}` + ` ` + `password: ${this.password}`);

    // clear fields
    this.email = ""; this.password = "";
  }

}
