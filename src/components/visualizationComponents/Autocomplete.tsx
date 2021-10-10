import * as React from 'react';
import {
  useQuery, gql,
} from '@apollo/client';
import { Chip, Typography } from '@material-ui/core';
import Autocomplete, { AutocompleteRenderInputParams } from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import LinearProgress from '@material-ui/core/LinearProgress';

interface AutocompleteSelectorProps {
  id: string;
}

const query = gql`
  query{
    getMetrics
  }
`;

type MetricTypesResponse = {
  getMetrics: string[];
};

export default function AutocompleteSelector(props: AutocompleteSelectorProps) {
  const {
    id,
  } = props;
  const { loading, error, data } = useQuery<MetricTypesResponse>(query, {});
  if (loading) return <LinearProgress />;
  if (error) return <Typography color="error">{error}</Typography>;
  if (!data) return <Chip label="Data Unavailable" />;

  return (
    <Autocomplete
      id={id}
      options={data.getMetrics}
      multiple
      getOptionLabel={(option) => option}
      renderTags={(val: readonly string[]) => val.map((option: string) => <Chip key={option} variant="outlined" label={option} />)}
      renderInput={(params: AutocompleteRenderInputParams) => (
        <TextField
          InputLabelProps={params.InputLabelProps}
          InputProps={params.InputProps}
          disabled={params.disabled}
          fullWidth={params.fullWidth}
          id={params.id}
          // due to how the MUI autocomplete works we need the duplicated prop
          // eslint-disable-next-line react/jsx-no-duplicate-props
          inputProps={params.inputProps}
          size={params.size}
        />
      )}
    />
  );
}
