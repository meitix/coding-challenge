import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SearchRootComponent } from './search-root/search-root.component';
import { SearchRoutingModule } from './search-routing.module';
import { FilterComponent } from './filter/filter.component';
import { SearchResultComponent } from './search-result/search-result.component';
import { ItemComponent } from './search-result/item/item.component';

@NgModule({
  declarations: [SearchRootComponent, FilterComponent, SearchResultComponent, ItemComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SearchRoutingModule,
  ],
})
export class SearchModule {}
