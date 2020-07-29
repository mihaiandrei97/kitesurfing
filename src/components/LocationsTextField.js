import React from 'react';

// material ui
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import { makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
  textField: {
    margin: '20px 0',
  },
}));

const LocationsTextField = ({ onLocationChange }) => {
  const classes = useStyles();

  return (
    <TextField
      id="locations"
      className={classes.textField}
      placeholder="Search..."
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
      //value={location}
      variant="filled"
      onChange={onLocationChange}
    />
  );
};

export default LocationsTextField;
