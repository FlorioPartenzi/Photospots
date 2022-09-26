import { useSelector } from 'react-redux';

function PinnedLocations() {
  const pinnedLocations = useSelector((state) => state.pinnedList).pinnedList;
  return (
    <div>
      <ul className="pinnedLocation">
        {pinnedLocations.map((location, i) => (
          <li key={i}>
            <img src={location.imgUrl} className="pinnedLocationImage"></img>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default PinnedLocations;
