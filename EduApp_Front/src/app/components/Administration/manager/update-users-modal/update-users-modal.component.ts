import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../../../services/userrequest.service';
import { findIndex } from 'rxjs';

class tempUser {
  constructor(public name_:string,public createdAt_:string, public surname_:string, public username_:string, public superuser_:boolean, public manageruser_:boolean, public normaluser_:boolean){}
}

@Component({
  selector: 'app-update-users-modal',
  standalone: true,
  imports: [],
  templateUrl: './update-users-modal.component.html',
  styleUrl: './update-users-modal.component.css'
})
export class UpdateUsersModalComponent implements OnInit{
  
  @Input() user_: tempUser = {name_:"",surname_:"",username_:"",superuser_:false,manageruser_:false,normaluser_:false, createdAt_:""};

  // @Input() name_: string = "";

  // name_:string="";

  ngOnInit(): void {
    // if(this.name_ !== "") console.log("names: "+this.name_);
  }

  // getUser(id:string) {
  //   if(this.userArray){
  //     const index = this.userArray.findIndex(x => x._id === id);
  //     if(index) this.name_ = this.userArray[index].name;
  //     else console.log("user was not found");
  //   }
  //   else console.log("array has no data");
  // }
}
