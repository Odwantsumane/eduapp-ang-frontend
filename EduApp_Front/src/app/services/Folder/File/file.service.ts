import { Injectable } from '@angular/core';
import { ApiService, folder } from '../api.service';
import { CookieLocalService } from '../../cookie-local.service';
import { ApiFileService, file } from './api.file.service'; ;

@Injectable({
  providedIn: 'root'
})
export class FileService {

  /*
  public _id:string, public name:string, public folderId:string, public createdBy:string, 
        public group:string, public type:string, public createdAt:string, public filepath:string
  */

  placeholder_file : file = {_id:"",name: "", folderId:"", createdBy:"", group:"", type:"", createdAt:"", filepath:""};
  toReturn : file = {_id:"",name: "", folderId:"", createdBy:"", group:"", type:"", createdAt:"", filepath:""};
  placeholder_array : Array<folder> = [];

  constructor(private folderApi: ApiService, private cookieservice: CookieLocalService, private fileApi: ApiFileService) { }

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

//   async getFolder(id:string): Promise<folder> {
  
//     try {
//       const response = await this.folderApi
//         .getFolder(id,this.cookieservice.getCookie() || "notoken")
//         .toPromise();
//       return this.handleFolderResp(response);
//     } catch (error) {
//       this.handleError(error);
//       return this.placeholder_folder; // Return a placeholder array on error
//     }
//   } 


  async fileUpload(file: File, metadata: file) : Promise<file | null> {
    const response = await this.upload(file);

    if (response){
      ///const to_return = {_id:"",name: "", folderId:"", createdBy:"", group:"", type:"", createdAt:"", filepath:""} 
      const finalResponse = await this.createNewFolder(metadata);
      return finalResponse;
    }
;
    return this.placeholder_file;
  }

  async upload(file:File): Promise<string> {
  
    try {
      const response = await this.fileApi
        .uploadFile(file, this.cookieservice.getCookie() || "notoken") 
        .toPromise();
      return this.handleFileResp(response);
    } catch (error) {
      this.handleError(error);
      return ""; // Return a placeholder array on error
    }
  } 

  async createNewFolder(file:file): Promise<file | null> {
  
    try {
      const response = await this.fileApi
        .createFile(file, this.cookieservice.getCookie() || "notoken")
        .toPromise();
      return this.handleFileResp2(response);
    } catch (error) {
      this.handleError(error);
      return  null; // Return a placeholder array on error
    }
  } 

//   async removeFolder(id:string): Promise<folder> {
  
//     try { 
//       const response = await this.folderApi
//         .removeFolder(id, this.cookieservice.getCookie() || "notoken")
//         .toPromise();
//       return this.handleFolderResp(response);
//     } catch (error) {
//       this.handleError(error);
//       return this.placeholder_folder; // Return a placeholder array on error
//     }
//   }

  handleArrayFolderResp(response: Array<folder> | undefined): Array<folder> {

    if(response === undefined) return this.placeholder_array;
    return response;
  }
  
  handleFileResp(response: string |undefined): string {

    if(response === undefined) return "";
    return response;
  }

  handleFileResp2(response: file | undefined): file | null {

    if(response === undefined) return null;
    return response;
  }
   
  handleError(error: any) {
    console.log(`${new Date()} `+ `${error}`)
  } 
}