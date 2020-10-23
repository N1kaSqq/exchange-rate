import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Main from './components/Main'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    background: '#fff',
    marginBottom: '65px',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    color: 'black',
  },
  
}));


function App() {
  const classes = useStyles();

  return (
    <div>
      <AppBar position="static" className={classes.root}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Exchange rate
          </Typography>
        </Toolbar>
      </AppBar>
      <Main />
    </div>
  );
}

export default App;
