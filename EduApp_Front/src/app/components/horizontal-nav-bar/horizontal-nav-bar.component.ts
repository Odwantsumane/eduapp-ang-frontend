import { Component } from '@angular/core';
import { CalendarComponent } from '../calendar/calendar.component';

@Component({
  selector: 'app-horizontal-nav-bar',
  standalone: true,
  imports: [CalendarComponent],
  templateUrl: './horizontal-nav-bar.component.html',
  styleUrl: './horizontal-nav-bar.component.css'
})
export class HorizontalNavBarComponent {

}
