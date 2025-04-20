import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthenticateService } from '../../services/authenticate.service';
import { RefreshService } from '../../services/refresh.service';
import { Subscription } from 'rxjs';
import { User } from '../../services/userrequest.service';
import { app_version } from '../../const/utilities';

@Component({
  selector: 'app-vertical-nav-bar',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  providers: [],
  templateUrl: './vertical-nav-bar.component.html',
  styleUrl: './vertical-nav-bar.component.css'
})
export class VerticalNavBarComponent implements OnInit { 
  isLoggedIn : boolean = false;//Promise<boolean>;
  isAdmin:boolean = false;
  user : User | null = null;
  app_version : string = app_version;

  constructor(private authenticator: AuthenticateService) { 
    //this.isLoggedIn = new Promise((resolve, reject) => {});
  }

  async ngOnInit() {
    this.user = await this.authenticator.isLoggedInGetUser();
    this.isLoggedIn = await this.authenticator.isLoggedIn2();//this.authenticator.isUserLoggedIn(); 

    this.isAdmin = await this.authenticator.isAdmin();
  }  
}
