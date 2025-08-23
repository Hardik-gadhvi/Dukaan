import { Component, inject } from '@angular/core';
import { MatButton } from '@angular/material/button';

import { MatFormField, MatInput, MatLabel } from "@angular/material/input";
import { RouterLink } from '@angular/router';
import { CartService } from '../../../core/services/cart';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-order-summery',
  imports: [
    RouterLink, 
    MatButton, 
    MatLabel, 
    MatInput, 
    MatFormField,
    CurrencyPipe
  ],
  templateUrl: './order-summery.html',
  styleUrl: './order-summery.scss'
})
export class OrderSummery {
  cartService = inject(CartService);
}
