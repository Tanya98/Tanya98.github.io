import { Component, Input } from '@angular/core';
import { TabularModel } from '@wf/features/dashboard/models';
import * as _ from 'lodash';

@Component({
  selector: 'weather-forecast-hourly-city-weather-table',
  templateUrl: 'hourly-city-weather-table.component.html',
  styleUrls: ['./hourly-city-weather-table.component.scss'],
})
export class HourlyCityWeatherTableComponent {
  _dataSource: TabularModel;
  get dataSource(): TabularModel {
    return this._dataSource;
  }
  @Input() set dataSource(value: TabularModel) {
    this._dataSource = value;

    this.displayedColumns = this._dataSource.headers;

    this.columns = [];

    _.forEach(this._dataSource.headers, header => {
      this.columns.push({
        columnDef: header,
        header: header,
        cell: (element: Map<string, string>) => {
          return element.get(header);
        },
      });
    });
  }

  displayedColumns: string[];
  columns = null;
}
