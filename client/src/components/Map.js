import mapboxgl from 'mapbox-gl';
import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_API_KEY;

function Map() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const coordinates = useSelector((state) => state.position).position;

  useEffect(() => {
    console.log(coordinates);
    if (map.current) return;
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      zoom: 7,
      center: coordinates,
    });
  }, []);

  return (
    <div className="map">
      <div ref={mapContainer} className="mapContainer"></div>
    </div>
  );
}

export default Map;
