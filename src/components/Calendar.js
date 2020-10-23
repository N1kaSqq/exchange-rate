import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';



const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

function getCurrentDate() {
    let date = Date.now(); 
    let startDate = (Date.now() - 604800000);
    const options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    }
    startDate = new Intl.DateTimeFormat('ru-RU', options).format(new Date(startDate))
    date = new Intl.DateTimeFormat('ru-RU', options).format(new Date(date))
     return {
       'startDate': `${startDate.slice(6,10)}-${startDate.slice(3,5)}-${startDate.slice(0,2)}`,
       'endDate': `${date.slice(6,10)}-${date.slice(3,5)}-${date.slice(0,2)}`,
    }    
}

export default function DatePickers(props) {

  const handleChange = (event) => {

    if (event.target.id === 'start-date') {
          props.setCurrentDate(event.target.value, state.endDate);
          setState({
            ...state,
            startDate: event.target.value,
          });
    } else {
        props.setCurrentDate(state.startDate, event.target.value);
        setState({
            ...state,
            endDate: event.target.value,
        });
    }
  };

  const classes = useStyles();
  const {startDate, endDate} = getCurrentDate()

  const [state, setState] = React.useState({
    startDate,
    endDate,
  });



  return (
    <form className={classes.container} noValidate>
      <TextField
        id="start-date"
        label="от"
        type="date"
        defaultValue={startDate}
        onChange={handleChange}
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        id="end-date"
        label="до"
        type="date"
        defaultValue={endDate}
        className={classes.textField}
        onChange={handleChange}
        InputLabelProps={{
          shrink: true,
        }}
      />
    </form>
  );
}