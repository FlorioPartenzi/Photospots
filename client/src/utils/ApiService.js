import { SEVRER_BASE_URL } from './utils';

export async function loginRequest(idToken) {
  const requestOptions = {
    method: 'POST',
    headers: { authToken: idToken },
  };

  const user = await (
    await fetch(`${SEVRER_BASE_URL}/login`, requestOptions)
  ).json();

  if (user.id) return user;
  return false;
}

export async function registerRequest(name, email, idToken) {
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
}

export async function postNewLocation(
  title,
  description,
  address,
  imgUrl,
  idToken
) {
  const requestOptions = {
    method: 'POST',
    headers: { authToken: idToken, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      title: title,
      description: description,
      address: address,
      imgUrl: imgUrl,
    }),
  };
  const location = await (
    await fetch(`${SEVRER_BASE_URL}/newPlace`, requestOptions)
  ).json();

  if (location) return location;
  return null;
}
