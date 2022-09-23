import { createAddressString } from '../utils/locationUtils';

function Location({ location }) {
  const address = createAddressString(location);
  return (
    <div>
      <img src={location.imgUrl}></img>
      <div>
        <h2>{location.title}</h2>
        <p>{location.description}</p>
      </div>
      <p>{address}</p>
    </div>
  );
}
export default Location;
