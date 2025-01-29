import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SellProductModalComponent } from '../sell-product-modal/sell-product-modal.component';
import { product } from '../../services/Product/api.service';
import { ProductService } from '../../services/Product/product.service';

@Component({
  selector: 'app-market-place',
  standalone: true,
  imports: [RouterLink,SellProductModalComponent],
  templateUrl: './market-place.component.html',
  styleUrl: './market-place.component.css'
})
export class MarketPlaceComponent implements OnInit{ 
  
  allProducts : Array<product> = [];
  uploadedFile : File | null = null;

  product_obj : product | null = null; 

  constructor(private productsService: ProductService) {}

  ngOnInit(): void { 
    this.getAll();
  }

  addProduct(newProduct: any) { 
    this.product_obj = newProduct;
    this.uploadedFile = newProduct.file;
    console.log(newProduct);
    this.createProduct(newProduct);
  }

  async getAll() {
    this.allProducts = await this.productsService.getAll();
  }

  async createProduct(newPrd:product) {
    
    if (this.uploadedFile && this.product_obj) {
      const newProduct = await this.productsService.fileUpload(this.uploadedFile, this.product_obj); 
      //else {console.error("failed to upload the file"); this.failLoadingMessage = true;}
      //this.loading = false;
      //this.failLoadingMessage = false;

      // add to list of products
      if(newProduct) this.allProducts.push(newProduct);
    } else {
      console.log("failed to create product");
    }
  }
}
