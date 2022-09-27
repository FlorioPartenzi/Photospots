import { useSelector } from 'react-redux';

function PinnedLocations() {
  const pinnedLocations = useSelector((state) => state.pinnedList).pinnedList;

  return (
    <ul className="pinnedLocation">
      {pinnedLocations.map((location, i) => (
        <li key={i}>
          <link to={`#${location.id}`}></link>
          <img src={location.imgUrl} className="pinnedLocationImage"></img>
        </li>
      ))}
    </ul>
  );
}
export default PinnedLocations;
