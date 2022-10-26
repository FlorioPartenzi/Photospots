const { Router } = require('express');
const {
  registerUser,
  loginUser,
  getUserInfo,
  getUserInfoById,
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

// all the endpoints go here
router.post('/api/register', registerUser);
router.post('/api/login', loginUser);
router.get('/api/profile', getUserInfo);
router.get('/api/profile/:id', getUserInfoById);
router.post('/api/newPlace', postNewPlace);
router.get('/api/places/:lng/:lat', getAllPlaces);
router.get('/api/placesByUser', getPlacesByUser);
router.get('/api/findPlacesbySearch/:searchterm', getPlacesBySearch);
router.get('/api/findPlacesbyDistance/:lng/:lat', getPlacesByDistance);
router.put('/api/pinned', putUserPinned);
router.get('/api/pinned', getUserPinned);

module.exports = router;
