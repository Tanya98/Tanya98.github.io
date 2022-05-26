import { createReducer, createSelector, on } from '@ngrx/store';
import * as ScoreboardPageActions from '../actions/index';

export interface WeatherForecastState {
	home: number;
	away: number;
	// weatherLoaded: boolean;
	// cityDetails: any;
	// dailyWeatherDetails: any;
	// hourlyWeatherDetails: any;
}

export const initialState: WeatherForecastState = {
	home: 0,
	away: 0,
	// weatherLoaded: false,
	// cityDetails: [],
	// dailyWeatherDetails: [],
	// hourlyWeatherDetails: [],
};

export const scoreboardReducer = createReducer(
	initialState,
	on(ScoreboardPageActions.homeScore, (state) => {
        return ({ ...state, home: state.home + 1 })
    }),
	on(ScoreboardPageActions.awayScore, state => ({ ...state, away: state.away + 1 })),
	on(ScoreboardPageActions.resetScore, state => ({ home: 0, away: 0 }))
);

export const featureKey = 'game';

export interface FeatureState {
    home: number;
    away: number
  }
   
  export interface AppState {
    game: FeatureState;
  }
   
  export const selectFeature = (state: AppState) => state.game;
   
  export const selectFeatureCount = createSelector(
    selectFeature,
    (state: FeatureState) => state.home
  );