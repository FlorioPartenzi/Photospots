const prisma = require('../../model/index');

// add pinned : true to each location in the array that the usere has pinned
const addPins = async (locations, email) => {
  // get all the pinned ids
  const pinned = await prisma.users.findUnique({
    where: { email: email },
    select: {
      pinned: {
        select: { id: true },
      },
    },
  });

  //see if pinned includes locations id and add an boolean
  const withAddedPinns = locations.map((location) => {
    if (
      pinned &&
      pinned.pinned.filter((place) => {
        if (place.id == location.id) return true;
      }).length > 0
    ) {
      location.isPinned = true;
    } else {
      location.isPinned = false;
    }
    return location;
  });

  //return the array
  return withAddedPinns;
};

// sorrt the locations array by distance from the provided latitude and longitude
const sortByDistance = (locations, lat, lon) => {
  const sorted = locations.sort((a, b) => {
    const distanceA = Math.abs(lon - a.lon) + Math.abs(lat - a.lat);
    const distanceB = Math.abs(lon - b.lon) + Math.abs(lat - b.lat);
    return distanceA - distanceB;
  });
  return sorted;
};

module.exports = { addPins, sortByDistance };
