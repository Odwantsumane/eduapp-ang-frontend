import { Injectable } from '@angular/core';
import { ApiService, product } from './api.service';
import { CookieLocalService } from '../cookie-local.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  placeholder_product : product = {name: "", specs:[], createdBy:"", category:"", location:"", price:0, imageUrl:""}
  
    constructor(private folderApi: ApiService, private cookieservice: CookieLocalService) { } 
    
    async createNewProduct(newProduct:product): Promise<product> {
    
      try {
        const response = await this.folderApi
          .createProduct(newProduct, this.cookieservice.getCookie() || "notoken")
          .toPromise();
        return this.handleProductResp(response);
      } catch (error) {
        this.handleError(error);
        return this.placeholder_product; // Return a placeholder array on error
      }
    } 
  
    async updateProduct(id:string, newProduct:product): Promise<product> {
    
      try {
        const response = await this.folderApi
          .updateProduct(id, newProduct, this.cookieservice.getCookie() || "notoken")
          .toPromise();
        return this.handleProductResp(response);
      } catch (error) {
        this.handleError(error);
        return this.placeholder_product; // Return a placeholder array on error
      }
    } 
  
    async removeProduct(id:string): Promise<product> {
    
      try {
        const response = await this.folderApi
          .removeProduct(id, this.cookieservice.getCookie() || "notoken")
          .toPromise();
        return this.handleProductResp(response);
      } catch (error) {
        this.handleError(error);
        return this.placeholder_product; // Return a placeholder array on error
      }
    }
    
    handleProductResp(response: product | undefined): product {
  
      if(response === undefined) return this.placeholder_product;
      return response;
    }
     
    handleError(error: any) {
      console.log(`${new Date()} `+ `${error}`)
    } 
}
