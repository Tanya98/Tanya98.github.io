import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from '../../shared';
import { HomePageComponent } from '../home/containers';
import { DailyCityWeatherTableComponent } from './components/daily-city-weather-table';
import { HourlyCityWeatherTableComponent } from './components/hourly-city-weather-table';
import { SearchCityComponent } from './components/search-city';
import { DashboardPageComponent } from './containers/dashboard-page.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { HttpService } from './services';
import { WeatherForecastEffect } from './state/effects';
import { wheatherForecastReducer } from './state/reducers';
import { WeatherForecastStateService } from './state/services';

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    StoreModule.forFeature('weather', wheatherForecastReducer),
    EffectsModule.forFeature([WeatherForecastEffect]),
  ],
  exports: [],
  declarations: [
    DashboardPageComponent,
    SearchCityComponent,
    HourlyCityWeatherTableComponent,
    DailyCityWeatherTableComponent,
    HomePageComponent,
  ],
  providers: [WeatherForecastStateService, HttpService],
})
export class DashboardModule {}
