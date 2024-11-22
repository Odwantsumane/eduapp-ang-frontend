import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { User } from '../../../services/userrequest.service';
import { ManagerService } from '../../../services/Aministration/manager.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UpdateUsersModalComponent } from './update-users-modal/update-users-modal.component';
import { RemoveUsersModalComponent } from './remove-users-modal/remove-users-modal.component';

@Component({
  selector: 'app-manager',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule, UpdateUsersModalComponent, RemoveUsersModalComponent],
  templateUrl: './manager.component.html',
  styleUrl: './manager.component.css'
})
export class ManagerComponent implements OnInit{

  users : Array<User> = [];
  name_:string="";

  user_ = {
    name_: "",
    surname_: "",
    username_: "",
    createdAt_: "",
    superuser_: false,
    manageruser_: false,
    normaluser_: true


  }

  constructor(private managerservice: ManagerService) {
  }
  
  async ngOnInit() {
    this.users =  await this.managerservice.getAllUsers();
  }

  getUser(id:string) {
    if(this.users){
      
      const index = this.users.findIndex(x => x._id === id); 
      if(index !== -1) {
        this.user_.name_ = this.users[index].name;
        this.user_.surname_ = this.users[index].surname;
        this.user_.username_ = this.users[index].username;
        this.user_.createdAt_ = ''; //this.users[index].createdAt;
        // this.user.normaluser = this.users[index].name; 
      }
      else console.log("user was not found");
    }
    else console.log("array has no data");
  }


}
