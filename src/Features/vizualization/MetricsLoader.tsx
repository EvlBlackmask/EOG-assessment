import React from 'react';
import { Chip, LinearProgress, Typography } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { gql, useQuery } from '@apollo/client';
import MetricsVisualization from './MetricsVisualization';
import { setDefs } from '../../Redux/reducers/metrics';

const getMetricsQuery = gql`
  query{
    getMetrics
  }
`;

type MetricTypesResponse = {
  getMetrics: string[];
};

/**
 * This is to make sure we load and store the metrics types before loading main app
 */
export default function MetricsLoader() {
  const dispatch = useDispatch();
  const { loading, error, data } = useQuery<MetricTypesResponse>(getMetricsQuery, {});
  if (loading) return <LinearProgress />;
  if (error) return <Typography color="error">{error}</Typography>;
  if (!data) return <Chip label="Data Unavailable" />;
  dispatch(setDefs(data));
  return (
    <MetricsVisualization />
  );
}
