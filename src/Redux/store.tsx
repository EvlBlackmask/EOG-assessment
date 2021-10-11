import { configureStore } from '@reduxjs/toolkit';
import metricDataReducer from './reducers/metrics';

/**
 * The redux store
 */
export default configureStore({
  reducer: {
    metrics: metricDataReducer,
  },
});
