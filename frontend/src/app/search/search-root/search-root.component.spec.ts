import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchRootComponent } from './search-root.component';

describe('SearchRootComponent', () => {
  let component: SearchRootComponent;
  let fixture: ComponentFixture<SearchRootComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchRootComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
