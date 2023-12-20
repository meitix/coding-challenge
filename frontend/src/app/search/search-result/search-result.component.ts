import { Component, OnDestroy, OnInit } from '@angular/core';
import { SearchService } from '../search.service';
import { Product } from 'src/app/models/product.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.less'],
})
export class SearchResultComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  subscription?: Subscription;

  constructor(private service: SearchService) {}

  ngOnInit(): void {
    this.subscription = this.service.products.subscribe(
      (p) => (this.products = p)
    );
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
