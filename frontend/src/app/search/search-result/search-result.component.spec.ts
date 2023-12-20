import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchResultComponent } from './search-result.component';
import { SearchService } from '../search.service';
import { BehaviorSubject } from 'rxjs';
import { Product } from 'src/app/models/product.interface';
import { By } from '@angular/platform-browser';

describe('SearchResultComponent', () => {
  let component: SearchResultComponent;
  let fixture: ComponentFixture<SearchResultComponent>;
  let searchServiceMock: Partial<SearchService>;

  beforeEach(() => {
    searchServiceMock = {
      products: new BehaviorSubject<Product[]>([]),
    };

    TestBed.configureTestingModule({
      declarations: [SearchResultComponent],
      providers: [{ provide: SearchService, useValue: searchServiceMock }],
    });

    fixture = TestBed.createComponent(SearchResultComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should subscribe to products on init', () => {
    const mockProducts: Product[] = [ {
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

    searchServiceMock?.products?.next(mockProducts);

    fixture.detectChanges();

    expect(component.products).toEqual(mockProducts);
  });

  it('should unsubscribe on destroy', () => {
    component.ngOnInit();
    const unsubscribeSpy = spyOn(component.subscription!, 'unsubscribe');

    component.ngOnDestroy();

    expect(unsubscribeSpy).toHaveBeenCalled();
  });

  it('should render app-item components for each product', () => {
    const mockProducts: Product[] = [ {
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

    searchServiceMock?.products?.next(mockProducts);

    fixture.detectChanges();

    const appItemComponents = fixture.debugElement.queryAll(By.css('app-item'));
    expect(appItemComponents.length).toBe(mockProducts.length);
  });
});
