const metricReducer = (state:string[] = [], action: { type: string; val: string[] }) => {
  switch (action.type) {
    case 'add':
      return state.concat(action.val);
    default:
      return state;
  }
};
export default metricReducer;
