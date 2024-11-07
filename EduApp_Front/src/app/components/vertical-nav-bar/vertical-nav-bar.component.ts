import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-vertical-nav-bar',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './vertical-nav-bar.component.html',
  styleUrl: './vertical-nav-bar.component.css'
})
export class VerticalNavBarComponent {

}
