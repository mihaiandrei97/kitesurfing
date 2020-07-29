import React from 'react';
import axios from 'axios';

import MapComponent from './MapComponent';
import TableComponent from './TableComponent';
import NavBar from './NavBar';
import AddSpotModal from './AddSpotModal';

// material ui
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const baseUrl = 'https://5f1ed14357e3290016863d6d.mockapi.io';

const useStyles = makeStyles((theme) => ({
  locations: {
    marginTop: '20px',
    fontSize: '1.5rem',
  },
  tableWrapper: {
    width: '90%',
    margin: 'auto',
  },
  textField: {
    margin: '20px 0',
  },
  loading: {
    textAlign: 'center',
    marginTop: 50,
  },
}));

const Dashboard = ({ setUser }) => {
  const classes = useStyles();

  const [spots, setSpots] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [open, setOpen] = React.useState(false);

  // handle add spot modal
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // get the initial data
  React.useEffect(() => {
    setIsLoading(true);
    axios
      .all([axios.get(`${baseUrl}/spot`), axios.get(`${baseUrl}/favourites`)])
      .then(
        axios.spread((data1, data2) => {
          let new_spots = data1.data;
          let new_favorite_spots = data2.data;
          let spots_with_favorite = new_spots.map((spot) => {
            return new_favorite_spots.filter(
              (favSpot) => +favSpot.spot === +spot.id
            ).length > 0
              ? { ...spot, isFavorite: true }
              : { ...spot, isFavorite: false };
          });
          setSpots(spots_with_favorite);
          setIsLoading(false);
        })
      );
  }, []);

  const onFavoriteChange = (activeSpot) => {
    let newSpots = spots.map((spot) => {
      if (spot.id === activeSpot.id) spot.isFavorite = !spot.isFavorite;
      return spot;
    });
    setSpots(newSpots);
  };

  // filter spots by country / probability. Refresh will be needed to remove the filter
  const onSubmitFilter = (country, probability) => {
    let newSpots;
    if (country !== '' && probability === '') {
      newSpots = spots.filter((spot) => spot.country === country);
    } else if (country === '' && probability !== '') {
      newSpots = spots.filter((spot) => +spot.probability === +probability);
      console.log(newSpots);
    } else if (country !== '' && probability !== '') {
      newSpots = spots.filter(
        (spot) => spot.country === country && +spot.probability === +probability
      );
      console.log(newSpots);
    }

    setSpots(newSpots);
  };

  const addNewSpot = (
    name,
    country,
    startDate,
    endDate,
    location,
    probability
  ) => {
    const newSpots = [...spots];
    let date = new Date(startDate);

    newSpots.push({
      name,
      long: location.lng,
      lat: location.lat,
      country,
      id: newSpots.length,
      isFavorite: false,
      createdAt: new Date(),
      month: date.toLocaleString('default', { month: 'long' }),
      probability,
    });
    setSpots(newSpots);
    setOpen(false);
  };

  if (isLoading)
    return (
      <div className={classes.loading}>
        <CircularProgress size="100px" />
      </div>
    );
  return (
    <>
      <NavBar setUser={setUser} handleClickOpen={handleClickOpen} />
      <AddSpotModal
        open={open}
        handleClose={handleClose}
        addNewSpot={addNewSpot}
      />
      <MapComponent
        spots={spots}
        onFavoriteChange={onFavoriteChange}
        onSubmitFilter={onSubmitFilter}
      />

      <div className={classes.tableWrapper}>
        <h2 className={classes.locations}>Locations</h2>

        <TableComponent spots={spots} />
      </div>
    </>
  );
};

export default Dashboard;
