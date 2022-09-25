const { Router } = require('express');
const { registerUser, loginUser, getUserInfo } = require('./controller/index');
const {
  postNewPlace,
  getAllPlaces,
  getPlacesByUser,
  getPlacesBySearch,
} = require('./controller/places');

const router = new Router();

//all the endpoints go here
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/profile', getUserInfo);
router.post('/newPlace', postNewPlace);
router.get('/places', getAllPlaces);
router.post('/placesByUser', getPlacesByUser);
router.get('/findPlacesbySearch/:searchterm', getPlacesBySearch);

module.exports = router;
