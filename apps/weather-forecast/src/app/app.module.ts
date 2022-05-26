import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
// import { WeatherForecastServicesModule } from '@bp/weather-forecast/services';
import { AppRoutingModule } from './app-routing.module';
import { WeatherDashboardModule } from './features/weather-dashboard/weather-dashboard.module';
import { WeatherForcastService } from './core/services';
import { SharedModule } from './shared';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		HttpClientModule,
		// WeatherForecastServicesModule,
		AppRoutingModule,
		WeatherDashboardModule,
		SharedModule,
		StoreModule.forRoot({}),
		EffectsModule.forRoot(),
	],
	providers: [WeatherForcastService],
	bootstrap: [AppComponent],
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
