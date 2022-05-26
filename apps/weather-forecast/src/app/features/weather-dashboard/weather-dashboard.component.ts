import { Component, OnInit } from '@angular/core';
import { WeatherForcastService } from '../../core/services/weather-forecast.service';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { homeScore } from '../state/actions';
import { AppState } from '../state/reducers';
@Component({
	selector: 'weather-dashboard',
	templateUrl: 'weather-dashboard.component.html',
	styleUrls: ['./weather-dashboard.component.scss'],
})
export class WeatherDashboardComponent implements OnInit {
	public home$: Observable<number> | undefined;
	constructor(private weatherService: WeatherForcastService, private store: Store<AppState>) {
	}

	ngOnInit() {
        this.home$ = this.store.select(store=> store.game.home);
	}

	homeScore() {
		this.store.dispatch(homeScore());
        console.log('HomeScore');
	}

	// searchNewCity() {
	// 	return this.weatherService.searchNewCity('London').subscribe(res => {
	// 		return res.map(city => {
	// 			return console.log(city);
	// 		});
	// 	});
	// }

	// getHourlyCityWeather() {
	// 	return this.weatherService
	// 		.getHourlyCityWeather(51.5073219, -0.1276474)
	// 		.subscribe(res => console.log('Hourly : ' + res));
	// }

	// getDaylyCityWeather() {
	// 	return this.weatherService
	// 		.getDailyCityWeather(51.5073219, -0.1276474)
	// 		.subscribe(res => console.log('Dayly : ' + res));
	// }
}
