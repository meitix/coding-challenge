import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Subject, firstValueFrom, map } from 'rxjs';
import { FilterValues } from '../models/filter-values.interface';
import { Product } from '../models/product.interface';

@Injectable({
  providedIn: 'root',
})
export class SearchService {

  products = new Subject<Product[]>();

  constructor(private http: HttpClient) {}

  async getProducts(params: any) {
    const res = await firstValueFrom(this.http.get<Product[]>(environment.urls.products, { params }));
    this.products.next(res)
  }

  getFilterValues() {
    return firstValueFrom(
      this.http.get<FilterValues>(environment.urls.filterValues)
    );
  }
}
