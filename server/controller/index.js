const prisma = require('../model/index');

const registerUser = async function (req, res) {
  try {
    if (req.body.name && req.body.email && req.body.password) {
      user = {
        data: {
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
        },
      };
      const userAllreadyInUse = await prisma.users.findUnique({
        where: { email: req.body.email },
      });
      if (!userAllreadyInUse) {
        await prisma.users.create(user);
        res.status(201);
        res.send('registered User');
      } else {
        res.status(204);
        res.send('user allready in use');
      }
    } else {
      res.status(204);
      res.send('failed to register');
    }
  } catch (error) {
    console.log('ERROR in controller/index.js at registerUser', error);
    res.status(500);
    res.send('failed to register');
  }
};

const loginUser = async function (req, res) {
  try {
    if (req.body.email && req.body.password) {
      const user = await prisma.users.findUnique({
        where: { email: req.body.email },
      });
      if (user && user.password === req.body.password) {
        res.status(200);
        res.send('logged in user');
      } else {
        res.status(204);
        res.send('wrong credentials');
      }
    } else {
      res.status(204);
      res.send('wrong credentials');
    }
  } catch (error) {
    console.log('ERROR in controller/index.js at loginUser', error);
    res.status(500);
    res.send('failed to log in');
  }
};

const getUserInfo = async function (req, res) {
  try {
    const user = await prisma.users.findUnique({
      where: { email: req.body.email },
      select: { name: true, email: true },
    });
    res.status(200);
    res.send(user);
  } catch (error) {
    console.log('ERROR in controller/index.js at getUserInfo', error);
    res.status(500);
    res.send('failed to load user information');
  }
};

module.exports = { registerUser, loginUser, getUserInfo };
