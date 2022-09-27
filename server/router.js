const { Router } = require('express');
const {
  registerUser,
  loginUser,
  getUserInfo,
  putUserPinned,
  getUserPinned,
} = require('./controller/users');
const {
  postNewPlace,
  getAllPlaces,
  getPlacesByUser,
  getPlacesBySearch,
  getPlacesByDistance,
} = require('./controller/places');

const router = new Router();

//all the endpoints go here
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', getUserInfo);
router.post('/newPlace', postNewPlace);
router.get('/places', getAllPlaces);
router.post('/placesByUser', getPlacesByUser);
router.get('/findPlacesbySearch/:searchterm', getPlacesBySearch);
router.get('/findPlacesbyDistance/:lng/:lat', getPlacesByDistance);
router.put('/pinned', putUserPinned);
router.get('/pinned', getUserPinned);

module.exports = router;
