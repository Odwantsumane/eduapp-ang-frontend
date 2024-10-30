import { Component } from '@angular/core';
import { CalendarComponent } from '../calendar/calendar.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-horizontal-nav-bar',
  standalone: true,
  imports: [CalendarComponent, FormsModule, CommonModule],
  templateUrl: './horizontal-nav-bar.component.html',
  styleUrl: './horizontal-nav-bar.component.css'
})
export class HorizontalNavBarComponent {

}
