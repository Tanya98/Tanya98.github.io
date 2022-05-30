import { selectDaily, selectSearchCityError } from './../selectors/weather-forecast.selector';
import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { filter, map, Observable } from 'rxjs';
import { forecastModeChange, searchCity } from '../actions';
import { selectCities, selectCityDetails, selectHourly, selectMode } from '../selectors';
import * as _ from 'lodash';
import { WeatherForecastState } from '..';
import { CityDetails, TabularModel } from '@wf/features/dashboard/models';

@Injectable()
export class WeatherForecastStateService {
  public cityDetails$: Observable<CityDetails> | undefined;

  public hourlyWeatherForecast$: Observable<TabularModel>;

  public dailyWeatherForecast$: Observable<TabularModel>;

  public allCities$: Observable<CityDetails[]>;

  public mode$: Observable<string>;

  public searchCityError$: Observable<any>;

  constructor(private store: Store<WeatherForecastState>) {
    this.cityDetails$ = this.store.pipe(select(selectCityDetails));

    this.hourlyWeatherForecast$ = this.store.select(selectHourly).pipe(
      filter(x => !!x && x.size > 0),
      map(hourly => {
        const cities = [...hourly.keys()];

        let headers = [];
        const columns: Map<string, string>[] = [];

        _.forEach(cities, city => {
          const newColumn = new Map([['City Name', city], ...hourly.get(city)]);
          columns.push(newColumn);
          const empty = _.isEmpty(headers);
          if (empty) headers = [...newColumn.keys()];
        });

        return { headers, columns };
      })
    );

    this.dailyWeatherForecast$ = this.store.select(selectDaily).pipe(
      filter(x => !!x && x.size > 0),
      map(daily => {
        const cities = [...daily.keys()];

        let headers = [];
        const columns: Map<string, string>[] = [];
        _.forEach(cities, city => {
          const newColumn = new Map([['City Name', city], ...daily.get(city)]);
          columns.push(newColumn);
          const empty = _.isEmpty(headers);
          if (empty) headers = [...newColumn.keys()];
        });

        return { headers, columns };
      })
    );

    this.allCities$ = this.store.select(selectCities);

    this.mode$ = this.store.select(selectMode);

    this.searchCityError$ = this.store.select(selectSearchCityError);
  }

  forecastModeChange(mode: string) {
    this.store.dispatch(forecastModeChange({ forecastMode: mode }));
  }

  searchCity(data: string) {
    this.store.dispatch(searchCity({ value: data }));
  }
}
