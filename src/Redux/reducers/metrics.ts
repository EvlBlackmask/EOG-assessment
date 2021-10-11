import { createSlice } from '@reduxjs/toolkit';

type MeasurmentData = {
  metric: string;
  at: number;
  value: number;
  unit: string;
};

/**
 * Add metrics to the state
 * @param state The current state
 * @param action The data for the update
 */
const addItemToArray = (state: { metricData: any[]; }, action: { payload: any; }) => {
  if (action.payload) {
    state.metricData = action.payload;
  }
};

/**
 * add the metric definitions to the state
 * @param state The current state
 * @param action The data for the update
 */
const setMetricDefs = (state: { metricTypes: Array<string> }, action: { payload: any; }) => {
  if (action.payload) {
    state.metricTypes = action.payload;
  }
};

/**
 * set the users selections into state
 * @param state The current state
 * @param action The data for the update
 */
const setSelectedMetrics = (state: { selectedMetrics: Array<string> },
  action: { payload: any; }) => {
  if (action.payload) {
    state.selectedMetrics = action.payload;
  }
};

export const dataSlicer = createSlice({
  name: 'metrics',
  initialState: {
    metricData: Array<MeasurmentData>(),
    selectedMetrics: Array<string>(),
    metricTypes: Array<string>(),
  },
  reducers: {
    setDefs: setMetricDefs,
    setSelected: setSelectedMetrics,
    add: addItemToArray,
  },
});

// Action creators are generated for each case reducer function
export const { add, setDefs, setSelected } = dataSlicer.actions;

export default dataSlicer.reducer;
