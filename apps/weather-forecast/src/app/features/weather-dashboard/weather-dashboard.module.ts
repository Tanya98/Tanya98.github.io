import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { WeatherForecastEffect } from '../state/effects';
import { scoreboardReducer } from '../state/reducers';
import { WeatherDashboardRoutingModule } from './weather-dashboard-routing.module';
import { WeatherDashboardComponent } from './weather-dashboard.component';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from '../../shared';

@NgModule({
    imports: [
        CommonModule,
        WeatherDashboardRoutingModule,
        SharedModule,
        StoreModule.forFeature('game', scoreboardReducer),
        EffectsModule.forFeature([WeatherForecastEffect]),
    ],
    exports: [],
    declarations: [WeatherDashboardComponent],
    providers: [],
})
export class WeatherDashboardModule { }
