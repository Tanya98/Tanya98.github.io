import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, concatMap, map, mergeMap, of, withLatestFrom } from 'rxjs';

import { WeatherForcastService } from '../../../../core/services';
import * as WeatherActions from '../actions/index';
import { Store } from '@ngrx/store';
import { WeatherForecastState } from '..';
import {
  selectCityDetails,
  selectMode,
  syncForecastByMode,
} from '../selectors';
import { ForecastMode } from '../../enums/forecast-mode.enum';
import { DailyCityDetails } from '../../models/daily-city-details';
import {
  CityDetails,
  CityResponse,
  CitySearchRequest,
  DailyCityWeatherResponse,
  HourlyCityDetails,
  HourlyCityWeatherResponse,
} from '../../models';
import { ToasterService } from 'apps/weather-forecast/src/app/shared/services';

@Injectable()
export class WeatherForecastEffect {
  constructor(
    private actions$: Actions,
    private httpService: WeatherForcastService,
    private store: Store<WeatherForecastState>,
    private toaster: ToasterService
  ) {}

  searchCity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(WeatherActions.searchCity),
      withLatestFrom(this.store.select(selectMode)),
      mergeMap(([payload, mode]) => {
        const city = payload.value;
        return this.httpService.searchNewCity(city).pipe(
          map((data: CityResponse[]) => data[0]),
          concatMap((city: CityResponse) => {
            let cityData: CityDetails;
            cityData = {
              name: city.name,
              lon: city.lon,
              lat: city.lat,
            };
            return [
              WeatherActions.searchCitySuccess({ cityDetails: city }),
              WeatherActions.setCity({
                cityDetails: cityData,
              }),
              WeatherActions.forecastModeChange({
                forecastMode: mode ?? ForecastMode.HOURLY,
              }),
            ];
          }),
          catchError((err: Error) => {
            //UI errors should be sent from API
            this.toaster.show(`This city "${city}" was not found`);
            return of(WeatherActions.searchCityError({ error: err.message }));
          })
        );
      })
    )
  );

  syncForecastByMode$ = createEffect(() =>
    this.actions$.pipe(
      ofType(WeatherActions.syncForecastByMode),
      withLatestFrom(this.store.select(syncForecastByMode)),
      concatMap(([payload, { cities, hourlyForecast, dailyForecast }]) => {
        const mode = payload.forecastMode;

        const actionsToDispatch = [];

        for (let city of cities) {
          const request = { lat: city.lat, lon: city.lon };

          let forecast = new Map();

          if (mode === ForecastMode.HOURLY) {
            forecast = hourlyForecast.get(city.name);

            if (!forecast) {
              const action = WeatherActions.getHourlyCityWeather({
                value: request,
              });
              actionsToDispatch.push(action);
            }
          } else {
            forecast = dailyForecast.get(city.name);
            if (!forecast) {
              const action = WeatherActions.getDailyCityWeather({
                value: request,
              });
              actionsToDispatch.push(action);
            }
          }
        }

        return actionsToDispatch;
      }),
      catchError((error) => of(WeatherActions.setCityError(error)))
    )
  );

  getHourlyCityWeather$ = createEffect(() =>
    this.actions$.pipe(
      ofType(WeatherActions.getHourlyCityWeather),
      withLatestFrom(this.store.select(selectCityDetails)),
      mergeMap(([payload, city]) => {
        const cityDetails: CitySearchRequest = payload.value;
        const cityName: string = city.name;
        return this.httpService.getHourlyCityWeather(cityDetails).pipe(
          map((data: HourlyCityWeatherResponse) => {
            let hourlyCityDetails: HourlyCityDetails = null;
            hourlyCityDetails = {
              hourly: data.hourly,
              name: cityName,
            };
            return WeatherActions.getHourlyCityWeatherSuccess({
              hourlyCityDetails: hourlyCityDetails,
            });
          }),
          catchError(() => of(WeatherActions.getHourlyCityWeatherError))
        );
      })
    )
  );

  getDailyCityWeather$ = createEffect(() =>
    this.actions$.pipe(
      ofType(WeatherActions.getDailyCityWeather),
      withLatestFrom(this.store.select(selectCityDetails)),
      mergeMap(([payload, city]) => {
        let cityData: CityDetails = null;
        let cityName: string = city.name;
        cityData = {
          name: city.name,
          lon: city.lon,
          lat: city.lat,
        };
        return this.httpService.getDailyCityWeather(cityData).pipe(
          map((data: DailyCityWeatherResponse) => {
            let dailyCityDetails: DailyCityDetails = null;
            dailyCityDetails = {
              daily: data.daily,
              name: cityName,
            };
            return WeatherActions.getDailyCityWeatherSuccess({
              dailyCityDetails: dailyCityDetails,
            });
          }),
          catchError(() => of(WeatherActions.getDailyCityWeatherError))
        );
      })
    )
  );

  changeForecastMode$ = createEffect(() =>
    this.actions$.pipe(
      ofType(WeatherActions.forecastModeChange),
      concatMap((payload: any) => {
        const mode: string = payload.forecastMode;
        return [
          WeatherActions.syncForecastByMode({ forecastMode: mode }),
          WeatherActions.forecastModeChangeSuccess({ forecastMode: mode }),
        ];
      }),
      catchError((error) => of(WeatherActions.forecastModeChangeError(error)))
    )
  );

  setCity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(WeatherActions.setCity),
      map((payload) => {
        const cityDetails = payload.cityDetails;
        return WeatherActions.setCitySuccess({
          cityDetails: cityDetails,
        });
      }),
      catchError((error) => of(WeatherActions.setCityError(error)))
    )
  );
}
