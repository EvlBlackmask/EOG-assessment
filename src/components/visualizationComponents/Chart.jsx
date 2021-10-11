/* eslint-disable class-methods-use-this */
import * as React from 'react';
import {
  ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject,
  Legend, DateTime, LineSeries, Tooltip, AxesDirective, AxisDirective, DataLabel,
} from '@syncfusion/ej2-react-charts';
import { Browser } from '@syncfusion/ej2/base';
import { connect } from 'react-redux';

const SAMPLE_CSS = `
     .control-fluid {
     padding: 0px !important;
     }`;

/**
 * line chart visualization for metrics
 */
class StepLine extends React.Component {
  onChartLoad() {
    const chart = document.getElementById('charts');
    if (chart) chart.setAttribute('title', '');
  }

  load(args) {
    // note: had to disable due to plugin requirements
    // eslint-disable-next-line no-restricted-globals
    let selectedTheme = location.hash.split('/')[1];
    selectedTheme = selectedTheme || 'Material';
    args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, 'Dark');
  }

  render() {
    const { metrics } = this.props;
    const { metricData } = metrics;
    // I needed to change the dates form numbers to date objects and the vas need to be
    // editable to do so. The linter did not like this so I had to force it.
    // eslint-disable-next-line prefer-const
    let newData = [];
    metricData.forEach(x => {
      // eslint-disable-next-line prefer-const
      let newMeas = [];
      x.measurements.forEach(y => {
        // eslint-disable-next-line prefer-const
        let z = JSON.parse(JSON.stringify(y));
        z.at = new Date(y.at);
        newMeas.push(z);
      });
      // eslint-disable-next-line prefer-const
      let w = JSON.parse(JSON.stringify(x));
      w.measurements = newMeas;
      newData.push(w);
    });

    return (
      <div className='control-pane'>
        <style>
          {SAMPLE_CSS}
        </style>
        <div className='control-section'>
          <ChartComponent
            id='chart'
            style={{ textAlign: 'center' }}
            primaryXAxis={{
              valueType: 'DateTime',
              labelFormat: 'M/d h:m:s',
              intervalType: 'Auto',
              edgeLabelPlacement: 'Shift',
              majorGridLines: { width: 0 },
            }}
            // This next line is required for moving the fnc out.
            // eslint-disable-next-line react/jsx-no-bind
            load={this.load.bind(this)}
            primaryYAxis={{
              rangePadding: 'none',
              lineStyle: { width: 0 },
              majorTickLines: { width: 0 },
              minorTickLines: { width: 0 },
              labelFormat: '%{value}',
            }}
            chartArea={{ border: { width: 0 } }}
            tooltip={{ enable: true }}
            width={Browser.isDevice ? '100%' : '100%'}
            title=''
            // This next line is required for moving the fnc out.
            // eslint-disable-next-line react/jsx-no-bind
            loaded={this.onChartLoad.bind(this)}
          >
            <Inject services={[LineSeries, DateTime, Legend, Tooltip, DataLabel]} />
            <AxesDirective>
              <AxisDirective
                rowIndex={0}
                name='F'
                title='Temperature (Fahrenheit)'
                majorGridLines={this.lines}
                lineStyle={this.lines}
                labelFormat='{value}°F'
              />
              <AxisDirective
                rowIndex={1}
                name='PSI'
                title='PSI'
                majorGridLines={this.lines}
                lineStyle={this.lines}
                labelFormat='{value} PSI'
              />
              <AxisDirective
                rowIndex={2}
                name='%'
                title='%'
                majorGridLines={this.lines}
                lineStyle={this.lines}
                labelFormat='%{value}'
                rangePadding='none'
                minimum={0}
                maximum={100}
                interval={10}
              />
            </AxesDirective>
            <SeriesCollectionDirective>
              {metrics.selectedMetrics.map((x) => (
                <SeriesDirective
                  key={x}
                  dataSource={newData.find(y => y.metric === x).measurements}
                  xName='at'
                  yName='value'
                  yAxisName={metricData.find(y => y.metric === x).measurements[0].unit}
                  name={x}
                  width={2}
                  marker={{ visible: false, width: 10, height: 10 }}
                  type='Line'
                />
              ))}
            </SeriesCollectionDirective>
          </ChartComponent>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => (state);

export default connect(mapStateToProps)(StepLine);
