import { Component, OnInit } from '@angular/core';
import { CalendarComponent } from '../calendar/calendar.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { User} from '../../services/userrequest.service'; 
import { ManagerService } from '../../services/Aministration/manager.service';

@Component({
  selector: 'app-horizontal-nav-bar',
  standalone: true,
  imports: [CalendarComponent, FormsModule, CommonModule, RouterLink],
  templateUrl: './horizontal-nav-bar.component.html',
  styleUrl: './horizontal-nav-bar.component.css'
})
export class HorizontalNavBarComponent implements OnInit {

  list_users: Array<User> = [];

  constructor(private userService: ManagerService) {

  }
  async ngOnInit() {
    this.list_users = await this.userService.getAllUsers();
  } 

}
