import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import AutocompleteSelector from '../../components/visualizationComponents/Autocomplete';
import StepLine from '../../components/visualizationComponents/Chart';

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
