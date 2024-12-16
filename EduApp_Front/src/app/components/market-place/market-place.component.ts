import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SellProductModalComponent } from '../sell-product-modal/sell-product-modal.component';

@Component({
  selector: 'app-market-place',
  standalone: true,
  imports: [RouterLink,SellProductModalComponent],
  templateUrl: './market-place.component.html',
  styleUrl: './market-place.component.css'
})
export class MarketPlaceComponent {

}
