import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'weather-forecast-dahboard',
    loadChildren: () =>
      import('./features/weather-dashboard/weather-dashboard.module').then((m) => m.WeatherDashboardModule),
  },
  {
    path: '',
    redirectTo: 'weather-forecast-dahboard',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}