import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sell-product-modal',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './sell-product-modal.component.html',
  styleUrl: './sell-product-modal.component.css'
})
export class SellProductModalComponent {

}
