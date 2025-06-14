import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Pagination } from '../../shared/models/pagination';
import { Product } from '../../shared/models/product';
import { ShopParams } from '../../shared/models/shopParams';

@Injectable({
  providedIn: 'root'
})
export class Shop {
 
  baseUrl = 'https://localhost:5001/api/'
  private http = inject(HttpClient)
  types: string[] = [];
  brands: string[] = [];

  getProducts(shopParams : ShopParams) {

    let params = new HttpParams();
    if(shopParams.brands.length > 0) params = params.append('brands', shopParams.brands.join(','));
    if(shopParams.types.length > 0) params = params.append('types', shopParams.types.join(','));
    if(shopParams.sort) params = params.set('sort', shopParams.sort); 
    if(shopParams.search) params = params.set('search', shopParams.search);
    
    params = params.append('pageSize', shopParams.pageSize);
    params = params.append('pageIndex', shopParams.pageNumber);
    
    return this.http.get<Pagination<Product>>(this.baseUrl + 'products', { params });
  }

  getProduct(id: number) {
    return this.http.get<Product>(this.baseUrl + 'products/' + id);
  }

  getBrands() {
    if(this.brands.length > 0) return;
    return this.http.get<string[]>(this.baseUrl + 'products/brands').subscribe({
      next: brands => this.brands = brands,
      error: error => console.error('Error:', error),
    });
  }
  
  getTypes() {
    if(this.types.length > 0) return;
    return this.http.get<string[]>(this.baseUrl + 'products/types').subscribe({
      next: types => this.types = types,
      error: error => console.error('Error:', error),
    });
  }
}
