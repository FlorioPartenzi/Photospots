export async function getAutocompleteAdressByText(address) {
  const response = await fetch(
    `https://api.geoapify.com/v1/geocode/autocomplete?text=${address}&apiKey=${process.env.REACT_APP_GEOAPIFY_API_KEY}`
  );
  return response;
}

export async function getCompleteAdsress(input) {
  const address = input.replace(' ', '%20');
  const response = await fetch(
    `https://api.geoapify.com/v1/geocode/search?text=${address}&apiKey=${process.env.REACT_APP_GEOAPIFY_API_KEY}`
  );
  return await response.json();
}
