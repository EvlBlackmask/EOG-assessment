import React from 'react';
import { Paper, Typography } from '@material-ui/core';

/**
 * Basic tile for displaying metric info
 * @param {string} label The label for the tile
 * @param {number} value The value for the metric
 * @param {number} previousValue The last value for the metric
 * @returns JSX component tile
 */
export default function MetricTile(props) {
  const {
    label, value, previousValue,
  } = props;
  const change = value - previousValue;
  return (
    <Paper elevation={3}>
      <Typography variant='h3'>
        {label}
      </Typography>
      <Typography variant='h6'>
        {`Current Value: ${value}`}
      </Typography>
      <Typography variant='h6'>
        {`Last Value: ${previousValue}`}
      </Typography>
      <Typography variant='h6'>
        {`change: ${change}`}
      </Typography>
    </Paper>
  );
}
