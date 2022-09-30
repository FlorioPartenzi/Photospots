import { useSelector } from 'react-redux';
import { HashLink as Link } from 'react-router-hash-link';
import '../Pinned.css';
import './LocationsPinned.css';
function PinnedLocations() {
  const pinnedLocations = useSelector((state) => state.pinnedList).pinnedList;

  return (
    <ul className="pinnedLocation">
      {pinnedLocations.map((location, i) => (
        <li key={i}>
          <Link to={`#${location.id}`} smooth>
            <img src={location.imgUrl} className="pinnedLocationImage"></img>
          </Link>
        </li>
      ))}
    </ul>
  );
}
export default PinnedLocations;
