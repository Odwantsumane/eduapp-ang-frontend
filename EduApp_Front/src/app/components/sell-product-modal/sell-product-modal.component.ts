import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { product } from '../../services/Product/api.service';
import { AuthenticateService } from '../../services/authenticate.service';

@Component({
  selector: 'app-sell-product-modal',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './sell-product-modal.component.html',
  styleUrl: './sell-product-modal.component.css'
})
export class SellProductModalComponent implements OnInit{
  @Output() dataEmitter: EventEmitter<any> = new EventEmitter<any>();
  spec : string = "";
  failed_to_post:boolean = false;
  current_user = "";
  picture : File | null = null;
  formValid:boolean = false;

  product_obj = {
    _id: "",
    name:"",
    specs: [""],
    category: "",
    createdBy: "",
    location: "",
    createdAt:"",
    filepath:"",
    price: 0,
    imageUrl: "",
    file: this.picture
  }

  constructor(private autheservice: AuthenticateService) {};

  async ngOnInit() {

    this.current_user = (await this.autheservice.isLoggedInGetUser()).username || "unknown";
  }

  sendDataToParent(sendData:any) {
      this.dataEmitter.emit(sendData);
  }

  monitorSpecs() { 
    if(this.spec.endsWith(';') && this.spec.length > 1) {this.product_obj.specs.push(this.spec); console.log(this.product_obj.specs); this.spec = ""}
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const selectedFile = input.files[0]; 
      //this.file_obj.name = selectedFile.name; 
      //this.file_obj.type = selectedFile.type; 
      this.picture = selectedFile; 
    } 
  }

  handlePost() {
    // check for missing fields
    if(this.product_obj.name !== "" && this.product_obj.specs.length > 1
      && this.product_obj.category !== "" && this.product_obj.location !== "" && this.product_obj.price > 0) {
        this.product_obj.createdBy = this.current_user; 
        this.product_obj.file = this.picture;
        this.failed_to_post = false;
        this.submit();
    } else {
      this.failed_to_post = true;
    }
  }

  monitorFields() {
    if(this.product_obj.name !== "" && this.product_obj.specs.length > 1
      && this.product_obj.category !== "" && this.product_obj.location !== "" && this.product_obj.price > 0) {
        this.product_obj.createdBy = this.current_user; 
        this.product_obj.file = this.picture;
        this.failed_to_post = false;
        //this.submit();
        this.formValid = true;
    } else {
      this.formValid = false;
    }
  }

  submit() {
    this.sendDataToParent(this.product_obj);
  }
  submitFailed() {
    this.failed_to_post = true;
  }
}
