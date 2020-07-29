import React from 'react';

//material ui
import FilterListIcon from '@material-ui/icons/FilterList';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  button: {
    backgroundColor: '#dadada',
    color: '#000',
  },
  filterButton: {
    backgroundColor: '#fff',
    color: '#000',
  },
  menu: {
    ul: {
      width: 175,
    },
  },
}));

const FilterMenu = ({ onSubmitFilter }) => {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [country, setCountry] = React.useState('');
  const [probability, setProbability] = React.useState('');

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
        variant="contained"
        className={classes.button}
        startIcon={<FilterListIcon />}
      >
        Filter
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        className={classes.menu}
      >
        <MenuItem>
          <TextField
            id="country"
            label="Country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
        </MenuItem>
        <MenuItem>
          <TextField
            id="wind-probability"
            label="Wind Probability"
            value={probability}
            onChange={(e) => setProbability(e.target.value)}
          />
        </MenuItem>
        <MenuItem>
          <Button
            variant="contained"
            className={classes.filterButton}
            onClick={() => onSubmitFilter(country, probability)}
          >
            Apply filter
          </Button>
        </MenuItem>
      </Menu>
    </>
  );
};

export default FilterMenu;
