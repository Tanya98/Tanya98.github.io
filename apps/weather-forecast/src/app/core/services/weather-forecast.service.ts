import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'apps/weather-forecast/src/environments/environment';
import { Observable } from 'rxjs';

@Injectable()
export class WeatherForcastService {
  constructor(
    private http: HttpClient,
  ) {}

  // private _apiKey = this.weatherForcastApiService._apiKey;
  // private url = environment.apiUrl;

  // searchNewCity(cityName: string): Observable<any[]> {
  // 	return this.http.get<any[]>(
  // 		`${this.url}/geo/1.0/direct?q=${cityName}&limit=1&appid=${this._apiKey}`
  // 	);
  // }

  // getHourlyCityWeather(lat: number, lon: number) {
  // 	return this.http.get(
  // 		`${this.url}/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,daily,alerts&units=metric&appid=${this._apiKey}`
  // 	);
  // }

  // getDailyCityWeather(lat: number, lon: number) {
  // 	return this.http.get(
  // 		`${this.url}/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly,alerts&units=metric&appid=${this._apiKey}`
  // 	);
  // }
}
