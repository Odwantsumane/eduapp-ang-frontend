import { Component, OnInit } from '@angular/core';
import { CalendarComponent } from '../calendar/calendar.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { User} from '../../services/userrequest.service'; 
import { ManagerService } from '../../services/Aministration/manager.service';
import { NotificationService } from '../../services/Notification/notification.service';
import { notification } from '../../services/Notification/api.service';
import { AuthenticateService } from '../../services/authenticate.service';

@Component({
  selector: 'app-horizontal-nav-bar',
  standalone: true,
  imports: [CalendarComponent, FormsModule, CommonModule, RouterLink],
  templateUrl: './horizontal-nav-bar.component.html',
  styleUrl: './horizontal-nav-bar.component.css'
})
export class HorizontalNavBarComponent implements OnInit {

  list_users: Array<User> = [];
  list_notifications: Array<notification> = [];
  list_notifications_read: Array<notification> = [];
  list_notifications_unread: Array<notification> = [];
  current_user: string = "unknown";

  constructor(private userService: ManagerService, private notificationService: NotificationService, private autheservice:AuthenticateService) {

  }
  async ngOnInit() {
    // get users
    this.list_users = await this.userService.getAllUsers();
    this.current_user = (await this.autheservice.isLoggedInGetUser()).username || "unknown";

    // get notifications
    this.getAllNotifications();
  } 

  async getAllNotifications() {
    // filter
    this.list_notifications = await this.notificationService.getAll();

    if(this.list_notifications.length > 0) {
      this.list_notifications.forEach(notification => {
        if(this.current_user === notification.sentTo) {
          notification["sentBy"] = this.findUser(notification.sentBy);
          if (notification.read === "1") this.list_notifications_read.push(notification); 
          else this.list_notifications_unread.push(notification);  
        }
      });
    }
  }

  findUser(username:string) {
    var user_fullname = "unknown";

    this.list_users.forEach(user => {
      if(user.username === username) user_fullname = user.name + " " + user.surname;
    });

    return user_fullname;
  }

  findNotification(id:string):notification | null{
    var notification_obj = null;

    this.list_notifications.forEach(notification => {
      if(notification.id === id) notification_obj = notification;
    });

    return notification_obj;
  }

  async readNotification(id:string) {
    var notification = this.findNotification(id);

    if(notification) {
      notification.read = "1";
      await this.notificationService.updateNotification(id,notification);
    }
    else console.log("Failed to read the notification");
  }

}
