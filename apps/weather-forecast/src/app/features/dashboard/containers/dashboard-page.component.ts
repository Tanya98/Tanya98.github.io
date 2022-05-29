import { CityDetails } from './../models/city-details.model';
import { ForecastMode } from './../enums/forecast-mode.enum';
import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';

import { WeatherForecastStateService } from '../state/services';
import { TabularModel } from '..';

@Component({
  selector: 'weather-dashboard',
  templateUrl: 'dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss'],
})
export class DashboardPageComponent implements OnInit {
  public cityDetails$: Observable<CityDetails> | undefined;

  public hourlyWeatherForecastData$: Observable<TabularModel>;

  public dailyWeatherForecastData$: Observable<TabularModel>;

  public mode$: Observable<string>;
  public hourlyMode: string = ForecastMode.HOURLY;
  public dailyMode: string = ForecastMode.DAILY;

  constructor(private _state: WeatherForecastStateService) {}

  ngOnInit() {
    this.cityDetails$ = this._state.cityDetails$;

    this.hourlyWeatherForecastData$ = this._state.hourlyWeatherForecast$;

    this.dailyWeatherForecastData$ = this._state.dailyWeatherForecast$;

    this.mode$ = this._state.mode$;
  }

  searchCity(str: string): any {
    this._state.searchCity(str);
  }

  modeFilter(mode: string) {
    this._state.forecastModeChange(mode);
  }
}
