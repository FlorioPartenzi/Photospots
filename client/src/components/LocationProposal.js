import { createAddressString } from '../utils/locationUtils';

function LocationProposal({ location, setAddress }) {
  const locationProposal = createAddressString(location);
  return (
    <button
      onClick={() => {
        setAddress(locationProposal);
      }}
      className="formInputProposalBTN"
    >
      {locationProposal}
    </button>
  );
}
export default LocationProposal;
