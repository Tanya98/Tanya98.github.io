import { ForecastMode } from './../../enums/forecast-mode.enum';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators, NgForm, FormGroup } from '@angular/forms';

@Component({
  selector: 'search-city',
  templateUrl: 'search-city.component.html',
  styleUrls: ['./search-city.component.scss'],
})
export class SearchCityComponent implements OnInit {
  @Output() search = new EventEmitter();
  @Output() filter = new EventEmitter();

  public searchForm;
  constructor(private formBuilder: FormBuilder) {
    this.searchForm = this.formBuilder.group({
      city: ['', Validators.pattern('[a-zA-Z ]*')],
    });
  }

  public hourlyMode: string = ForecastMode.HOURLY;
  public dailyMode: string = ForecastMode.DAILY;

  ngOnInit() {}

  searchCity(form: FormGroup): void {
    if (form.valid && form.value.city) {
      const value = form.value.city;
      this.search.emit(value);
      form.reset();
    }
  }

  filterByDay(): void {
    this.filter.emit(this.dailyMode);
  }

  filterByHour(): void {
    this.filter.emit(this.hourlyMode);
  }
}
