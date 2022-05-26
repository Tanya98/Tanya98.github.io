import { createAction } from '@ngrx/store';
// export const addValue = createAction(
//     '[Add Value] Add',
//     props<{ value: string }>()
// )

export const homeScore = createAction('[Scoreboard Page] Home Score');
export const awayScore = createAction('[Scoreboard Page] Away Score');
export const resetScore = createAction('[Scoreboard Page] Score Reset');