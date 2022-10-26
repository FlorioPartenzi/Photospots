import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateViewPosition } from '../../../app/features/viewPosition/viewPositionSlice';
import './Map.css';
import '../Map.css';
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_API_KEY;

function Map() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const coordinates = useSelector((state) => state.position).position;
  const centerCoordinates = useSelector(
    (state) => state.viewPosition
  ).viewPosition;

  const locationCoordinates = useSelector(
    (state) => state.pinPosition
  ).pinPosition;

  const dispatch = useDispatch();

  // starts the map
  useEffect(() => {
    if (map.current) return;
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      zoom: 10,
      center: [0, 0],
    });
  }, []);

  // set a marker at the users Coordiantes
  // and update the center of the map to the users position
  useEffect(() => {
    if (coordinates[0] != undefined) {
      const markerDiv = document.createElement('div');
      markerDiv.className = 'userPosMarker';
      const marker = new mapboxgl.Marker(markerDiv)
        .setLngLat(coordinates)
        .addTo(map.current);

      map.current.flyTo({
        zoom: 10,
        center: coordinates,
        essential: true,
      });
    }
  }, [coordinates]);

  //set the markers at the position of the locations
  useEffect(() => {
    const createMarkerAt = (coordinates) => {
      const markerDiv = document.createElement('div');
      markerDiv.className = 'marker';
      markerDiv.addEventListener('click', () => {
        dispatch(updateViewPosition(coordinates));
      });
      const marker = new mapboxgl.Marker(markerDiv)
        .setLngLat(coordinates)
        .addTo(map.current);
    };
    locationCoordinates.map((location) => {
      createMarkerAt(location);
    });
  }, [locationCoordinates]);

  // hook to center the map to the location of the Photospot that has been clicked
  useEffect(() => {
    map.current.flyTo({
      zoom: 10,
      center: centerCoordinates,
      essential: true,
    });
  }, [centerCoordinates]);

  return (
    <div className="map">
      <div ref={mapContainer} className="mapContainer"></div>
    </div>
  );
}

export default Map;
