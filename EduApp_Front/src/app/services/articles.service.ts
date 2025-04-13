import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

export class Article {
  constructor(public _id:string, public title:string,public description:string,public markdown:string,public likes:number,public dislikes:number,
    public createdAt:string,public createdBy:string,public whoLiked:string[],public whoDisliked:string[],public mediaUrl:string,
    public mediaUrlName:string,public __v:number,public mediatype:string){}
}

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {

  url : string = "http://localhost:4001/articles";
  Headers: HttpHeaders = new HttpHeaders (); //, Cookie: `jwt=${this.createToken("myid")}`

  constructor(private http: HttpClient) { }


  getAllArticles(token: string) {
    this.Headers = new HttpHeaders ({Authorization: this.createBasicAuthHeaders(), Cookie: `jwt=${token}`});
    return this.http.get<Array<Article>>(`${this.url}/getAll_mysql`,  {headers: this.Headers, withCredentials: true});
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
