import * as React from 'react';
import Autocomplete, { AutocompleteRenderInputParams } from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { setSelected } from '../../Redux/reducers/metrics';

interface AutocompleteSelectorProps {
  id: string;
}

/**
 * Auto complete component with multi value.
 * @param id The id for the autocomplete
 * @returns MUI autocomplete element
 */
export default function AutocompleteSelector(props: AutocompleteSelectorProps) {
  const {
    id,
  } = props;
  const dispatch = useDispatch();
  const metricTypes = useSelector(
    (state: RootStateOrAny) => state.metrics.metricTypes.getMetrics,
  ) as Array<string>;
  return (
    <Autocomplete
      id={id}
      options={metricTypes}
      multiple
      onChange={(event, newValue) => {
        dispatch(setSelected(newValue));
      }}
      getOptionLabel={(option) => option}
      renderInput={(params: AutocompleteRenderInputParams) => (
        <TextField
          label='Metrics'
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
