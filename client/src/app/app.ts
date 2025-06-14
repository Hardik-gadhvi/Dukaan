import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from "./layout/header/header";
import { ShopComponent } from "./features/shop-component/shop-component";

@Component({
  selector: 'app-root',
  imports: [Header, ShopComponent, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  title = "Dukaan";
}
