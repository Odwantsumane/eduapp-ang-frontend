import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthenticateService } from '../../services/authenticate.service';

@Component({
  selector: 'app-vertical-nav-bar',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './vertical-nav-bar.component.html',
  styleUrl: './vertical-nav-bar.component.css'
})
export class VerticalNavBarComponent implements OnInit {
  isLoggedIn : boolean = false;

  constructor(private authenticator: AuthenticateService) {}

  ngOnInit(): void {
    this.isLoggedIn = this.authenticator.isUserLoggedIn();
  } 
}
