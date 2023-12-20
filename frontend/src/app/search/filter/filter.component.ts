import { Component, OnInit } from '@angular/core';
import { SearchService } from '../search.service';
import { FilterValues } from '../../models/filter-values.interface';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.less'],
})
export class FilterComponent implements OnInit {
  filterValues?: FilterValues = undefined;
  filterForm: FormGroup;

  constructor(
    private service: SearchService,
    private formBuilder: FormBuilder
  ) {
    this.filterForm = this.formBuilder.group({
      selectedCategory: '',
      selectedBrand: '',
      sort: 'stock-desc',
    });
  }

  ngOnInit() {
    this.fetchFilterValues();
  }

  async fetchFilterValues() {
    this.filterValues = await this.service.getFilterValues();
    await this.updateResult();
  }

  async updateResult() {
    const { selectedBrand, selectedCategory, sort } = this.filterForm.value;
    const filter: any = { sort };

    if (selectedBrand) filter.brandName = selectedBrand;
    if (selectedCategory) filter.category = selectedCategory;

    await this.service.getProducts(filter);
  }
}
