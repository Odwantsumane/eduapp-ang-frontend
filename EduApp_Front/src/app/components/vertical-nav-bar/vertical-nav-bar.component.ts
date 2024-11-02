import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-vertical-nav-bar',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './vertical-nav-bar.component.html',
  styleUrl: './vertical-nav-bar.component.css'
})
export class VerticalNavBarComponent {

}
