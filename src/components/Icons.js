import RedMarker from '../assets/marker-icon-red.png';
import YellowMarker from '../assets/marker-icon-yellow.png';

import L from 'leaflet';

// create pin icons for leaflet

const redIcon = new L.Icon({
  iconUrl: RedMarker,
  iconRetinaUrl: RedMarker,
  iconAnchor: null,
  popupAnchor: null,
  shadowUrl: null,
  shadowSize: null,
  shadowAnchor: null,
  iconSize: new L.Point(25, 40),
  className: 'leaflet-div-icon',
});

const yellowIcon = new L.Icon({
  iconUrl: YellowMarker,
  iconRetinaUrl: YellowMarker,
  iconAnchor: null,
  popupAnchor: null,
  shadowUrl: null,
  shadowSize: null,
  shadowAnchor: null,
  iconSize: new L.Point(25, 40),
  className: 'leaflet-div-icon',
});
export { redIcon, yellowIcon };
