export async function getAutocompleteAdressByText(address) {
  try {
    const response = await fetch(
      `https://api.geoapify.com/v1/geocode/autocomplete?text=${address}&apiKey=${process.env.REACT_APP_GEOAPIFY_API_KEY}`
    );
    return response;
  } catch (error) {
    console.log(
      'ERROR while fetching getAutocompleteAddressByText at geoapifyService: ',
      error
    );
  }
}

export async function getCompleteAddress(input) {
  try {
    const address = input.replace(' ', '%20');
    const response = await fetch(
      `https://api.geoapify.com/v1/geocode/search?text=${address}&apiKey=${process.env.REACT_APP_GEOAPIFY_API_KEY}`
    );
    return await response.json();
  } catch (error) {
    console.log(
      'ERROR while fetching getCompleteAddress at geoapifyService: ',
      error
    );
  }
}
