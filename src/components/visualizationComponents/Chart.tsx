/* eslint-disable class-methods-use-this */
import * as React from 'react';
import {
  ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject,
  Legend, DateTime, LineSeries, Tooltip, ILoadedEventArgs, ChartTheme,
} from '@syncfusion/ej2-react-charts';
import { Browser } from '@syncfusion/ej2/base';

/**
  * StepLine Series
  */
export const data1: any[] = [
  { x: new Date(1975, 0, 1), y: 16 },
  { x: new Date(1980, 0, 1), y: 12.5 },
  { x: new Date(1985, 0, 1), y: 19 },
  { x: new Date(1990, 0, 1), y: 14.4 },
  { x: new Date(1995, 0, 1), y: 11.5 },
  { x: new Date(2000, 0, 1), y: 14 },
  { x: new Date(2005, 0, 1), y: 10 },
  { x: new Date(2010, 0, 1), y: 16 }];
export const data2: any[] = [
  { x: new Date(1975, 0, 1), y: 10 },
  { x: new Date(1980, 0, 1), y: 7.5 },
  { x: new Date(1985, 0, 1), y: 11 },
  { x: new Date(1990, 0, 1), y: 7 },
  { x: new Date(1995, 0, 1), y: 8 },
  { x: new Date(2000, 0, 1), y: 6 },
  { x: new Date(2005, 0, 1), y: 3.5 },
  { x: new Date(2010, 0, 1), y: 7 }];
const SAMPLE_CSS = `
     .control-fluid {
     padding: 0px !important;
     }`;

export default class StepLine extends React.Component<{}, {}> {
  public onChartLoad(): void {
    const chart: Element | null = document.getElementById('charts');
    if (chart) chart.setAttribute('title', '');
  }

  public load(args: ILoadedEventArgs): void {
    // eslint-disable-next-line no-restricted-globals
    let selectedTheme: string = location.hash.split('/')[1];
    selectedTheme = selectedTheme || 'Material';
    args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, 'Dark') as ChartTheme;
  }

  render() {
    return (
      <div className='control-pane'>
        <style>
          {SAMPLE_CSS}
        </style>
        <div className='control-section'>
          <ChartComponent
            id='charts'
            style={{ textAlign: 'center' }}
            primaryXAxis={{
              valueType: 'DateTime',
              labelFormat: 'y',
              intervalType: 'Years',
              edgeLabelPlacement: 'Shift',
              majorGridLines: { width: 0 },
            }}
            // eslint-disable-next-line react/jsx-no-bind
            load={this.load.bind(this)}
            primaryYAxis={{
              labelFormat: '{value}%',
              rangePadding: 'None',
              minimum: 0,
              maximum: 100,
              interval: 20,
              lineStyle: { width: 0 },
              majorTickLines: { width: 0 },
              minorTickLines: { width: 0 },
            }}
            chartArea={{ border: { width: 0 } }}
            tooltip={{ enable: true }}
            width={Browser.isDevice ? '100%' : '60%'}
            title='Inflation - Consumer Price'
            // eslint-disable-next-line react/jsx-no-bind
            loaded={this.onChartLoad.bind(this)}
          >
            <Inject services={[LineSeries, DateTime, Legend, Tooltip]} />
            <SeriesCollectionDirective>
              <SeriesDirective
                dataSource={data1}
                xName='x'
                yName='y'
                name='Germany'
                width={2}
                marker={{ visible: true, width: 10, height: 10 }}
                type='Line'
              />
              <SeriesDirective
                dataSource={data2}
                xName='x'
                yName='y'
                name='England'
                width={2}
                marker={{ visible: true, width: 10, height: 10 }}
                type='Line'
              />
            </SeriesCollectionDirective>
          </ChartComponent>
        </div>
      </div>
    );
  }
}
