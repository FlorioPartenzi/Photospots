import { createAddressString } from '../../../../utils/locationUtils';
import '../Form.css';

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
