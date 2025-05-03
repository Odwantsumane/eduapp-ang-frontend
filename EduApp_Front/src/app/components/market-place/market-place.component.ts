import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SellProductModalComponent } from '../sell-product-modal/sell-product-modal.component';
import { product } from '../../services/Product/api.service';
import { ProductService } from '../../services/Product/product.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-market-place',
  standalone: true,
  imports: [RouterLink,SellProductModalComponent, CommonModule, FormsModule],
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

  async addProduct(newProduct: any) { 
    this.product_obj = newProduct;
    this.uploadedFile = newProduct.file; 
    await this.createProduct();
  }

  async getAll() {
    this.allProducts = await this.productsService.getAll();
  }

  async createProduct() {
    
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
