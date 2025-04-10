import { Injectable } from '@angular/core';
import { User, UserrequestService } from '../userrequest.service';

@Injectable({
  providedIn: 'root'
})
export class ManagerService {

  PlaceHolderUser:User = {
    id:"", name:"", surname:"",username:"",password:"", createdAt:"", __v:"", unreadMsgs:[], selectedCountry:"", selectedDesignation:"", selectedInstitution:"",selectedSubject:[]
  }
  UserPHArray:Array<User> = [];

  constructor(private userservice:UserrequestService) { }

  async getAllUsers() : Promise<Array<User>> { 

    try {
      const response = await this.userservice
        .getAllUsers()
        .toPromise();
      return this.handleUsersResponse(response)
    } catch (error) {
      this.handleError(error);
      return this.UserPHArray; // Return a placeholder array on error
    }
  }

  handleUsersResponse(response:Array<User> | undefined) : Array<User> {

    if(response === undefined) return this.UserPHArray;
    return response;
  }

  handleError(error: any) {
    console.log("error: "+error);
  }
}
