import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  // note adder overflow to fix flickering issue with scroll bar.
  wrapper: {
    height: '100vh',
    overflowY: 'scroll',
  },
});

const Wrapper: React.FC = ({ children }) => {
  const classes = useStyles();
  return <div className={classes.wrapper}>{children}</div>;
};

export default Wrapper;
