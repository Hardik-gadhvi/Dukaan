import { Component, inject, OnInit } from '@angular/core';
import { Shop } from '../../core/services/shop';
import { Product } from '../../shared/models/product';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';
import { ProductItem } from "../shop/product-item/product-item";
import { Dialog } from '@angular/cdk/dialog';
import { MatDialog } from '@angular/material/dialog';
import { FiltersDialog } from '../shop/filters-dialog/filters-dialog';
import { MatMenu, MatMenuTrigger } from '@angular/material/menu';
import { MatListOption, MatSelectionList, MatSelectionListChange } from '@angular/material/list';
import { MatSelectChange } from '@angular/material/select';
import { ShopParams } from '../../shared/models/shopParams';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Pagination } from '../../shared/models/pagination';
import { FormsModule } from '@angular/forms';



@Component({
  selector: 'app-shop-component',
  standalone: true,
  imports: [
    ProductItem,
    MatButton,
    MatIcon,
    MatCard,
    MatMenu,
    MatSelectionList,
    MatListOption,
    MatMenuTrigger,
    MatPaginator,
    FormsModule
],
  templateUrl: './shop-component.html',
  styleUrl: './shop-component.scss'
})
export class ShopComponent implements OnInit {
  
  private shopService = inject(Shop);
  private dialogService = inject(MatDialog)
  products?: Pagination<Product>;

  sortOptions = [
    {name:'Alphabetical', value: 'name'},
    {name:'Price: Low-High', value: 'priceAsc'},
    {name:'Price: High-Low', value: 'priceDesc'}
  ]
  shopParams = new ShopParams();
  pageSizeOptions = [5, 10, 15, 20];
  ngOnInit(): void {
    
    this.initializeShop();
  }
   initializeShop(): void {
    this.shopService.getBrands();
    this.shopService.getTypes();
    this.getProducts();
   }

    getProducts(){
       this.shopService.getProducts(this.shopParams).subscribe({
      next: response => this.products = response,
      error: error => console.error('Error:', error),
    });
    }
   onSortChange(event: MatSelectionListChange){
      const selectedOption = event.options[0];
      if(selectedOption){
        this.shopParams.sort = selectedOption.value;
        this.shopParams.pageNumber = 1;
        this.getProducts();
      }
   }

   onSearchChange(){
      this.shopParams.pageNumber = 1;
      this.getProducts();
   }
   handlePageEvent(event: PageEvent){
      this.shopParams.pageNumber = event.pageIndex + 1;
      this.shopParams.pageSize = event.pageSize;
      this.getProducts();
   }
   openFiltersDialog()
  {
   const dialogRef = this.dialogService.open(FiltersDialog,{
    minWidth: '500px',
    data: {
      selectedBrands : this.shopParams.brands,
      selectedTypes : this.shopParams.types,
    }
});

 dialogRef.afterClosed().subscribe({
  next: result =>{ 
    
    if(result){
      console.log('Dialog result:', result);
      this.shopParams.brands = result.selectedBrands;
      this.shopParams.types = result.selectedTypes;
      this.shopParams.pageNumber = 1;
      this.getProducts();
  }
}
 })
}
}