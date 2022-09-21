const { Router } = require('express');
const { registerUser, loginUser } = require('./controller/index');

const router = new Router();

//all the endpoints go here
router.post('/register', registerUser);
router.post('/login', loginUser);

module.exports = router;
