import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FilterComponent } from './filter.component';
import { SearchService } from '../search.service';
import { FormBuilder } from '@angular/forms';
import { Subject, firstValueFrom, lastValueFrom, of } from 'rxjs';
import { FilterValues } from '../../models/filter-values.interface';
import { Product } from 'src/app/models/product.interface';

describe('FilterComponent', () => {
  let component: FilterComponent;
  let fixture: ComponentFixture<FilterComponent>;
  let searchServiceSpy: jasmine.SpyObj<SearchService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('SearchService', ['getFilterValues', 'getProducts']);

    TestBed.configureTestingModule({
      declarations: [FilterComponent],
      providers: [FormBuilder, { provide: SearchService, useValue: spy }],
    });

    fixture = TestBed.createComponent(FilterComponent);
    component = fixture.componentInstance;
    searchServiceSpy = TestBed.inject(SearchService) as jasmine.SpyObj<SearchService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch filter values on initialization', waitForAsync(() => {
    const mockFilterValues: FilterValues = {
      categories: ['jacket', 'pant', 'shirt'],
      brands: ['Aurora', 'Nova'],
    };

    searchServiceSpy.getFilterValues.and.returnValue(firstValueFrom(of(mockFilterValues)));

    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(component.filterValues).toEqual(mockFilterValues);
    });
  }));

  it('should update result when form values change', waitForAsync(() => {
    const mockProducts = [ {
      "_id": "657db9f8a8c84054eb99c5d9",
      "gtin": 1234567890125,
      "brandName": "Aurora",
      "stock": 150,
      "category": "jacket",
      "color": "brown",
      "name": "Aurora Brown Jacket",
      "image": "jacket.png",
      "price": 48,
      "createdAt": "2023-12-16T14:53:44.119Z",
      "updatedAt": "2023-12-16T14:53:44.119Z"
  },
  {
      "_id": "657db9f8a8c84054eb99c5e6",
      "gtin": 1234537890125,
      "brandName": "Aurora",
      "stock": 150,
      "category": "jacket",
      "color": "brown",
      "name": "Aurora Brown Jacket",
      "image": "jacket.png",
      "price": 48,
      "createdAt": "2023-12-16T14:53:44.119Z",
      "updatedAt": "2023-12-16T14:53:44.119Z"
  },
  {
      "_id": "657db9f8a8c84054eb99c5e1",
      "gtin": 1234567891129,
      "brandName": "Nova",
      "stock": 100,
      "category": "jacket",
      "color": "black",
      "name": "Nova Black Jacket",
      "image": "jacket.png",
      "price": 45,
      "createdAt": "2023-12-16T14:53:44.119Z",
      "updatedAt": "2023-12-16T14:53:44.119Z"
  },];
  searchServiceSpy.products = new Subject<Product[]>();
  searchServiceSpy.products.next(mockProducts)
  fixture.detectChanges();

  fixture.whenStable().then(async () => {
    const updateResultSpy = spyOn(component, 'updateResult').and.callThrough();

    component.filterForm.setValue({
      selectedCategory: 'jacket',
      selectedBrand: 'Aurora',
      sort: 'price-asc',
    });

    await component.updateResult();

    expect(updateResultSpy).toHaveBeenCalled();
    expect(searchServiceSpy.getProducts).toHaveBeenCalledWith({
      category: 'jacket',
      brandName: 'Aurora',
      sort: 'price-asc',
    });

  });

  }));
});
