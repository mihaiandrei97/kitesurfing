import React from 'react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import { redIcon, yellowIcon } from './Icons';
import StarOn from '../assets/star-on.png';
import StarOff from '../assets/star-off.png';
import FilterMenu from './FilterMenu';

// material ui
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  menuContainer: {
    position: 'absolute',
    top: '90px',
    right: '70px',
    zIndex: '999',
  },
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

const MapComponent = ({ spots, onFavoriteChange, onSubmitFilter }) => {
  const classes = useStyles();

  const [activeSpot, setActiveSpot] = React.useState(null);

  return (
    <>
      <Map center={[44.2236, 28.5645]} zoom={5}>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {spots.length > 0 &&
          spots.map((spot) => {
            return (
              <Marker
                key={spot.id}
                icon={spot.isFavorite ? redIcon : yellowIcon}
                position={[spot.lat, spot.long]}
                onClick={() => setActiveSpot(spot)}
              />
            );
          })}
        {activeSpot && (
          <Popup
            position={[activeSpot.lat, activeSpot.long]}
            onClose={() => setActiveSpot(false)}
          >
            <h3>
              {activeSpot.name}
              <img
                src={activeSpot.isFavorite ? StarOn : StarOff}
                alt="star"
                onClick={() => onFavoriteChange(activeSpot)}
              />
            </h3>
            <p style={{ marginBottom: '20px', color: '#787878' }}>
              {activeSpot.country}
            </p>
            <h4>Wind Probability</h4>
            <p>{activeSpot.probability}%</p>
            <h4>Latitude</h4>
            <p>{activeSpot.lat}° N</p>
            <h4>Longitude</h4>
            <p>{activeSpot.lat}° W</p>
            <h4>When to go</h4>
            <p>{activeSpot.month}</p>
            <Button
              variant="contained"
              style={{
                marginTop: 10,
                backgroundColor: activeSpot.isFavorite ? '#ff3b30' : '#e8b100',
                color: 'white',
              }}
              onClick={() => onFavoriteChange(activeSpot)}
            >
              {activeSpot.isFavorite
                ? 'Remove from favorites'
                : 'Add to favorites'}
            </Button>
          </Popup>
        )}
      </Map>
      <div className={classes.menuContainer}>
        <FilterMenu onSubmitFilter={onSubmitFilter} />
      </div>
    </>
  );
};

export default MapComponent;
