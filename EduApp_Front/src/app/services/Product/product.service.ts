import { Injectable } from '@angular/core';
import { ApiService, product } from './api.service';
import { CookieLocalService } from '../cookie-local.service';
import { uploadResp } from './api.service';
import { file } from '../Folder/File/api.file.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  placeholder_product : product = {name: "", specs:[], createdBy:"", category:"", location:"", price:0, imageUrl:""}
  
    constructor(private productApi: ApiService, private cookieservice: CookieLocalService) { } 

    async fileUpload(file: File, metadata: product) : Promise<product | null> {
      const response = await this.upload(file);
      if(response?.path) metadata.imageUrl = response?.path;
  
      if (response){ 
        const finalResponse = await this.createNewProduct(metadata);
        return finalResponse;
      }
      return this.placeholder_product;
    }

    async upload(file:File): Promise<uploadResp | null> {
      
        try {
          const response = await this.productApi
            .uploadPicture(file, this.cookieservice.getCookie() || "notoken") 
            .toPromise();
          return this.handlePictureUplResp(response);
        } catch (error) {
          this.handleError(error);
          return null; // Return a placeholder array on error
        }
      } 
    
    async createNewProduct(newProduct:product): Promise<product> {
    
      try {
        const response = await this.productApi
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
        const response = await this.productApi
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
        const response = await this.productApi
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

    handlePictureUplResp(response: uploadResp | undefined): uploadResp | null {
      if(!response) return null;
      return response;
    }
}
