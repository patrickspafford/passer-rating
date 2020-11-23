import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
}));

const StyledAppBar = withStyles({
    colorPrimary: {
      backgroundColor: '#03244d',
    },
})(AppBar)

const ButtonAppBar = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <StyledAppBar position='sticky'>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Passer Rating Calculator
          </Typography>
        </Toolbar>
      </StyledAppBar>
    </div>
  );
}

export default ButtonAppBar