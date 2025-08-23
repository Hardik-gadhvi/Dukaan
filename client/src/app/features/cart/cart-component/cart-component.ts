import { Component, inject } from '@angular/core';
import { CartService } from '../../../core/services/cart';
import { CartItemComponent } from "../cart-item/cart-item";
import { OrderSummery } from "../../../shared/components/order-summery/order-summery";

@Component({
  selector: 'app-cart-component',
  standalone: true,
  imports: [CartItemComponent, OrderSummery],
  templateUrl: './cart-component.html',
  styleUrl: './cart-component.scss'
})
export class CartComponent {
  cartService = inject(CartService);
}
