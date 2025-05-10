import { Injectable } from '@angular/core';
import { ApiService, notification, result } from './api.service';
import { CookieLocalService } from '../cookie-local.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationService { 

  placeholder_notification : notification = {id:"",sentBy: "", sentTo:"", category:"", createdAt:"", updatedAt:"", read:""};
  placeholder_array : Array<notification> = [];
    
      constructor(private notificationApi: ApiService, private cookieservice: CookieLocalService) { } 
  
      async getAll() : Promise<Array<notification>> {
        try {
          const response = await this.notificationApi
            .getAll(this.cookieservice.getCookie() || "notoken") 
            .toPromise();
          return this.handleNotificationRespAll(response);
        } catch (error) {
          this.handleError(error);
          return this.placeholder_array; // Return a placeholder array on error
        }
      }
      
      async createNewNotification(newNotification:notification): Promise<notification> {
      
        try {
          const response = await this.notificationApi
            .createNotification(newNotification, this.cookieservice.getCookie() || "notoken")
            .toPromise();
          return this.handleNotificationResp(response);
        } catch (error) {
          this.handleError(error);
          return this.placeholder_notification; // Return a placeholder array on error
        }
      } 
    
      async updateNotification(id:string, newProduct:notification): Promise<notification> {
      
        try {
          const response = await this.notificationApi
            .updateNotification(id, newProduct, this.cookieservice.getCookie() || "notoken")
            .toPromise();
          return this.handleNotificationResp(response);
        } catch (error) {
          this.handleError(error);
          return this.placeholder_notification; // Return a placeholder array on error
        }
      } 
    
      async removeNotification(id:string): Promise<notification> {
      
        try {
          const response = await this.notificationApi
            .removeNotification(id, this.cookieservice.getCookie() || "notoken")
            .toPromise();
          return this.handleNotificationResp(response);
        } catch (error) {
          this.handleError(error);
          return this.placeholder_notification; // Return a placeholder array on error
        }
      }
      
      handleNotificationResp(response: result | undefined): notification {
    
        if(response === undefined) return this.placeholder_notification;
        return response.result[0];
      }
  
      handleNotificationRespAll(response: Array<notification> | undefined): Array<notification> {
    
        if(!response) return this.placeholder_array;
        return response;
      }
       
      handleError(error: any) {
        console.log(`${new Date()} `+ `${error}`)
      }
}
