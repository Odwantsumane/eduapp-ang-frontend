import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { User } from '../../../services/userrequest.service';
import { ManagerService } from '../../../services/Aministration/manager.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-manager',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './manager.component.html',
  styleUrl: './manager.component.css'
})
export class ManagerComponent implements OnInit{

  users : Array<User> = [];

  constructor(private managerservice: ManagerService) {
  }
  
  async ngOnInit() {
    this.users =  await this.managerservice.getAllUsers();
  }


}
