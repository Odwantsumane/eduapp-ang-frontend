import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

export class file {
    constructor(public _id:string, public name:string, public folderId:string, public createdBy:string, 
        public group:string, public type:string, public createdAt:string, public filepath:string){}
}

export class uploadResp {
    constructor(public message:string, public path:string){}
}

@Injectable({
    providedIn: 'root'
})

export class ApiFileService {
    maxAge = 3 * 24 * 60 * 60;
  

    Headers: HttpHeaders = new HttpHeaders(); //{Authorization: this.createBasicAuthHeaders()}, Cookie: `jwt=${this.createToken("myid")}`
    url : string = "http://localhost:4001/folder/file";
    upload_url : string = "http://localhost:4001/upload";

    constructor(private http: HttpClient) { }

    getAll(token:string) {
        this.Headers = new HttpHeaders ({Authorization: this.createBasicAuthHeaders(), Cookie: `jwt=${token}`});
        return this.http.get<Array<file>>(`${this.url}/all`,  {headers: this.Headers, withCredentials: true}); 
    }

    getAllFiltered(token:string, id:string) {
        this.Headers = new HttpHeaders ({Authorization: this.createBasicAuthHeaders(), Cookie: `jwt=${token}`});
        return this.http.get<Array<file>>(`${this.url}/all/filtered/${id}`,  {headers: this.Headers, withCredentials: true}); 
    }
    
    getFile(id: string, token:string) {
        this.Headers = new HttpHeaders ({Authorization: this.createBasicAuthHeaders(), Cookie: `jwt=${token}`});
        return this.http.get<file>(`${this.url}/${id}`,  {headers: this.Headers, withCredentials: true});
    }
    
    uploadFile(file: File, token:string) {
        const formData = new FormData();
        formData.append('File', file); // 'File' matches the key expected by formidable

        this.Headers = new HttpHeaders ({Authorization: this.createBasicAuthHeaders(), Cookie: `jwt=${token}`});
        return this.http.post<uploadResp>(`${this.upload_url}`, formData, {headers: this.Headers, withCredentials: true});
    }
    createFile(file: file, token:string) {
        this.Headers = new HttpHeaders ({Authorization: this.createBasicAuthHeaders(), Cookie: `jwt=${token}`});
        return this.http.post<file>(`${this.url}/create`, file, {headers: this.Headers, withCredentials: true});
    }
    
    //   updateFolder(id: string, folder: folder, token:string) {
    //     this.Headers = new HttpHeaders ({Authorization: this.createBasicAuthHeaders(), Cookie: `jwt=${token}`});
    //     return this.http.put<folder>(`${this.url}/update/${id}`, folder, {headers: this.Headers, withCredentials: true});
    //   }
    
    removeFile(id: string, token:string) {
    this.Headers = new HttpHeaders ({Authorization: this.createBasicAuthHeaders(), Cookie: `jwt=${token}`});
    return this.http.delete<file>(`${this.url}/remove/${id}`, {headers: this.Headers, withCredentials: true});
    }
    
    createBasicAuthHeaders() { ;
        let username = "user";
        let password = "password"; 
        let BasicAuthHeader = "";
    
        if (typeof window !== 'undefined') {
          BasicAuthHeader = "Basic " + window.btoa(username + ":" + password);
        } else {
          console.error("Window is not defined. Ensure you're running this in a browser.");
        } 
        return BasicAuthHeader;
    }
}