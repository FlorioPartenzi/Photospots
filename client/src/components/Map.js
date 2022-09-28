import mapboxgl from 'mapbox-gl';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateViewPosition } from '../app/features/viewPosition/viewPositionSlice';

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
  useEffect(() => {
    if (coordinates[0] != undefined) {
      const markerDiv = document.createElement('div');
      markerDiv.className = 'userPosMarker';
      const marker = new mapboxgl.Marker(markerDiv)
        .setLngLat(coordinates)
        .addTo(map.current);
    }
  }, [coordinates]);

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
