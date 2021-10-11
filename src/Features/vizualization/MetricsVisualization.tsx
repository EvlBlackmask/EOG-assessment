import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { gql, useQuery } from '@apollo/client';
import { Chip, LinearProgress, Typography } from '@material-ui/core';
import { useSelector, RootStateOrAny, useDispatch } from 'react-redux';
import AutocompleteSelector from '../../components/visualizationComponents/Autocomplete';
import StepLine from '../../components/visualizationComponents/Chart';
import { add } from '../../Redux/reducers/metrics';
import MetricTile from '../../components/visualizationComponents/Tile';

const query = gql`
  query($input: [MeasurementQuery]) {
  getMultipleMeasurements(input: $input) {
    metric
    measurements {
      metric
      at
      value
      unit
    }
  }
}
`;

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

const thirtyMinAgo = Date.now() - 30 * 60 * 1000;

/**
 * This is the main metrics visualization app
 * @returns A metrics visualization app
 */
const MetricsVisualization: React.FC = () => {
  const classes = useStyles();
  const metricData = useSelector((state: RootStateOrAny) => state.metrics.metricData);
  const selectedMetrics = useSelector((state: RootStateOrAny) => state.metrics.selectedMetrics);
  // eslint-disable-next-line max-len
  const metricTypes = useSelector((state: RootStateOrAny) => state.metrics.metricTypes.getMetrics) as Array<string>;
  const dispatch = useDispatch();
  const { loading, error, data } = useQuery(query, {
    variables: {
      input: metricTypes.map((metricName: string) => ({
        metricName,
        after: thirtyMinAgo,
      })),
    },
    pollInterval: 5000,
  });
  if (loading) return <LinearProgress />;
  if (error) return <Typography color="error">{error}</Typography>;
  if (!data) return <Chip label="Data Unavailable" />;
  if (data.getMultipleMeasurements.length > 0) {
    dispatch(add(data.getMultipleMeasurements));
  }

  // fun trick for making sure you have the data for the components
  const chartView = selectedMetrics.length > 0
    ? <StepLine />
    : <Typography>Please select a metric!</Typography>;

  /* Build up the three sevtions
     1. The search bar
     2. The graph
     3. The live readouts
  */
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <AutocompleteSelector
              id="MetricSolecter"
            />
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            {chartView}
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={3}>
            {selectedMetrics.map((x: string) => {
              const dA = metricData.find((y: { metric: string; }) => y.metric === x).measurements;
              return (
                <Grid item xs={3} key={x}>
                  <MetricTile
                    value={dA[dA.length - 1].value}
                    label={x}
                    previousValue={dA[dA.length - 2].value}
                  />
                </Grid>
              );
            })}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default MetricsVisualization;
