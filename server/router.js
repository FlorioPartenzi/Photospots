const { Router } = require('express');
const { registerUser, loginUser, getUserInfo } = require('./controller/index');
const { postNewPlace } = require('./controller/places');

const router = new Router();

//all the endpoints go here
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/profile', getUserInfo);
router.post('/newPlace', postNewPlace);

module.exports = router;
