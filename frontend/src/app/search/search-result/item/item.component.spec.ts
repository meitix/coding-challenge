import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ItemComponent } from './item.component';
import { Component } from '@angular/core';
import { Product } from 'src/app/models/product.interface';

@Component({
  template: `
    <app-item [product]="mockProduct"></app-item>
  `,
})
class TestHostComponent {
  mockProduct: Product = {
    _id: '123',
    gtin: 1234567890123,
    brandName: 'TestBrand',
    stock: 10,
    category: 'shirt',
    color: 'red',
    name: 'Test Shirt',
    image: 'shirt.png',
    price: 25,
    createdAt: '2023-12-16T14:53:44.118Z',
    updatedAt: '2023-12-16T14:53:44.119Z',
  };
}

describe('ItemComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let testHost: TestHostComponent;
  let itemComponent: ItemComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ItemComponent, TestHostComponent],
    });

    fixture = TestBed.createComponent(TestHostComponent);
    testHost = fixture.componentInstance;
    itemComponent = fixture.debugElement.children[0].componentInstance;
  });

  it('should create', () => {
    expect(itemComponent).toBeTruthy();
  });

  it('should display product details', () => {
    fixture.detectChanges();

    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('img').src).toContain('/assets/productImages/shirt.png');
    expect(compiled.querySelector('img').alt).toBe('Test Shirt');
    expect(compiled.querySelector('img').title).toBe('Test Shirt');
    expect(compiled.querySelector('h3').textContent).toBe('Test Shirt');
    expect(compiled.querySelector('p').textContent).toBe('stock: 10');
    expect(compiled.querySelector('.price').textContent).toBe('Price: 25');
    expect(compiled.querySelector('.color').style.backgroundColor).toBe('red');
  });

});
