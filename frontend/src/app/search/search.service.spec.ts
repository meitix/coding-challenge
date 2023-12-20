import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SearchService } from './search.service';
import { environment } from '../../environments/environment';
import { lastValueFrom } from 'rxjs';
import { FilterValues } from '../models/filter-values.interface';
import { Product } from '../models/product.interface';

describe('SearchService', () => {
  let service: SearchService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SearchService],
    });

    service = TestBed.inject(SearchService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get filter values', fakeAsync(() => {
    const mockFilterValues: FilterValues = {
      categories: ['jacket', 'pant', 'shirt'],
      brands: ['Aurora', 'Nova'],
    };

    let filterValues: FilterValues | undefined;

    service.getFilterValues().then((result) => {
      filterValues = result;
    });

    const req = httpMock.expectOne(environment.urls.filterValues);
    expect(req.request.method).toBe('GET');
    req.flush(mockFilterValues);

    tick();

    expect(filterValues).toEqual(mockFilterValues);
  }));

  it('should get products and notify subscribers', fakeAsync(() => {
    const mockProducts: Product[] = [];

    service.products.subscribe((products) => {
      expect(products).toEqual(mockProducts);
    });

    service.getProducts({}).then(async () => {
      expect(await lastValueFrom(service.products)).toEqual(mockProducts);
    });

    const req = httpMock.expectOne(environment.urls.products);
    expect(req.request.method).toBe('GET');
    req.flush(mockProducts);

    tick();
  }));
});
