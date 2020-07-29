import React from 'react';

// material ui
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Map, Marker, TileLayer } from 'react-leaflet';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  dateContainer: {
    marginTop: 20,
    marginBottom: 20,
    display: 'flex',
    justifyContent: 'space-between',
  },
}));

const AddSpotModal = ({ handleClose, open, addNewSpot }) => {
  const classes = useStyles();
  const [pin, setPin] = React.useState(null);
  const [name, setName] = React.useState('');
  const [country, setCountry] = React.useState('');
  const [startDate, setStartDate] = React.useState('');
  const [probability, setProbability] = React.useState('');
  const [endDate, setEndDate] = React.useState('');

  const addMarker = (e) => {
    setPin(e.latlng);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Add Spot</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          id="name"
          label="Name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
        />
        <TextField
          margin="dense"
          id="country"
          label="Country"
          type="text"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          fullWidth
        />
        <TextField
          margin="dense"
          id="probability"
          label="Probability"
          type="text"
          value={probability}
          onChange={(e) => setProbability(e.target.value)}
          fullWidth
        />
        <div className={classes.dateContainer}>
          <TextField
            id="date"
            label="Start Date"
            type="date"
            defaultValue={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            id="date"
            label="End date"
            type="date"
            defaultValue={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>
        <Map center={[44.2236, 28.5645]} zoom={5} onClick={addMarker}>
          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {pin && <Marker position={[pin.lat, pin.lng]} />}
        </Map>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button
          onClick={() =>
            addNewSpot(name, country, startDate, endDate, pin, probability)
          }
          color="primary"
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddSpotModal;
