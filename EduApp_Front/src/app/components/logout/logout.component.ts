import { Component, OnInit } from '@angular/core';
import { AuthenticateService } from '../../services/authenticate.service';

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css'
})
export class LogoutComponent implements OnInit{

  constructor(private authenticator: AuthenticateService){};

  ngOnInit(): void { 
    this.authenticator.loggout(); 
  }

}
