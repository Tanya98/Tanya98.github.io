import { Component, Input } from '@angular/core';
import * as _ from 'lodash';
import { TabularModel } from '../../models';

@Component({
  selector: 'weather-forecast-daily-city-weather-table',
  templateUrl: 'daily-city-weather-table.component.html',
  styleUrls: ['./daily-city-weather-table.component.scss'],
})
export class DailyCityWeatherTableComponent {
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
