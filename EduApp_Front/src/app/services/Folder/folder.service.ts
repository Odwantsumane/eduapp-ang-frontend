import { Injectable } from '@angular/core';
import { ApiService, folder } from './api.service';
import { CookieLocalService } from '../cookie-local.service';

@Injectable({
  providedIn: 'root'
})
export class FolderService {

  placeholder_folder : folder = {_id:"",title: "", description:"", createdBy:"", course:""}
  placeholder_array : Array<folder> = [];

  constructor(private folderApi: ApiService, private cookieservice: CookieLocalService) { }

  async getAllFolders(): Promise<Array<folder>> {
  
    try {
      const response = await this.folderApi
        .getAll(this.cookieservice.getCookie() || "notoken")
        .toPromise();
      return this.handleArrayFolderResp(response);
    } catch (error) {
      this.handleError(error);
      return this.placeholder_array; // Return a placeholder array on error
    }
  } 

  async getFolder(id:string): Promise<folder> {
  
    try {
      const response = await this.folderApi
        .getFolder(id,this.cookieservice.getCookie() || "notoken")
        .toPromise();
      return this.handleFolderResp(response);
    } catch (error) {
      this.handleError(error);
      return this.placeholder_folder; // Return a placeholder array on error
    }
  } 

  async createNewFolder(newFolder:folder): Promise<folder> {
  
    try {
      const response = await this.folderApi
        .createFolder(newFolder, this.cookieservice.getCookie() || "notoken")
        .toPromise();
      return this.handleFolderResp(response);
    } catch (error) {
      this.handleError(error);
      return this.placeholder_folder; // Return a placeholder array on error
    }
  } 

  async updateFolder(id:string, newFolder:folder): Promise<folder> {
  
    try {
      const response = await this.folderApi
        .updateFolder(id, newFolder, this.cookieservice.getCookie() || "notoken")
        .toPromise();
      return this.handleFolderResp(response);
    } catch (error) {
      this.handleError(error);
      return this.placeholder_folder; // Return a placeholder array on error
    }
  } 

  async removeFolder(id:string): Promise<folder> {
  
    try { 
      const response = await this.folderApi
        .removeFolder(id, this.cookieservice.getCookie() || "notoken")
        .toPromise();
      return this.handleFolderResp(response);
    } catch (error) {
      this.handleError(error);
      return this.placeholder_folder; // Return a placeholder array on error
    }
  }

  handleArrayFolderResp(response: Array<folder> | undefined): Array<folder> {

    if(response === undefined) return this.placeholder_array;
    return response;
  }
  
  handleFolderResp(response: folder | undefined): folder {

    if(response === undefined) return this.placeholder_folder;
    return response;
  }
   
  handleError(error: any) {
    console.log(`${new Date()} `+ `${error}`)
  } 
}
