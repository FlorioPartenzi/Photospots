const SEVRER_BASE_URL = process.env.REACT_APP_SERVER_BASE_URL;

export async function loginRequest(idToken) {
  try {
    const requestOptions = {
      method: 'POST',
      headers: { authToken: idToken },
    };

    const user = await (
      await fetch(`${SEVRER_BASE_URL}/login`, requestOptions)
    ).json();
    if (user.id) return user;
    return false;
  } catch (error) {
    console.log('ERROR in ApiService while fetching login request: ', error);
    return { error: error };
  }
}

export async function registerRequest(name, email, idToken) {
  try {
    const requestOptions = {
      method: 'POST',
      headers: { authToken: idToken, 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: name, email: email }),
    };
    const user = await (
      await fetch(`${SEVRER_BASE_URL}/register`, requestOptions)
    ).json();

    if (user.id) return user;
    return null;
  } catch (error) {
    console.log('ERROR in ApiService while fetching register request: ', error);
    return { error: error };
  }
}
export async function getUserInfo(idToken) {
  try {
    const requestOptions = {
      method: 'GET',
      headers: { authToken: idToken },
    };

    const user = await (
      await fetch(`${SEVRER_BASE_URL}/profile`, requestOptions)
    ).json();
    if (user.name) return user;
    return false;
  } catch (error) {
    console.log('ERROR in ApiService while fetching profile: ', error);
    return { error: error };
  }
}
export async function getUserInfoById(id, idToken) {
  try {
    const requestOptions = {
      method: 'GET',
      headers: { authToken: idToken },
    };

    const user = await (
      await fetch(`${SEVRER_BASE_URL}/profile/${id}`, requestOptions)
    ).json();
    if (user.name) return user;
    return false;
  } catch (error) {
    console.log('ERROR in ApiService while fetching profileById: ', error);
    return { error: error };
  }
}
//refractor to obj as argument!!!!
export async function postNewLocation(
  title,
  description,
  housenumber,
  street,
  city,
  postcode,
  country,
  lon,
  lat,
  imgUrl,
  idToken
) {
  try {
    const requestOptions = {
      method: 'POST',
      headers: { authToken: idToken, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: title,
        description: description,
        housenumber: housenumber,
        street: street,
        city: city,
        postcode: postcode,
        country: country,
        lon: lon,
        lat: lat,
        imgUrl: imgUrl,
      }),
    };
    const location = await (
      await fetch(`${SEVRER_BASE_URL}/newPlace`, requestOptions)
    ).json();

    if (location) return location;
    return null;
  } catch (error) {
    console.log('ERROR in ApiService while fetching post new Place: ', error);
    return { error: error };
  }
}

export async function getAllLocations(lng, lat, idToken) {
  try {
    const requestOptions = {
      method: 'GET',
      headers: { authToken: idToken },
    };
    const allLocations = await (
      await fetch(`${SEVRER_BASE_URL}/places/${lng}/${lat}`, requestOptions)
    ).json();
    if (allLocations) return allLocations;
    return null;
  } catch (error) {
    console.log(
      'ERROR in ApiService while fetching get all locations: ',
      error
    );
    return { error: error };
  }
}

export async function getLocationsByUser(idToken) {
  try {
    const requestOptions = {
      method: 'GET',
      headers: { authToken: idToken },
    };
    const usrLocations = await (
      await fetch(`${SEVRER_BASE_URL}/placesByUser`, requestOptions)
    ).json();
    if (usrLocations) return usrLocations;
    return null;
  } catch (error) {
    console.log(
      'ERROR in ApiService while fetching getLocationsByUser: ',
      error
    );
    return { error: error };
  }
}

export async function getLocationsBySearch(searchterm, idToken) {
  try {
    const requestOptions = {
      method: 'GET',
      headers: { authToken: idToken },
    };
    const locations = await (
      await fetch(
        `${SEVRER_BASE_URL}/findPlacesbySearch/${searchterm}`,
        requestOptions
      )
    ).json();
    if (locations) return locations;
    return null;
  } catch (error) {
    console.log(
      'ERROR in ApiService while fetching locations by search: ',
      error
    );
    return { error: error };
  }
}

export async function getLocationsByDistance(lng, lat, idToken) {
  try {
    const requestOptions = {
      method: 'GET',
      headers: { authToken: idToken },
    };
    const locations = await (
      await fetch(
        `${SEVRER_BASE_URL}/findPlacesbyDistance/${lng}/${lat}`,
        requestOptions
      )
    ).json();
    if (locations) return locations;
    return null;
  } catch (error) {
    console.log(
      'ERROR in ApiService while fetching locations by search: ',
      error
    );
    return { error: error };
  }
}

export async function putPinned(id, add, idToken) {
  try {
    const requestOptions = {
      method: 'PUT',
      headers: { authToken: idToken, 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: id, add: add }),
    };
    const location = await fetch(`${SEVRER_BASE_URL}/pinned`, requestOptions);
    const locationParsed = await location.json();
    if (locationParsed) return locationParsed;
    return null;
  } catch (error) {
    console.log('ERROR in ApiService while fetching put pinned: ', error);
    return { error: error };
  }
}

export async function getPinned(idToken) {
  try {
    const requestOptions = {
      method: 'get',
      headers: { authToken: idToken },
    };
    const location = await (
      await fetch(`${SEVRER_BASE_URL}/pinned`, requestOptions)
    ).json();
    if (location) return location;
    return null;
  } catch (error) {
    console.log('ERROR in ApiService while fetching put pinned: ', error);
    return { error: error };
  }
}
