import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Shop } from '../../../core/services/shop';
import { Product } from '../../../shared/models/product';
import { CurrencyPipe } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { MatDivider } from '@angular/material/divider';

@Component({
  selector: 'app-product-details',
  imports: [
    CurrencyPipe,
    MatButton,
    MatIcon,
    MatFormField,
    MatInput,
    MatLabel,
    MatDivider
  ],
  templateUrl: './product-details.html',
  styleUrl: './product-details.scss'
})
export class ProductDetails implements OnInit {
  
  private shopService = inject(Shop);
  private activatedRouter = inject(ActivatedRoute);

  product?: Product;
  ngOnInit(): void {
    this.loadProduct();
  }

  loadProduct() {
    const id = this.activatedRouter.snapshot.paramMap.get('id');
  if (!id) return; 
    this.shopService.getProduct(+id).subscribe({
      next: response => this.product = response,
      error: error => console.error('Error:', error),
    })
  }
  
}
