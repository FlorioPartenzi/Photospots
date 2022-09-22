import { SEVRER_BASE_URL } from './utils';

export async function loginRequest(email, password) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: email, password: password }),
  };

  const user = await (
    await fetch(`${SEVRER_BASE_URL}/login`, requestOptions)
  ).json();

  if (user.id) return true;
  return false;
}

export async function registerRequest(name, email, password) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: name, email: email, password: password }),
  };
  const user = await (
    await fetch(`${SEVRER_BASE_URL}/register`, requestOptions)
  ).json();

  if (user.id) return user;
  return null;
}
