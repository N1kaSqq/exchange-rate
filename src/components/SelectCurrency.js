import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function NativeSelects(props) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    age: '',
    name: 'hai',
    clicks: 1,
  });

  const handleChange = (event) => {
    const name = event.target.name;
    setState({
      ...state,
      [name]: event.target.value,
    });
  };

  const handleClick = (event) => {
    setState({
        ...state,
        clicks: state.clicks + 1
      });
    if(state.clicks %2 === 0){
        props.setCurrency(event.target.value)
    }
  };

  return (
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="age-native-simple">Валюта:</InputLabel>
        <Select
          native
          value={state.age}
          onChange={handleChange}
          onClick={handleClick} 
          inputProps={{
            name: 'age',
            id: 'age-native-simple',
          }}
        >
          <option value={'145'}>USD</option>
          <option value={'292'}>EUR</option>
          <option value={'298'}>RUR</option>
        </Select>
      </FormControl>
  );
}