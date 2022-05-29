import { createReducer, on } from '@ngrx/store';
import * as WeatherActions from '../actions/index';
import * as moment from 'moment';
import { initialState } from '../weather-forecast.state';
import * as _ from 'lodash';

export const wheatherForecastReducer = createReducer(
  initialState,
  on(WeatherActions.searchCitySuccess, (state, { cityDetails }) => {
    return { ...state, cityDetails: cityDetails };
  }),

  on(
    WeatherActions.getHourlyCityWeatherSuccess,
    (state, { hourlyCityDetails }) => {
      //get forecast only for 24 hours
      const twentyFourHours = hourlyCityDetails.hourly.slice(0, 24);
      const threeHours: number = 3;

      //take each 3 hours
      const everyThreeHours = twentyFourHours.filter(
        (e, i) => i % threeHours === threeHours - 1
      );

      const hourly = new Map(state.hourlyForecast);

      const hourlyForecast = new Map();

      _.forEach(everyThreeHours, (item: any) => {
        const hours = moment.unix(item.dt).format('HH:mm');
        const temp = Math.floor(item.temp);
        hourlyForecast.set(hours, temp + '°');
      });

      hourly.set(hourlyCityDetails.name, hourlyForecast);

      return {
        ...state,
        hourlyForecast: hourly,
      };
    }
  ),

  on(
    WeatherActions.getDailyCityWeatherSuccess,
    (state, { dailyCityDetails }) => {
      const daily = new Map(state.dailyForecast);

      const dailyForecast = new Map();

      _.forEach(dailyCityDetails.daily, (item: any) => {
        const weekDays = moment.unix(item.dt).format('dd');
        const temp = Math.floor(item.temp.day);
        dailyForecast.set(weekDays, temp + '°');
      });

      daily.set(dailyCityDetails.name, dailyForecast);

      return {
        ...state,
        dailyForecast: daily,
      };
    }
  ),

  on(WeatherActions.forecastModeChangeSuccess, (state, { forecastMode }) => {
    return { ...state, forecastMode: forecastMode };
  }),

  on(WeatherActions.setCitySuccess, (state, { cityDetails }) => {
    const unique = _.uniqBy([...state.cities, cityDetails], 'name');
    return {
      ...state,
      cities: unique,
      searchCityError: null,
    };
  }),

  on(WeatherActions.searchCityError, (state, { error }) => {
    return {
      ...state,
      searchCityError: error,
    };
  })
);
