import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Toolbar, Typography, AppBar, Button } from '@material-ui/core';
import { Dialog } from '../../components'
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn'
import useDimensions from '../../hooks/useDimensions'
import CSVPlayer from '../../types/CSVPlayer'
import CSVHeader from '../../types/CSVHeader'

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

interface IAppBar {
  ncaaData: CSVPlayer[]
  nflData: CSVPlayer[]
  headers: CSVHeader[]
}
const ButtonAppBar = ({ ncaaData, nflData, headers }: IAppBar) => {
  const classes = useStyles();
  const dimensions = useDimensions()

  return (
    <div className={classes.root}>
      <StyledAppBar position='sticky'>
        <Toolbar>
        <a 
            href="https://www.buymeacoffee.com/patrickspafford"
            target="_blank"
            rel='noreferrer'
            style={{ textDecoration: 'none', color: 'white', marginLeft: '0.5rem' }}
            >
          <Button variant='contained' color='primary'>
            <MonetizationOnIcon />
            <span style={{ textDecoration: 'none', color: 'white', marginLeft: '0.5rem' }}>
              Donate
            </span>
          </Button>
          </a>
          <Typography variant="h6" className={classes.title}>
            {(dimensions.width && dimensions.width > 700) ? 'Passer Rating Calculator'
            : 'Passer Rating'}
          </Typography>
          <Dialog 
            ncaaData={ncaaData}
            nflData={nflData}
            headers={headers}
          />
        </Toolbar>
      </StyledAppBar>
    </div>
  );
}

export default ButtonAppBar