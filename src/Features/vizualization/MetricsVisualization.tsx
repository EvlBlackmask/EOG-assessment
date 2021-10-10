import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { gql, useSubscription } from '@apollo/client';
import { Chip, LinearProgress, Typography } from '@material-ui/core';
import AutocompleteSelector from '../../components/visualizationComponents/Autocomplete';
import StepLine from '../../components/visualizationComponents/Chart';

const subscription = gql`
  subscription {
    newMeasurement{
      metric,
      at,
      value,
      unit
    }
  }
`;

type MeasurmentData = {
  metric: string;
  at: number;
  value: number;
  unit: string;
};
type MeasurmentDataResponse = {
  getWeatherForLocation: MeasurmentData;
};

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

const MetricsVisualization: React.FC = () => {
  const classes = useStyles();
  const { loading, error, data } = useSubscription<MeasurmentDataResponse>(subscription, {});
  if (loading) return <LinearProgress />;
  if (error) return <Typography color="error">{error}</Typography>;
  if (!data) return <Chip label="Data Unavailable" />;
  console.warn(data);

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
            <StepLine />
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper}>Tiles</Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default MetricsVisualization;
