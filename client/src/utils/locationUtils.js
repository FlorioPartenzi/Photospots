export function createAddressString(location) {
  let address = '';
  if (location.country) address += location.country + ' ';
  if (location.postcode) address += location.postcode + ' ';
  if (location.city) address += location.city + ' ';
  if (location.street) address += location.street + ' ';
  if (location.housenumber) address += location.housenumber + ' ';
  return address;
}
