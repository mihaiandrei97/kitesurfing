import React from 'react';
import LocationsTextField from './LocationsTextField';
import { useDebouncedCallback } from 'use-debounce';

// material ui
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: '#d8d8d8',
    color: 'black',
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(even)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

const TableComponent = ({ spots }) => {
  const classes = useStyles();
  const [location, setLocation] = React.useState('');
  const [showedSpots, setShowedSpots] = React.useState([]);
  const [debouncedCallback] = useDebouncedCallback(
    (value) => {
      setLocation(value);
    },
    // delay in ms
    500
  );

  React.useEffect(() => {
    if (location !== '') {
      let newSpots = spots.filter((spot) => spot.name.includes(location));
      setShowedSpots(newSpots);
    } else {
      setShowedSpots(spots);
    }
  }, [location, spots]);

  return (
    <>
      <LocationsTextField
        location={location}
        onLocationChange={(e) => debouncedCallback(e.target.value)}
      />
      <TableContainer>
        <Table
          className={classes.table}
          size="small"
          aria-label="a dense table"
        >
          <TableHead>
            <TableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Country</StyledTableCell>
              <StyledTableCell>Latitude</StyledTableCell>
              <StyledTableCell>Longitude</StyledTableCell>
              <StyledTableCell>Wind Prob.</StyledTableCell>
              <StyledTableCell>When to go</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {showedSpots.length > 0 &&
              showedSpots.map((row, index) => {
                return (
                  <StyledTableRow key={index}>
                    <StyledTableCell align="left" sortDirection="asc">
                      {row.name}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      <div
                        style={{
                          marginBottom: '5px',
                        }}
                      >
                        <p>{row.country}</p>
                      </div>
                    </StyledTableCell>
                    <StyledTableCell align="left">{row.lat}</StyledTableCell>
                    <StyledTableCell align="left">{row.long}</StyledTableCell>
                    <StyledTableCell align="left">
                      {row.probability}
                    </StyledTableCell>
                    <StyledTableCell align="left">{row.month}</StyledTableCell>
                  </StyledTableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default TableComponent;
